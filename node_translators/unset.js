/*jslint node: true, indent: 2 */
'use strict';

var params = require('./helper/parameters');

module.exports = function (node, indent) {
  return 'unset(' + params(node.arguments, indent, this) + ')';
};
