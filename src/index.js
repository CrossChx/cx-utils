import {
  always,
  anyPass,
  compose,
  curry,
  defaultTo,
  filter,
  find,
  identity,
  isEmpty,
  isNil,
  keys,
  last,
  memoize,
  not,
  nthArg,
  objOf,
  path as rPath,
  pathOr,
  pick,
  propEq,
  propOr,
  reduce,
  reject,
} from 'ramda';

/**
 * return functions that always return their given values
 */
export const emptyString = always('');
export const emptyObject = always({});
export const emptyArray = always([]);

/**
 * return functions that provide type safety by returning default values if the
 * arguments passed to them are undefined or null
 */
export const defaultToEmptyArray = defaultTo([]);
export const defaultToEmptyString = defaultTo('');

/**
 * return functions that return either their first argument or the specified default
 */
export const getPropOrEmptyObjectFunction = propOr(emptyObject);
export const getPropOrEmptyString = propOr('');

/**
 * Returns the first argument it is invoked with
 *
 * @param  {Args} `args` arguments at the beginning of compose pipe
 * @return {*}
 */
export const firstArgument = nthArg(0);

/**
 * Returns the second argument it is invoked with
 *
 * @param  {Args} `args` arguments at the beginning of compose pipe
 * @return {*}
 */
export const secondArgument = nthArg(1);

/**
 * Check whether a value of any type is Empty, Null, or undefined
 *
 * @param  {*} `val`  val to pipe through predicates
 * @return {Boolean}
 */
export const isNilOrEmpty = anyPass([isNil, isEmpty]);

/**
 * Check if a key exists at a deep path
 *
 * @param  {Array} `arr`  list of strings used as path to prop
 * @return {Boolean}
 */
export const hasDeep = curry(
  compose(not, isNil, pathOr(null)),
);

/**
 * Return a whitelisted set of keys from nested object path
 *
 * @param  {Array} `arr`  list of strings used as path to prop
 * @return {Boolean}
 */
export const pickDeep = memoize(curry(
  (pathToProp, pickList, data) => {
    const processor = compose(
      objOf(last(pathToProp)),
      isEmpty(pickList) ? identity : pick(pickList),
      rPath(pathToProp),
    );

    return processor(data);
  })
);

/**
 * Higher order function to apply a property matching predicate to list
 * transformation functions like filter or reject
 *
 * @param  {Function} func  function to apply prop matching predicate to
 * @param  {String}   key   `key` key to match with the specified value
 * @param  {String}   val   `val` value to match on the specified key
 * @return {Function}
 */
const applyByProp = curry(
  (func, key, val, data) =>
    func(propEq(key, val), defaultToEmptyArray(data)),
);

/**
 * Curryable function to filter a list of objects according to the value of
 * a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
export const filterByProp = applyByProp(filter);

/**
 * Curryable function to filter a list of objects according to the value of
 * a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
export const findByProp = applyByProp(find);

// lookups for common property names
export const findById = findByProp('id');
export const findByName = findByProp('name');

/**
 * Curryable function to drop items from a list of objects according to the
 * value of a specified property
 *
 * @param  {String} `key` key to match with the specified value
 * @param  {String} `val` value to match on the specified key
 * @return {Function}
 */
export const dropByProp = applyByProp(reject);

// rejectors for common property names
export const dropById = dropByProp('id');
export const dropByName = dropByProp('name');

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

export default {
  dropById,
  dropByProp,
  emptyArray,
  emptyObject,
  emptyString,
  filterByProp,
  firstArgument,
  getPropOrEmptyObjectFunction,
  getPropOrEmptyString,
  hasDeep,
  isNilOrEmpty,
  renameKeys,
  secondArgument,
};
