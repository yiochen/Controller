var app=require('express')();
var server=require('http').Server(app);
var io=require('socket.io')(server);
var nsp=io.of('/game');

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

io.on('connection',function(socket){
	console.log('a user connected');
	socket.on('dir',function(msg){
		nsp.emit('dir',msg);
	});
	socket.on('disconnect',function(){
		console.log('user disconnect');
	});
});
server.listen(8000,function(){
	console.log('listening on *:8000');
});
