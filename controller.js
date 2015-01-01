var stage;
var queue;
var socket;
var ball;
function init(){

	stage=new createjs.Stage("controller");
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
	// socket.on('dir',function(msg){
	// 	console.log("dir change :"+msg);
	// })
}
function handleComplete(e){

	ball=new createjs.Shape();
	ball.graphics.beginFill("#550000").drawCircle(0,0,50);
	ball.x=50;
	ball.y=50;
	ball.addEventListener("click",handleClick);
	createjs.Ticker.addEventListener("tick",tick);
	stage.addChild(ball);
}
function handleClick(e){
	socket.emit("dir",{user:"yiou",direction:"down"});
}
function tick(e){
	stage.update();
}