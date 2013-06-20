
/*
 * GET home page(s).
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.tablet = function(req, res){
  res.render('tablet', { title: 'Tablet'});
};

exports.projector = function(req, res){
  res.render('projector', { title: 'Projector'});
};