/**
 * Created by realm on 2017/4/12.
 */

const CDN = require('./cdn.json');
const PATH_REG = /\.\/node_modules\/([\w.\-]+)\//;

function toCDN(match, key) {
  return CDN[key];
}

exports.toCDNAll = (i, src) => {
  if (!PATH_REG.test(src)) {
    return src;
  }
  src = src.replace(PATH_REG, toCDN);
  let filename = src.substr(src.lastIndexOf('/') + 1);
  if (!/.min\.(js|css)$/.test(filename)) {
    src = src.substr(0, src.lastIndexOf('.')) + '.min' + src.substr(src.lastIndexOf('.'));
  }
  return src;
};
exports.toCDN = toCDN;