window.addEventListener("load", init);

//var heute = new Date()
//var unterschiedZeit = heute.getTimezoneOffset() / 60 *-1 

function init() {
    //speicherButton()
    termine = [];
    if (window.localStorage !== null) {
        holeTermine();
    }
    //Hier wird immer leer gesetzt, bei Abspeicherung im Browser muss hier auf Gespeichertes zurückgegriffen werden
    document.getElementById("terminAnlegen").addEventListener("keypress", function (e) { if (e.key.toLowerCase() == "enter") speicherButton(); });
    document.getElementById("terminAnlegen").addEventListener("click", speicherButton);
    zeichneTermine();
    //setzeAktuelleZeit()
}


function speicherButton() {
    var termin = new Object();

    termin.datum = document.getElementById("terminDatum").value; console.log(document.getElementById("terminDatum").value);
    termin.art = document.getElementById("terminArt").value; console.log(document.getElementById("terminArt").value);
    termin.arzt = document.getElementById("terminArzt").value; console.log(document.getElementById("terminArzt").value);

    termine.push(termin); console.log(termine[0].arzt);

    zeichneTermine();

    speichereTermine();
}

function zeichneTermine() {
    loescheTabelle();

    let table = document.getElementById("terminDaten");
    if (termine == "") {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let terminDatum = document.createElement("td");
        terminDatum.classList.add("col-12");
        tr.appendChild(terminDatum);
        terminDatum.innerHTML = "Keine Termine";
    }

    for (let termin of termine) {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let terminDatum = document.createElement("td");
        terminDatum.classList.add("col-3");
        tr.appendChild(terminDatum);
        let terminDatumString = new Date(termin.datum)
        terminDatum.innerHTML = terminDatumString.toLocaleDateString('de-DE');

        let terminArt = document.createElement("td");
        terminArt.classList.add("col-3");
        tr.appendChild(terminArt);
        terminArt.innerHTML = termin.art;

        let terminAusstehend = document.createElement("td");
        terminAusstehend.classList.add("col-3");
        tr.appendChild(terminAusstehend);
        terminAusstehend.innerHTML = "---";

        let terminArzt = document.createElement("td");
        terminArzt.classList.add("col-3");
        tr.appendChild(terminArzt);
        terminArzt.innerHTML = termin.arzt;
    }
}

function loescheTabelle() {
    let table = document.getElementById("terminDaten");
    table.innerHTML = "";
}

function holeTermine() {
    for (let i = 0; i < localStorage.length; i++) {
        let storageKey = localStorage.key(i);
        if(storageKey.slice(0,6) == "termin")
            termine.push(JSON.parse(window.localStorage.getItem(storageKey)));
    }
}

function speichereTermine() {
    let key = "termin" + (termine.length);
    let value = JSON.stringify(termine[termine.length - 1]);
    console.log(key + " :" + value);
    window.localStorage.setItem(key, value);
}
/*
function setzeAktuelleZeit(){

    document.getElementById("terminDatum").value = heute.toISOString().substring(0,10)
    console.log(document.getElementById("terminDatum").value = heute.toISOString().substring(0,10))
    console.log(unterschiedZeit)
} */