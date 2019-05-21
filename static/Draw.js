var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var circle = document.getElementById("circle");
var rect = document.getElementById("rect");
var line = document.getElementById("line");
var free = document.getElementById("free");
var save = document.getElementById("save");
var undo = document.getElementById("Undo");
var crop = document.getElementById("crop");
var strokesize = document.getElementById("ssize");
var end = document.getElementById("end");
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
var drawing = false;
var drawnr = false;
var drawnf = false;
var last = null;
var lastr = null;
var lastf = null;
var mouseDown=0;
var img=[];
var saved=[];
var page=0;
var paged=-1;
var ppage=-1;
var clickn=0;
var currs;
var keyP;
var test;
var cropI;
document.addEventListener("keydown", function(e){
    var keyC=e.key;
    keyP=keyC;
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    if(keyC=="ArrowLeft"){
	ctx.putImageData(imgData, -1, 0);	
    }
    else if(keyC=="ArrowRight"){
	ctx.putImageData(imgData, 1, 0);	
     }
    else if(keyC=="ArrowUp"){
	ctx.putImageData(imgData, 0, -1);	
     }
    else if(keyC=="ArrowDown"){
	ctx.putImageData(imgData, 0, 1);	
    }
}
			 );



document.addEventListener("keydown", function(e){
    var tipo=e.key;
    if(tipo=="c"){
	ppage++;
	saved[ppage]= c.toDataURL("image/png"); 
	mode="circle";
    }
    else if(tipo=="r"){
	ppage++;
	saved[ppage]= c.toDataURL("image/png"); 
	mode="rectangle";
    }
    else if(tipo=="l"){
	ppage++;
	saved[ppage]= c.toDataURL("image/png"); 
	mode="line";
	drawn=false;
	last=null;
    }
    else if(tipo=="u"){
	if(ppage>=0){
	    ctx.beginPath();
	    ctx.clearRect(0, 0, c.width, c.height);
	    imgs= new Image();
	    imgs.src = saved[ppage];
	    ctx.drawImage(imgs,0,0);
	    ppage--;
	}
    }
    else if(tipo=="f"){
	mode="free";
	drawn=false;
	last=null;
	
    }
    else if(tipo=="e"){
	mode="eraser";
    }
    else if(tipo=="s"){
	var row = document.getElementById("slide");
	mode="save";
	if(paged!=-1){
	    row.deleteCell(paged);
	    img[paged]= c.toDataURL("image/png"); 
	    var cell= row.insertCell(paged);
	    cell.innerHTML="<center>"+(paged+1)+"</center>"+'<img class="custom" src="'+img[paged]+'" onclick="ttravel('+paged+')"/>';
	    paged=-1;
	    
	}
	else{
	    img[page]= c.toDataURL("image/png");
	    var cell= row.insertCell(page);
	    cell.innerHTML="<center>"+(page+1)+"</center>"+'<img class="custom" src="'+img[page]+'" onclick="ttravel('+page+')"/>';
	    page++;
	}
    }
    else if(tipo=="q"){
	ppage++;
	saved[ppage]= c.toDataURL("image/png"); 
	mode="clear";
	ctx.clearRect(0, 0, c.width, c.height);
    }
}
			 );

c.width = window.innerWidth-20;
c.onmousedown=function(){
    mouseDown=true;
    if(mode=="free" || mode=="eraser"){
	saved[ppage+1]= c.toDataURL("image/png"); 
    }
}

c.onmouseup=function(){
    mouseDown=false;
    if(mode=="free" || mode=="eraser"){
	drawnf=false;
	lastf=null;
	ppage++;
    }
}


run.addEventListener('click', function(e){
    var curr=rate.value;
    currs=c.toDataURL("image/png");
    if(page>0){
	mode="Play";
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
    }
    
}
		    );

undo.addEventListener('click', function(e){
    if(ppage>=0){
	ctx.beginPath();
	ctx.clearRect(0, 0, c.width, c.height);
	imgs= new Image();
	imgs.src = saved[ppage];
	ctx.drawImage(imgs,0,0);
	ppage--;
    }
}
		     );

crop.addEventListener('click', function(e){
    mode="crop";
    drawn=false;
    last=null;
}
		       );

circle.addEventListener('click', function(e){
    mode="circle";
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
}
		       );
end.addEventListener('click', function(e){
    mode="end";
    var ptitle=document.getElementById("title").getAttribute("value");
    var gather=ptitle+",";
    for(var ca=0; ca<page;ca++){
	gather+=img[ca]+",";
    }
    document.getElementById("end").setAttribute("gather",gather);
    
}
		       );

eraser.addEventListener('click', function(e){
    mode="eraser";
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
}
		       );
clear.addEventListener('click', function(e){
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
    mode="clear";
    ctx.clearRect(0, 0, c.width, c.height);
}
		      );
save.addEventListener('click', function(e){
    var row = document.getElementById("slide");
    mode="save";
    if(paged!=-1){
	row.deleteCell(paged);
	img[paged]= c.toDataURL("image/png");
	var cell= row.insertCell(paged);
	cell.innerHTML=page+'<img class="custom" src="'+img[paged]+'" onclick="ttravel('+paged+')"/>';
	paged=-1;
	
    }
    else{
	img[page]= c.toDataURL("image/png");
	var cell= row.insertCell(page);
	cell.innerHTML='<img class="custom" src="'+img[page]+'" onclick="ttravel('+page+')"/>';
	page++;
    }

}
		     );	      
line.addEventListener('click', function(e){
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
    drawn=false;
    last=null;
    clicks=2;
    mode="line";
}
		     )	;	      
free.addEventListener('click', function(e){
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
    mode="free";
}
		     );
rect.addEventListener('click', function(e){
    ppage++;
    saved[ppage]= c.toDataURL("image/png"); 
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
    else if(mode=="crop"){
	ctx.beginPath();
	var xcor = e.offsetX;
	var ycor = e.offsetY;
	if(drawn && !drawing ){	  
	    cropI = ctx.getImageData(last.x, last.y, xcor-last.x, ycor-last.y);
	    drawing=true;
	}
	else if(drawing){
	    c.onmouseup=function(){
		ctx.putImageData(cropI, xcor, ycor);	
	    }
	}
	if(!drawing){
	    last = {x: xcor, y: ycor};
	    drawn = true;
	}
    }
})
