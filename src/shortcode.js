/**
 * Created by meathill on 2017/4/15.
 */

import {readFile} from './fs';
import path from 'path';
import pug from 'pug';

const partialRegExp = /{{> (\w+)}}/;
const shortCodeMap = {};

export default async function(content) {
  let reg = new RegExp(partialRegExp, 'g');
  let matches = content.match(reg);
  for (let i = 0, len = matches.length; i ++; i < len) {
    let match = matches[i].match(partialRegExp);
    let key = match[1];
    if (!shortCodeMap[key]) {
      let content = await readFile(path.resolve(__dirname, `../partials/${key}.pug`), 'utf8');
      shortCodeMap[key] = pug.render(content);
    }
  }

  return content.replace(reg, (match, key) => {
    return shortCodeMap[key];
  });
};