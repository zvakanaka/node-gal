const fs = require('fs');
const path = require('path');

const DEMO = require('./demo.json');

function getFilesInDirectory(base='./', album='', fileExtensions=['jpg']) {
  const directory = `${album}`;
  if (typeof DEMO[directory] == 'undefined') return { err: `directory "${directory}" does not exist` };
  const extensions = fileExtensions.map(ext => `.${ext.toLowerCase()}`);
  return files = DEMO[directory]
    .filter(file => extensions.indexOf(path.extname(file).toLowerCase())>-1);
}

function getDirectoriesInDirectory(base='./', ignore=[]) {
  return Object.keys(DEMO);
}

module.exports = {
  getFilesInDirectory: getFilesInDirectory,
  getDirectoriesInDirectory: getDirectoriesInDirectory
};