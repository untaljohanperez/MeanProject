var io = require('socket.io');  
var mongoose = require('mongoose');
var Process = mongoose.model('Process');

var socketEvents = function(server){
    
    var listener = io.listen(server);  
    
    var processList = [];
    var readyStatus = "ready";
    var runningStatus = "running"; 
    var waitingStatus = "waiting"; 
    var terminatedStatus = "terminated";
    
    var sendProcessList = function(socket){
        socket.emit('sendProcessList', processList);
        socket.broadcast.emit('sendProcessList', processList);   
    };
    
    listener.sockets.on('connection', function(socket) {  
        //Send Data From Server To Client  
        socket.emit('sendProcessList', processList);
    
        socket.on('sendProcessList', function(data){
            processList = data;
            socket.broadcast.emit('sendProcessList', processList);
        });
        
        socket.on('clearProcessList', function(){
            processList = [];
            socket.broadcast.emit('sendProcessList', processList);
            socket.emit('sendProcessList', processList);
        });    
    
        //Receive Data From Client  
        socket.on('newProcess', function(data) {
            data.id = processList.length + 1;  
            data.status = readyStatus;
            data.remainingTime = data.processingTime; 
            processList.push(data);
		/******/
		var process = new Process(data);
		post.save(function(err, processs){
			console.log(err, "error");
			consile.log(processs, "process");
		});
		/*****/
    
            sendProcessList(socket);
            socket.broadcast.emit('postNewProcessSuccess', null);  
            process.stdout.write(data.process + ': ' + data.processingTime);  
        });
    
        socket.on('updateProcess', function(data){
            processList.forEach(function(processs){
                if(processs.id == data.id){
                    processs.status = data.status;
                    processs.remainingTime = data.remainingTime;
                    return;
                }
            });
            socket.emit('sendProcessList', processList);
        });  
    
    });
}

module.exports = socketEvents;
