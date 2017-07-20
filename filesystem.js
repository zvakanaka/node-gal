const fs = require('fs');
const path = require('path');

function getFilesInDirectory(base='./', album='', fileExtensions=['jpg']) {
  const directory = `${base}/${album}`;
  if (!fs.existsSync(directory)) return { err: `directory "${directory}" does not exist` };
  const extensions = fileExtensions.map(ext => `.${ext.toLowerCase()}`);
  let files = fs.readdirSync(directory)
    .filter(function(file) {
      if (extensions.indexOf(path.extname(file).toLowerCase())>-1) return true;
    });
  return files;
}

function getDirectoriesInDirectory(base='./', ignore=[]) {
  if (!fs.existsSync(base)) return { err: `directory "${base}" does not exist`};
  let directories = fs.readdirSync(base)
    .filter(file => {
      if (fs.statSync(`${base}/${file}`).isDirectory()
        && (ignore.indexOf(file)===-1)) return true;
    });
  return directories;
}

module.exports = {
  getFilesInDirectory: getFilesInDirectory,
  getDirectoriesInDirectory: getDirectoriesInDirectory
};
// let images = getFilesInDirectory('/Users/qui10001/Desktop', '', ['png']);
// console.log('IMAGES', images);
// let dirs = getDirectoriesInDirectory('/Users/qui10001/Desktop', ['hide_me']);
// console.log('DIRS', dirs);
