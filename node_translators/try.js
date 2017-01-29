/*jslint node: true, indent: 2 */
'use strict';

var doBody = require('./helper/body');
var identifier = require('./identifier');

function resolveExceptions (items) {
  var result = [];
  for(var i = 0; i < items.length; i++) {
    result.push(identifier(items[i]));
  }
  return result.join('|');
}

module.exports = function (node, indent) {
  var codegen, str;


  codegen = this.process.bind(this);
  str = 'try' + this.ws + '{' + this.nl;
  str += doBody(codegen, indent, this.indent, this.nl, node.body.children);
  str += indent + '}';

  str += node.catches.map(function (except) {
    var out = this.ws + 'catch' + this.ws + '(' + resolveExceptions(except.what) + ' ' + codegen(except.variable) + ')' + this.ws + '{' + this.nl;
    out += doBody(codegen, indent, this.indent, this.nl, except.body.children);
    out += indent + '}';
    return out;
  }, this).join('');

  if (node.allways) {
    str += this.ws + 'finally' + this.ws + '{' + this.nl;
    str += doBody(codegen, indent, this.indent, this.nl, node.allways.children);
    str += indent + '}';
  }

  return str;
};
