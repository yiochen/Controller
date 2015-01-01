var stage;
var queue;
var ball;
var socket;
var isUp=false;
var isDown=false;
var isLeft=false;
var isRight=false;

function init(){
	console.log("initiating");
	stage=new createjs.Stage("gameScene");
	queue=new createjs.LoadQueue(false);
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete",handleComplete);
	queue.loadManifest([
		{id:"check",src:"Assets/check.png"},
		{id:"sound",src:"Assets/slap.mp3"}
		]);
	socket=io('/game');
	registerMessage(socket);
}

function registerMessage(socket){
	socket.on('dir',function(msg){
		var value=msg.type;
		if (value) {
			console.log("do something");
			var bmp=new createjs.Bitmap(queue.getResult("check"));
            bmp.x=Math.random()*500;
            bmp.y=Math.random()*500;
            stage.addChild(bmp);
            createjs.Sound.play("sound");
		}
		switch (msg.name){
			case 0:
				isUp=value;
				break;
			case 1:
				isDown=value;
				break;
			case 2:
				isLeft=value;
				break;
			case 3:
				isRight=value;
				break;
		}
	});
}
function handleComplete(e){
	console.log("load complete");
	
	ball=new createjs.Shape();
	ball.graphics.beginFill("#000000").drawCircle(0,0,50);
	ball.x=50;
	ball.y=50;
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",tick);
	stage.addChild(ball);
}
function tick(e){
	updateBall();
	stage.update();
}
function updateBall(){
	if (isUp) ball.y-=5;
	if (isDown) ball.y+=5;
	if (isLeft) ball.x-=5;
	if (isRight) ball.x+=5;
}