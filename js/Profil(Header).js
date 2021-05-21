window.addEventListener("load",init);
function init(){
    document.getElementById("bearbeiten").addEventListener("click",bearbeitungsmodus);
}

function bearbeitungsmodus(){
    //TODO Besseren Weg zum Ansprechen der Inputs finden
    let inputs = document.getElementsByTagName("input");
    for(let inputfelder of inputs){
        if(inputfelder.disabled == false){
            inputfelder.disabled = true;
        }
        else{
            inputfelder.disabled = false;
        }
    }
    let buttonname = document.getElementById("bearbeiten");
    if(buttonname.innerHTML == "Bearbeiten"){
        buttonname.innerHTML = "Speichern";
    }
    else{
        buttonname.innerHTML = "Bearbeiten";
    }
    
}

