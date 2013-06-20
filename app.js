
/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  nfc = require('./routes/nfc'),
  http = require('http'),
  path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/tablet', routes.tablet);
app.get('/projector', routes.projector);

// create server and socket listener
var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// routes for nfc input
app.get('/nfcadd', function(req, res){
  var id = req.param('id');
  io.sockets.emit('nfc-add', {id: id});
  res.send("Adding nfc id: " + id);
});

app.get('/nfcremove', function(req, res){
  var id = req.param('id');
  io.sockets.emit('nfc-remove', {id: id});
  res.send("Removing nfc id: " + id);
});

// websockets connection and events
io.sockets.on('connection', function (socket) {

  socket.on('tablet-cmd1', function(data){
    socket.broadcast.emit('tablet-cmd1', data);
  });

  socket.on('tablet-cmd2', function(data){
    socket.broadcast.emit('tablet-cmd2', data);
  });

});
