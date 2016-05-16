'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = exports.insertCommasInNumber = exports.renameKeys = exports.mergeListsByProp = exports.dropByName = exports.dropById = exports.dropByProp = exports.findByName = exports.findById = exports.findByProp = exports.filterByName = exports.filterById = exports.filterByProp = exports.pickDeep = exports.hasDeep = exports.isNilOrEmpty = exports.secondArgument = exports.firstArgument = exports.getPropOrEmptyString = exports.getPropOrEmptyObjectFunction = exports.defaultToEmptyString = exports.defaultToEmptyObject = exports.defaultToEmptyArray = exports.emptyArray = exports.emptyObject = exports.emptyString = exports.typeIs = exports.memoAndCurry = undefined;

var _ramda = require('ramda');

var memoAndCurry = exports.memoAndCurry = (0, _ramda.compose)(_ramda.memoize, _ramda.curry);

/**
 * return functions that always return their given values
 */
var typeIs = exports.typeIs = function typeIs(typeName) {
  return (0, _ramda.compose)((0, _ramda.equals)(typeName), _ramda.type);
};
var emptyString = exports.emptyString = (0, _ramda.always)('');
var emptyObject = exports.emptyObject = (0, _ramda.always)({});
var emptyArray = exports.emptyArray = (0, _ramda.always)([]);

/**
 * return functions that provide type safety by returning default values if the
 * arguments passed to them are undefined or null
 */
var defaultToEmptyArray = exports.defaultToEmptyArray = (0, _ramda.defaultTo)([]);
var defaultToEmptyObject = exports.defaultToEmptyObject = (0, _ramda.defaultTo)({});
var defaultToEmptyString = exports.defaultToEmptyString = (0, _ramda.defaultTo)('');

/**
 * return functions that return either their first argument or the specified default
 */
var getPropOrEmptyObjectFunction = exports.getPropOrEmptyObjectFunction = (0, _ramda.propOr)(emptyObject);
var getPropOrEmptyString = exports.getPropOrEmptyString = (0, _ramda.propOr)('');

/**
 * Returns the first argument it is invoked with
 *
 * @param  {Args} `args` arguments at the beginning of compose pipe
 * @return {*}
 */
var firstArgument = exports.firstArgument = (0, _ramda.nthArg)(0);

/**
 * Returns the second argument it is invoked with
 *
 * @param  {Args} `args` arguments at the beginning of compose pipe
 * @return {*}
 */
var secondArgument = exports.secondArgument = (0, _ramda.nthArg)(1);

/**
 * Check whether a value of any type is Empty, Null, or undefined
 *
 * @param  {*} `val`  val to pipe through predicates
 * @return {Boolean}
 */
var isNilOrEmpty = exports.isNilOrEmpty = (0, _ramda.anyPass)([_ramda.isNil, _ramda.isEmpty]);

/**
 * Check if a key exists at a deep path
 *
 * @param  {Array} `arr`  list of strings used as path to prop
 * @return {Boolean}
 */
var hasDeep = exports.hasDeep = (0, _ramda.curry)((0, _ramda.compose)(_ramda.not, _ramda.isNil, (0, _ramda.pathOr)(null)));

/**
 * Return a whitelisted set of keys from nested object path
 *
 * @param  {Array} `arr`  list of strings used as path to prop
 * @return {Boolean}
 */
var pickDeep = exports.pickDeep = (0, _ramda.memoize)((0, _ramda.curry)(function (pathToProp, pickList, data) {
  var processor = (0, _ramda.compose)((0, _ramda.objOf)((0, _ramda.last)(pathToProp)), (0, _ramda.isEmpty)(pickList) ? _ramda.identity : (0, _ramda.pick)(pickList), (0, _ramda.path)(pathToProp));

  return processor(data);
}));

/**
 * Higher order function to apply a property matching predicate to list
 * transformation functions like filter or reject
 *
 * @param  {Function} func  function to apply prop matching predicate to
 * @param  {String}   key   `key` key to match with the specified value
 * @param  {String}   val   `val` value to match on the specified key
 * @return {Function}
 */
var applyByProp = (0, _ramda.curry)(function (func, key, val, data) {
  return func((0, _ramda.propEq)(key, val), defaultToEmptyArray(data));
});

/**
 * Curryable function to filter a list of objects according to the value of
 * a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
var filterByProp = exports.filterByProp = applyByProp(_ramda.filter);

// filters for common property names
var filterById = exports.filterById = (0, _ramda.memoize)(filterByProp('id'));
var filterByName = exports.filterByName = (0, _ramda.memoize)(filterByProp('name'));

/**
 * Curryable function to filter a list of objects according to the value of
 * a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
var findByProp = exports.findByProp = applyByProp(_ramda.find);

// lookups for common property names
var findById = exports.findById = (0, _ramda.memoize)(findByProp('id'));
var findByName = exports.findByName = (0, _ramda.memoize)(findByProp('name'));

/**
 * Curryable function to drop items from a list of objects according to the
 * value of a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
var dropByProp = exports.dropByProp = applyByProp(_ramda.reject);

// rejectors for common property names
var dropById = exports.dropById = (0, _ramda.memoize)(dropByProp('id'));
var dropByName = exports.dropByName = (0, _ramda.memoize)(dropByProp('name'));

var mergeListsByPropRaw = function mergeListsByPropRaw(prop, source, search) {
  var buildPredicate = (0, _ramda.compose)(_ramda.anyPass, (0, _ramda.map)((0, _ramda.propEq)(prop)), (0, _ramda.pluck)(prop));
  var predicate = buildPredicate(source);
  var matches = (0, _ramda.filter)(predicate, search);
  var mergeWithMatch = function mergeWithMatch(x) {
    return (0, _ramda.merge)(x, findByProp(prop, x[prop], matches));
  };
  var mergeElement = (0, _ramda.ifElse)(predicate, mergeWithMatch, (0, _ramda.always)(undefined));

  return (0, _ramda.map)(mergeElement, source);
};

var mergeListsByProp = exports.mergeListsByProp = memoAndCurry(mergeListsByPropRaw);

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
var renameKeys = exports.renameKeys = (0, _ramda.curry)(function (keysMap, obj) {
  return (0, _ramda.reduce)(function (acc, key) {
    acc[keysMap[key] || key] = obj[key];

    return acc;
  }, {}, (0, _ramda.keys)(obj));
});

var insertCommaEveryThree = (0, _ramda.replace)(/\B(?=(\d{3})+(?!\d))/g, ',');
var convertToString = (0, _ramda.ifElse)(typeIs('String'), _ramda.identity, _ramda.toString);

var insertCommasInNumber = exports.insertCommasInNumber = (0, _ramda.compose)(insertCommaEveryThree, convertToString);

/**
 * Simple logger for debugging function composition without breaking data flow
 *
 * @param {*}
 * @return {undefined}
 */
var check = exports.check = function check(val) {
  console.log(val);
  return val;
};

exports.default = {
  check: check,
  dropById: dropById,
  dropByProp: dropByProp,
  emptyArray: emptyArray,
  emptyObject: emptyObject,
  emptyString: emptyString,
  filterByProp: filterByProp,
  firstArgument: firstArgument,
  getPropOrEmptyObjectFunction: getPropOrEmptyObjectFunction,
  getPropOrEmptyString: getPropOrEmptyString,
  hasDeep: hasDeep,
  insertCommasInNumber: insertCommasInNumber,
  isNilOrEmpty: isNilOrEmpty,
  mergeListsByProp: mergeListsByProp,
  renameKeys: renameKeys,
  secondArgument: secondArgument
};