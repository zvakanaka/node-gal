const restify = require('restify');
const plugins = require('restify-plugins');
const photoFS = require('./model');
const DIR_WITH_ALBUMS = process.env.DIR_WITH_ALBUMS || '../photo';
const server = restify.createServer({
  name: 'node-gal-api',
  version: '1.0.0'
});
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.use(
  function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.get('/album/:album', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let album = photoFS.getAlbumByName(req.params.album);
  res.json(album);
  return next();
});

server.get('/albums/names', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let albumNames = photoFS.getAlbumNames();
  res.json(albumNames);
  return next();
});

server.get('/albums/details', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let albumNamesAndThumbs = photoFS.getAlbumNamesAndThumbs();
  res.json(albumNamesAndThumbs);
  return next();
});

server.get('/albums/all', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let albums = photoFS.getAllAlbums();
  res.json(albums);
  return next();
});

server.get('/image/:album/:image', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let album = photoFS.getAlbumByName(req.params.album);
  res.json(album);
  return next();
});
console.log('serving static:', DIR_WITH_ALBUMS.substr(0, DIR_WITH_ALBUMS.indexOf('photo')));
server.get(/\/photo\/?.*/, restify.plugins.serveStatic({
  directory: DIR_WITH_ALBUMS.substr(0, DIR_WITH_ALBUMS.indexOf('photo'))
}));

server.listen(process.env.PORT || 8888, function () {
  console.log('%s listening at %s', server.name, server.url);
});
