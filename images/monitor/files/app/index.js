var koa = require('koa');
var serve = require('koa-static');
var route = require('koa-route');
var app = koa();
var path = require('path');

var minecraft = require('./lib/minecraft');


app.use(serve(path.join(__dirname, 'public')))

app.use(route.get('/api/minecraft_containers', minecraft.containers.index));
app.use(route.get('/api/minecraft_containers/:id', minecraft.containers.show));
app.use(route.get('/api/minecraft_containers/:id/mods.tar', minecraft.containers.mods));

app.listen(4000);

