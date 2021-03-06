window.addEventListener("load", init);


function init() {
    //Änderung des Bearbeitungsmodus von gucken zu bearbeiten bei click auf bearbeiten Button
    document.getElementById("bearbeiten").addEventListener("click", bearbeitungsmodus);
    //Variable die den Status bearbeitungsstatus des Modals wiederspiegelt
    let modus = 0;
    //Überprüfen ob schon ein Standartprofil vorhanden ist fals nicht wird ein Standartprofil angelegt mit dem ersteinmal gearbeitet werden kann
    if (typeof standartProfil === "undefined")
        erstelleStandartProfil();
    if (typeof standartArzt === "undefined")
        erstelleStandartArzt();
    //Das Profil speichert bei click auf den Speicher button
    document.getElementById("bearbeiten").addEventListener("click", profilSpeichern);
    document.getElementById("bearbeiten").addEventListener("click", arztSpeichern);
    //Das Profil wird im Modal aufgerufen
    document.getElementById("triggerModal").addEventListener("click", profilaufruf);
    //Das Bild wird bei clicken des Change Foto Button geändert
    document.getElementById("changePhoto").addEventListener("click", function () { document.getElementById("default-file").click() });
    //Das Profilbild wird eingeblendet
    profilBildÄnderung();
    //Das Icon im Header wird eingeblendet
    profilIconÄndern();

    //Hier wird der Export gestartet
    document.getElementById("exportJson").addEventListener("click",function(){
        if(localStorage.getItem("impfpass") != null){
            let dataStr = localStorage.getItem("impfpass");
            let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
            let exportFileDefaultName = 'impfpass.json';
    
            let linkElement = document.getElementById("exportJson");
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
        }
        
    })
}

function profilIconÄndern (){
    let bild = JSON.parse(window.localStorage.getItem("Bild"));
    if(bild != null)
        document.getElementById("profilIcon").setAttribute("src", bild.src);
}

function profilBildÄnderung() {
    let bild = new Object();
    const defaultFile = document.getElementById("default-file");
    const profilBild = document.getElementById("profilBild");
    const previewText = document.getElementById("previewText");

    defaultFile.addEventListener("change", function () {

        // Image Preview
        const files = defaultFile.files[0]; //files[0] - For getting first file
        //   console.log(files);

        if (files) {
            // Showing Image and Hiding "Image Preview" Text
            profilBild.style.display = "block";
            previewText.style.display = "none";

            //Read File
            const fileReader = new FileReader();

            fileReader.addEventListener("load", function () {
                // convert image to base64 encoded string
                profilBild.setAttribute("src", this.result);

                bild.src = profilBild.getAttribute("src");

                let key = "Bild";
                let value = JSON.stringify(bild);

                window.localStorage.setItem(key, value);
                profilIconÄndern();
            });
            fileReader.readAsDataURL(files);
        }
    });

}


function profilaufruf() {
    // Aufruf des Profils
    let profil = JSON.parse(window.localStorage.getItem("Profil"));
    if (profil != null) {
        document.getElementById("vorname").value = profil.vorname;
        document.getElementById("nachname").value = profil.nachname;
        document.getElementById("email").value = profil.email;
        document.getElementById("geburtsdatum").value = profil.geburtstag;
        document.getElementById("wohnsitz").value = profil.wohnsitz;
        document.getElementById("anmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
    }

    //Aufruf des sperat gespeicherten Arzts
    let arzt = JSON.parse(window.localStorage.getItem("Arzt"));
    if (arzt != null) {
        document.getElementById("hausarzt").value = arzt.hausarzt;
        document.getElementById("hausarztTelefonnummer").value = arzt.hausarztTelefonnummer;
    }

    //Aufruf des Profils
    let bild = JSON.parse(window.localStorage.getItem("Bild"));
    if(bild != null){
        profilBild.style.display = "block";
        previewText.style.display = "none";
        document.getElementById("profilBild").setAttribute("src", bild.src);
    }   
}

function bearbeitungsmodus() {
    let inputs = document.getElementById("Profilepage").getElementsByTagName("input");
    
    //Änderung der Inputfelder von Disabled zu Abled(?) damit diese bearbeitet werden können
    for (let inputfelder of inputs) {
        if (inputfelder.disabled == false) {
            inputfelder.disabled = true;
            modus = 1;
        }
        else {
            inputfelder.disabled = false;
            modus = 0;
        }
    }
    //Der Button ändert sein Text je nachdem in welchem Modus er ist
    let buttonname = document.getElementById("bearbeiten");
    if (buttonname.innerHTML == "Bearbeiten") {
        buttonname.innerHTML = "Speichern";
        
    }
    else {
        buttonname.innerHTML = "Bearbeiten";
        
    }
}



function profilSpeichern() {
    //Neues Object in welches das Profil gespeichert wird
    let profil = new Object();

    //Abfrage ob ein Wert exestiert und folglich dessen Speicherung im Object Profil
    if (document.getElementById("vorname").value != null)
        profil.vorname = document.getElementById("vorname").value;
    if (document.getElementById("nachname").value != null)
        profil.nachname = document.getElementById("nachname").value;
    if (document.getElementById("email").value != null)
        profil.email = document.getElementById("email").value;
    if (document.getElementById("geburtsdatum").value != null)
        profil.geburtstag = document.getElementById("geburtsdatum").value;
    if (document.getElementById("wohnsitz").value != null)
        profil.wohnsitz = document.getElementById("wohnsitz").value;

    //Überprüft ob die Email richitg eingegben ist sollte dies nicht der Fall sein wird der Bearbeitungsmodus einfach erneut eingeschaltet    
    if(modus == 1){  
        if(!validateEmail)
            bearbeitungsmodus();
    } 



    // Schreiben des Profils in ein JSON Object    
    let key = "Profil";
    let value = JSON.stringify(profil);

    window.localStorage.setItem(key, value);

    //Änderung des Names der oben im Profil angezeigt wird
    document.getElementById("anmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
}

function arztSpeichern() {
    //Selber Vorgang wie bei profilSpeichern
    let arzt = new Object();
    if (document.getElementById("hausarzt").value != null)
        arzt.hausarzt = document.getElementById("hausarzt").value;
    if (document.getElementById("hausarztTelefonnummer").value != null)
        arzt.hausarztTelefonnummer = document.getElementById("hausarztTelefonnummer").value;

    //Überprüft ob die Telefonnumer richitg eingegben ist sollte dies nicht der Fall sein wird der Bearbeitungsmodus einfach erneut eingeschaltet    
    if(modus == 1){  
        if(!validateNummer())
            bearbeitungsmodus();
    } 

    let key = "Arzt";
    let value = JSON.stringify(arzt);

    window.localStorage.setItem(key, value);
}

function erstelleStandartProfil() {
    //erstellen eines Standartprofils damit immer ein Objekt Profil vorhanden ist
    let standartProfil = new Object();
    standartProfil.vorname = "Max";
    standartProfil.nachname = "Mustermann";
    standartProfil.email = "user@example.com";
    standartProfil.geburtsdatum = "1.1.1970";
    standartProfil.wohnsitz = "Musterstraße 32";

    //Speicherung des Objekts in die Passende JSON
    let key = "standartProfil";
    let value = JSON.stringify(standartProfil);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);


    document.getElementById("anmeldeName").innerHTML = standartProfil.vorname + " " + standartProfil.nachname;
}

function erstelleStandartArzt() {
    //Erstellen eines Objektes Standartarzt damit immer ein Objekt Arzt vorhanden ist
    let standartArzt = new Object();
    standartArzt.hausarzt = "Dr. Musterartzt";
    standartArzt.hausarztTelefonnummer = "11880 123456789";

    //Speicherung des Objekts in die Passende JSON
    let key = "standartArzt";
    let value = JSON.stringify(standartArzt);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);
}

function validateEmail() {
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("email").value))
  {
    return (true)
  }
    alert("Bitte eine valide Email eingeben")
    return (false)
}

function validateNummer(nummer)
{
   var regEx = /^[0-9\s(-)]*$/;
   if(document.getElementById("hausarztTelefonnummer").value.match(regEx))
     {
      return true;
     }
   else
     {
     alert("Bitte eine valide Telefonnumer eingeben");
     return false;
     }
}    