const fs = require('fs');
const path = require('path');
const BASE_DIR = process.env.BASE_DIR || '../photo';
const URL = process.env.URL || `localhost:8888/photo`;
const DEMO = require('./demo.json');

/* helpers */
function getDirectoriesInDirectory(base='./', ignore=[]) {
  if (!fs.existsSync(base)) return { err: `directory "${base}" does not exist`};
  let directories = fs.readdirSync(base)
  .filter(file => {
    if (fs.statSync(`${base}/${file}`).isDirectory()
    && (ignore.indexOf(file)===-1)) return true;
  });
  return directories;
}
function getFilesInDirectory(base='./', album='', fileExtensions=[]) {
  const directory = `${base}/${album}`;
  if (!fs.existsSync(directory)) return { err: `directory "${directory}" does not exist` };
  const extensions = fileExtensions.map(ext => `.${ext.toLowerCase()}`);
  let files = fs.readdirSync(directory)
    .filter(function(file) {
      if (extensions.length === 0 || extensions.indexOf(path.extname(file).toLowerCase())>-1) return true;
    });
  return files;
}
/* end helpers */

function getAlbumByName(name='', fileExtensions=['jpg']) {
  let smalls = getFilesInDirectory(BASE_DIR, `${name}/.thumb`, fileExtensions);
  let mediums = getFilesInDirectory(BASE_DIR, `${name}/.web`, fileExtensions);//TODO: make a medium size
  let larges = getFilesInDirectory(BASE_DIR, `${name}/.web`, fileExtensions);
  let originals = getFilesInDirectory(BASE_DIR, `${name}`, fileExtensions);
  let images = originals
    .map(file => {
      return {
        url: ``,
        small: smalls.filter(item => item === file),
        medium: mediums.filter(item => item === file),
        large: larges.filter(item => item === file)
      };
    });
  let thumbnailIndex = 0;//TODO: get a set thumbnail
  let album = { name: name, thumbnailIndex: thumbnailIndex, images: images };
  return album;
}

function getAlbumNames() {
  return getDirectoriesInDirectory(BASE_DIR);
}

function getAllAlbums() {
  return getAlbumNames().map(name => getAlbumByName(name));
}

function getAlbumNamesAndThumbs() {
  return getAllAlbums()
      .map(album => {
        return {
          url: ``;
          thumbSmall: album.images[album.thumbnailIndex].small,
          thumbMedium: album.images[album.thumbnailIndex].medium,
          thumbLarge: album.images[album.thumbnailIndex].large,
          name: album.name
        };
      });
}

module.exports = {
  getAlbumByName: getAlbumByName,
  getAlbumNames: getAlbumNames,
  getAllAlbums: getAllAlbums,
  getAlbumNamesAndThumbs: getAlbumNamesAndThumbs
};
