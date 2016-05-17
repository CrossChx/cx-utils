'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = exports.insertCommasInNumber = exports.snakeify = exports.mergeListsByProp = exports.dropByName = exports.dropById = exports.dropByProp = exports.findByName = exports.findById = exports.findByProp = exports.filterByName = exports.filterById = exports.filterByProp = exports.renameKeys = exports.mapKeys = exports.pickDeep = exports.hasDeep = exports.exists = exports.isNilOrEmpty = exports.secondArgument = exports.firstArgument = exports.getPropOrEmptyString = exports.getPropOrEmptyObjectFunction = exports.defaultToEmptyString = exports.defaultToEmptyObject = exports.defaultToEmptyArray = exports.emptyArray = exports.emptyObject = exports.emptyString = exports.typeIs = exports.memoAndCurry = undefined;

var _ramda = require('ramda');

var memoAndCurry = exports.memoAndCurry = (0, _ramda.compose)(_ramda.memoize, _ramda.curry);

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
var exists = exports.exists = (0, _ramda.compose)(_ramda.not, _ramda.isNil);

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
 * @module object
 * @description Advanced object inspection and property filtering
 */

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
var pickDeep = exports.pickDeep = (0, _ramda.memoize)((0, _ramda.curry)(function (pathToProp, pickList, data) {
  var picker = (0, _ramda.compose)((0, _ramda.objOf)((0, _ramda.last)(pathToProp)), (0, _ramda.isEmpty)(pickList) ? _ramda.identity : (0, _ramda.pick)(pickList), (0, _ramda.path)(pathToProp));

  return picker(data);
}));

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
var mapKeys = exports.mapKeys = memoAndCurry(mapKeysRaw);

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
 * @module list
 * @description Operations on lists of objects
 */

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
var filterById = exports.filterById = (0, _ramda.memoize)(filterByProp('id'));

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
var filterByName = exports.filterByName = (0, _ramda.memoize)(filterByProp('name'));

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
var findById = exports.findById = (0, _ramda.memoize)(findByProp('id'));
var findByName = exports.findByName = (0, _ramda.memoize)(findByProp('name'));

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
var mergeListsByProp = exports.mergeListsByProp = memoAndCurry(mergeListsByPropRaw);

/**
  * @module string
  * @description Helpers for common string manipulation
  */

var insertCommaEveryThree = (0, _ramda.replace)(/\B(?=(\d{3})+(?!\d))/g, ',');
var convertToString = (0, _ramda.ifElse)(typeIs('String'), _ramda.identity, _ramda.toString);

/**
 * Converts text to snake case
 *
 * @todo break this down into curried replaces
 * @function
 * @param   {String} str  string to convert
 * @return  {String}      snkae cased string
 *
 * @example
 * snakeify('MozTransform')
 * // => 'moz_transform'
 */
var snakeify = exports.snakeify = function snakeify(str) {
  return str.trim().replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
};

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

/**
  * @module debugging
  * @description Helpers for debugging functional js
  */

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
  defaultToEmptyArray: defaultToEmptyArray,
  defaultToEmptyObject: defaultToEmptyObject,
  defaultToEmptyString: defaultToEmptyString,
  dropById: dropById,
  dropByName: dropByName,
  dropByProp: dropByProp,
  emptyArray: emptyArray,
  emptyObject: emptyObject,
  emptyString: emptyString,
  exists: exists,
  filterById: filterById,
  filterByName: filterByName,
  filterByProp: filterByProp,
  findById: findById,
  findByName: findByName,
  findByProp: findByProp,
  firstArgument: firstArgument,
  getPropOrEmptyObjectFunction: getPropOrEmptyObjectFunction,
  getPropOrEmptyString: getPropOrEmptyString,
  hasDeep: hasDeep,
  insertCommasInNumber: insertCommasInNumber,
  isNilOrEmpty: isNilOrEmpty,
  mapKeys: mapKeys,
  memoAndCurry: memoAndCurry,
  mergeListsByProp: mergeListsByProp,
  pickDeep: pickDeep,
  renameKeys: renameKeys,
  secondArgument: secondArgument,
  snakeify: snakeify,
  typeIs: typeIs
};