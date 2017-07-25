const DEMO = require('./demo.json');

function getAlbumByName(name='') {
  let album = DEMO.albums.filter(item => item.name.toLowerCase() === name.toLowerCase())[0];
  if (typeof album == 'undefined') return { err: `album "${name}" does not exist` };
  return album;
}

function getAlbumThumbnail(name='') {
  let thumbnailURI = getAlbumByName(name).thumbnail;
  if (typeof thumbnailURI == 'undefined') return { err: `thumbnail for "${name}" does not exist` };
  return thumbnailURI;
}

function getAlbumNames() {
  return DEMO.albums.map(item => item.name);
}

function getAlbumNamesAndThumbs() {
  return DEMO.albums.map(item => {
    return { thumbSmall: item.images[item.thumbnailIndex].small,
      thumbMedium: item.images[item.thumbnailIndex].medium,
      thumbLarge: item.images[item.thumbnailIndex].large,
      name: item.name };
    });
}

function getAllAlbums() {
  return DEMO.albums;
}

module.exports = {
  getAlbumByName: getAlbumByName,
  getAlbumThumbnail: getAlbumThumbnail,
  getAlbumNames: getAlbumNames,
  getAllAlbums: getAllAlbums,
  getAlbumNamesAndThumbs: getAlbumNamesAndThumbs
};
