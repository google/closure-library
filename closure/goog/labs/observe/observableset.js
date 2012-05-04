// Copyright 2012 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview A set of {@code goog.labs.observe.Observable}s that
 * allow registering and removing observers to all of the observables
 * in the set.
 */

goog.provide('goog.labs.observe.ObservableSet');

goog.require('goog.array');
goog.require('goog.labs.observe.Observer');



/**
 * Creates a set of observables.
 *
 * ObservableSet tracks observers (and their types) that it registers
 * on every observables in the set. The class is meant to simplify
 * management of observations on a set of observables.
 *
 * @constructor
 */
goog.labs.observe.ObservableSet = function() {
  /**
   * An array of observations where each observation is an array of
   * [type, observer].
   * @type {!Array}
   * @private
   */
  this.observations_ = [];

  /**
   * @type {!Array.<!goog.labs.observe.Observable>}
   * @private
   */
  this.observables_ = [];
};


/**
 * Adds an observer and type that observes all observables in the
 * set. If new observables are added to or removed from the set, the
 * observer will be registered or unregistered accordingly.
 *
 * The observer will not be added if there is already an equivalent
 * observer with the same type.
 *
 * @param {!goog.labs.observe.NoticeType} type The notice type to observe.
 * @param {!goog.labs.observe.Observer} observer The observer to invoke.
 * @return {boolean} Whether the observer is actually added.
 */
goog.labs.observe.ObservableSet.prototype.addObserver = function(
    type, observer) {
  // Check whether the (type, observer) tuple already exists.
  if (goog.array.find(this.observations_, goog.partial(
      goog.labs.observe.ObservableSet.compareObservations_, type, observer))) {
    return false;
  }

  this.observations_.push([type, observer]);
  goog.array.forEach(this.observables_, function(o) {
    o.observe(type, observer);
  });
  return true;
};


/**
 * Removes an observer from the set. The observer will be removed from
 * all observables in the set. Does nothing if the observer is not in
 * the set.
 * @param {!goog.labs.observe.NoticeType} type The notice type to remove.
 * @param {!goog.labs.observe.Observer} observer The observer to remove.
 * @return {boolean} Whether the observer is actually removed.
 */
goog.labs.observe.ObservableSet.prototype.removeObserver = function(
    type, observer) {
  // Check that the (type, observer) tuple exists before removing.
  var removed = goog.array.removeIf(this.observations_, goog.partial(
      goog.labs.observe.ObservableSet.compareObservations_, type, observer));

  if (removed) {
    goog.array.forEach(this.observables_, function(o) {
      o.unobserve(type, observer);
    });
  }
  return removed;
};


/**
 * Removes all registered observers.
 */
goog.labs.observe.ObservableSet.prototype.removeAllObservers = function() {
  this.unregisterAll_();
  this.observations_ = [];
};


/**
 * Adds an observable to the set. All previously added and future
 * observers will be added to the new observable as well.
 *
 * The observable will not be added if it is already registered in the
 * set.
 *
 * @param {!goog.labs.observe.Observable} observable The observable to add.
 * @return {boolean} Whether the observable is actually added.
 */
goog.labs.observe.ObservableSet.prototype.addObservable = function(observable) {
  if (goog.array.contains(this.observables_, observable)) {
    return false;
  }

  this.observables_.push(observable);
  goog.array.forEach(this.observations_, function(observation) {
    observable.observe(observation[0], observation[1]);
  });
  return true;
};


/**
 * Removes an observable from the set. All observers registered on the
 * set will be removed from the observable as well.
 * @param {!goog.labs.observe.Observable} observable The observable to remove.
 * @return {boolean} Whether the observable is actually removed.
 */
goog.labs.observe.ObservableSet.prototype.removeObservable = function(
    observable) {
  var removed = goog.array.remove(this.observables_, observable);
  if (removed) {
    goog.array.forEach(this.observations_, function(observation) {
      observable.unobserve(observation[0], observation[1]);
    });
  }
  return removed;
};


/**
 * Removes all registered observables.
 */
goog.labs.observe.ObservableSet.prototype.removeAllObservables = function() {
  this.unregisterAll_();
  this.observables_ = [];
};


/**
 * Removes all registered observations and observables.
 */
goog.labs.observe.ObservableSet.prototype.removeAll = function() {
  this.removeAllObservers();
  this.observables_ = [];
};


/**
 * Unregisters all registered observers from all registered observables.
 * @private
 */
goog.labs.observe.ObservableSet.prototype.unregisterAll_ = function() {
  goog.array.forEach(this.observations_, function(observation) {
    var type = observation[0];
    var observer = observation[1];
    goog.array.forEach(this.observables_, function(o) {
      o.unobserve(type, observer);
    });
  }, this);
};


/**
 * Compares the given observer and its type with an array of [type, observer].
 * @param {!goog.labs.observe.NoticeType} type The notice type to compare.
 * @param {!goog.labs.observe.Observer} observer The observer to compare.
 * @param {!Array} observation The array of [type, observer] to compare.
 * @return {boolean} Whether the given type and observer matches the
 *     type and observer in the given observationTuple.
 * @private
 */
goog.labs.observe.ObservableSet.compareObservations_ = function(
    type, observer, observation) {
  return observation[0] == type && goog.labs.observe.Observer.equals(
      observation[1], observer);
};
