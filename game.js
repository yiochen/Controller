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
	socket.on('new ball',function(msg){
		var ball=new createjs.Shape();
		ball.graphics.beginFill("#000000").drawCircle(0,0,50);
		ball.x=msg.x;
		ball.y=msg.y;
		ball.isUp=false;
		ball.isDown=false;
		ball.isLeft=false;
		ball.isRight=false;
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
			console.log("do something");
			var bmp=new createjs.Bitmap(queue.getResult("check"));
            bmp.x=Math.random()*500;
            bmp.y=Math.random()*500;
            stage.addChild(bmp);
            createjs.Sound.play("sound");
		}
		switch (msg.name){
			case 0:
				ball.isUp=value;
				break;
			case 1:
				ball.isDown=value;
				break;
			case 2:
				ball.isLeft=value;
				break;
			case 3:
				ball.isRight=value;
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
