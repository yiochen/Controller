var stage;
var queue;
var balls=[];
var socket;


function init(){
	console.log("initiating");
	stage=new createjs.Stage("gameScene");
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",tick);
	
	stage.enableMouseOver(10);
	var btn=new ui.SimpleButton('hi, this is yiou');
    btn.setButton({color:"white",fontSize:50,upColor:'green',overColor:'#ff69b4'});
	stage.addChild(btn);
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
		var ball=new Circle('#'+(Math.random()*0xFFFFFF<<0).toString(16));
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
			if (ball.isUp) {
				ball.y-=5;
				if (ball.y<0) {
					console.log('out of upper bound '+stage.canvas.height);
					ball.y=stage.canvas.height;
				}
			}

			if (ball.isDown) {
				ball.y+=5;
				if (ball.y>stage.canvas.height) ball.y=0;
			}
			if (ball.isLeft) {
				ball.x-=5;
				if (ball.x<0) ball.x=stage.canvas.width;
			}
			if (ball.isRight) {
				ball.x+=5;
				if (ball.x>stage.canvas.width) ball.x=0;
			}
		}
	}
	
}
