
var http = require('http'),
    https = require('https');

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    //console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        //console.log(options.host + ': ' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            //console.log("JSON: " + output);
            var obj = JSON.parse(output);
            //console.log(obj);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
        console.log('error ' + err.message);
    });

    req.end();
};

exports.getObjects = function(onResult){
   var options = {
        host: 'sw-dev.alexandra.dk',
        port: 80,
        path: '/cbi/design/design_objects.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.getJSON(options, onResult);
};

exports.getStatusUpdates = function(onResult){
   var options = {
        host: 'sw-dev.alexandra.dk',
        port: 80,
        path: '/cbi/design/status_updates.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.getJSON(options, onResult);
};

exports.getRelations = function(onResult){
   var options = {
        host: 'sw-dev.alexandra.dk',
        port: 80,
        path: '/cbi/design/design_objects_relations.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.getJSON(options, onResult);
};

exports.getObjectTypes = function(onResult){
   var options = {
        host: 'sw-dev.alexandra.dk',
        port: 80,
        path: '/cbi/design/design_object_types.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    this.getJSON(options, onResult);
};

