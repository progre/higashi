var http = require('http'),
    socketIO = require('socket.io'),
    koa = require('koa'),
    serve = require('koa-static'),
    io = require('./io');

var app = koa();

app.use(serve(__dirname + '/public'));

io.default(socketIO(http.Server(app.callback())));

app.listen(8080);
