var app=require('express')();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var nspgame=io.of('/game');
var nspcontroller=io.of('/controller');
var usercount=0;

app.get('/',function(req,res){
	res.sendFile(__dirname+'/game.html');
});
app.get('/player',function(req, res){
	res.sendFile(__dirname+'/controller.html');
});
app.get("/*",function(req, res){
	res.sendFile(__dirname+req.path);
});
app.get("/Assets/*",function (req, res){
	res.sendFile(__dirname+"/Assets"+req.path);
})

nspgame.on('connection',function (socket){
	console.log('a game scene client connected');
	socket.on('disconnect',function(){
		console.log('game scene disconnect');
	});
})
nspcontroller.on('connection',function(socket){
	
	usercount++;
	var x=10;
	var y=10;
	socket.id=usercount;
	console.log('a controller '+socket.id+' client connected');
	socket.emit('init pos',{id:usercount});
	nspgame.emit('new ball',{x:x,y:y,id:usercount});
	socket.on('dir',function(msg){
		nspgame.emit('dir',msg);
	});
	socket.on('disconnect',function(){
		console.log('controller '+socket.id +' disconnected');
		nspgame.emit('lost controller',{id:socket.id});
	});
});
server.listen(8000,function(){
	console.log('listening on *:8000');
});
