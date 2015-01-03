var stage;
var queue;
var socket;
var up;
var down;
var left;
var right;
var keyRadius=100;
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
	socket=io();
	registerMessage(socket);
}
function optimizeForTouchAndScreens(){
	if (createjs.Touch.isSupported()){
		createjs.Touch.enable(stage);
	}
}
function registerMessage(socket){
	//currently no interesting message to listen to
}
function handleComplete(e){

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
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",tick);
	stage.addChild(up);
	stage.addChild(down);
	stage.addChild(left);
	stage.addChild(right);
}
function handleMouse(e){
	var type;
	type=(e.type==="mousedown")?true:false;
	socket.emit("dir",{user:"yiou",name:e.target.code,type:type});
}
function tick(e){
	stage.update();
}