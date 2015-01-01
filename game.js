var stage;
var queue;
var ball;
var socket;
function init(){
	console.log("initiating");
	stage=new createjs.Stage("gameScene");
	queue=new createjs.LoadQueue(false);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest([
		{id:"check",src:"Assets/check.png"},
		{id:"sound",src:"Assets/slap.mp3"}
		]);
	socket=io.connect();
	registerMessage(socket);
}
function registerMessage(socket){
	socket.on('dir',function(msg){
		console.log("dir change :"+msg);
		if (msg.direction=="down"){
			ball.y+=10;
		}
	})
}
function handleComplete(e){
	console.log("load complete");
	
	ball=new createjs.Shape();
	ball.graphics.beginFill("#000000").drawCircle(0,0,50);
	ball.x=50;
	ball.y=50;
	createjs.Ticker.addEventListener("tick",tick);
	stage.addChild(ball);
}
function tick(e){
	stage.update();
}