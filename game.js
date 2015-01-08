var stage;
var queue;
var balls=[];
var socket;


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
	console.log('ready to use circle');
	socket.on('new ball',function(msg){
		var ball=new Circle("#000000");
		
		createjs.Ticker.setFPS(60);
		createjs.Ticker.addEventListener("tick",tick);
		stage.addChild(ball);
		balls[msg.id]=ball;
	});
	socket.on('lost controller',function(msg){
		if (balls[msg.id]){
			stage.removeChild(balls[msg.id]);
			balls[msg.id]=null;
		}
	});
	socket.on('dir',function(msg){
		
		var ball=balls[msg.id];

		var value=msg.type;
		if (value) {
			//do something
		}
		switch (msg.name){
			case 1:
				ball.isUp=value;
				break;
			case 2:
				ball.isDown=value;
				break;
			case 3:
				ball.isRight=value;
				break;
			case 4:
				ball.isLeft=value;
				break;
		}
	});
}
function handleComplete(e){
	console.log("load complete");

}
function tick(e){
	updateBalls();
	stage.update();
}
function updateBalls(){
	for (var i=1;i<balls.length;i++){
		if (balls[i]){
			var ball=balls[i];
			if (ball.isUp) ball.y-=5;
			if (ball.isDown) ball.y+=5;
			if (ball.isLeft) ball.x-=5;
			if (ball.isRight) ball.x+=5;
		}
	}
	
}
