function bajar(id) {
    document.getElementById(id).style.transform = 'translateY(0)';
}
;

function subir(id) {
    document.getElementById(id).style.transform = 'translateY(-100%)';
}
;


/*-------------------------------------------------------------------------------
    Base
-------------------------------------------------------------------------------*/

$(document).ready(function() {
    setTimeout(function() {
        $(".titulo-principal").fadeOut(2000);
    },1000);
});

$(document).ready(function() {   
    setTimeout(function() {
        $(".titulo-secundario").fadeIn(2000);
    },1000);
});



function scalar(id) {
    var x = document.getElementById(id);

    if(id == "img-r"){
        x.style.transform = "scale(-1.2,1.2)";
    }else{
        x.style.transform = "scale(1.2)";
    }    
    x.style.filter = "brightness(0.8)";
};

function descalar(id) {
    var x = document.getElementById(id);

    if(id == "img-r"){
        x.style.transform = "scale(-1,1)";
    }else{
        x.style.transform = "scale(1)";
    }
    x.style.filter = "brightness(1)";
};

function scalar2(id) {
    var x = document.getElementById(id);
    
    x.style.transform = "scale(1.2)";
    x.style.filter = "brightness(0.8)";
    x.style.filter = "grayscale(0%)";
};

function descalar2(id) {
    var x = document.getElementById(id);

    x.style.transform = "scale(1)";
    x.style.filter = "brightness(0.2)";
    x.style.filter = "grayscale(100%)";
    
};

function justNumbers(e)
        {
        var keynum = window.event ? window.event.keyCode : e.which;
        if ((keynum == 8) || (keynum == 46))
        return true;
         
        return /\d/.test(String.fromCharCode(keynum));
};