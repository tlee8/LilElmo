var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var circle = document.getElementById("circle");
var rect = document.getElementById("rect");
var line = document.getElementById("line");
var free = document.getElementById("free");
var requestID=0;
var slider = document.getElementById("myRange");
var id = 0;
var radius = 2; // radius of circle
var mode="";
var drawn = false;
var drawnr = false;
var last = null;
var lastr = null;
var mouseDown=0;
c.width = window.innerWidth-20;
c.onmousedown=function(){
    mouseDown=true;
}

c.onmouseup=function(){
    mouseDown=false;
    if(mode=="free"){
	drawn=false;
	last=null;
    }
}

circle.addEventListener('click', function(e){
    mode="circle";
}
		       );	      
line.addEventListener('click', function(e){
    drawn=false;
    last=null;
    mode="line";
}
		     )	;	      
free.addEventListener('click', function(e){
    
    mode="free";
}
		     );
rect.addEventListener('click', function(e){
    mode="rectangle";

}
		     );

c.addEventListener('mousemove',function(e) {
    if(mouseDown && mode=="free" ){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawn){
	    ctx.moveTo(last.x, last.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.stroke();
	    
	}
	last = {x: xcor, y: ycor};
	drawn = true;
	
    }
});



c.addEventListener('click', function(e){
    if(mode=="circle"){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	ctx.beginPath();
	ctx.ellipse(xcor, ycor, slider.value, slider.value, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
    }
    else if(mode=="rectangle"){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawnr){
	    ctx.beginPath();
	    ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	    ctx.stroke(); //draws ellipse
	    ctx.fillStyle = "black";
	    ctx.fill(); //fills it
	    ctx.rect(lastr.x, lastr.y, xcor-lastr.x, ycor-lastr.y);
	    ctx.stroke();
	    lastr=null;
	    drawnr=false;
	    return 0;
	}
	ctx.beginPath();
	ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
	ctx.fillStyle = "black";
	ctx.fill(); //fills it
	lastr = {x: xcor, y: ycor};
	drawnr = true;
    }

    else if(mode=="line"){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawn){
	    ctx.moveTo(last.x, last.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.stroke();
	    
	}
	ctx.beginPath();
	ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
	ctx.fillStyle = "black";
	ctx.fill(); //fills it
	last = {x: xcor, y: ycor};
	drawn = true;
    }
})

