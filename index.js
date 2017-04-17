/**
 * render markdown to html
 * and insert into the index.html
 *
 * Created by realm on 2017/4/12.
 */

const _ = require('lodash');
const cheerio = require('cheerio');
const minifier = require('html-minifier');
const fs = require('./fs');
const render = require('./render');
const shortCode = require('./shortcode');
const {toCDNAll, toCDN} = require('./toCDN');

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
exports.compiler = (html, markdown, to, options = {}) => {
  let separators = _.defaults(options.separators, SEPARATORS);
  let encoding = options.encoding || 'UTF-8';
  return fs.readFile(markdown, encoding)
    .then( pages => {
      return shortCode(pages);
    })
    .then( content => {
      return render(content, separators);
    })
    .then( pages => {
      return fs.readFile(html, encoding)
        .then( content => {
          return [pages.join(''), content];
        });
    })
    .then( ([pages, html]) => {
      let $ = cheerio.load(html, {
        decodeEntities: false
      });
      $('script').attr('src', toCDNAll);
      $('link[rel=stylesheet]').attr('href', toCDNAll);
      pages = minifier(pages, {
        collapseWhitespace: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true
      });
      $('section').replaceWith(pages);
      return fs.writeFile(to, $.html(), encoding);
    });
};

exports.toCDN = toCDN;