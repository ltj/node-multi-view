
/**
 * Module dependencies.
 */
var express = require('express'),
  routes = require('./routes'),
  nfc = require('./routes/nfc'),
  http = require('http'),
  path = require('path'),
  winston = require('winston'), //winston logging framework
  dd_rest = require('./public/javascripts/dd_rest.js'); // the rest api for the cake server

require('winston-mongodb').MongoDB; //and a mongodb transport for winston

/**
* Setup the winston logger with console and mongodb transports.
*/
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.MongoDB)({ 'db': 'dd', 'collection':'logs'})
  ]
});

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
  logger.info("Express server listening on port " + app.get('port'));
  //console.log("Express server listening on port " + app.get('port'));
});

// routes for nfc input
app.get('/nfcadd', function(req, res){
  var id = req.param('id');
  var reader = req.param('reader');

  logger.info('nfc_event',{'action':'add', 'id':id, 'reader':reader} );

  io.sockets.emit('nfc-add', {id: id, reader: reader});
  res.send("Adding nfc id: " + id);
});

app.get('/nfcremove', function(req, res){
  var id = req.param('id');
  var reader = req.param('reader');

  logger.info('nfc_event', {'action':'remove', 'id':id, 'reader':reader} );
  io.sockets.emit('nfc-remove', {id: id, reader: reader});
  res.send("Removing nfc id: " + id);
});

//routes for comm with the dd cake server
app.get('/get_objects', function(req, res){
  dd_rest.getObjects( function(statusCode, result){
    res.statusCode = statusCode;
    //TODO: possibly do some processing of the json results.
    io.sockets.emit('dd-objects', result);
    res.end();
  });
});

//routes for comm with the dd cake server
app.get('/get_relations', function(req, res){
  dd_rest.getRelations( function(statusCode, result){
    res.statusCode = statusCode;
    //TODO: possibly do some processing of the json results.
    io.sockets.emit('dd-relations', result);
    res.end();
  });
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
