/**
 * render markdown to html
 * and insert into the index.html
 *
 * Created by realm on 2017/4/12.
 */

import defaults from 'lodash/lodash';
import cheerio from 'cheerio';
import {promises} from 'fs';
import render from './render';
import shortCode from './shortcode';
import {toCDNAll, toCDN} from './toCDN';

const {readFile, writeFile} = promises;

const SEPARATORS = {
  page: '<!-- page -->',
  section: '<!-- section -->',
  fragment: '<!-- fragment -->'
};

/**
 *
 * @param {String} html path to `index.dev.html`
 * @param {String} markdown path to `content.md`
 * @param {String} to target file
 * @param {Object} options
 *    @param {Object} options.separators use customized separators
 * @returns {Promise}
 */
const compiler = async function (html, markdown, to, {encoding, separators = {}} = {}) {
  separators = defaults(separators, SEPARATORS);
  encoding = encoding || 'UTF-8';
  let pages = await readFile(markdown, encoding);
  pages = await shortCode(pages);
  pages = render(pages, separators);
  let template = await readFile(html, encoding);
  let $ = cheerio.load(template, {
    decodeEntities: false,
  });
  $('script').attr('src', toCDNAll);
  $('link[rel=stylesheet]').attr('href', toCDNAll);
  $('section').replaceWith(pages.join(''));
  return writeFile(to, html, encoding);
};

export {
  compiler,
  toCDN,
};
