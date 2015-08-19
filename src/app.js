var http = require('http'),
    socketIO = require('socket.io'),
    koa = require('koa'),
    serve = require('koa-static'),
    io = require('./io').default;

var app = koa();

app.use(serve(__dirname + '/public'));

var server = http.Server(app.callback());
io(socketIO(server));

server.listen(8080);
