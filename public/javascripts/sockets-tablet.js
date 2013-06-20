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

function cmd1(data) {
	socket.emit('tablet-cmd1', data);
	console.log("cmd1");
}

function cmd2(data) {
	socket.emit('tablet-cmd2', data);
}