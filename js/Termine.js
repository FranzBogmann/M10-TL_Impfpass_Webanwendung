window.addEventListener("load", init);


function init() {
    console.log("init Funktion betreten")
    termine = [];
    ausstehendeImpfungen =[];
    arzt = new Object();

    document.getElementById("bearbeiten").addEventListener("click", function(){
        arzt = JSON.parse(localStorage.getItem("Arzt"));
    });

    zeichneLetzteImpfungen();
    //* Falls im LocalStorage schon Termine vorhanden sind, werden diese hier eingelesen
    if (window.localStorage !== null) {
        holeLocalStorage();
    }

    zeichneTermine();
    console.log("init Funktion verlassen")
}

//*Zeichnen der Letzte Impfungen Tabelle. Dazu werden die Daten aus dem Impfpass-JSON-Objekt ausgelesen und 
//*dynamisch in eine Tabelle eingefügt:
function zeichneLetzteImpfungen() {
    console.log("Die letzten Impfungen werden gezeichnet");
    let table = document.getElementById("letzteImpfungenDaten");
    table.innerHTML = "";

    impfpassDaten = JSON.parse(localStorage.getItem("impfpass"));

    if (localStorage.getItem("impfpass") == JSON.stringify(impfpass) || impfpassDaten === null) {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let tabellenEintrag = document.createElement("td");
        tabellenEintrag.classList.add("col-12");
        tr.appendChild(tabellenEintrag );
        tabellenEintrag.innerHTML = "Keine letzten Impfungen vorhanden. Bitte diese im <a href='Impfpass.php'>Impfpass</a> anlegen!";
    } else{
        for (let key of Object.keys(impfpassDaten)) {
            if(impfpassDaten[key].datum.length != 0) {
                let tr = document.createElement("tr");
                tr.classList.add("d-flex");
                table.appendChild(tr);

                let impfungArt = document.createElement("td");
                impfungArt.classList.add("col-4");
                impfungArt.classList.add("fs-5");
                tr.appendChild(impfungArt);
                impfungArt.innerHTML = key;
                //TODO Hier das letzte Datum herausnehmen und den Index dieser Stelle Speichern!
                let letzteImpfung = document.createElement("td");
                letzteImpfung.classList.add("col-4");
                tr.appendChild(letzteImpfung);
                let impfungDatumString = new Date(impfpassDaten[key].letzteImpfung[0])
                letzteImpfung.innerHTML = impfungDatumString.toLocaleDateString('de-DE');

                let impfungArzt = document.createElement("td");
                impfungArzt.classList.add("col-4");
                tr.appendChild(impfungArzt);
                impfungArzt.innerHTML = impfpassDaten[key].letzteImpfung[1];
            }
        }
        //* anschließend werden aus den schon erhaltenen und nicht erhaltenen Impfungen die Ausstehende Impfungen-Tabelle befüllt.
        abgeschlossenAuslesen();
    } 
}

//* Hier werden die Ausstehenden Impfungen anhand ihres Impf-Intervalls berechnet.
//* Dazu wird zunächst überprüft, ob ein Termin für diese Impfung schon vorhanden ist, dann ist diese nicht mehr ausstehend.
//* Ist kein Termin vorhanden, wir überprüft, ob schon mal eine Impfung dieser Art vorhanden ist.
//* Ist dies der Fall, wurde die Eigenschaft "letzte Impfung" im Objekt befüllt.
//* Wenn schon einmal geimpft wurde, so wird anhand des Intervalls berechnet, wann die nächste Auffrischungsimpfung notwendig ist.
function abgeschlossenAuslesen(){
    console.log("Ausstehende Impfungen werden ausgelesen")
    for(let key of Object.keys(impfpassDaten)){
        if(impfpassDaten[key].termin == ""){
            let heuteDatum = new Date();
            heuteDatum.toLocaleDateString("de-De");
            if(impfpassDaten[key].letzteImpfung[0] === null){
                var ausstehend = new Object();
                ausstehend.datum = "Noch nie geimpft!"
                ausstehend.art = key;
                ausstehend.naechsteImpfung = heuteDatum;
                ausstehendeImpfungen.push(ausstehend);
            }else{
                var ausstehend = new Object(); 
                let datumletzteImpfung = new Date(impfpassDaten[key].letzteImpfung[0]);
                datumletzteImpfung = datumletzteImpfung.toLocaleDateString("de-De");
                let teileImpfdatum = parseDate(datumletzteImpfung);
                if(impfpassDaten[key].intervall != 0){
                    let datumnaechsteImpfung = new Date(parseInt(teileImpfdatum[2])+impfpassDaten[key].intervall, teileImpfdatum[1]-1, teileImpfdatum[0])
                    datumnaechsteImpfung = new Date(datumnaechsteImpfung);
                    if((Date.parse(heuteDatum) -Date.parse(datumnaechsteImpfung))>=0){
                        ausstehend.datum = new Date(impfpassDaten[key].letzteImpfung[0]).toLocaleDateString("de-De");
                        ausstehend.naechsteImpfung = datumnaechsteImpfung;
                        ausstehend.art = key;
                        ausstehendeImpfungen.push(ausstehend);
                    }
                }
            }      
        }
    }
    zeichneAusstehend();
}

//* Hier werden die in der vorigen Funktion indentifizierten, noch ausstehenden Impfungen aus dem Array ausgelesen und dynamisch in eine Tabelle gezeichnet.
function zeichneAusstehend(){
    console.log("Ausstehende Impfungen werden gezeichnet")
    let table = document.getElementById("ausstehendDaten");
    table.innerHTML = "";

    if (ausstehendeImpfungen.length == 0) {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let ausstehendDatum = document.createElement("td");
        ausstehendDatum.classList.add("col-12");
        tr.appendChild(ausstehendDatum);
        ausstehendDatum.innerHTML = "Keine ausstehenden Impfungen!";
    }else{

        for (let ausstehend of ausstehendeImpfungen) {
            let tr = document.createElement("tr");
            tr.classList.add("d-flex");
            tr.setAttribute("name","ausstehendeEintraege")
            table.appendChild(tr);

            let ausstehendDatum = document.createElement("td");
            ausstehendDatum.classList.add("col-3");
            ausstehendDatum.classList.add("fw-bold")
            tr.appendChild(ausstehendDatum);
            let datum = new Date(ausstehend.naechsteImpfung).toLocaleDateString("de-De")
            ausstehendDatum.innerHTML = datum;

            let ausstehendArt = document.createElement("td");
            ausstehendArt.classList.add("col-3");
            ausstehendArt.classList.add("fs-5");
            tr.appendChild(ausstehendArt);
            ausstehendArt.innerHTML = ausstehend.art;

            ausstehendDatum = document.createElement("td");
            ausstehendDatum.classList.add("col-3");
            tr.appendChild(ausstehendDatum);
            ausstehendDatum.innerHTML = ausstehend.datum;

            let ausstehendBuchung = document.createElement("td");
            ausstehendBuchung.classList.add("col-3");
            tr.appendChild(ausstehendBuchung);
            let buchenButton = document.createElement("button");
            buchenButton.setAttribute("type","button")
            buchenButton.classList.add("btn");
            buchenButton.classList.add("btn-outline-warning");
            buchenButton.setAttribute("data-bs-toggle","modal");
            buchenButton.setAttribute("data-bs-target","#Termin")
            buchenButton.addEventListener("click",function(event){terminBuchen(event)});
            ausstehendBuchung.appendChild(buchenButton);
            buchenButton.innerHTML = "Termin buchen"
        }
    }    
}

//* Hier werden die im LocalStorage abgespeicherten Termine ausgelesen und einem Array hinzugefügt.
function holeLocalStorage() {
    console.log("Termine neu geholt")
    for (let i = 0; i < localStorage.length; i++) {
        let storageKey = localStorage.key(i);
        if(storageKey.slice(0,6) == "termin")
            termine.push(JSON.parse(window.localStorage.getItem(storageKey)));
    }
}

//* An dieser Stelle werden die Termin-Objekte aus dem Array einzeln ausgelesen und in die Termine-Tabelle gezeichnet. 
function zeichneTermine() {
    console.log("Die zeichneTermine()-Funktion wird aufgerufen!");

    let table = document.getElementById("terminDaten");
    table.innerHTML ="";

    if (termine == "") {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let terminDatum = document.createElement("td");
        terminDatum.classList.add("col-12");
        tr.appendChild(terminDatum);
        terminDatum.innerHTML = "Keine Termine!";
    }else{

        for (let termin of termine) {
            let tr = document.createElement("tr");
            tr.classList.add("d-flex");
            table.appendChild(tr);

            let terminDatum = document.createElement("td");
            terminDatum.classList.add("col-3");
            tr.appendChild(terminDatum);
            let div = document.createElement("div")
            let terminDatumString = new Date(termin.datum)
            div.classList.add("fw-bold");
            div.textContent = terminDatumString.toLocaleDateString('de-DE');
            terminDatum.appendChild(div);
            div = document.createElement("div");
            div.classList.add("text-muted");
            div.textContent = terminDatumString.toLocaleTimeString('de-DE').slice(0,5);
            terminDatum.appendChild(div);

            let terminArt = document.createElement("td");
            terminArt.classList.add("col-3");
            terminArt.classList.add("fs-5");
            tr.appendChild(terminArt);
            terminArt.innerHTML = termin.art;

            let terminAusstehend = document.createElement("td");
            terminAusstehend.classList.add("col-3");
            tr.appendChild(terminAusstehend);
            terminAusstehend.innerHTML = termin.ausstehend;

            let terminArzt = document.createElement("td");
            terminArzt.classList.add("col-3");
            tr.appendChild(terminArzt);
            terminArzt.innerHTML = termin.arzt;
        }
    }
}


function speichereTermine() {
    console.log("Termine werden in LocalStorage gespeichert")
    let zaehlerTermine = 0;
    for(let termin of termine){
        let key = "termin" + zaehlerTermine;
        let value = JSON.stringify(termine[zaehlerTermine]);
        window.localStorage.setItem(key, value);
        zaehlerTermine = zaehlerTermine + 1;    
    }
}




//* Diese Funktion wird aufgerufen, sobald der/der Nutzer:Inn auf den dynamisch erzeugten "Termin buchen"-Button
//* in der "Ausstehende Impfungen"-Tabelle klickt
function terminBuchen(event){
    //Eventlistener für Validitätsprüfung
    document.getElementById("terminDatum").addEventListener("keyup",valid);
    document.getElementById("terminArzt").addEventListener("keyup",valid);

    document.getElementById("terminAnlegen").disabled = true;

    document.getElementById("terminDatum").value = "";
    //Arztdaten für Kontaktaufnahme
    if (Object.keys(arzt) == ""){
        let arztName = document.getElementById("terminArzt");
        arztName.setAttribute("placeholder","Dr. Drosten")    
    }else{
        let arztName = document.getElementById("terminArzt");
        arztName.value = arzt.hausarzt;

        let telefon = document.getElementById("kontaktArzt");
        telefon.innerHTML = "";
        let li = document.createElement("li");
        li.classList.add("list-inline-item");
        telefon.appendChild(li);
        li.innerHTML = "Telefonnummer des Arzts/der Ärztin: ";
        li = document.createElement("li");
        telefon.appendChild(li);
        li.classList.add("list-inline-item");
        let strong = document.createElement("strong");
        li.appendChild(strong);
        strong.innerHTML = arzt.hausarztTelefonnummer;     
    }
    ausstehendIndex = event.target.parentElement.parentElement.rowIndex -1;

    ausstehende = ausstehendeImpfungen[ausstehendIndex];
    let artImpfung = document.getElementById("terminArt");
    artImpfung.innerHTML ="";
    let option = document.createElement("option");
    option.value= ausstehende.art;
    artImpfung.appendChild(option);
    option.innerHTML = ausstehende.art;
    artImpfung.disabled = true;
    //TODO HIER WEITER MACHEN MIT löschen der Reihe, des Array-Elements und des localStorage-Eintrags + Abspeichern als neuer Termin
    document.getElementById("terminAnlegen").addEventListener("click",terminAusAusstehend);


}

//* Hier wird validiert, dass alle Felder im "Termin buchen"-Dialog ausgefüllt und das Datum in der Zukunft gesetzt wurde, bevor der "Termin anlegen"-Button gedrückt werden kann.
function valid(){
    
    if((document.getElementById("terminDatum").value != "") && (document.getElementById("terminArzt").value != "") && (Date.parse(document.getElementById("terminDatum").value) > Date.now())){
        document.getElementById("terminAnlegen").disabled = false;
    }
    else{
        document.getElementById("terminAnlegen").disabled = true;
    }
}

//* Wurde ein neuer Termin mittels des "Termin buchen"-Dialogs angelegt, so wird ein neues Termin-Objekt dem Termine-Array hinzugefügt.
//* Zusätzlich muss sichergestellt werden, dass diese Impfung nicht mehr ausstehend ist, da ein Termin angelegt wurde.

function terminAusAusstehend(){
    console.log("Impftermin eingetragen und ausstehende Impfung gelöscht")
    ausstehendeImpfungen.splice(ausstehendIndex,1);

    let termin = {
        datum : document.getElementById("terminDatum").value,
        art : document.getElementById("terminArt").options[document.getElementById("terminArt").selectedIndex].value,
        ausstehend : new Date(ausstehende.naechsteImpfung).toLocaleDateString("de-De"),
        arzt : document.getElementById("terminArzt").value
    };
    impfpassDaten[document.getElementById("terminArt").options[document.getElementById("terminArt").selectedIndex].value].termin = new Date(termin.datum);
    let value = JSON.stringify(impfpassDaten); 
    localStorage.setItem("impfpass",value)
    termine.push(termin);

    loescheLocalStorage();
}

//* In dieser Funktion werden alle Termin-Objekte aus dem LocalStorage gelöscht und anschließend neu abgespeichert und gezeichnet.
function loescheLocalStorage() {
    console.log("Termine werden aus dem LocalStorage gelöscht und anschließend neu gezeichnet und gespeichert")
    for (let i = 0; i < localStorage.length; i) {
        let storageKey = localStorage.key(i);
        if(storageKey.slice(0,6) == "termin"){
            window.localStorage.removeItem(storageKey);
        }else{
            i++;
            }

    }
    zeichneAusstehend();
    speichereTermine();
    zeichneTermine();
    document.getElementById("terminAnlegen").removeEventListener("click",terminAusAusstehend);
}


//* Diese Funktion gibt die Teile eines Datums zurück, separiert anhand des "."
//Quelle: https://stackoverflow.com/questions/2945113/how-to-create-a-new-date-in-javascript-from-a-non-standard-date-format/2945150
function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return parts;
  }