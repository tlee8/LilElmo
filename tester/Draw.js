var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var circle = document.getElementById("circle");
var rect = document.getElementById("rect");
var line = document.getElementById("line");
var free = document.getElementById("free");
var save = document.getElementById("save");
var pages = document.getElementById("pages");
var clear = document.getElementById("clear");
var run = document.getElementById("run");
var requestID=0;
var slider = document.getElementById("myRange");
var id = 0;
var radius = 2; // radius of circle
var mode="";
var drawn = false;
var drawnr = false;
var drawnf = false;
var last = null;
var lastr = null;
var lastf = null;
var mouseDown=0;
var img=[];
var page=0;
c.width = window.innerWidth-20;
c.onmousedown=function(){
    mouseDown=true;
}

c.onmouseup=function(){
    mouseDown=false;
    if(mode=="free"){
	drawnf=false;
	lastf=null;
    }
}

run.addEventListener('click', function(e){
    mode="Play";
    ctx.save();
    var num=0;
    var animation=setInterval(function(){
	ctx.beginPath();
	ctx.clearRect(0, 0, c.width, c.height);
	imgs= new Image();
	imgs.src = img[num];
	ctx.drawImage(imgs,0,0);
	num++;
	if(num==page){
	    clearInterval(animation);
	}
    }, 100);
    ctx.restore();
    
}
		    );


circle.addEventListener('click', function(e){
    mode="circle";
}
		       );
clear.addEventListener('click', function(e){
    mode="clear";
    ctx.clearRect(0, 0, c.width, c.height);
}
		       );
save.addEventListener('click', function(e){
    mode="save";
    img[page]= c.toDataURL("image/png");
    var row = document.getElementById("slide");
    var cell= row.insertCell(page);
    cell.innerHTML='<img class="custom" src="'+img[page]+'"/>';
    page++;

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
	ctx.beginPath();
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawnf){
	    ctx.moveTo(lastf.x, lastf.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.stroke();
	    
	}
	lastf = {x: xcor, y: ycor};
	drawnf = true;
	
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

