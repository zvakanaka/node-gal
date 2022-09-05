import {existsSync, readdirSync, statSync} from 'fs';
import {extname} from 'path';

export function getFilesInDirectory(base='./', album='', fileExtensions=['jpg']) {
  const directory = `${base}/${album}`;
  if (!existsSync(directory)) return { err: `directory "${directory}" does not exist` };
  const extensions = fileExtensions.map(ext => `.${ext.toLowerCase()}`);
  let files = readdirSync(directory)
    .filter(function(file) {
      if (extensions.indexOf(extname(file).toLowerCase())>-1) return true;
    });
  return files;
}

export function getDirectoriesInDirectory(base='./', ignore=[]) {
  if (!existsSync(base)) return { err: `directory "${base}" does not exist`};
  let directories = readdirSync(base)
    .filter(file => {
      if (statSync(`${base}/${file}`).isDirectory()
        && (ignore.indexOf(file)===-1)) return true;
    });
  return directories;
}

// let images = getFilesInDirectory('/Users/qui10001/Desktop', '', ['png']);
// console.log('IMAGES', images);
// let dirs = getDirectoriesInDirectory('/Users/qui10001/Desktop', ['hide_me']);
// console.log('DIRS', dirs);
