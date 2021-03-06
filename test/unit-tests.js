/* eslint-disable max-len */
import { expect } from 'chai';
import { equals, set, view, tail } from 'ramda';
import { property, suchthat } from 'jsverify';

import {
  shouldBeABoolean,
  shouldBeAFunction,
  shouldBeAnArray,
  shouldBeAnObject,
  shouldBeANumber,
  shouldBeAString,
  shouldBeEmpty,
  shouldBeFalse,
  shouldBeTrue,
  shouldEqual,
  shouldHaveKeys,
  shouldNotBeNull,
  shouldNotBeUndefined,
  shouldNotThrow,
  testCases,
  testIfExists,
} from 'how-the-test-was-won';

import {
  allKeysContaining,
  anyPropSatisfies,
  appendStr,
  between,
  buildQueryString,
  camelize,
  dropById,
  dropByProp,
  emptyArray,
  emptyObject,
  emptyString,
  filterByProp,
  findById,
  findByProp,
  firstArgument,
  firstCharIs,
  getPropOrEmptyObjectFunction,
  getPropOrEmptyString,
  hasDeep,
  insertCommasInNumber,
  isNilOrEmpty,
  makeLenses,
  makeRegexs,
  mergeListsByProp,
  parseHexBinary,
  pickDeep,
  renameKeys,
  secondArgument,
  snakeify,
} from '../src/index';

describe('General Utils', () => {
  describe('#emptyString', () => {
    const result = emptyString();

    shouldBeEmpty(result);
    shouldBeAString(result);
    shouldNotBeNull(result);
    shouldNotBeUndefined(result);
  });

  describe('#emptyObject', () => {
    describe('when invoked', () => {
      const result = emptyObject();

      shouldBeEmpty(result);
      shouldBeAnObject(result);
      shouldNotBeNull(result);
      shouldNotBeUndefined(result);
    });
  });

  describe('#emptyArray', () => {
    describe('when invoked', () => {
      const result = emptyArray();

      shouldBeEmpty(result);
      shouldBeAnArray(result);
      shouldNotBeNull(result);
      shouldNotBeUndefined(result);
    });
  });

  describe('#getPropOrEmptyObjectFunction', () => {
    describe('given a valid non-empty object', () => {
      const testObj = { one: 1, two: 2, three: 3 };

      describe('when invoked with a key that is present on the object', () => {
        const result = getPropOrEmptyObjectFunction('one', testObj);

        testIfExists(result);
        shouldBeANumber(result);
        it('should return the property', () => {
          expect(result).to.equal(testObj.one);
        });
      });

      describe('when invoked with a key that is not present on the object', () => {
        const result = getPropOrEmptyObjectFunction('four', testObj)();

        shouldBeAnObject(result);
        shouldBeEmpty(result);
      });
    });

    describe('given an empty object', () => {
      describe('when invoked with a valid key', () => {
        const result = getPropOrEmptyObjectFunction('one', {})();

        shouldBeEmpty(result);
        shouldBeAnObject(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
      });
    });
  });

  describe('#getPropOrEmptyString', () => {
    describe('given a valid non-empty object', () => {
      const testObj = { one: 1, two: 2, three: 3 };

      describe('when invoked with a key that is present on the object', () => {
        const result = getPropOrEmptyString('one', testObj);

        testIfExists(result);
        shouldBeANumber(result);
        it('should return the property', () => {
          expect(result).to.equal(testObj.one);
        });
      });

      describe('when invoked with a key that is not present on the object', () => {
        const result = getPropOrEmptyString('four', testObj);

        shouldBeAString(result);
        shouldBeEmpty(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
      });
    });

    describe('given an empty object', () => {
      describe('when invoked with a valid key', () => {
        const result = getPropOrEmptyString('one', {});

        shouldBeEmpty(result);
        shouldBeAString(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
      });
    });
  });

  describe('#firstArgument', () => {
    describe('when invoked with three arguments', () => {
      const result = firstArgument('one', 'two', 'three');

      testIfExists(result);
      shouldBeAString(result);
      it('should return the first argument', () => {
        expect(result).to.equal('one');
      });
    });
  });

  describe('#secondArgument', () => {
    describe('when invoked with three arguments', () => {
      const result = secondArgument('one', 'two', 'three');

      testIfExists(result);
      shouldBeAString(result);
      it('should return the second argument', () => {
        expect(result).to.equal('two');
      });
    });
  });

  describe('#isNilOrEmpty', () => {
    testCases(isNilOrEmpty,
      ['given a null value', null, true],
      ['given a undefined value', undefined, true],
      ['given an empty string', '', true],
      ['given an empty object', {}, true],
      ['given an empty array', [], true],
      ['given a non empty string', 'test', false],
      ['given a non empty array', ['test'], false],
      ['given a non empty object', { test: 'test' }, false],
      ['given a NaN value', NaN, false],
    );
  });

  describe('#hasDeep', () => {
    const testObj = { one: { two: { three: 'im in here' } } };

    describe('given an object with a nested key', () => {
      describe('when passed a valid path', () => {
        const result = hasDeep(['one', 'two', 'three'], testObj);

        testIfExists(result);
        shouldBeABoolean(result);
        shouldBeTrue(result);
      });

      describe('when passed a invalid path', () => {
        const result = hasDeep(['one', 'two', 'four'], testObj);

        shouldBeABoolean(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
        shouldBeFalse(result);
      });

      describe('when passed an empty array as path', () => {
        const result = hasDeep([], testObj);

        shouldBeABoolean(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
        shouldBeFalse(result);
      });
    });
  });

  describe('#between', () => {
    const law =
      ([l, h], x) => (x >= l && x <= h) === between(l, h, x);

    const range = valType =>
      suchthat(`${valType} & ${valType}`, ([x, y]) => x < y);

    describe('should work with any group of three ', () => {
      const intRange = range('nat');
      property('integers', intRange, 'nat', law);

      const floatRange = range('number');
      property('floating point numbers', floatRange, 'number', law);

      const dateRange = range('datetime');
      property('datetimes', dateRange, 'datetime', law);
    });
  });

  describe('#pickDeep', () => {
    const testObj = {
      one: 1,
      two: 2,
      deepObj: {
        deeperObj: { three: 3, four: 4, five: 5 },
      },
    };

    const testPrim = {
      one: 1,
      two: 2,
      deepObj: {
        deeperObj: true,
      },
    };

    const checkAgainstExpected = result => {
      it('should return the expected result', () => {
        expect(result).to.deep.equal({ deeperObj: { three: 3, four: 4 } });
      });
    };

    describe('when passsed a valid path and picklist and partially applied', () => {
      const picker = pickDeep(
        ['deepObj', 'deeperObj'],
        ['three', 'four'],
      );

      testIfExists(picker);
      shouldBeAFunction(picker);

      describe('when the resulting function is passed a valid object', () => {
        const result = picker(testObj);

        testIfExists(result);
        shouldBeAnObject(result);
        checkAgainstExpected(result);
      });
    });

    describe('when passsed a valid path and picklist and fully applied', () => {
      const result = pickDeep(
        ['deepObj', 'deeperObj'],
        ['three', 'four'],
        testObj,
      );

      testIfExists(result);
      shouldBeAnObject(result);
      checkAgainstExpected(result);
    });

    describe('when passsed a valid path and empty picklist and fully applied', () => {
      describe('when the value at specified path is an object', () => {
        const result = pickDeep(
          ['deepObj', 'deeperObj'], [], testObj,
        );

        testIfExists(result);
        shouldBeAnObject(result);
        it('should return an unaltered version of the nested object', () => {
          expect(result).to.deep.equal(testObj.deepObj);
        });
      });

      describe('when the value at specified path is a boolean', () => {
        const result = pickDeep(
          ['deepObj', 'deeperObj'], [], testPrim,
        );

        testIfExists(result);
        shouldBeAnObject(result);
        it('should return an unaltered version of the nested object', () => {
          expect(result).to.deep.equal(testPrim.deepObj);
        });
      });
    });

    describe('when passsed a valid path and empty picklist and fully applied', () => {
      const result = pickDeep(
        ['deepObj', 'deeperObj'], [], testObj,
      );

      testIfExists(result);
      shouldBeAnObject(result);
      it('should return an unaltered version of the nested object', () => {
        expect(result).to.deep.equal(testObj.deepObj);
      });
    });
  });

  describe('#parseHexBinary', () => {
    const hexStr =
    '4812d7e3a9829e5d51bdd64ceb35df060699bc1309731bd6e6f1a544' +
    '3a7f9ceaf4382fcfd6f5f8a08bb261979c2d49fb771601770f2c26798' +
    '5af2754e1f8cf09';

    const binArr = [
      72, 18, -41, -29, -87, -126, -98, 93, 81, -67, -42,
      76, -21, 53, -33, 6, 6, -103, -68, 19, 9, 115, 27,
      -42, -26, -15, -91, 68, 58, 127, -100, -22, -12,
      56, 47, -49, -42, -11, -8, -96, -117, -78, 97,
      -105, -100, 45, 73, -5, 119, 22, 1, 119, 15,
      44, 38, 121, -123, -81, 39, 84, -31, -8,
      -49, 9,
    ];

    const result = parseHexBinary(hexStr);

    it('should return the expected byte array', () => {
      expect(result).to.deep.equal(binArr);
    });
  });

  describe('#allKeysContaining', () => {
    const obj = {
      dragon: true,
      b: true,
      c: true,
      d: { super_dragon: true },
      e: { c: { string_dragon_of_yore: true } },
      f: { g: { h: { deep_dragon: false } } },
    };

    const expected = {
      dragon: true,
      'd.super_dragon': true,
      'e.c.string_dragon_of_yore': true,
      'f.g.h.deep_dragon': false,
    };

    const result = allKeysContaining('dragon', obj);

    testIfExists(result);
    shouldBeAnObject(result);
    shouldHaveKeys(result,
      'dragon',
      'd.super_dragon',
      'e.c.string_dragon_of_yore',
      'f.g.h.deep_dragon',
    );

    it('should return the expected result', () => {
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#anyPropSatisfies', () => {
    describe('when passed a predicate that returns true for any value that is false', () => {
      const isfalse = x => x === false;
      const falseCheck = anyPropSatisfies(isfalse);

      testIfExists(falseCheck);
      shouldBeAFunction(falseCheck);

      describe('when the resulting function is passed a valid object with a passing prop', () => {
        const obj = { a: true, b: false, c: 'fish', d: 'baseball' };
        const result = falseCheck(obj);

        shouldBeTrue(result);
      });

      describe('when the resulting function is passed a valid object with no passing prop', () => {
        const obj = { a: true, b: true, c: 'fish', d: 'baseball' };
        const result = falseCheck(obj);

        shouldBeFalse(result);
      });
    });
  });

  describe('#filterByProp', () => {
    const target = 'i am the one you seek';
    const testArr = [
      { test: 1 },
      { test: 2 },
      { test: 3 },
      { test: target },
    ];
    const deepTestArr = [
      { test: 1 },
      { test: 2 },
      { test: 3 },
      { test: target, otherKey: { nestedKey: { deepNestedKey: target } } },
    ];

    describe('when passed a key and value argument and partially applied', () => {
      const testFilter = filterByProp('test', target);

      testIfExists(testFilter);
      shouldBeAFunction(testFilter);

      describe('when the resulting function is passed', () => {
        describe('a list of objects with "test" keys', () => {
          const result = testFilter(testArr);

          testIfExists(result);
          shouldBeAnArray(result);

          it('should have one element', () => {
            expect(result).to.have.lengthOf(1);
          });

          it('first element should be an object', () => {
            expect(result[0]).to.be.an('object');
          });

          it('should equal the expected element of the provided object array', () => {
            expect(result[0]).to.deep.equal(testArr[3]);
          });
        });

        describe('a list of objects that contain deep objects with a "test" keys', () => {
          const result = testFilter(deepTestArr);

          testIfExists(result);
          shouldBeAnArray(result);

          it('should have one element', () => {
            expect(result).to.have.lengthOf(1);
          });

          it('first element should be an object', () => {
            expect(result[0]).to.be.an('object');
          });

          it('should retain the deepest key', () => {
            expect(result[0].otherKey.nestedKey.deepNestedKey).to.deep.equal(target);
          });

          it('should equal the expected element of the provided object array', () => {
            expect(result[0]).to.deep.equal(deepTestArr[3]);
          });
        });
      });
    });

    describe('when passed a key, value, and data array and fully applied', () => {
      const result = filterByProp('test', target, testArr);

      testIfExists(result);
      shouldBeAnArray(result);

      it('should have one element', () => {
        expect(result).to.have.lengthOf(1);
      });

      it('first element should be an object', () => {
        expect(result[0]).to.be.an('object');
      });

      it('should equal the expected element of the provided object array', () => {
        expect(result[0]).to.deep.equal(testArr[3]);
      });
    });

    describe('when passed a key, value, and undefined data arg', () => {
      const filter = filterByProp('test', target);

      shouldNotThrow(filter, undefined);
    });
  });

  describe('#findByProp', () => {
    const target = 'i am the one you seek';
    const testArr = [
      { test: 1 },
      { test: 2 },
      { test: 3 },
      { test: target },
      { test: target, notMe: 1 },
      { test: target, notMe: 2 },
      { test: target, notMe: 3 },
    ];

    const findByPropResultTest = res => {
      testIfExists(res);
      shouldBeAnObject(res);

      it('should equal the expected element of the provided object array', () => {
        expect(res).to.deep.equal(testArr[3]);
      });

      it('should not have a `notMe` key', () => {
        expect(res).to.not.have.all.keys(['notMe']);
      });
    };

    describe('when passed a key and value argument and partially applied', () => {
      const testFinder = findByProp('test', target);

      testIfExists(testFinder);
      shouldBeAFunction(testFinder);

      describe('when the resulting function is passed a list of objects with a "test" key', () => {
        const result = testFinder(testArr);

        findByPropResultTest(result);
      });
    });

    describe('when passed a key, value, and data array and fully applied', () => {
      const result = findByProp('test', target, testArr);

      findByPropResultTest(result);
    });

    describe('when passed a key, value, and undefined data arg', () => {
      const finder = findByProp('test', target);

      shouldNotThrow(finder, undefined);
    });
  });

  describe('#findById', () => {
    const testArr = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6, target: 'i am the one you seek' },
    ];

    const result = findById(6, testArr);

    testIfExists(result);
    shouldBeAnObject(result);
    shouldHaveKeys(result, 'id', 'target');

    it('should return the correct array element', () => {
      expect(result).to.deep.equal(testArr[5]);
    });
  });

  describe('#dropById', () => {
    const common = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    const testArr = [...common, { id: 6, target: 'i am the one you seek' }];
    const result = dropById(6, testArr);

    testIfExists(result);
    shouldBeAnArray(result);
    it('should return an array with 5 elements', () => {
      expect(result).to.have.length(5);
    });

    it('should drop the last element in test array', () => {
      expect(result).to.deep.equal(common);
    });
  });

  describe('#dropByProp', () => {
    describe('when passed a key and value argument', () => {
      const target = 'i am the one you seek';
      const testDrop = dropByProp('test', target);

      testIfExists(testDrop);
      shouldBeAFunction(testDrop);

      describe('when the resulting function is passed a list of objects with a "test" key', () => {
        const testArr = [
          { test: 1 },
          { test: 2 },
          { test: 3 },
          { test: target },
        ];
        const expected = [
          { test: 1 },
          { test: 2 },
          { test: 3 },
        ];

        const result = testDrop(testArr);

        testIfExists(result);
        shouldBeAnArray(result);

        it('should have 3 elements', () => {
          expect(result).to.have.lengthOf(3);
        });

        it('first element should be an object', () => {
          expect(result[0]).to.be.an('object');
        });

        it('should equal the expected element of the provided object array', () => {
          expect(result).to.deep.equal(expected);
        });
      });
    });
  });

  describe('#mergeListsByProp', () => {
    const sourceArr = [
      { id: 1, sourceKey: true },
      { id: 3, sourceKey: true },
      { id: 5, sourceKey: true },
      { id: 6, sourceKey: true },
    ];

    const searchArr = [
      { id: 1, searchKey: { nested: true }, firstName: 'Bob', lastName: 'Franklin' },
      { id: 2, searchKey: true, firstName: 'Rob', lastName: 'Lob' },
      { id: 3, searchKey: true, firstName: 'Tob', lastName: 'Lob' },
      { id: 4, searchKey: true, firstName: 'Eob', lastName: 'Lob' },
      { id: 5, searchKey: true, firstName: 'Wob', lastName: 'Lob' },
    ];

    const expected = [
      { ...sourceArr[0], ...searchArr[0] },
      { ...sourceArr[1], ...searchArr[2] },
      { ...sourceArr[2], ...searchArr[4] },
      { ...sourceArr[3] },
    ];

    const result = mergeListsByProp('id', sourceArr, searchArr);

    testIfExists(result);
    shouldBeAnArray(result);

    it('should return the correct merged result', () => {
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#renameKeys', () => {
    const testObj = { one: 1, two: 2, three: 3 };
    const expected = { one: 1, two: 2, wigglesaurus: 3 };
    const renameMap = { three: 'wigglesaurus' };

    const result = renameKeys(renameMap, testObj);

    testIfExists(result);
    shouldBeAnObject(result);

    it('should contain the new key', () => {
      expect(result).to.contain.keys({ wigglesaurus: 3 });
    });

    it('should remove the mapped key', () => {
      expect(result).to.not.contain.keys(['three']);
    });

    it('should return the expected result', () => {
      expect(result).to.deep.equal(expected);
    });
  });

  describe('#snakeify', () => {
    const result = snakeify('oneAwesomeNightAtChuckyCheese');

    testIfExists(result);
    shouldBeAString(result);
    shouldEqual(result, 'one_awesome_night_at_chucky_cheese');
  });

  describe('camelize', () => {
    const result = camelize('one_awesome_night_at_chucky_cheese');

    testIfExists(result);
    shouldBeAString(result);
    shouldEqual(result, 'oneAwesomeNightAtChuckyCheese');
  });

  describe('#insertCommasInNumber', () => {
    describe('when passed a two digit value of Number type', () => {
      const result = insertCommasInNumber(20);

      testIfExists(result);
      shouldBeAString(result);

      it('should return a string representation of the number with no commas', () => {
        expect(result).to.equal('20');
      });
    });

    describe('when passed a two digit value of String type', () => {
      const result = insertCommasInNumber('20');

      testIfExists(result);
      shouldBeAString(result);

      it('should directly return its argument', () => {
        expect(result).to.equal('20');
      });
    });

    describe('when passed a four digit value of Number type', () => {
      const result = insertCommasInNumber(2000);

      testIfExists(result);
      shouldBeAString(result);

      it('should return a string representation of the number with one comma', () => {
        expect(result).to.equal('2,000');
      });
    });

    describe('when passed a four digit value of String type', () => {
      const result = insertCommasInNumber('2000');

      testIfExists(result);
      shouldBeAString(result);

      it('should insert one comma after the first digit', () => {
        expect(result).to.equal('2,000');
      });
    });

    testCases(insertCommasInNumber,
      ['when passed the number 200', 200, '200'],
      ['when passed the number 20000', 20000, '20,000'],
      ['when passed the number 200000', 200000, '200,000'],
      ['when passed the number 2000000', 2000000, '2,000,000'],
      ['when passed the number 2000000000', 2000000000, '2,000,000,000'],
      ['when passed the string 200', '200', '200'],
      ['when passed the string 20000', '20000', '20,000'],
      ['when passed the string 200000', '200000', '200,000'],
      ['when passed the string 2000000', '2000000', '2,000,000'],
      ['when passed the string 2000000000', '2000000000', '2,000,000,000'],
    );
  });

  describe('#buildQueryString', () => {
    const result = buildQueryString([
      ['param1', 'value1'],
      ['param2', 'value2'],
    ]);

    const expected = 'param1=value1&param2=value2';

    testIfExists(result);
    shouldBeAString(result);
    shouldEqual(expected, result);
  });

  describe('#appendStr', () => {
    const person = 'you';
    const insult = ' are bad at golf';
    const expected = `${person}${insult}`;

    describe(`when invoked with the string '${insult}'`, () => {
      const insultSomeone = appendStr(insult);

      testIfExists(insultSomeone);
      shouldBeAFunction(insultSomeone);

      describe(`when the resulting function is passed the name '${person}'`, () => {
        const result = insultSomeone(person);

        testIfExists(result);
        shouldBeAString(result);
        shouldEqual(expected, result);
      });
    });
  });

  describe('#firstCharIs', () => {
    const testChar = 'o';

    describe(`when passed the character ${testChar}`, () => {
      const charChecker = firstCharIs(testChar);

      testIfExists(charChecker);
      shouldBeAFunction(charChecker);

      const cases = [
        ['once', true],
        ['twice', false],
        ['zeeboo', false],
      ];

      const casesWithDesc = cases.map(
        ([str, bool]) => [`when passed the string '${str}'`, str, bool]
      );
      testCases(charChecker, ...casesWithDesc);
    });
  });

  describe('#makeLenses', () => {
    describe('Given an array of strings', () => {
      const prop = 'a';
      const L = makeLenses([prop]);

      testIfExists(L);
      shouldBeAnObject(L);
      shouldHaveKeys(L, 'a');
      shouldBeAFunction(L[prop]);

      describe('the resulting map of lenses should', () => {
        property('work with view', '{ a: string }', obj =>
          equals(view(L.a, obj), obj.a)
        );

        property('work with set', '{ a: string }', obj =>
          equals(set(L.a, 1, obj), { a: 1 })
        );
      });
    });

    describe('Given an array of numbers', () => {
      const prop = 0;
      const L = makeLenses([prop]);

      testIfExists(L);
      shouldBeAnObject(L);
      shouldHaveKeys(L, '0');
      shouldBeAFunction(L[prop]);

      describe('the resulting map of lenses should', () => {
        property('work with view', '[string]', arr =>
          equals(view(L[0], arr), arr[0])
        );

        property('work with set', '[string]', 'nat', (arr, x) =>
          equals(set(L[0], x, arr), arr.length > 0 ? [x, ...tail(arr)] : [])
        );
      });
    });
  });

  describe('#makeRegexs', () => {
    const arr = ['a', 'b', 'c'];
    describe(`given the list of strings [${arr}]`, () => {
      const p = makeRegexs(arr);

      describe('the resulting function map', () => {
        shouldBeAnObject(p);
        arr.forEach(t =>
          it(`should return true when the ${t} test is used on a string that contains ${t}`, () => {
            expect(p[t](`one two ${t}`)).to.equal(true);
          })
        );

        arr.forEach(t =>
          it(`should return false when the ${t} test is used on a string that does not contain ${t}`, () => {
            expect(p[t]('one two')).to.equal(false);
          })
        );
      });
    });
  });
});
