/**
 * Created by meathill on 2017/4/15.
 */

const fs = require('fs');
const marked = require('./marked');
const partialRegExp = /{{> (\w+)}}/g;

module.exports = (content) => {
  let matches = content.match(partialRegExp);
  return Promise.all(matches.map( match => {
    let key = match[1];
    return new Promise(resolve => {
      fs.readFile('partials/' + key + '.md', 'utf8', (err, content) => {
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
      return content.replace(partialRegExp, (match, key) => {
        return partials[key];
      });
    });
};