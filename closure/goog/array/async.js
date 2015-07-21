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

/**
 * @fileoverview Utilities for manipulating arrays asynchronously
 *
 * @author alex.a.golubtsov@gmail.com (Alex Golubtsov)
 */


goog.provide('goog.array.async');

goog.require('goog.array.ArrayLike');
goog.require('goog.async.run');

/**
 * Asynchronously calls iterator function for each element in an array.
 * Calls callback function at the end of iterations.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): ?} iterator The function to call
 *     for every element. This function takes 3 arguments
 *     (the element, the index and the array). The return value is ignored.
 * @param {function(): ?=} opt_callback The function to call
 *     at the end of iterations. Takes no arguments.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.forEach = function(arr, iterator, opt_callback, opt_scope) {
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        iterator.call(opt_scope, arr2[index], index, arr);
      }
      return true;
  }, function() {
      if (goog.isDef(opt_callback)) {
        opt_callback.call(opt_scope);
      }
  });
};

/**
 * Asynchronously calls iterator function for each element in an array
 * and inserts the result into a new array.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): R} iterator The function to call
 *     for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return something. The result will be
 *     inserted into a new array.
 * @param {function(!Array<R>): ?} callback The function to call
 *     at the end of iterations. Takes a new array with the results
 *     from iterator.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S,R
 */
goog.array.async.map = function(arr, iterator, callback, opt_scope) {
  var res = new Array(arr.length);
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        res[index] = iterator.call(opt_scope, arr2[index], index, arr);
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously calls iterator function for each element in an array,
 * and if the function returns true adds the element to a new array.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for every element. This function
 *     takes 3 arguments (the element, the index and the array) and must
 *     return a Boolean. If the return value is true the element is added to the
 *     result array. If it is false the element is not included.
 * @param {function(!Array<T>): ?} callback The function to call
 *     at the end of iterations. Takes a new array in which only elements
 *     that passed the test are present.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.filter = function(arr, iterator, callback, opt_scope) {
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      var value = arr2[index];
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        res[resLength++] = value;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously calls iterator function for each element in an array,
 * and if the function doesn't return false inserts the result into a new array.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean|R} iterator The function
 *     to call for every element. This function
 *     takes 3 arguments (the element, the index and the array).
 * @param {function(!Array<R>): ?} callback The function to call
 *     at the end of iterations. Takes a new array with the results
 *     from iterator.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S,R
 */
goog.array.async.filterMap = function(arr, iterator, callback, opt_scope) {
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        var value = iterator.call(opt_scope, arr2[index], index, arr);
        if (value !== false) {
          res[resLength++] = value;
        }
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously calls iterator function for each element of an array.
 * If any call returns true, callback receives true
 * (without checking the remaining elements). If all calls
 * return false, callback receives false.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for for every element. This function takes 3 arguments
 *     (the element, the index and the array) and should return a boolean.
 * @param {function(boolean): ?} callback The function to call
 *     at the end of iterations. Takes true if any element passes the test.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.some = function(arr, iterator, callback, opt_scope) {
  var res = false;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        res = iterator.call(opt_scope, arr2[index], index, arr);
        return !res;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously calls iterator function for each element of an array.
 * If all calls return true, callback receives true. If any call returns false,
 * callback receives false and doesn't continue to check the remaining elements.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for for every element. This function takes 3 arguments
 *     (the element, the index and the array) and should return a boolean.
 * @param {function(boolean): ?} callback The function to call
 *     at the end of iterations. Takes false if any element fails the test.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.every = function(arr, iterator, callback, opt_scope) {
  var res = true;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        res = iterator.call(opt_scope, arr2[index], index, arr);
        return res;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously search an array for the first element that satisfies
 * a given condition and pass that element to the callback.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return a boolean.
 * @param {function(?T): ?} callback The function to call
 *     at the end of iterations. Takes the first array element that passes
 *     the test, or null if no element is found.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.find = function(arr, iterator, callback, opt_scope) {
  var res = null;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      var value = arr2[index];
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        res = value;
        return false;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously search an array for elements that satisfy
 * a given condition and pass Array of that elements to the callback.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return a boolean.
 * @param {function(!Array<T>): ?} callback The function to call
 *     at the end of iterations. Takes a new array with elements that pass
 *     the test, or empty array if no element is found.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.findAll = function(arr, iterator, callback, opt_scope) {
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      var value = arr2[index];
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        res[resLength++] = value;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously search an array for the first element that satisfies
 * a given condition and pass its index to the callback.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return a boolean.
 * @param {function(number): ?} callback The function to call
 *     at the end of iterations. Takes the index of the first array element
 *     that passes the test, or -1 if no element is found.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.findIndex = function(arr, iterator, callback, opt_scope) {
  var res = -1;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        res = index;
        return false;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously search an array for elements that satisfy
 * a given condition and pass Array of their indexes to the callback.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function to call
 *     for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return a boolean.
 * @param {function(!Array<number>): ?} callback The function to call
 *     at the end of iterations. Takes a new array with indexes of elements
 *     that pass the test, or empty array if no element is found.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.findIndexes = function(arr, iterator, callback, opt_scope) {
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        res[resLength++] = index;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously counts the array elements that fulfill the predicate,
 * i.e. for which the callback function returns true.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {function(this: S, T, number, ?): boolean} iterator The function
 *     to call for every element. This function takes 3 arguments (the element,
 *     the index and the array) and should return a boolean.
 * @param {function(number): ?} callback The function to call
 *     at the end of iterations. Takes the number of the matching elements.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S
 */
goog.array.async.count = function(arr, iterator, callback, opt_scope) {
  var res = 0;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2 && iterator.call(opt_scope, arr2[index], index, arr)) {
        ++res;
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously passes every element of an array into a function
 * and accumulates the result.
 *
 * @param {Array<T>|goog.array.ArrayLike} arr Array or array
 *     like object over which to iterate.
 * @param {?} initValue The initial value to pass into the function
 *     on the first call.
 * @param {function(this: S, R, T, number, ?): R} iterator The function
 *     to call for every element. This function
 *     takes 4 arguments (the function's previous result or the initial value,
 *     the value of the current array element, the current array index, and the
 *     array itself)
 *     function(previousValue, currentValue, index, array).
 * @param {function(R): ?} callback The function to call
 *     at the end of iterations. Takes the result of evaluating iterator
 *     repeatedly across the values of the array.
 * @param {S=} opt_scope The object to be used as the value of 'this'
 *     within iterator and callback.
 * @template T,S,R
 */
goog.array.async.reduce = function(arr, initValue, iterator, callback, opt_scope) {
  var res = initValue;
  var arr2 = goog.isString(arr) ? arr.split('') : arr;
  goog.array.async.iterator_(arr.length, 0
  , function(index) {
      if (index in arr2) {
        res = iterator.call(opt_scope, res, arr2[index], index, arr);
      }
      return true;
  }, function() {
      callback.call(opt_scope, res);
  });
};

/**
 * Asynchronously calls iterator function for each index of array.
 * Calls callback function at the end of iterations.
 *
 * @private
 * @param {number} length The length of array, i.e. max. iterations - 1
 * @param {number} index Current iteration index
 * @param {function(number): boolean} iterator The function to call on each
 *     iteration. Takes current index as argument and returns boolean.
 *     If false is returned, iterator terminates remaining iterations and
 *     calls callback.
 * @param {function(): ?} callback The function to call at the end of
 *     iterations. Takes no arguments.
 */
goog.array.async.iterator_ = function(length, index, iterator, callback) {
  goog.async.run(function() {
    if (index < length) {
      index = iterator(index) && index < length - 1 ? index + 1 : length;
      goog.array.async.iterator_(length, index, iterator, callback);
    } else {
      callback();
    }
  });
};