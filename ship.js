//from Beginning HTML5 Games with CreateJS by Brad Manderscheid
//extended sprite class
(function(){
	window.sprites=window.sprites||{};
	var Ship=function(spriteSheet){
		this.initialize(spriteSheet);
	}

	var p=Ship.prototype=new createjs.Sprite();
	p.Sprite_initialize=p.initialize;

	p.initialize=function(spritesheet){
		this.Sprite_initialize(spritesheet);
	}
	p.die=function(){
		this.gotoAndPlay('explode');
		this.on('animationend',this.destroy);
	}
	p.destroy=function(){
		this.parent.removeChild(this);
		this=null;
	}
	window.sprites.Ship=Ship;
}());