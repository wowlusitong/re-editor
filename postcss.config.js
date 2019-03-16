const path = require('path');

const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');

module.exports = {
 plugins: [
   autoprefixer(),
   postcssImport(),
   postcssNested(),
   postcssSimpleVars()
 ]
};
