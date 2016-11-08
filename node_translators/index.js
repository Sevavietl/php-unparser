/*jslint node: true, indent: 2, stupid:true, nomen:true */
'use strict';
var fs      = require('fs');

function CodeGen(indent, dontUseWhitespaces) {
  this.ws = ' ';
  if (dontUseWhitespaces) {
    this.ws = '';
  }
  this.indent = typeof indent === 'string'  ? indent : '  ';
  this.nl     = this.indent !== '' ? '\n' : '';

  this.process = function (node, indent) {

    if (node === null) {
      return '';
    }

    if (Array.isArray(node) && typeof this[node[0]] === 'function') {
      return this[node[0]](node, indent);
    }
    console.log(node);
    process.exit();
  };
}
fs.readdirSync(__dirname).forEach(function (file) {
  if (/^[\w._\-]+\.js$/.test(file) && file !== 'index.js') {
    var name = file.replace('.js', '');
    CodeGen.prototype[name] = require('./' + name);
  }
});

module.exports = CodeGen;
