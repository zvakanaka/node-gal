const restify = require('restify');
const plugins = require('restify-plugins');
const photoFS = require('./filesystem');

const DIR_WITH_ALBUMS = process.env.DIR_WITH_ALBUMS || '/Users/adam/git/photo' || '.';
const IMAGE_EXTS = process.env.IMAGE_EXTS || ['jpg', 'png', 'gif'];
const VIDEO_EXTS = process.env.VIDEO_EXTS || ['webm', 'mov', 'avi', 'mp4'];

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

server.get('/images/:album', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let images = photoFS.getFilesInDirectory(DIR_WITH_ALBUMS, req.params.album, IMAGE_EXTS);
  res.json(images);
  return next();
});

server.get('/videos/:album', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let images = photoFS.getFilesInDirectory(DIR_WITH_ALBUMS, req.params.album, VIDEO_EXTS);
  res.json(images);
  return next();
});

server.get('/directories', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  let dirs = photoFS.getDirectoriesInDirectory(DIR_WITH_ALBUMS);
  res.json(dirs);
  return next();
});

server.get(/\/photo\/?.*/, restify.plugins.serveStatic({
  directory: DIR_WITH_ALBUMS.substr(0, DIR_WITH_ALBUMS.indexOf('photo'))
}));

server.listen(process.env.PORT || 8888, function () {
  console.log('%s listening at %s', server.name, server.url);
});
