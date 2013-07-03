/*
 * Setup sockets
 */
var socket = io.connect('http://' + window.location.hostname);

var tag;

/*
 * Socket events
 */
socket.on('nfc-add', function(data){
	console.log("add");
	tag = data.id;
	$(".tags").text(tag).click(function(){
		cmd1({id: tag});
	});
});

socket.on('nfc-remove', function(data){
	console.log('remove');
});

socket.on('dd-objects', function(data){
	console.log('dd-objects');
	console.log(data);
});

socket.on('dd-relations', function(data){
	console.log('dd-relations');
	console.log(data);
});

socket.on('dd-full-graph', function(data){
	console.log('dd-full-graph');
	console.log(data);
});

function cmd1(data) {
	socket.emit('tablet-cmd1', data);
	console.log("cmd1");
}

function cmd2(data) {
	socket.emit('tablet-cmd2', data);
}