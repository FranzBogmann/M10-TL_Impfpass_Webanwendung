window.addEventListener("load", init);

function init() {
    document.getElementById("bearbeiten").addEventListener("click", bearbeitungsmodus);
    if (typeof standartProfil === "undefined")
        erstelleStandartProfil();
    if (typeof standartArzt === "undefined")
        erstelleStandartArzt();
    document.getElementById("bearbeiten").addEventListener("click", profilSpeichern);
    document.getElementById("bearbeiten").addEventListener("click", arztSpeichern);
    document.getElementById("triggerModal").addEventListener("click", profilaufruf)
    document.getElementById("changePhoto").addEventListener("click", function () { document.getElementById("default-file").click() })
    test();
}

function test() {
    let bild = new Object();
    const defaultFile = document.getElementById("default-file");
    const profilBild = document.getElementById("profilBild");
    const previewText = document.getElementById("previewText");

    profilBild.style.display = "none";

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
            });
            fileReader.readAsDataURL(files);

        }
        bild.src = profilBild.getAttribute("src");

        let key = "Bild";
        let value = JSON.stringify(bild);

        console.log(key + " :" + value);
        window.localStorage.setItem(key, value);
    });
}

function bearbeitungsmodus() {
    let inputs = document.getElementById("Profilepage").getElementsByTagName("input");
    for (let inputfelder of inputs) {
        if (inputfelder.disabled == false) {
            inputfelder.disabled = true;
        }
        else {
            inputfelder.disabled = false;
        }
    }
    let buttonname = document.getElementById("bearbeiten");
    if (buttonname.innerHTML == "Bearbeiten") {
        buttonname.innerHTML = "Speichern";
    }
    else {
        buttonname.innerHTML = "Bearbeiten";
    }
}

function profilaufruf() {
    let profil = JSON.parse(window.localStorage.getItem("Profil"));
    if (profil != null) {
        document.getElementById("vorname").value = profil.vorname;
        document.getElementById("nachname").value = profil.nachname;
        document.getElementById("email").value = profil.email;
        document.getElementById("geburtsdatum").value = profil.geburtstag;
        document.getElementById("wohnsitz").value = profil.wohnsitz;
        document.getElementById("anmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
    }

    let arzt = JSON.parse(window.localStorage.getItem("Arzt"));
    if (arzt != null) {
        document.getElementById("hausarzt").value = arzt.hausarzt;
        document.getElementById("hausarztTelefonnummer").value = arzt.hausarztTelefonnummer;
    }

    let bild = JSON.parse(window.localStorage.getItem("Bild"));
    if(bild != null){
        document.getElementById("profilBild").setAttribute("src", bild)
    }   
}

function profilSpeichern() {
    let profil = new Object();
    if (document.getElementById("vorname").value != null)
        profil.vorname = document.getElementById("vorname").value; console.log(document.getElementById("vorname").value);
    if (document.getElementById("nachname").value != null)
        profil.nachname = document.getElementById("nachname").value; console.log(document.getElementById("nachname").value);
    if (document.getElementById("email").value != null)
        profil.email = document.getElementById("email").value; console.log(document.getElementById("email").value);
    if (document.getElementById("geburtsdatum").value != null)
        profil.geburtstag = document.getElementById("geburtsdatum").value; console.log(document.getElementById("geburtsdatum").value);
    if (document.getElementById("wohnsitz").value != null)
        profil.wohnsitz = document.getElementById("wohnsitz").value; console.log(document.getElementById("wohnsitz").value);

    let key = "Profil";
    let value = JSON.stringify(profil);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);


    document.getElementById("anmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
}

function arztSpeichern() {
    let arzt = new Object();
    if (document.getElementById("hausarzt").value != null)
        arzt.hausarzt = document.getElementById("hausarzt").value; console.log(document.getElementById("hausarzt").value);
    if (document.getElementById("hausarztTelefonnummer").value != null)
        arzt.hausarztTelefonnummer = document.getElementById("hausarztTelefonnummer").value; console.log(document.getElementById("hausarztTelefonnummer").value);

    let key = "Arzt";
    let value = JSON.stringify(arzt);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);
}

function erstelleStandartProfil() {
    let standartProfil = new Object();
    standartProfil.vorname = "Max";
    standartProfil.nachname = "Mustermann";
    standartProfil.email = "user@example.com";
    standartProfil.geburtsdatum = "1.1.1970";
    standartProfil.wohnsitz = "Musterstraße 32";

    let key = "standartProfil";
    let value = JSON.stringify(standartProfil);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);


    document.getElementById("anmeldeName").innerHTML = standartProfil.vorname + " " + standartProfil.nachname;
}

function erstelleStandartArzt() {
    let standartArzt = new Object();
    standartArzt.hausarzt = "Dr. Musterartzt";
    standartArzt.hausarztTelefonnummer = "11880 123456789";

    let key = "standartArzt";
    let value = JSON.stringify(standartArzt);

    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);
}