//from Beginning HTML5 Games with CreateJS by Brad Manderscheid
(function(){
	var AssetManager=function(){

		this.initialize();
	}
	var p=AssetManager.prototype=new createjs.EventDispatcher();
	p.EventDispatcher_initialize=p.initialize;

	//constants used for file ids
	//sound
	p.EXPLOSION='explosion';
	p.SHIP_FIRE='ship fire';
	//graphics
	p.GAME_SPRITES='game sprites';
	p.UI_SPRITES='ui sprites';
	//data
	p.GAME_SPRITES_DATA='game sprites data';
	p.UI_SPRITES_DATA='ui game sprites data';

	p.queue=null;
	p.assetPath='assets/';
	p.loadManifest=null;
	p.loadProgress=0;

	//event
	p.ASSETS_PROGRESS='assets progress';
	p.ASSETS_COMPLETE='assets complete';

	p.preloadAssets=function(){
		createjs.Sound.initializeDefaultPlugins();
		this.queue=new createjs.LoadQueue();
		this.queue.installPlugin(createjs.Sound);
		this.queue.on('progress',this.assetsProgress, this);
		this.queue.on('complete',this.assetsLoaded,this);
		createjs.Sound.alternateExtensions=["ogg"];
		this.queue.loadMainifest(this.loadManifest);
	}
	p.initialize=function(){
		this.EventDispatcher_initialize();
		this.loadManifest=[
			{id:this.EXPLOSION,src:this.assetsPath+'explosion.mps'},
			{id:this.SHIP_FIRE,src:this.assetsPath+'fire.mp3'},
			{id:this.GAME_SPRITES_DATA,src:this.assetsPath+'gameSpritesData.json'}
		];
	}
	p.assetsProgress=function(e){
		this.loadProgress=e.progress;
		this.dispatchEvent(this.ASSETS_PROGRESS);
	}
	p.assetsLoaded=function(e){
		this.dispatchEvent(this.ASSETS_COMPLETE);
	}
	p.getAsset=function(asset){
		return this.queue.getResult(asset);
	}
	window.AssetManager=AssetManager;
}()); 
//usage:
//var assets=new assetManager();
//assets.preloadAssets();
//assets.on(assets.ASSETS_COMPLETE,onComplete);
//function onComplete(e){
//	var data=assets.getAsset(assets.GAME_SPRITES_DATA);
//}