var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var dotButton = document.getElementById("circle");
var requestID=0;
var slider = document.getElementById("myRange");
var id = 0;
var radius = 2; // radius of circle
var mode="";


c.addEventListener('click', function(e){
    if(mode=="circle"){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	ctx.beginPath();
	ctx.ellipse(xcor, ycor, slider.value, slider.value, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
	ctx.fillStyle = "black";
	ctx.fill(); //fills it
    }
    else if(mode=="rectangle"){


    }
    
})

