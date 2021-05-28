window.addEventListener("load", init);

function init (){
    document.getElementById("impfTyp").addEventListener("click",auswahl);

    // Überprüfung der EIngabe Felder darauf ob alle gefüllt sind und der Termin gespeichert werden kann
    document.getElementById("iDatum").addEventListener("change",impfungSpeichern);
    document.getElementById("iChargenNr").addEventListener("change",impfungSpeichern);
    document.getElementById("iArzt").addEventListener("change",impfungSpeichern);
    document.getElementById("impfstoff").addEventListener("change",impfungSpeichern);
    document.getElementById("schieberegler").addEventListener("click",impfungSpeichern);
}

function auswahl (){
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
    let treffer = false;
    if(document.getElementById("multiImpfung").checked){
        
        let schiebereglerElement = document.getElementById("schieberegler");
        let schiebereglerKinder = schiebereglerElement.getElementsByTagName("input");


        for(let i = 0;i<schiebereglerKinder.length;i++){
            if(schiebereglerKinder[i].checked){
                treffer = true;
            }
        }
    }
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
    //impfpass[document.getElementById("impfTyp")]    
}