var requestID=0;
var slider = document.getElementById("myRange");
var id = 0;
var frame=0;
var fps, fpsInterval, startTime, now, then, elapsed;
var img=[];
var page=0;
var c = document.getElementById("playground");
var ctx = c.getContext("2d");
c.width = window.innerWidth-20;
var run = document.getElementById("run");
var done=false;

if(!done){
    var a= document.getElementById("run").getAttribute("gather");
    a=a.split(",");
    var row = document.getElementById("slide");
    var pag=2;
    while(a[pag]!=null){
	var cell= row.insertCell(pag-2);
	cell.innerHTML='<img class="custom" src="'+a[pag]+'"/>';
	pag++;
    }
    done=!done;
}
run.addEventListener('click', function(e){
    var s= document.getElementById("run").getAttribute("gather");
    s=s.split(",");
    var x=2;
    while(s[x]!=null){
	img[x-2]=s[x];
	x++;
    }
    page=x-2;
    frame=0;
    then = Date.now();
    startTime = then;
    fpsInterval = 1000 /parseInt(s[1]);
    runner();
}
		    );

var runner=function (e){
    if(page>0){
	now = Date.now();
	elapsed = now - then;
	if (elapsed > fpsInterval) {
	    then = now - (elapsed % fpsInterval);
	    ctx.beginPath();
	    ctx.clearRect(0, 0, c.width, c.height);
	    imgs= new Image();
	    imgs.src = img[frame];
	    ctx.drawImage(imgs,0,0);
	    frame++;
	}
	requestID = window.requestAnimationFrame(runner);

    }
    if(frame==page){
	window.cancelAnimationFrame(requestID); // stops animation
	return;
    }
}
