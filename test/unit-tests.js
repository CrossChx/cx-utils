import { expect } from 'chai';
import {
  shouldBeABoolean,
  shouldBeAFunction,
  shouldBeAnArray,
  shouldBeAnObject,
  shouldBeANumber,
  shouldBeAString,
  shouldBeEmpty,
  shouldNotBeNull,
  shouldNotBeUndefined,
  shouldNotThrow,
  testIfExists,
  testCases,
} from 'how-the-test-was-won';

import {
  dropByProp,
  emptyArray,
  emptyObject,
  emptyString,
  filterByProp,
  findByProp,
  firstArgument,
  getPropOrEmptyObjectFunction,
  getPropOrEmptyString,
  hasDeep,
  pickDeep,
  isNilOrEmpty,
  renameKeys,
  secondArgument,
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
        it('should return true', () => {
          expect(result).to.equal(true);
        });
      });

      describe('when passed a invalid path', () => {
        const result = hasDeep(['one', 'two', 'four'], testObj);

        shouldBeABoolean(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
        it('should return false', () => {
          expect(result).to.equal(false);
        });
      });

      describe('when passed an empty array as path', () => {
        const result = hasDeep([], testObj);

        shouldBeABoolean(result);
        shouldNotBeNull(result);
        shouldNotBeUndefined(result);
        it('should return true', () => {
          expect(result).to.equal(true);
        });
      });
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

  describe('#renameKeys', () => {
    const testObj = { one: 1, two: 2, three: 3 };
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
  });
});
