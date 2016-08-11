'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettyCheck = exports.check = exports.buildQueryString = exports.insertCommasInNumber = exports.camelize = exports.snakeify = exports.appendStr = exports.firstCharIs = exports.makeRegexs = exports.mergeListsByProp = exports.dropByName = exports.dropById = exports.dropByProp = exports.findByName = exports.findById = exports.findByProp = exports.filterByName = exports.filterById = exports.filterByProp = exports.containsAll = exports.makeLenses = exports.renameKeys = exports.anyPropSatisfies = exports.allKeysContaining = exports.mapKeys = exports.pickDeep = exports.parseHexBinary = exports.between = exports.LTE = exports.LT = exports.GTE = exports.GT = exports.hasDeep = exports.exists = exports.isNotEmpty = exports.isNilOrEmpty = exports.secondArgument = exports.firstArgument = exports.getPropOrEmptyString = exports.getPropOrEmptyObjectFunction = exports.defaultToEmptyString = exports.defaultToEmptyObject = exports.defaultToEmptyArray = exports.emptyArray = exports.emptyObject = exports.emptyString = exports.typeIs = undefined;

var _flat = require('flat');

var _ramda = require('ramda');

/**
 * @module constants
 * @description Functions that always return the same value
 */

/**
 * Curried function that takes the string name of a data type per
 * [ramda#type]{@link http://ramdajs.com/0.21.0/docs/#type},
 * a value of any type, and returns a boolean to indicate
 * whether or not the value is of specified type
 *
 * @function
 * @param {String}  typeName  name of the type to look for
 * @param {*}       testVal   any value of any type
 * @return {Boolean}          Whether or not the value is of the specified type
 *
 * @example
 * const isString = typeIs('String')
 * const isObject = typeIs('Object')
 *
 * const insistentString = 'i AM a string'
 * const obj = { value: insistentString}
 *
 * isString(insistentString) //=> true
 * isString(obj) //=> false
 *
 * isObject(insistentString) //=> false
 * isObject(obj) //=> true
 */
/* eslint-disable new-cap */
var typeIs = exports.typeIs = function typeIs(typeName) {
  return (0, _ramda.compose)((0, _ramda.equals)(typeName), _ramda.type);
};

/**
 * Returns an empty string
 *
 * @function
 * @return {String} Empty string
 * @example
 * emptyString() //=> ''
 * emptyString('test') //=> ''
 * emptyString(true) //=> ''
 */
var emptyString = exports.emptyString = (0, _ramda.always)('');

/**
 * Returns an empty object
 *
 * @function
 * @return {Object} Empty object
 * @example
 * emptyObject() //=> {}
 * emptyObject('test') //=> {}
 * emptyObject(true) //=> {}
 */
var emptyObject = exports.emptyObject = (0, _ramda.always)({});

/**
 * Returns an empty array
 *
 * @function
 * @return {Array} Empty array
 * @example
 * emptyArray() //=> []
 * emptyArray('test') //=> []
 * emptyArray(true) //=> []
 */
var emptyArray = exports.emptyArray = (0, _ramda.always)([]);

// /**
//  * @module defaults
//  * @description Return default values if the arguments passed to them are undefined or null
//  */
var defaultToEmptyArray = exports.defaultToEmptyArray = (0, _ramda.defaultTo)([]);
var defaultToEmptyObject = exports.defaultToEmptyObject = (0, _ramda.defaultTo)({});
var defaultToEmptyString = exports.defaultToEmptyString = (0, _ramda.defaultTo)('');

// /**
//  * @module propertyDefaults
//  * @description Return either their first argument or the specified default
//  */
var getPropOrEmptyObjectFunction = exports.getPropOrEmptyObjectFunction = (0, _ramda.propOr)(emptyObject);
var getPropOrEmptyString = exports.getPropOrEmptyString = (0, _ramda.propOr)('');

/**
 * @module argIndex
 * @description Return only the specified index of argument array
 */

/**
 * Returns the first argument it is invoked with
 *
 * @function
 * @param  {...*} args  any number of arguments
 * @return {*}          0 index of arguments array
 *
 * @example
 * firstArgument(1) //=> 1
 * firstArgument(1, 2) //=> 1
 * firstArgument(1, 2, 3) //=> 1
 */
var firstArgument = exports.firstArgument = (0, _ramda.nthArg)(0);

/**
 * Returns the second argument it is invoked with
 *
 * @function
 * @param  {...*} args  any number of arguments
 * @return {*}          1 index of arguments array
 *
 * @example
 * secondArgument(1) //=> undefined
 * secondArgument(1, 2) //=> 2
 * secondArgument(1, 2, 3) //=> 2
 */
var secondArgument = exports.secondArgument = (0, _ramda.nthArg)(1);

/**
 * @module existence
 * @description Check various conditions around whether values are falsey or truthy
 */

/**
 * Check whether a value of any type is Empty, Null, or undefined
 *
 * @function
 * @param  {*}        val any value
 * @return {Boolean}      whether the value is null, undefined, or empty in terms of
 *                        [ramda#empty]{@link http://ramdajs.com/0.21.0/docs/#isEmpty}
 *
 * @example
 * isNilOrEmpty({ test: 'test'}) //=> false
 * isNilOrEmpty([1]) //=> false
 *
 * isNilOrEmpty({}) //=> true
 * isNilOrEmpty([]) //=> true
 * isNilOrEmpty('') //=> true
 * isNilOrEmpty(undefined) //=> true
 * isNilOrEmpty(null) //=> true
 */
var isNilOrEmpty = exports.isNilOrEmpty = (0, _ramda.anyPass)([_ramda.isNil, _ramda.isEmpty]);

/**
 * Checks if value is not empty
 *
 * @param  {*}  val   any value
 * @return {Boolean}  true if the value is anything but an empty object or array
 *
 * isNotEmpty(null) //=> true
 * isNotEmpty(undefined) //=> true
 *
 * isNotEmpty('anything else') //=> true
 * isNotEmpty([]) //=> false
 * isNotEmpty({}) //=> false
 */
var isNotEmpty = exports.isNotEmpty = (0, _ramda.complement)(_ramda.isEmpty);

/**
 * Checks if any value is both
 * - not undefined
 * - not null
 *
 * @param  {*}  val   any value
 * @return {Boolean}  true if the value is niether null or undefined
 *
 * exists(null) //=> false
 * exists(undefined) //=> false
 *
 * exists('anything else') //=> true
 * exists([]) //=> true
 * exists({}) //=> true
 */
var exists = exports.exists = (0, _ramda.complement)(_ramda.isNil);

/**
 * Check if a key exists at a deep path
 *
 * @function
 * @param  {String[]} path  list of strings used as path to prop
 * @param  {Object}   obj   the object to analyze
 * @return {Boolean}        True if the given object has a key at the given path that is
 *                          niether null or undefined
 *
 * @example
 * const obj = { one: { two: { three: 'here I am' } } }
 *
 * hasDeep(['one', 'two', 'three'], obj) //=> true
 * hasDeep(['one', 'two', 'fish'], obj) //=> false
 */
var hasDeep = exports.hasDeep = (0, _ramda.pathSatisfies)(exists);

/**
 * @module number
 * @description Equality and other predicate checks
 */
var GT = exports.GT = (0, _ramda.flip)(_ramda.gt);
var GTE = exports.GTE = (0, _ramda.flip)(_ramda.gte);
var LT = exports.LT = (0, _ramda.flip)(_ramda.lt);
var LTE = exports.LTE = (0, _ramda.flip)(_ramda.gte);

/**
 * Takes a low number, and a high number, and a test value and returns true if the
 * test value is between the range established by first and second args
 *
 * @function
 * @param  {Number} low   bottom of range
 * @param  {Number} high  top of range
 * @param  {Number} test  checks whether this val is within range
 * @return {Boolean}
 *
 * @example
 * const 1thru10 = between(1, 10);
 * const 1thru10(9) //=> true
 * const 1thru10(10) //=> true
 * const 1thru10(11) //=> false
 * const 1thru10(1) //=> true
 * const 1thru10(0) //=> false
 */
var between = exports.between = (0, _ramda.curry)(function (l, h, x) {
  return (0, _ramda.allPass)([(0, _ramda.gte)(_ramda.__, l), (0, _ramda.lte)(_ramda.__, h)])(x);
});

var minus = (0, _ramda.flip)(_ramda.subtract);
var parseInt16 = (0, _ramda.flip)(parseInt)(16);
var maybeShift = (0, _ramda.ifElse)(GT(127), minus(256), _ramda.identity);
var parseByte = (0, _ramda.compose)(maybeShift, parseInt16);

var parseHexBinary = exports.parseHexBinary = (0, _ramda.compose)((0, _ramda.map)(parseByte), (0, _ramda.splitEvery)(2));

/**
 * @module object
 * @description Advanced object inspection and property filtering
 */

var pickDeepRaw = function pickDeepRaw(pathToProp, pickList, data) {
  return (0, _ramda.compose)((0, _ramda.objOf)((0, _ramda.last)(pathToProp)), (0, _ramda.isEmpty)(pickList) ? _ramda.identity : (0, _ramda.pick)(pickList), (0, _ramda.path)(pathToProp))(data);
};

/**
 * Return a whitelisted set of keys from nested object path
 *
 * @function
 * @param  {String[]} pathToProp  list of strings used as path to prop
 * @param  {String[]} pickList    list of property names to pick
 * @param  {Object}   obj         object to pick properties from
 * @return {Object}               clone of the object at the specified path of the original object
 *                                with all but the specified keys removed
 *
 * @example
 * const obj = {
 *   one: {
 *     two: {
 *       three: {
 *         animal: {
 *           type: 'fish',
 *           name: 'mark',
 *           game: 'polo',
 *         },
 *       },
 *     },
 *   },
 * }
 * const path = ['one', 'two', 'three', 'animal']
 * const props = ['name', 'game']
 * pickDeep(path, props, obj) //=> { name: 'mark', game: 'polo' }
 */
var pickDeep = exports.pickDeep = (0, _ramda.curry)(pickDeepRaw);

var mapKeysRaw = function mapKeysRaw(fn, obj) {
  var applyFn = (0, _ramda.compose)(_ramda.fromPairs, (0, _ramda.map)((0, _ramda.adjust)(fn, 0)), _ramda.toPairs);
  return applyFn(obj);
};

/**
 * Takes a function (g) and an object and returns an object where each key is
 * the result of invoking g with that key
 *
 * @function
 * @param  {Function} fn    function applied to each key
 * @param  {Object}   data  object to map keys from
 * @return {Object}
 *
 * @example
 * const obj { a: 1, b: 2, c: 3 }
 *
 * const upper = key => key.toUpperCase()
 * const upperCaseKeys = mapKeys(upper)
 * const upperCaseKeys(obj)
 * //=> { A: 1, B: 2, C: 3 }
 */
var mapKeys = exports.mapKeys = (0, _ramda.curry)(mapKeysRaw);

var keyContains = function keyContains(str) {
  return (0, _ramda.compose)((0, _ramda.contains)(str), secondArgument);
};

var allKeysContainingRaw = function allKeysContainingRaw(str, obj) {
  return (0, _ramda.compose)((0, _ramda.pickBy)(keyContains(str)), _flat.flatten)(obj);
};

/**
 * Takes a string and an object, and returns a flattened copy of the object with
 * any key in the object that contains the specified string regardless
 * of the depth each key is located at within the object
 *
 * @function
 * @param  {String} str string to search for in each key
 * @param  {Object} obj object to search for keys in
 * @return {Object}     Object with keys that contain the specified string
 *
 * @example
 * const obj = {
 *   a1: 'something',
 *   a2: 'something else',
 *   a3: { b: { dragon: true } }
 * }
 *
 * allKeysContaining('rag', obj) //=> { 'a.b.dragon': true }
 */
var allKeysContaining = exports.allKeysContaining = (0, _ramda.curry)(allKeysContainingRaw);

var anyPropSatisfiesRaw = function anyPropSatisfiesRaw(predicate, obj) {
  return (0, _ramda.compose)((0, _ramda.any)(predicate), _ramda.values)(obj);
};

/**
 * Takes a predicate and an object and returns true if the value of any of
 * the objects properties pass the predicate
 *
 * @function
 * @param {Function}  predicate pass or fail each key's value
 * @param {Object}    obj       object to analyze
 * @return {Boolean}            true if any key's value passes the predicate
 */
var anyPropSatisfies = exports.anyPropSatisfies = (0, _ramda.curry)(anyPropSatisfiesRaw);

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

/**
 * Takes a list of string prop names, and returns an object where each key
 * is a lens for its respective prop
 *
 * @function
 * @param  {string[]} propNames list of property names
 * @return {Object}             map of lenses
 */
var makeLenses = exports.makeLenses = (0, _ramda.converge)(_ramda.zipObj, [_ramda.identity, (0, _ramda.map)((0, _ramda.unapply)(_ramda.lensPath))]);

/**
 * @module list
 * @description Operations on lists of objects
 */

/**
 * Takes two lists of values, returns true if all the values
 * in the first array are present in the second array
 *
 * @function
 * @param  {Array} checkArr   list of values to check for
 * @param  {Array} searchArr  list of values to search in
 * @return {Boolean}
 *
 * @example
 * const vals = [1, 2, 3]
 *
 * const containsVals = containsAll(vals)
 * containsVals([1, 2, 3, 4, 5]) //=> true
 * containsVals([1, 2, 4, 5, 6]) // false
 */
var containsAll = exports.containsAll = (0, _ramda.compose)(_ramda.allPass, (0, _ramda.map)(_ramda.contains));

/**
 * Higher order function to apply a property matching predicate to list
 * transformation functions like filter or reject
 *
 * @function
 * @param  {Function} func  function to apply prop matching predicate to
 * @param  {String}   key   key to match with the specified value
 * @param  {*}        val   value to match on the specified key
 * @param  {Object[]} list  list against which to apply function
 * @return {Object[]}       a list derived from original list according to func
 */
var applyByProp = (0, _ramda.curry)(function (func, key, val, list) {
  return func((0, _ramda.propEq)(key, val), defaultToEmptyArray(list));
});

/**
 * Curried function to filter a list of objects according to the value of
 * a specified property
 *
 * @function
 * @param  {String}   key   key to match with the specified value
 * @param  {*}        val   value to match on the specified key
 * @param  {Object[]} list  against which to apply function
 * @return {Object[]}       filtered list of objects
 *
 * @example
 * const friends = [
 *   { name: 'trogdor', type: 'dragon' },
 *   { name: 'booseph', type: 'dragon' },
 *   { name: 'kitty', type: 'kitty' },
 * ]
 *
 * filterByProp('type', 'dragon', friends)
 * //=> [ { name: 'trogdor', type: 'dragon' }, { name: 'booseph', type: 'dragon' } ]
 */
var filterByProp = exports.filterByProp = applyByProp(_ramda.filter);

/**
 * Curried function to filter a list of objects by id property
 *
 * @function
 * @param  {*}        val   value to match against id key
 * @param  {Object[]} list  list to filter
 * @return {Object[]}       filtered list of objects
 *
 * @example
 * const friends = [
 *   { name: 'trogdor', id: 'dragon' },
 *   { name: 'booseph', id: 'dragon' },
 *   { name: 'kitty', id: 'kitty' },
 * ]
 *
 * filterById('dragon', friends)
 * //=> [ { name: 'trogdor', id: 'dragon' }, { name: 'booseph', id: 'dragon' } ]
 */
var filterById = exports.filterById = filterByProp('id');

/**
 * Curried function to filter a list of objects by name property
 *
 * @function
 * @param  {*}        val   value to match against name key
 * @param  {Object[]} list  list to filter
 * @return {Object[]}       filtered list of objects
 *
 * @example
 * const friends = [
 *   { name: 'trogdor', type: 'dragon' },
 *   { name: 'trogdor', type: 'giant-dragon' },
 *   { name: 'kitty', type: 'kitty' },
 * ]
 *
 * filterByName('trogdor', friends)
 * //=> [ { name: 'trogdor', type: 'dragon' }, { name: 'trogdor', type: 'giant-dragon' } ]
 */
var filterByName = exports.filterByName = filterByProp('name');

/**
 * Curried function to find the first object in a list where the value of
 * a specified property matches the given value
 *
 * @function
 * @param  {String}   key   key to match with the specified value
 * @param  {*}        val   value to match on the specified key
 * @param  {Object[]} list  list of objects to search in
 * @return {Object}         the first object in list where the given property matches the
 *                          given value
 *
 * @example
 * const friends = [
 *   { name: 'trogdor', name: 'dragon' },
 *   { name: 'booseph', name: 'dragon' },
 *   { name: 'kitty', name: 'kitty' },
 * ]
 *
 * findByProp('name', 'trogdor', friends)
 * //=> [ { name: 'trogdor', name: 'dragon' } ]
 */
var findByProp = exports.findByProp = applyByProp(_ramda.find);

// lookups for common property names
var findById = exports.findById = findByProp('id');
var findByName = exports.findByName = findByProp('name');

/**
 * Curried function to drop items from a list of objects according to the
 * value of a specified property
 *
 * @function
 * @param  {String} key key to match with the specified value
 * @param  {String} val value to match on the specified key
 * @return {Function}
 */
var dropByProp = exports.dropByProp = applyByProp(_ramda.reject);

// rejectors for common property names
var dropById = exports.dropById = dropByProp('id');
var dropByName = exports.dropByName = dropByProp('name');

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

/**
 * Takes a property name, a source list and a search list, returns the result of merging each
 * element from the source list with the first object from the search list where the value
 * of the given property is equal
 *
 * @function
 * @param  {String}   prop    name of property merge by
 * @param  {Object[]} source  array to search for matches in
 * @param  {Object[]} search  array to project result from
 * @return {Object[]          list of objects that contain all properties from each list
 *                            where the given property was equal
 *
 * @example
 * const sourceArr = [{ id: 1, likes: 'gibbons' }, { id: 3, likes: 'pasta' }]
 * const searchArr = [
 *   { id: 1, firstName: 'Bob', lastName: 'Franklin' },
 *   { id: 2, firstName: 'Rob', lastName: 'Lob' },
 *   { id: 3, firstName: 'Tob', lastName: 'Lob' },
 * ]
 *
 * mergeListsByProp('id', sourceArr, searchArr)
 * //=> [
 * //  { id: 1, likes: 'gibbons', firstName: 'Bob', lastName: 'Franklin' },
 * //  { id: 3, likes: 'pasta', firstName: 'Tob', lastName: 'Lob' },
 * //]
 */
var mergeListsByProp = exports.mergeListsByProp = (0, _ramda.curry)(mergeListsByPropRaw);

/**
  * @module string
  * @description Helpers for common string manipulation
  */

var regex = function regex(x) {
  return new RegExp(x);
};
var mapTests = (0, _ramda.map)((0, _ramda.compose)(_ramda.test, regex));

/**
 * Takes a list of strings, and returns an object where each string is used
 * as a key to expose a simple regex pattern
 *
 * @function
 * @param {string[]}  tests strings to base simple regex patterns on
 * @return {Object}
 *
 * @example
 * const patterns = makeRegexs(['a', 'b'])
 * patterns.b('best') //=> true
 * patterns.b('rest') //=> false
 */
var makeRegexs = exports.makeRegexs = (0, _ramda.converge)(_ramda.zipObj, [_ramda.identity, mapTests]);

var headOfSecondArg = function headOfSecondArg(char, arr) {
  return (0, _ramda.head)(arr);
};
/**
 * Returns a curried function that checks its first argument matches the first
 * character of its second argument
 *
 * @function
 * @param  {String}   matchString string to match against
 * @param  {String}   testString  string to test
 * @return {Boolean}              true if the first character of testString is
*                                 equal to the matchString
*
* @example
*
* const one = 'one'
* firstCharIs('o', one) //=> true
* firstCharIs('t', one) //=> false
*
* const two = 'two'
* firstCharIs('t', two) //=> true
* firstCharIs('o', two) //=> false
*
*/
var firstCharIs = exports.firstCharIs = (0, _ramda.converge)(_ramda.equals, [_ramda.identity, headOfSecondArg]);

/**
 * Produces a new string by adding the first argument to the end of the second
 *
 * @function
 * @param  {String} a   string to add
 * @param  {String} b   stirng to begin with
 * @return {String}     concatenated result
 *
 * @example
 * const insultSomeone = appendStr(' are bad at golf')
 *
 * insultSomeone('you')
 * //=> 'you are bad at golf'
 */
var appendStr = exports.appendStr = (0, _ramda.flip)(_ramda.concat);

var processSnakeCaps = (0, _ramda.replace)(/([a-z\d])([A-Z]+)/g, '$1_$2');
var insertUnderscores = (0, _ramda.replace)(/[-\s]+/g, '_');
/**
 * Converts text to snake case
 *
 * @function
 * @param   {String} str  string to convert
 * @return  {String}      snkae cased string
 *
 * @example
 * snakeify('MozTransform')
 * // => 'moz_transform'
 */
var snakeify = exports.snakeify = (0, _ramda.compose)(_ramda.toLower, insertUnderscores, processSnakeCaps, _ramda.trim);

var capitalize = function capitalize(match, c) {
  return c ? c.toUpperCase() : '';
};
var processCamelCaps = (0, _ramda.replace)(/[-_\s]+(.)?/g, capitalize);
/**
 * Converts text to camel case
 *
 * @function
 * @param   {String} str  string to convert
 * @return  {String}      camel cased string
 *
 * @example
 * camelize('moz_transform')
 * // => 'MozTransform'
 */
var camelize = exports.camelize = (0, _ramda.compose)(processCamelCaps, _ramda.trim);

var insertCommaEveryThree = (0, _ramda.replace)(/\B(?=(\d{3})+(?!\d))/g, ',');
var convertToString = (0, _ramda.ifElse)(typeIs('String'), _ramda.identity, _ramda.toString);
/**
 * Takes a string or integer and returns a stringified version with comma insertion
 *
 * @function
 * @param  {(String|Number)} val  number to format
 * @return {String}               formatted string
 *
 * @example
 * insertCommasInNumber('20000') //=> '20,000'
 * insertCommasInNumber(2000) //=> '2,000'
 * insertCommasInNumber(200) //=> '200'
 */
var insertCommasInNumber = exports.insertCommasInNumber = (0, _ramda.compose)(insertCommaEveryThree, convertToString);

var joinParamPairs = (0, _ramda.map)((0, _ramda.join)('='));
var joinParamSets = (0, _ramda.join)('&');

/**
 * Takes an array of tuples where the first element is a param name and the
 * second element is a param value, returns a standard url querystring
 *
 * @function
 * @param  {Array[]} tuples pairs of param names and values
 * @return {String}         standard url querystring
 *
 * @example
 * const tuples = [
 *   ['param1', 'value1'],
 *   ['param2', 'value2'],
 * ]
 *
 * buildQueryString(tuples) = //=> 'param1=value1&param2=value'
 */
var buildQueryString = exports.buildQueryString = (0, _ramda.compose)(joinParamSets, joinParamPairs);

/**
  * @module debugging
  * @description Helpers for debugging functional js
  */

/**
 * Simple logger for debugging function composition without breaking data flow
 *
 * @function
 * @param {*} val  any value
 */
var check = exports.check = (0, _ramda.tap)(console.log);

/**
 * Logger for debugging function composition without breaking data flow,
 * pretty-priints objects and arrays
 *
 * @function
 * @param {*} val any value
 */
var prettyCheck = exports.prettyCheck = (0, _ramda.tap)(function (val) {
  return console.log(JSON.stringify(val, null, 2));
});

exports.default = {
  typeIs: typeIs,
  buildQueryString: buildQueryString,
  emptyString: emptyString,
  emptyObject: emptyObject,
  emptyArray: emptyArray,
  defaultToEmptyArray: defaultToEmptyArray,
  defaultToEmptyObject: defaultToEmptyObject,
  defaultToEmptyString: defaultToEmptyString,
  getPropOrEmptyObjectFunction: getPropOrEmptyObjectFunction,
  getPropOrEmptyString: getPropOrEmptyString,
  firstArgument: firstArgument,
  secondArgument: secondArgument,
  isNilOrEmpty: isNilOrEmpty,
  exists: exists,
  hasDeep: hasDeep,
  pickDeep: pickDeep,
  mapKeys: mapKeys,
  allKeysContaining: allKeysContaining,
  anyPropSatisfies: anyPropSatisfies,
  renameKeys: renameKeys,
  filterByProp: filterByProp,
  filterById: filterById,
  filterByName: filterByName,
  findByProp: findByProp,
  findById: findById,
  findByName: findByName,
  dropByProp: dropByProp,
  dropById: dropById,
  dropByName: dropByName,
  mergeListsByProp: mergeListsByProp,
  snakeify: snakeify,
  camelize: camelize,
  insertCommasInNumber: insertCommasInNumber,
  check: check
};