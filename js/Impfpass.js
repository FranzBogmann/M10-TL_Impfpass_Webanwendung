window.addEventListener("load", init);

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

    document.getElementById("iDatum").addEventListener("change",impfungSpeichern);
    document.getElementById("iChargenNr").addEventListener("change",impfungSpeichern);
    document.getElementById("iArzt").addEventListener("change",impfungSpeichern);
    document.getElementById("impfstoff").addEventListener("change",impfungSpeichern);
    document.getElementById("schieberegler").addEventListener("click",impfungSpeichern);
    document.getElementById("iSpeichern").addEventListener("click",speicherImpfung);
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
    multiImpfung = [];
    //Überprüfung ob es sich um eine Multiimpfung handelt
    if(document.getElementById("multiImpfung").checked){
        
        let schiebereglerElement = document.getElementById("schieberegler");
        let schiebereglerKinder = schiebereglerElement.getElementsByTagName("input");
        // Überprüfung aller Inputfelder ob eines von ihnen ausgewählt ist. ISt dies der Fall wird treffer auf ture gesetzt
        for(let i = 0;i<schiebereglerKinder.length;i++){
            if(schiebereglerKinder[i].checked){
                treffer = true;
                multiImpfung.push(schiebereglerKinder[i].id)
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
        console.log(multiImpfung)
        for(let element of multiImpfung){
            impfpass[element].datum.push(impfDatum);
            impfpass[element].charge.push(impfCharge);
            impfpass[element].impfstoff.push(impfstoff);
            impfpass[element].arzt.push(impfArzt);    
        }
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value); 
        console.log(impfpass);

        let mImpfung = new Object();
        mImpfung.datum = impfDatum;
        mImpfung.impfstoff = impfstoff;
        mImpfung.charge = impfCharge;
        mImpfung.arzt = impfArzt;
        multiImpfung.push(mImpfung);

        value = JSON.stringify(multiImpfung)//[einfachImpfung.length-1]);
        localStorage.setItem("multiImpfung",value);
        zeichneMultiImpfung();



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
        for (let impfung of multiImpfung) {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            let mImpfDatum = document.createElement("td");
            tr.appendChild(mImpfDatum);
            let datum = new Date(impfung.datum);
            mImpfDatum.innerHTML = datum.toLocaleDateString('de-DE');

            let mImpfImpfstoff = document.createElement("td");
            tr.appendChild(mImpfImpfstoff);
            mImpfImpfstoff.innerHTML = impfung.impfstoff;
            
            let mImpfCharge = document.createElement("td");
            tr.appendChild(mImpfCharge);
            mImpfCharge.innerHTML = impfung.charge;

            let mImpfTetanus = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = "abc";

            let mImpfDiphtherie = document.createDocumentFragment("td");
            tr.appendChild(mImpfDiphtherie);
            mImpfDiphtherie.innerHTML = impfung.diphtherie;

            let mImpfPertussis = document.createDocumentFragment("td");
            tr.appendChild(mImpfPertussis);
            mImpfPertussis.innerHTML = impfung.pertussis;

            let mImpfHib = document.createDocumentFragment("td");
            tr.appendChild(mImpfHib);
            mImpfHib.innerHTML = impfung.hib;
            console.log("hier")
            let mImpfHepatitis = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = impfung.hepatitis;

            let mImpfPoliomyelitis = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = impfung.poliomyelitis;

            let mImpfTMasern = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = impfung.masern;

            let mImpfMumps = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = impfung.mumps;

            let mImpfRöteln = document.createDocumentFragment("td");
            tr.appendChild(mImpfTetanus);
            mImpfTetanus.innerHTML = impfung.röteln;

            let mImpfArzt= document.createElement("td");
            tr.appendChild(mImpfArzt);
            mImpfArzt.innerHTML = impfung.arzt;
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