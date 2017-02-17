/*jslint node: true, indent: 2 */
'use strict';
var doBody = require('./helper/body');

module.exports = function (node, indent) {
  var codegen = this.process.bind(this),
    str;

  str = 'while' + this.ws + '(' + codegen(node.test, indent) + ')';
  if (node.shortForm) {
    str += ':' + this.nl;
  } else {
    str += this.ws + '{' + this.nl;
  }
  str += doBody(
    codegen, indent, this.indent, this.nl, node.body.children
  );
  if (node.shortForm) {
    str += indent + 'endwhile;';
  } else {
    str += indent + '}';
  }
  return str;
};
