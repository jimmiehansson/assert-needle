'use strict';

/**
 * @function expected
 * @access public
 *
 * @description
 * DOING: Should return the exposed members of the proxy as invocables.
 * This function is intended to evaluate the expression of formats used
 * in string literals against matching types for assertions.
 *
 * @example
 *
 * @See output$
 * @inner
 * // return expected('123 abc').output({ has: ['abc', '123']})
 * // true
 * // return expected('123 abc').output({ has: ['bca', '321']})
 * // false
 * {@link test.js Tests for member output}
 *
 * @param {String} str - String literal to evaluate
 * @returns {Boolean|Undefined}
 */
function expected(str) {
  var memo = new WeakMap();

  var valid = {
    string: n => n !== void 0 && n.length > 0 && typeof n === 'string',
    array: n => Array.isArray(n) && n.length > 0,
    object: n => n !== null && typeof n === 'object'
  };
  var cursor = {
    set: (k, v) => (valid.object(k)) ? memo.set(k, v) : void 0,
    get: (k) => (valid.object(k)) ? memo.get(k) : void 0,
    has: (k) => (valid.object(k)) ? memo.has(k) : void 0
  };
  var shake = ({ s_, ndl_ }) => {
    var delim = ' '; // split str by this delimiter
    /* eslint-disable */
    // redact () [] : and \s (lint not identifying regex)
    var sane = /([\s()[\[^\]]:*)/mg;
    /* eslint-enable */
    if (!valid.string(s_) || !valid.array(ndl_)) return void 0;
    // sanitize str, split into array, iterate and evaluate presence of matched elements
    var tree = s_.replace(sane, ' ').split(delim).filter(o => ndl_.indexOf(o) !== -1);
    return tree.length !== 0;
  };

  return {
    // match any given list of elements against
    // the supplied string. See header documenation of function for examples.
    output: function output$({ has }) {
      if (!valid.string(str)) return void 0;
      var prev = { str: str, has: has };
      var tree = shake({ s_: str, ndl_: has });
      if (!cursor.has(prev)) cursor.set(prev, tree); // return as selector
      return cursor.get(prev);
    }
  };
}


module.exports = {
  expected
};
