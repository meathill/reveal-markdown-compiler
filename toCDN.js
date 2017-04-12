/**
 * Created by realm on 2017/4/12.
 */

const CDN = require('./cdn.json');

module.exports = function toCDN(match, key) {
  return CDN[key];
};