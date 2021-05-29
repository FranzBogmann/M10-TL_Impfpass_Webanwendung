window.addEventListener("load", init);

function init (){
    document.getElementById("impfTyp").addEventListener("click",auswahl);

    // Überprüfung der Eingabe Felder darauf ob alle gefüllt sind und der Termin gespeichert werden kann

    document.getElementById("iDatum").addEventListener("change",impfungSpeichern);
    document.getElementById("iChargenNr").addEventListener("change",impfungSpeichern);
    document.getElementById("iArzt").addEventListener("change",impfungSpeichern);
    document.getElementById("impfstoff").addEventListener("change",impfungSpeichern);
    document.getElementById("schieberegler").addEventListener("click",impfungSpeichern);
    document.getElementById("iSpeichern").addEventListener("click",speicherImpfung);

    zeichneEinfachImpfung();
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
        console.log(impfArt);
        impfpass[impfArt].datum.push(impfDatum);
        impfpass[impfArt].charge.push(impfCharge);
        impfpass[impfArt].impfstoff.push(impfstoff);
        impfpass[impfArt].arzt.push(impfArzt);
        console.log(impfpass);
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value); 
        zeichneEinfachImpfung();
    }else if(document.getElementById("multiImpfung").checked){
        for(let element of multiImpfung){
            impfpass[element].datum.push(impfDatum);
            impfpass[element].charge.push(impfCharge);
            impfpass[element].impfstoff.push(impfstoff);
            impfpass[element].arzt.push(impfArzt);    
        }
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value); 
        console.log(impfpass);
        zeichneMultiImpfung();
    }else{
        console.log("Fehler")
    }
   
}

function zeichneEinfachImpfung(){
    if(localStorage.getItem("impfpass") !== null){
        console.log("Impfpass im Speicher vorhanden!")
        impfpass = JSON.parse(localStorage.getItem("impfpass"));    
    }else if(localStorage.getItem("impfpass") === null){
        console.log("Impfpass wird neu erstellt")
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value);
    }else{
        console.log("Irgendein Fehler für den wir nichts können.")
    }
    let testDatum = new Date();
    testDatum = testDatum.now();
    console.log(testDatum);
    

}

function zeichneMultiImpfung(){
    if(localStorage.getItem("impfpass") !== null){
        console.log("Impfpass im Speicher vorhanden!")
        impfpass = JSON.parse(localStorage.getItem("impfpass"));    
    }else if(localStorage.getItem("impfpass") === null){
        console.log("Impfpass wird neu erstellt")
        let value = JSON.stringify(impfpass);
        localStorage.setItem("impfpass",value);
    }else{
        console.log("Irgendein Fehler für den wir nichts können.")
    }
}