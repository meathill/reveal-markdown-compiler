/**
 * Created by meathill on 2017/4/15.
 */

const fs = require('fs');
const path = require('path');
const marked = require('./marked');
const partialRegExp = /{{> (\w+)}}/;

module.exports = (content) => {
  let reg = new RegExp(partialRegExp, 'g');
  let matches = content.match(reg);
  return Promise.all(matches.map( match => {
    match = match.match(partialRegExp);
    let key = match[1];
    return new Promise(resolve => {
      fs.readFile(path.resolve(__dirname, 'partials/' + key + '.md'), 'utf8', (err, content) => {
        if (err) {
          throw err;
        }
        resolve([key, content]);
      });
    });
  }))
    .then(partials => {
      let map = {};
      partials.forEach( ([key, content]) => {
        map[key] = marked(content);
      });
      return map;
    })
    .then(partials => {
      return content.replace(reg, (match, key) => {
        return partials[key];
      });
    });
};