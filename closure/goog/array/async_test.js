// Copyright 2015 Alex Golubtsov. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.arrayAsyncTest');
goog.setTestOnly('goog.arrayAsyncTest');

goog.require('goog.array.async');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.recordFunction');
goog.require('goog.testing.PropertyReplacer');

function testArrayForEachBasic() {
  var s = '';
  var a = ['a', 'b', 'c', 'd'];
  goog.array.async.forEach(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('Index is not a number', 'number', typeof index);
    s += val + index;
  }, function() {
    assertEquals('a0b1c2d3', s);
  });
}

function testArrayForEachWithEmptyArray() {
  var a = new Array(100);
  goog.array.async.forEach(a, function(val, index, a2) {
    fail('The function should not be called since no values were assigned.');
  });
}

function testArrayForEachWithOnlySomeValuesAsigned() {
  var count = 0;
  var a = new Array(1000);
  a[100] = undefined;
  goog.array.async.forEach(a
  , function(val, index, a2) {
    assertEquals(100, index);
    count++;
  }, function() {
    assertEquals('Should only call function when a value of array was assigned.',
      1, count);
  });
}

function testArrayForEachWithArrayLikeObject() {
  var counter = goog.testing.recordFunction();
  var a = {
    'length': 1,
    '0': 0,
    '100': 100,
    '101': 102
  };
  goog.array.async.forEach(a, counter, function() {
    assertEquals('Number of calls should not exceed the value of its length', 1,
      counter.getCallCount());
  });
}

function testArrayForEachOmitsDeleted() {
  var s = '';
  var a = ['a', 'b', 'c', 'd'];
  delete a[1];
  delete a[3];
  goog.array.async.forEach(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof index);
    s += val + index;
  }, function() {
    assertEquals('a0c2', s);
  });
}

function testArrayForEachScope() {
  var scope = {};
  var a = ['a', 'b', 'c', 'd'];
  goog.array.async.forEach(a, function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof index);
    assertEquals(this, scope);
  }, undefined, scope);
}

function testArrayMap() {
  var a = [0, 1, 2, 3];
  goog.array.async.map(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val * val;
  }, function(result) {
    assertArrayEquals([0, 1, 4, 9], result);
  });
}

function testArrayMapOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.map(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val * val;
  }, function(result) {
    var expected = [0, 1, 4, 9];
    delete expected[1];
    delete expected[3];

    assertArrayEquals(expected, result);
    assertFalse('1' in result);
    assertFalse('3' in result);
  });
}

function testArrayFilter() {
  var a = [0, 1, 2, 3];
  goog.array.async.filter(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2, 3], result);
  });
}

function testArrayFilterOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.filter(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2], result);
  });
}

function testArrayFilterPreservesValues() {
  var a = [0, 1, 2, 3];
  goog.array.async.filter(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    a2[index] = a2[index] - 1;
    return a2[index] >= 1;
  }, function(result) {
    assertArrayEquals([2, 3], result);
  });
}

function testArrayFilterMap() {
  var a = [0, 1, 2, 3];
  goog.array.async.filterMap(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return index == 2 ? false : val * val;
  }, function(result) {
    assertArrayEquals([0, 1, 9], result);
  });
}

function testArrayFilterMapOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.map(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return index == 0 ? 100 : val * val;
  }, function(result) {
    var expected = [100, 1, 4, 9];
    delete expected[1];
    delete expected[3];

    assertArrayEquals(expected, result);
    assertFalse('1' in result);
    assertFalse('3' in result);
  });
}

function testArraySome() {
  var a = [0, 1, 2, 3];
  goog.array.async.some(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertTrue(result);
  });
  goog.array.async.some(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertFalse(result);
  });
}

function testArraySomeOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.some(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertTrue(result);
  });
  b = goog.array.async.some(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertFalse(result);
  });
}

function testArrayEvery() {
  var a = [0, 1, 2, 3];
  goog.array.async.every(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 0;
  }, function(result) {
    assertTrue(result);
  });
  goog.array.async.every(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertFalse(result);
  });
}

function testArrayEveryOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.every(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 0;
  }, function(result) {
    assertTrue(result);
  });
  goog.array.async.every(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('number', typeof val);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertFalse(result);
  });
}

function testArrayFind() {
  var a = [0, 1, 2, 3];
  goog.array.async.find(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertEquals(2, result);
  });

  goog.array.async.find(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertNull(result);
  });

  var a1 = 'abCD';
  goog.array.async.find(a1
  , function(val, index, a2) {
    assertEquals(a1, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertEquals('C', result);
  });

  var a11 = 'abcd';
  goog.array.async.find(a11
  , function(val, index, a2) {
    assertEquals(a11, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertNull(result);
  });
}

function testArrayFindOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.find(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertEquals(2, result);
  });

  goog.array.async.find(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertNull(result);
  });
}

function testArrayFindAll() {
  var a = [0, 1, 2, 3];
  goog.array.async.findAll(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2, 3], result);
  });

  goog.array.async.findAll(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertArrayEquals([], result);
  });

  var a1 = 'abCD';
  goog.array.async.findAll(a1
  , function(val, index, a2) {
    assertEquals(a1, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertArrayEquals(['C', 'D'], result);
  });

  var a11 = 'abcd';
  goog.array.async.findAll(a11
  , function(val, index, a2) {
    assertEquals(a11, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertArrayEquals([], result);
  });
}

function testArrayFindAllOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.findAll(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2], result);
  });

  goog.array.async.findAll(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertArrayEquals([], result);
  });
}

function testArrayFindIndex() {
  var a = [0, 1, 2, 3];
  goog.array.async.findIndex(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertEquals(2, result);
  });

  goog.array.async.findIndex(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertEquals(-1, result);
  });

  var a1 = 'abCD';
  goog.array.async.findIndex(a1
  , function(val, index, a2) {
    assertEquals(a1, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertEquals(2, result);
  });

  var a11 = 'abcd';
  goog.array.async.findIndex(a11
  , function(val, index, a2) {
    assertEquals(a11, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertEquals(-1, result);
  });
}

function testArrayFindIndexOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.findIndex(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertEquals(2, result);
  });

  goog.array.async.findIndex(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertEquals(-1, result);
  });
}

function testArrayFindIndexes() {
  var a = [0, 1, 2, 3];
  goog.array.async.findIndexes(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2, 3], result);
  });

  goog.array.async.findIndexes(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertArrayEquals([], result);
  });

  var a1 = 'abCD';
  goog.array.async.findIndexes(a1
  , function(val, index, a2) {
    assertEquals(a1, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertArrayEquals([2, 3], result);
  });

  var a11 = 'abcd';
  goog.array.async.findIndexes(a11
  , function(val, index, a2) {
    assertEquals(a11, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val >= 'A' && val <= 'Z';
  }, function(result) {
    assertArrayEquals([], result);
  });
}

function testArrayFindIndexesOmitsDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.findIndexes(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 1;
  }, function(result) {
    assertArrayEquals([2], result);
  });

  goog.array.async.findIndexes(a
  , function(val, index, a2) {
    assertEquals(a, a2);
    assertEquals('index is not a number', 'number', typeof index);
    return val > 100;
  }, function(result) {
    assertArrayEquals([], result);
  });
}

function testArrayCount() {
  var a = [0, 1, 2, 3, 4];
  var context = {};
  goog.array.async.count(a
  , function(element, index, array) {
    assertTrue(goog.isNumber(index));
    assertEquals(a, array);
    assertEquals(context, this);
    return element % 2 == 0;
  }, function(result) {
    assertEquals(3, result);
  }, context);

  var a1 = [0, 1, 2, 3, 4];
  delete a1[2];
  goog.array.async.count(a1
  , function() {
    return true;
  }, function(result) {
    assertEquals('deleted element is ignored', 4, result);
  });
}

function testArrayReduce() {
  var a = [0, 1, 2, 3];
  goog.array.async.reduce(a, 0
  , function(rval, val, i, arr) {
    assertEquals('number', typeof i);
    assertEquals(a, arr);
    return rval + val;
  }, function (result) {
    assertEquals(6, result);
  });

  var scope = {
    last: 0,
    testFn: function(r, v, i, arr) {
      assertEquals('number', typeof i);
      assertEquals(a, arr);
      var l = this.last;
      this.last = r + v;
      return this.last + l;
    }
  };

  goog.array.async.reduce(a, 0
  , scope.testFn
  , function(result) {
    assertEquals(10, result);
  }, scope);
}

function testArrayReduceOmitDeleted() {
  var a = [0, 1, 2, 3];
  delete a[1];
  delete a[3];
  goog.array.async.reduce(a, 0
  , function(rval, val, i, arr) {
    assertEquals('number', typeof i);
    assertEquals(a, arr);
    return rval + val;
  }, function(result) {
    assertEquals(2, result);
  });

  var scope = {
    last: 0,
    testFn: function(r, v, i, arr) {
      assertEquals('number', typeof i);
      assertEquals(a, arr);
      var l = this.last;
      this.last = r + v;
      return this.last + l;
    }
  };

  goog.array.async.reduce(a, 0
  , scope.testFn
  , function(result) {
    assertEquals(2, result);
  }, scope);
}