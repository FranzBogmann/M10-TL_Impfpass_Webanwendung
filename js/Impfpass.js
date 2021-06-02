window.addEventListener("load", init);
window.addEventListener("load",profilAbruf);

function init (){
    document.getElementById("impfTyp").addEventListener("click",auswahl);

    // Überprüfung der Eingabe Felder darauf ob alle gefüllt sind und der Termin gespeichert werden kann
    einfachImpfung = [];
    multiImpfung = [];

    if(localStorage.getItem("impfpass") === null){
        console.log("Impfpass wird neu erstellt")
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value);
    }

    document.getElementById("iDatum").addEventListener("keyup",impfungSpeichern);
    document.getElementById("iChargenNr").addEventListener("keyup",impfungSpeichern);
    document.getElementById("iArzt").addEventListener("keyup",impfungSpeichern);
    document.getElementById("impfstoff").addEventListener("keyup",impfungSpeichern);
    document.getElementById("schieberegler").addEventListener("click",impfungSpeichern);
    document.getElementById("iSpeichern").addEventListener("click",speicherImpfung);
    document.getElementById("bearbeiten").addEventListener("click",profilAbruf);

    holeLocalStorage();
    zeichneEinfachImpfung();
    zeichneMultiImpfung();
}

function auswahl (){
    //Je nachdem ob Einfach oder Multiimpfung gewählt wird, wird das andere ausgeblendet
    if(document.getElementById("einfachImpfung").checked){
        document.getElementById("dropdown").style.display = "block";
        document.getElementById("schieberegler").style.display = "none";
    }
    else{
        document.getElementById("schieberegler").style.display = "block";
        document.getElementById("dropdown").style.display = "none";
    }
}

function impfungSpeichern(){
    //Variable die genutzt wird um zu Überprüfen ob eine Multiimpfung ausgewählt ist
    let treffer = false;
    //Überprüfung ob es sich um eine Multiimpfung handelt
    if(document.getElementById("multiImpfung").checked){
        let zaehler = 0;
        let schiebereglerElement = document.getElementById("schieberegler");
        let schiebereglerKinder = schiebereglerElement.getElementsByTagName("input");
        // Überprüfung aller Inputfelder ob eines von ihnen ausgewählt ist. ISt dies der Fall wird treffer auf ture gesetzt
        for(let i = 0;i<schiebereglerKinder.length;i++){
            if(schiebereglerKinder[i].checked){
                zaehler ++;
                if(zaehler >= 2){
                    treffer = true;
                }   
            }
        }
    }
    //Überprüfung ob in alle Felder etwas eingefüllt wird und fals es sich um eine Multiimpfung handelt,
    //ob ein Inputfeld ausgewählt wurde. Fals true wird das Speichern erlaubt
    if(document.getElementById("iDatum").value != "" && 
    document.getElementById("iChargenNr").value != "" &&
    document.getElementById("iArzt").value != "" &&
    document.getElementById("impfstoff").value != "" &&

    (document.getElementById("einfachImpfung").checked || 
      treffer
    )

    ){
        document.getElementById("iSpeichern").disabled = false;
    }
    else{
        document.getElementById("iSpeichern").disabled = true;
    }
}

function speicherImpfung(){
    let impfDatum = new Date(document.getElementById("iDatum").value);
    let impfCharge = document.getElementById("iChargenNr").value;
    let impfstoff = document.getElementById("impfstoff").value;
    let impfArzt = document.getElementById("iArzt").value;
    if(document.getElementById("einfachImpfung").checked){
        let impfArt = document.getElementById("iArt").options[document.getElementById("iArt").selectedIndex].value;
        let eImpfung = new Object();
        console.log(impfArt);
        impfpass[impfArt].datum.push(impfDatum);
        impfpass[impfArt].charge.push(impfCharge);
        impfpass[impfArt].impfstoff.push(impfstoff);
        impfpass[impfArt].arzt.push(impfArzt);
        //letzte Impfung wird gesetzt
        if (impfpass[impfArt].datum.length > 1){
            let datumLetzteImpfung = Date.parse(impfpass[impfArt].letzteImpfung[0]);
            if(Date.parse(impfDatum) > datumLetzteImpfung){
                impfpass[impfArt].letzteImpfung[0] = impfDatum;
                impfpass[impfArt].letzteImpfung[1] = impfArzt;
            }
        }else{
            impfpass[impfArt].letzteImpfung[0] = impfDatum;
            impfpass[impfArt].letzteImpfung[1] = impfArzt;
        }
        console.log(impfpass);
        eImpfung.datum = impfDatum;
        eImpfung.art = impfArt;
        eImpfung.impfstoff = impfstoff;
        eImpfung.charge = impfCharge;
        eImpfung.arzt = impfArzt;
        einfachImpfung.push(eImpfung);
        let value = JSON.stringify(einfachImpfung)//[einfachImpfung.length-1]);
        localStorage.setItem("einfachImpfung",value);
        console.log(einfachImpfung);
        value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value); 
        zeichneEinfachImpfung();

        /*Multiimpfung*/

    }else if(document.getElementById("multiImpfung").checked){
        let mImpfung = new Object();
        mImpfung.impfung = [];

        let schiebereglerElement = document.getElementById("schieberegler");
        let schiebereglerKinder = schiebereglerElement.getElementsByTagName("input");

        //multiImpfung.push(schiebereglerKinder[i].id)
        
        for(let i = 0;i<schiebereglerKinder.length;i++){
            if(schiebereglerKinder[i].checked){
                mImpfung.impfung[mImpfung.impfung.length] = schiebereglerKinder[i].id;
            }
        }


        for(let element =0;element <mImpfung.impfung.length; element++){
            impfpass[mImpfung.impfung[element]].datum.push(impfDatum);
            impfpass[mImpfung.impfung[element]].charge.push(impfCharge);
            impfpass[mImpfung.impfung[element]].impfstoff.push(impfstoff);
            impfpass[mImpfung.impfung[element]].arzt.push(impfArzt);
            if (impfpass[mImpfung.impfung[element]].datum.length > 1){
                let datumLetzteImpfung = Date.parse(impfpass[mImpfung.impfung[element]].letzteImpfung[0]);
                if(Date.parse(impfDatum) > datumLetzteImpfung){
                    impfpass[mImpfung.impfung[element]].letzteImpfung[0] = impfDatum;
                    impfpass[mImpfung.impfung[element]].letzteImpfung[1] = impfArzt;
                }
            }else{
                impfpass[mImpfung.impfung[element]].letzteImpfung[0] = impfDatum;
                impfpass[mImpfung.impfung[element]].letzteImpfung[1] = impfArzt;
            }
        }
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value); 
        console.log(impfpass);

        
        mImpfung.datum = impfDatum;
        mImpfung.impfstoff = impfstoff;
        mImpfung.charge = impfCharge;
        mImpfung.arzt = impfArzt;
        console.log(multiImpfung);
        multiImpfung.push(mImpfung);
        console.log(multiImpfung);
        let value2 = JSON.stringify(multiImpfung)//[einfachImpfung.length-1]);
        console.log(multiImpfung);
        localStorage.setItem("multiImpfung",value2);
        zeichneMultiImpfung();
         console.log(multiImpfung);



    }else{
        console.log("Wenn wir hier gelandet sind ist irgentwas mit der Matrix kaputt")
    }
   
}

function zeichneEinfachImpfung(){

    console.log("Einfach Impfung in Termin zeichnen")
    console.log(einfachImpfung)
    let table = document.getElementById("einfachImpfungTabelle");
    table.innerHTML = "";
    if (einfachImpfung == "") {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let eImpfDatum = document.createElement("td");
        eImpfDatum.classList.add("col-12");
        tr.appendChild(eImpfDatum);
        eImpfDatum.innerHTML = "Keine Einfach-Impfungen vorhanden";
    }else{
        for (let impfung of einfachImpfung) {
            let tr = document.createElement("tr");
            tr.classList.add("d-flex");
            table.appendChild(tr);

            let eImpfDatum = document.createElement("td");
            eImpfDatum.classList.add("col-2");
            tr.appendChild(eImpfDatum);
            let datum = new Date(impfung.datum);
            eImpfDatum.innerHTML = datum.toLocaleDateString('de-DE');

            let eImpfArt = document.createElement("td");
            eImpfArt.classList.add("col-2");
            tr.appendChild(eImpfArt);
            eImpfArt.innerHTML = impfung.art;

            let eImpfImpfstoff = document.createElement("td");
            eImpfImpfstoff.classList.add("col-2");
            tr.appendChild(eImpfImpfstoff);
            eImpfImpfstoff.innerHTML = impfung.impfstoff;

            let eImpfCharge = document.createElement("td");
            eImpfCharge.classList.add("col-3");
            tr.appendChild(eImpfCharge);
            eImpfCharge.innerHTML = impfung.charge;

            let eImpfArzt= document.createElement("td");
            eImpfArzt.classList.add("col-3");
            tr.appendChild(eImpfArzt);
            eImpfArzt.innerHTML = impfung.arzt;
        } 
    }

}

function zeichneMultiImpfung(){
    let table = document.getElementById("multiImpfungTabelle");
    table.innerHTML = "";
    if (multiImpfung == "") {
        let tr = document.createElement("tr");
        tr.classList.add("d-flex");
        table.appendChild(tr);

        let mImpfDatum = document.createElement("td");
        mImpfDatum.classList.add("col-12");
        tr.appendChild(mImpfDatum);
        mImpfDatum.innerHTML = "Keine MultiImpfungen vorhanden";
    }else{

        for (let element of multiImpfung) {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            let mImpfDatum = document.createElement("td");
            tr.appendChild(mImpfDatum);
            let datum = new Date(element.datum);
            mImpfDatum.innerHTML = datum.toLocaleDateString('de-DE');

            let mImpfImpfstoff = document.createElement("td");
            tr.appendChild(mImpfImpfstoff);
            mImpfImpfstoff.innerHTML = element.impfstoff;
            
            let mImpfCharge = document.createElement("td");
            tr.appendChild(mImpfCharge);
            mImpfCharge.innerHTML = element.charge;
        if (element.impfung.includes("Tetanus")){
            appendHaken(tr);
        } else {appendKreuz(tr);}
        if(element.impfung.includes("Diphtherie")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
         if(element.impfung.includes("Keuchhusten")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("Hib")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("HepatitisB")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("Polio")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("Masern")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("Mumps")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        if(element.impfung.includes("Roeteln")){
            appendHaken(tr);
        }else {appendKreuz(tr);}
        
    
            let mImpfArzt= document.createElement("td");
            tr.appendChild(mImpfArzt);
            mImpfArzt.innerHTML = element.arzt;
        }
        } 
    }


function holeLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let storageKey = localStorage.key(i);
        if(storageKey.slice(0,8) == "impfpass")
            impfpass = JSON.parse(localStorage.getItem("impfpass"));
        /*if(storageKey.slice(0,10) == "ausstehend")
            ausstehendeImpfungen.push(JSON.parse(window.localStorage.getItem(storageKey)));*/
        if(storageKey.slice(0,14) =="einfachImpfung"){
            let einfachImpfungObjekt = new Object();
            einfachImpfungObjekt = JSON.parse(localStorage.getItem("einfachImpfung"));
            console.log(einfachImpfungObjekt);
            for(let i = 0 ; i < einfachImpfungObjekt.length; i++){
                einfachImpfung.push(einfachImpfungObjekt[i]);
            }
            console.log("Einfach Impfung")
            console.log(einfachImpfung)
        }
        if(storageKey.slice(0,12) =="multiImpfung"){
            let multiImpfungObjekt = new Object();
            multiImpfungObjekt = JSON.parse(localStorage.getItem("multiImpfung"));
            console.log(multiImpfungObjekt);
            for(let i = 0 ; i < multiImpfungObjekt.length; i++){
                multiImpfung.push(multiImpfungObjekt[i]);
            }
        }
            
    }
}

function speicherLocalStorage(){

}

function appendKreuz(tr){
    let Tabledata = document.createElement("td");
            
    let Kreuz = document.createElement("img");
    Kreuz.src = "./images/icons/Kreuz.png"
    Tabledata.appendChild(Kreuz);
    tr.appendChild(Tabledata);
            
}

function appendHaken(tr){
    let Tabledatahaken = document.createElement("td");
    let Haken = document.createElement("img");
    Haken.src = "./images/icons/Checkmark.png"
    Tabledatahaken.appendChild(Haken);
    tr.appendChild(Tabledatahaken);
}

function profilAbruf(){
    // Aufruf des Profils
    let profil = JSON.parse(window.localStorage.getItem("Profil"));
    if (profil != null) {
        document.getElementById("Iemail").textContent = profil.email;
        document.getElementById("Igeburtsdatum").textContent = new Date (profil.geburtstag).toLocaleDateString("de-De");
        document.getElementById("Iwohnsitz").textContent = profil.wohnsitz;
        document.getElementById("IanmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
    }
    //Sollte kein Profil vorhanden sein wird das Standardprofil angezeigt
    else{
        let profil = JSON.parse(window.localStorage.getItem("standartProfil"));
        document.getElementById("Iemail").textContent = profil.email;
        document.getElementById("Igeburtsdatum").textContent = profil.geburtstag;
        document.getElementById("Iwohnsitz").textContent = profil.wohnsitz;
        document.getElementById("IanmeldeName").innerHTML = profil.vorname + " " + profil.nachname;
    }

    //Aufruf des sperat gespeicherten Arzts
    let arzt = JSON.parse(window.localStorage.getItem("Arzt"));
    if (arzt != null) {
        document.getElementById("Iarzt").textContent = arzt.hausarzt;
        document.getElementById("Iarztnummer").textContent = arzt.hausarztTelefonnummer;
    }
    else{
        let arzt = JSON.parse(window.localStorage.getItem("standartArzt"));
        document.getElementById("Iarzt").textContent = arzt.hausarzt;
        document.getElementById("Iarztnummer").textContent = arzt.hausarztTelefonnummer;
    }

    //Aufruf des Profils
    let bild = JSON.parse(window.localStorage.getItem("Bild"));
    if(bild != null){

        document.getElementById("IprofilBild").setAttribute("src", bild.src);
    }   
}