const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    console.log("进来了："+req.url);
    res.end('hello node.js');
}).listen(8083, 'localhost', function () {
    console.log('Server running at http://localhost:8083');
});