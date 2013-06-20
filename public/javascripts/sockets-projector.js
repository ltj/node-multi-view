/*
 * Setup sockets
 */
var socket = io.connect('http://' + window.location.hostname);

/*
 * Socket events
 */
socket.on('tablet-cmd1', function(data){
	console.log("add");
	$(".display").text("clicked " + data.id);
});

socket.on('tablet-cmd2', function(data){
	console.log('remove');
});