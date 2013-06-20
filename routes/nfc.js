/*
 * Routes POST requests for nfc updates.
 */

exports.nfcadd = function(req, res){
  var id = req.param('id');
  io.sockets.emit('add-nfc-id', {id: id});
  res.send("Adding nfc id: " + id);
};

exports.nfcremove = function(req, res){
  var id = req.param('id');
  res.send("Removing nfc id: " + id);
};