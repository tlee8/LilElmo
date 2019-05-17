var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var circle = document.getElementById("circle");
var rect = document.getElementById("rect");
var line = document.getElementById("line");
var free = document.getElementById("free");
var save = document.getElementById("save");
var strokesize = document.getElementById("ssize");
var pages = document.getElementById("pages");
var eraser = document.getElementById("eraser");
var clear = document.getElementById("clear");
var rate = document.getElementById("rate");
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
var clickn=0;

document.addEventListener("keydown", function(e){
    var tipo=e.key;
    if(tipo=="c"){
	mode="circle";
    }
    else if(tipo=="r"){
	mode="rectangle";
    }
    else if(tipo=="l"){
	mode="line";
    }
    else if(tipo=="f"){
	mode="free";
    }
    else if(tipo=="e"){
	mode="eraser";
    }
    else if(tipo=="s"){
	mode="save";
	img[page]= c.toDataURL("image/png");
	var row = document.getElementById("slide");
	var cell= row.insertCell(page);
	cell.innerHTML='<img class="custom" src="'+img[page]+'"/>';
	page++;
    }
    else if(tipo=="q"){
	mode="clear";
	ctx.clearRect(0, 0, c.width, c.height);
    }
}
			 );

c.width = window.innerWidth-20;
c.onmousedown=function(){
    mouseDown=true;
}

c.onmouseup=function(){
    mouseDown=false;
    if(mode=="free" || mode=="eraser"){
	drawnf=false;
	lastf=null;
    }
}


run.addEventListener('click', function(e){
    var curr=rate.value;
    if(page>0){
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
	},1000/curr);
	ctx.restore();
	
    }
}
		    );


circle.addEventListener('click', function(e){
    mode="circle";
}
		       );
eraser.addEventListener('click', function(e){
    mode="eraser";
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
    clicks=2;
    mode="line";
}
		     )	;	      
free.addEventListener('click', function(e){
    mode="free";
}
		     );
rect.addEventListener('click', function(e){
    clicks=2;
    mode="rectangle";

}
		     );

c.addEventListener('mousemove',function(e) {
    if(mouseDown && mode=="free" ){
	ctx.beginPath();
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawnf){
	    ctx.lineCap = "round";
	    ctx.moveTo(lastf.x, lastf.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.strokeStyle = color;
	    ctx.lineWidth = strokesize.value;
	    ctx.stroke();
	    
	}
	lastf = {x: xcor, y: ycor};
	drawnf = true;
	
    }
    else if(mouseDown && mode=="eraser" ){
	ctx.beginPath();
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawnf){
	    ctx.moveTo(lastf.x, lastf.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.lineCap = "round";
	    ctx.strokeStyle = "white";
	    ctx.lineWidth = strokesize.value;
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
	ctx.lineWidth = strokesize.value;
	ctx.fillStyle = colorf;
	ctx.fill(); //fills it
	ctx.strokeStyle=colors;
	ctx.stroke(); //draws ellipse
    }
    else if(mode=="rectangle"){
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawnr){
	    ctx.beginPath();
	    ctx.lineWidth = 1;
	    ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	    ctx.strokeStyle = colors;
	    ctx.stroke(); //draws ellipse
	    ctx.fillStyle = colorf;
	    ctx.fill(); //fills it
	    ctx.rect(lastr.x, lastr.y, xcor-lastr.x, ycor-lastr.y);
	    ctx.fillStyle = colorf;
	    ctx.fill(); //fills it
	    ctx.lineWidth = strokesize.value;
	    ctx.strokeStyle = colors;
	    ctx.stroke(); //draws ellipse	    lastr=null;
	    drawnr=false;
	    clicks=2;
	    return 0;
	}
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
	ctx.strokeStyle = colors;
	ctx.fillStyle = colorf;
	ctx.fill(); //fills it
	lastr = {x: xcor, y: ycor};
	drawnr = true;
    }

    else if(mode=="line"){
	ctx.beginPath();
	ctx.lineWidth = strokesize.value;
	ctx.strokeStyle=colors;
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawn){
	    ctx.lineCap = "round";
	    ctx.lineWidth = slider.value;
	    ctx.moveTo(last.x, last.y)
	    ctx.lineTo(xcor, ycor);
	    ctx.stroke();
	    clicks=2;
	    
	}
	ctx.lineWidth = 1;
	ctx.ellipse(xcor, ycor, 1, 1, Math.PI / 4, 0, 2 * Math.PI);
	ctx.stroke(); //draws ellipse
	ctx.fillStyle = colors;
	ctx.fill(); //fills it
	last = {x: xcor, y: ycor};
	drawn = true;
    }
})

