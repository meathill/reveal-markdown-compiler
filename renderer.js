/**
 * Created by realm on 2017/4/12.
 */

const marked = require('marked');

let renderer = new marked.Renderer();
let separator = ' | ';
renderer.image = function (href, title, text) {
  let attrs = '';
  title = title || '';
  text = text || '';
  if (href.indexOf(separator) !== -1) {
    attrs = href.split(separator);
    href = attrs[0];
    attrs = attrs[1].split(' ').filter(item => {
      return item;
    }).map(pairs => {
      let arr = pairs.split('=');
      return `${arr[0]}="${arr[1]}"`;
    }).join(' ');
  }

  return `<img src="${href}" title="${title}" alt="${text}" ${attrs}>`;
};

module.exports = renderer;