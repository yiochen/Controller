var stage;
var queue;
var socket;
/*
var up;
var down;
var left;
var right;
var keyRadius=100;
*/
var inner=100;
var powerInner=inner*inner;
var innerPad;
var outer=200;
var outerPad;
var padRadius=100;
var stick=null;

var x;
var y;
var dir=0;

var id=0;
function init(){

	stage=new createjs.Stage("controller");
	queue=new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest([
		{id:"check",src:"Assets/check.png"},
		{id:"sound",src:"Assets/slap.mp3"}
		]);
	optimizeForTouchAndScreens();
	socket=io('/controller');
	registerMessage(socket);
}
function optimizeForTouchAndScreens(){
	if (createjs.Touch.isSupported()){
		createjs.Touch.enable(stage);
	}
}
function registerMessage(socket){
	socket.on('init pos',function (msg){
		id=msg.id;
	})
}
function drawPad(_x, _y){
	x=_x;
	y=_y;
	innerPad=new createjs.Shape();
	innerPad.graphics.beginFill("#81F79F").drawCircle(0,0,inner);
	innerPad.x=x;
	innerPad.y=y;
	outerPad=new createjs.Shape();
	outerPad.graphics.beginFill("#A9D0F5").drawCircle(0,0,outer);
	outerPad.x=x;
	outerPad.y=y;
	stick=new createjs.Shape();
	stick.graphics.beginFill("#FF0000").drawCircle(0,0,padRadius);
	stick.x=x;
	stick.y=y;
	stage.addChild(outerPad);
	stage.addChild(innerPad);
	stage.addChild(stick);
}
function registerListener(){
	outerPad.addEventListener('mousedown',handleMouseDown);
	outerPad.addEventListener('pressmove',handleMouseDown);
	outerPad.addEventListener('pressup',handlePressUp);
}
function relX(e){
	return e.stageX-x;
}
function relY(e){
	return e.stageY-y;
}
function sign(x){
	return (x>0)?1:0;
}
function handleMouseDown(e){
	var _x=relX(e);
	var _y=relY(e);
	var sq=Math.pow(_x,2)+Math.pow(_y,2);
	if (sq>powerInner){
		var ratio=Math.sqrt(powerInner/sq);
		_x*=ratio;
		_y*=ratio;
	}
	stick.x=x+_x;
	stick.y=y+_y;
	//0 for untouch, 1 for up, 2 for down, 3 for right, 4 for left;
	var newDir=sign(Math.abs(_x)-Math.abs(_y))*2+sign(_y-_x)+1;

	if (newDir!=dir) {
		console.log("old dir:"+dir+" new dir: "+newDir);
		if (dir!=0){
			socket.emit("dir",{id:id,name:dir,type:false});
		}
		
		socket.emit("dir",{id:id,name:newDir,type:true});
		dir=newDir;
	}

}
function handlePressUp(e){
	console.log("pressed up");
	stick.x=x;
	stick.y=y;
	socket.emit("dir",{id:id,name:dir,type:false});
	dir=0;
}
function handleComplete(e){
	drawPad(200,200);
	registerListener();
	/*
	up=new createjs.Shape();
	up.graphics.beginFill("#81F79F").drawCircle(0,0,keyRadius);
	down=new createjs.Shape();
	down.graphics.beginFill("#A9D0F5").drawCircle(0,0,keyRadius);
	left=new createjs.Shape();
	left.graphics.beginFill("#F5D0A9").drawCircle(0,0,keyRadius);
	right=new createjs.Shape();
	right.graphics.beginFill("#F5A9E1").drawCircle(0,0,keyRadius);

	const sq2=1.4142;
	var r=keyRadius;
	var h=r*sq2;
	up.x=r+h;
	up.y=r;
	up.code=0;
	down.x=r+h;
	down.y=r+2*h;
	down.code=1;
	left.x=r;
	left.y=r+h;
	left.code=2;
	right.x=r+2*h;
	right.y=r+h;
	right.code=3;

	up.addEventListener("mousedown",handleMouse);
	up.addEventListener("pressup",handleMouse);
	down.addEventListener("mousedown",handleMouse);
	down.addEventListener("pressup",handleMouse);
	left.addEventListener("mousedown",handleMouse);
	left.addEventListener("pressup",handleMouse);
	right.addEventListener("mousedown",handleMouse);
	right.addEventListener("pressup",handleMouse);
	*/
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",tick);
	/*stage.addChild(up);
	stage.addChild(down);
	stage.addChild(left);
	stage.addChild(right);
	*/
}
/*
function handleMouse(e){
	var type;
	type=(e.type==="mousedown")?true:false;
	if (id>0){
		socket.emit("dir",{id:id,name:e.target.code,type:type});
	}
}*/
function tick(e){
	stage.update();
}