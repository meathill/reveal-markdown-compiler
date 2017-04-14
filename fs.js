/**
 * Created by realm on 2017/4/12.
 */

const fs = require('fs');

exports.readFile = (path, options) => {
  return new Promise(resolve => {
    fs.readFile(path, options, (err, content) => {
      if (err) {
        throw err;
      }
      resolve(content);
    });
  });
};

exports.writeFile = (path, data, options) => {
  return new Promise(resolve => {
    fs.writeFile(path, data, options, err => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
};