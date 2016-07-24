/* eslint-disable new-cap */
import { flatten } from 'flat';
import {
  adjust,
  allPass,
  always,
  any,
  anyPass,
  complement,
  compose,
  concat,
  contains,
  converge,
  curry,
  defaultTo,
  equals,
  filter,
  find,
  flip,
  fromPairs,
  gt,
  gte,
  head,
  identity,
  ifElse,
  isEmpty,
  isNil,
  join,
  keys,
  last,
  lt,
  map,
  merge,
  nthArg,
  objOf,
  path as rPath,
  pathSatisfies,
  pick,
  pickBy,
  pluck,
  propEq,
  propOr,
  reduce,
  reject,
  replace,
  splitEvery,
  subtract,
  tap,
  toLower,
  toPairs,
  toString,
  trim,
  type,
  values,
} from 'ramda';

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
export const typeIs = typeName => compose(equals(typeName), type);

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
export const emptyString = always('');

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
export const emptyObject = always({});

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
export const emptyArray = always([]);

 // /**
 //  * @module defaults
 //  * @description Return default values if the arguments passed to them are undefined or null
 //  */
export const defaultToEmptyArray = defaultTo([]);
export const defaultToEmptyObject = defaultTo({});
export const defaultToEmptyString = defaultTo('');

 // /**
 //  * @module propertyDefaults
 //  * @description Return either their first argument or the specified default
 //  */
export const getPropOrEmptyObjectFunction = propOr(emptyObject);
export const getPropOrEmptyString = propOr('');

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
export const firstArgument = nthArg(0);

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
export const secondArgument = nthArg(1);

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
export const isNilOrEmpty = anyPass([isNil, isEmpty]);

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
export const isNotEmpty = complement(isEmpty);

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
export const exists = complement(isNil);

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
export const hasDeep = pathSatisfies(exists);

/**
 * @module number
 * @description Equality and other predicate checks
 */
export const GT = flip(gt);
export const GTE = flip(gte);
export const LT = flip(lt);
export const LTE = flip(gte);

const minus = flip(subtract);
const parseInt16 = flip(parseInt)(16);
const maybeShift = ifElse(GT(127), minus(256), identity);
const parseByte = compose(maybeShift, parseInt16);

export const parseHexBinary = compose(map(parseByte), splitEvery(2));

/**
 * @module object
 * @description Advanced object inspection and property filtering
 */

const pickDeepRaw = (pathToProp, pickList, data) => compose(
  objOf(last(pathToProp)),
  isEmpty(pickList) ? identity : pick(pickList),
  rPath(pathToProp),
)(data);

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
export const pickDeep = curry(pickDeepRaw);

const mapKeysRaw = (fn, obj) => {
  const applyFn = compose(fromPairs, map(adjust(fn, 0)), toPairs);
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
export const mapKeys = curry(mapKeysRaw);

const keyContains =
  str => compose(contains(str), secondArgument);
const allKeysContainingRaw =
  (str, obj) => compose(pickBy(keyContains(str)), flatten)(obj);

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
export const allKeysContaining = curry(allKeysContainingRaw);

const anyPropSatisfiesRaw =
  (predicate, obj) => compose(any(predicate), values)(obj);

/**
 * Takes a predicate and an object and returns true if the value of any of
 * the objects properties pass the predicate
 *
 * @function
 * @param {Function}  predicate pass or fail each key's value
 * @param {Object}    obj       object to analyze
 * @return {Boolean}            true if any key's value passes the predicate
 */
export const anyPropSatisfies = curry(anyPropSatisfiesRaw);

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
export const renameKeys = curry(
  (keysMap, obj) => reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];

    return acc;
  }, {}, keys(obj))
);

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
export const containsAll = compose(allPass, map(contains));

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
const applyByProp = curry(
  (func, key, val, list) =>
    func(propEq(key, val), defaultToEmptyArray(list)),
);

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
export const filterByProp = applyByProp(filter);

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
export const filterById = filterByProp('id');

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
export const filterByName = filterByProp('name');

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
export const findByProp = applyByProp(find);

// lookups for common property names
export const findById = findByProp('id');
export const findByName = findByProp('name');

/**
 * Curried function to drop items from a list of objects according to the
 * value of a specified property
 *
 * @function
 * @param  {String} key key to match with the specified value
 * @param  {String} val value to match on the specified key
 * @return {Function}
 */
export const dropByProp = applyByProp(reject);

// rejectors for common property names
export const dropById = dropByProp('id');
export const dropByName = dropByProp('name');

const mergeListsByPropRaw = (prop, source, search) => {
  const buildPredicate = compose(anyPass, map(propEq(prop)), pluck(prop));
  const predicate = buildPredicate(source);
  const matches = filter(predicate, search);
  const mergeWithMatch = x => merge(x, findByProp(prop, x[prop], matches));
  const mergeElement = ifElse(predicate, mergeWithMatch, always(undefined));

  return map(mergeElement, source);
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
export const mergeListsByProp = curry(mergeListsByPropRaw);

/**
  * @module string
  * @description Helpers for common string manipulation
  */

const headOfSecondArg = (char, arr) => head(arr);
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
export const firstCharIs = converge(equals, [identity, headOfSecondArg]);

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
export const appendStr = flip(concat);

const processSnakeCaps = replace(/([a-z\d])([A-Z]+)/g, '$1_$2');
const insertUnderscores = replace(/[-\s]+/g, '_');
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
export const snakeify = compose(
  toLower,
  insertUnderscores,
  processSnakeCaps,
  trim,
);

const capitalize = (match, c) => (c ? c.toUpperCase() : '');
const processCamelCaps = replace(/[-_\s]+(.)?/g, capitalize);
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
export const camelize = compose(processCamelCaps, trim);

const insertCommaEveryThree = replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const convertToString = ifElse(typeIs('String'), identity, toString);
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
export const insertCommasInNumber = compose(
  insertCommaEveryThree,
  convertToString,
);

const joinParamPairs = map(join('='));
const joinParamSets = join('&');

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
export const buildQueryString = compose(joinParamSets, joinParamPairs);

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
export const check = tap(console.log);

/**
 * Logger for debugging function composition without breaking data flow,
 * pretty-priints objects and arrays
 *
 * @function
 * @param {*} val any value
 */
export const prettyCheck = tap(val => console.log(JSON.stringify(val, null, 2)));

export default {
  typeIs,
  buildQueryString,
  emptyString,
  emptyObject,
  emptyArray,
  defaultToEmptyArray,
  defaultToEmptyObject,
  defaultToEmptyString,
  getPropOrEmptyObjectFunction,
  getPropOrEmptyString,
  firstArgument,
  secondArgument,
  isNilOrEmpty,
  exists,
  hasDeep,
  pickDeep,
  mapKeys,
  allKeysContaining,
  anyPropSatisfies,
  renameKeys,
  filterByProp,
  filterById,
  filterByName,
  findByProp,
  findById,
  findByName,
  dropByProp,
  dropById,
  dropByName,
  mergeListsByProp,
  snakeify,
  camelize,
  insertCommasInNumber,
  check,
};
