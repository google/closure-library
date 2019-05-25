// Copyright 2009 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.testing.events.EventMatcherTest');
goog.setTestOnly();

const EventMatcher = goog.require('goog.testing.events.EventMatcher');
const GoogEvent = goog.require('goog.events.Event');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testEventMatcher() {
    const matcher = new EventMatcher('foo');
    assertFalse(matcher.matches(undefined));
    assertFalse(matcher.matches(null));
    assertFalse(matcher.matches({type: 'foo'}));
    assertFalse(matcher.matches(new GoogEvent('bar')));

    assertTrue(matcher.matches(new GoogEvent('foo')));
    const FooEvent = function() {
      GoogEvent.call(this, 'foo');
    };
    goog.inherits(FooEvent, GoogEvent);
    assertTrue(matcher.matches(new FooEvent()));
  },
});
