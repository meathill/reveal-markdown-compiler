/**
 * Created by realm on 2017/4/12.
 */

const marked = require('marked');
const renderer = require('./renderer');
const cheerio = require('cheerio');

module.exports = (content, separators) => {
  let pages = content.split(separators.page);
  return pages.map( page => {
    let pages = page.split(separators.section);
    pages = pages.map( page => {
      page = page.split('Note:')[0];
      let fragments = page.split(separators.fragment);
      if (fragments.length === 1) {
        return '<section>' + marked(page, {renderer: renderer}) + '</section>';
      }

      fragments = fragments.map( fragment => {
        fragment = marked(fragment, {renderer: renderer});
        let $ = cheerio.load(fragment, {
          decodeEntities: false
        });
        if ($.children().length === 1) {
          $.children().addClass('fragment');
          return $.html();
        } else {
          return '<div class="fragment">' + fragment + '</div>';
        }
      });
      return '<section>' + fragments.join('\r') + '</section>';
    });
    if (pages.length > 1) {
      return '<section>' + pages.join('') + '</section>';
    } else {
      return pages[0];
    }
  });
};