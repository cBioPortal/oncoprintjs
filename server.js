var express = require('express');

var server = express();
server.use(express.static(__dirname + '/dist'));
server.use(express.static(__dirname + '/test'));

var port = 3000;
server.listen(port, function() {
    console.log('View Oncoprint in http://localhost:' + port + '/index.html');
});
