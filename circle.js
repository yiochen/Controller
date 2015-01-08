(function(){
	var Circle=function(color){
		this.initialize(color);

	}
	Circle.prototype=new createjs.Shape();
	Circle.prototype.Shape_initialize=Circle.prototype.initialize;
	Circle.prototype.initialize=function(color){
		this.Shape_initialize();
		this.graphics.beginFill(color).drawCircle(0,0,50);
		this.x=0;
		this.y=0;
		this.isUp=false;
		this.isDown=false;
		this.isLeft=false;
		this.isRight=false;
	}
	window.Circle=Circle;
	console.log('circle class imported');
}());