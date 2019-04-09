var app = {
    // Application Constructor
    initialize: function() {
        // aqui irán todos los lanzamientos al inicializar app
        this.startFastClick();
        this.startButtonScan();
        this.startButtonCert();
        this.startButtonNull();
        this.startHammer();
    },
    startFastClick: function (){
        // FastClick es una lib que reduce el tiempo de respuesta en dispmov
        FastClick.attach(document.body);
    },
    startButtonScan: function(){
        var botonScan = document.querySelector('#button-scan');
        botonScan.addEventListener('click', function(){
            console.log("scan:");
            app.startScan("scan");
        });
    },
    startButtonCert: function(){
        var botonCert = document.querySelector('#button-cert');
        botonCert.addEventListener('click', function(){
            console.log("cert:");
            app.startScan("cert");
        });
    },
    startButtonNull: function(){
        document.querySelector('#button-null').addEventListener('click', function(){
           app.returnResult("","null");
        });
    },
    startScan: function(type){
        /* Datamatrix reader */
        cordova.plugins.barcodeScanner.scan(
          function (result) {
              /*
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
                */
              app.returnResult(result.text, type);
              // type sin usar -> switch
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : false, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt : "Coloca el código en el área señalada de lectura", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "DATA_MATRIX,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: true // iOS and Android
          }
       );
    },
    /* Sobre las notas de resultados */
    model: {
        "cto":      {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "estado":"IPL","link1":"http://www.localizacion.com","link2":"http://www.norma.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "ctoExt1":  {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "ctoExt2":  {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "ctoExt3":  {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "gshdsl1":  {"name":"CAJA EXTERIOR GSHDSL", "des":"Caja Intermedia Regeneradora de enlace CAÍN-PÓNCEBOS", "estado":"PDA","link1":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "div1":     {"name":"Div 1/16 cassete", "des":"Divisor 1 a 16 tipo cassete, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A instalar en la caja: 28000001"},
        "div2":     {"name":"Div 1/16 cassete", "des":"Divisor 1 a 16 tipo cassete, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A instalar en la caja: 28000002"},
        "ctoExt1":  {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "estado":"PDA","link1":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "cable":    {"name":"bobina 512 KT fo", "des":"Bobina de cable de 512 fo tipo KT","estado":"IPL", "link1":"http://www.google.com","action":"Cierra la actuación, has terminado del ALTA."},
        "poste1":   {"name":"Poste 8D", "des":"Poste tipo D de 8 m.", "estado":"IPL", "link1":"http://www.google.com","action":"POSTE SANO: Cierra la actuación, has terminado del ALTA."},
        "poste2":   {"name":"Poste 8D (DISCO ROJO)", "des":"Poste tipo D de 8 m.", "estado":"IPL", "link1":"http://www.google.com","action":"POSTE CON DISCO ROJO: El poste tiene DISCO ROJO (Aspecto 17), NO REALICE NINGUNA ACTUACIÓN SOBRE ÉL. SUSTITÚYALO."},
        "otdr1":    {"name":"OTDR Nº XX-99999", "des":"Reflectómetro OTDR", "estado":"LABORATORIO LEÓN", "link1":"http://www.google.com","action":"EQUIPO A CALIBRAR (Fecha límite: 12/06/2019)"},
        "fusion1":  {"name":"Fusionadora Nº 9-XX-99999", "des":"Fusionadora de fibra de PEX", "estado":"MPE Madrid", "link1":"http://www.google.com","action":"En uso: Brigada 001"}
    },
    recu01: {
        "cto": {"name":"CTO EXTERIOR 16pts", "des":"Caja Terminal Exterior de fibra de 16 puertos, del fabricante: Electroson.", "link":"http://www.google.com", "action":"A continuación, haz la lectura de la acometida: 12345"},
        "cable":{"name":"cabls de", "des":"me gusta", "link":"http://www.google.com","action":"Cierra la actuación, has terminado del ALTA."}
    },
    returnResult: function(id,type){
        var div = document.getElementById("result");
        switch(type) {
          case "scan":
            // SCAN code block
                if(!this.model.hasOwnProperty(id)){
                    div.innerHTML= id + " - Código no detectado";
                }else{
                    var note = eval("this.model."+id);
                    div.innerHTML = "<div style=''><h2>"+note.name+"</h2><p>"+note.des+"</p><p><a onclick='window.open(\""+note.link+"\", \"_system\"); return false;' href='#'>Documentación<a/></p><p style='color: blue;font-size:1.4em;'>"+note.action+"</p></div>";
                }
            break;
          case "cert":
            // CERT code block
            if(!this.model.hasOwnProperty(id)){
                alert(id + " - Código no detectado");
            }else{
                var note = eval("this.model."+id);
                div.innerHTML = div.innerHTML + "<p><strong>" + note.name +"</strong></p>";
            }
            break;
          case "null":
            // CERT code block
            div.innerHTML = "";
            break;
          default:
            // code block
        }  
    }
};
    
var imageDataOrg = null;
if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded', function() {
        app.initialize();
    },false);
}