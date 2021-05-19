window.addEventListener("load",init);

//var heute = new Date()
//var unterschiedZeit = heute.getTimezoneOffset() / 60 *-1 

function init(){
    //speicherButton()
    document.getElementById("terminAnlegen").addEventListener("keypress", function(e){if(e.key.toLowerCase() == "enter") speicherButton();});
    document.getElementById("terminAnlegen").addEventListener("click",speicherButton);
    //setzeAktuelleZeit()
}


function speicherButton(){   
    var termin = new Object();

    termin.datum = document.getElementById("terminDatum").value;         console.log(document.getElementById("terminDatum").value);
    termin.art = document.getElementById("terminArt").value;             console.log(document.getElementById("terminArt").value);
    termin.arzt = document.getElementById("terminArzt").value;           console.log(document.getElementById("terminArzt").value); 
     
    

} 
/*
function setzeAktuelleZeit(){

    document.getElementById("terminDatum").value = heute.toISOString().substring(0,10)
    console.log(document.getElementById("terminDatum").value = heute.toISOString().substring(0,10))
    console.log(unterschiedZeit)
} */