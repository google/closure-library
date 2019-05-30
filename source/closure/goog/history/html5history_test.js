// Copyright 2010 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.history.Html5HistoryTest');
goog.setTestOnly();

// Delay running the tests after page load. This test has some asynchronous
// behavior that interacts with page load detection.
goog.testing.jsunit.AUTO_RUN_DELAY_IN_MS = 500;

const EventType = goog.require('goog.events.EventType');
const HistoryEventType = goog.require('goog.history.EventType');
const Html5History = goog.require('goog.history.Html5History');
const MockControl = goog.require('goog.testing.MockControl');
const Timer = goog.require('goog.Timer');
const events = goog.require('goog.events');
const mockmatchers = goog.require('goog.testing.mockmatchers');
const recordFunction = goog.require('goog.testing.recordFunction');
const testSuite = goog.require('goog.testing.testSuite');

let mockControl;
let mockWindow;

let html5History;

// Regression test for b/18663922.

// Regression test for b/18663922.

testSuite({
  setUp() {
    mockControl = new MockControl();

    mockWindow = {location: {}};
    mockWindow.attachEvent = mockControl.createFunctionMock();
    mockWindow
        .attachEvent(mockmatchers.ignoreArgument, mockmatchers.ignoreArgument)
        .$anyTimes();
    const mockHistoryIsSupportedMethod =
        mockControl.createMethodMock(Html5History, 'isSupported');
    mockHistoryIsSupportedMethod(mockWindow).$returns(true).$anyTimes();
  },

  tearDown() {
    if (html5History) {
      html5History.dispose();
      html5History = null;
    }
    mockControl.$tearDown();
  },

  testGetTokenWithoutUsingFragment() {
    mockWindow.location.pathname = '/test/something';

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow);
    html5History.setUseFragment(false);

    assertEquals('test/something', html5History.getToken());
    mockControl.$verifyAll();
  },

  testGetTokenWithoutUsingFragmentWithCustomPathPrefix() {
    mockWindow.location.pathname = '/test/something';

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow);
    html5History.setUseFragment(false);
    html5History.setPathPrefix('/test/');

    assertEquals('something', html5History.getToken());
    mockControl.$verifyAll();
  },

  testGetTokenWithoutUsingFragmentWithCustomTransformer() {
    mockWindow.location.pathname = '/test/something';
    const mockTransformer =
        mockControl.createLooseMock(Html5History.TokenTransformer);
    mockTransformer.retrieveToken('/', mockWindow.location).$returns('abc/1');

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow, mockTransformer);
    html5History.setUseFragment(false);

    assertEquals('abc/1', html5History.getToken());
    mockControl.$verifyAll();
  },

  testGetTokenWithoutUsingFragmentWithCustomTransformerAndPrefix() {
    mockWindow.location.pathname = '/test/something';
    const mockTransformer =
        mockControl.createLooseMock(Html5History.TokenTransformer);
    mockTransformer.retrieveToken('/test/', mockWindow.location)
        .$returns('abc/1');

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow, mockTransformer);
    html5History.setUseFragment(false);
    html5History.setPathPrefix('/test/');

    assertEquals('abc/1', html5History.getToken());
    mockControl.$verifyAll();
  },

  testGetUrlWithoutUsingFragment() {
    mockWindow.location.search = '?q=something';

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow);
    html5History.setUseFragment(false);

    assertEquals('/some/token?q=something', html5History.getUrl_('some/token'));
    mockControl.$verifyAll();
  },

  testGetUrlWithoutUsingFragmentWithCustomPathPrefix() {
    mockWindow.location.search = '?q=something';

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow);
    html5History.setUseFragment(false);
    html5History.setPathPrefix('/test/');

    assertEquals(
        '/test/some/token?q=something', html5History.getUrl_('some/token'));
    mockControl.$verifyAll();
  },

  testGetUrlWithoutUsingFragmentWithCustomTransformer() {
    mockWindow.location.search = '?q=something';
    const mockTransformer =
        mockControl.createLooseMock(Html5History.TokenTransformer);
    mockTransformer.createUrl('some/token', '/', mockWindow.location)
        .$returns('/something/else/?different');

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow, mockTransformer);
    html5History.setUseFragment(false);

    assertEquals(
        '/something/else/?different', html5History.getUrl_('some/token'));
    mockControl.$verifyAll();
  },

  testGetUrlWithoutUsingFragmentWithCustomTransformerAndPrefix() {
    mockWindow.location.search = '?q=something';
    const mockTransformer =
        mockControl.createLooseMock(Html5History.TokenTransformer);
    mockTransformer.createUrl('some/token', '/test/', mockWindow.location)
        .$returns('/something/else/?different');

    mockControl.$replayAll();
    html5History = new Html5History(mockWindow, mockTransformer);
    html5History.setUseFragment(false);
    html5History.setPathPrefix('/test/');

    assertEquals(
        '/something/else/?different', html5History.getUrl_('some/token'));
    mockControl.$verifyAll();
  },

  testNavigateFiresOnceOnNavigation() {
    const history = new Html5History;
    const onNavigate = recordFunction();
    history.setEnabled(true);
    history.listen(HistoryEventType.NAVIGATE, onNavigate);

    // Simulate that the user navigates in the history.
    location = '#' + goog.now();

    return Timer.promise(0).then(() => {
      // NAVIGATE should fire once with isNavigation=true.
      onNavigate.assertCallCount(1);
      assertTrue(onNavigate.getLastCall().getArgument(0).isNavigation);
      return Timer.promise(0).then(() => {
        // NAVIGATE should not fire again after the current JS execution
        // context.
        onNavigate.assertCallCount(1);
      });
    });
  },

  testNavigateFiresOnceWithoutPopstate() {
    const history = new Html5History;
    const onNavigate = recordFunction();
    history.setEnabled(true);
    history.listen(HistoryEventType.NAVIGATE, onNavigate);

    // Removing POPSTATE to ensure NAVIGATE is triggered in browsers that don't
    // support it.
    assertTrue(events.unlisten(
        window, EventType.POPSTATE, history.onHistoryEvent_, false, history));

    // Simulate that the user navigates in the history.
    location = '#' + goog.now();

    return Timer.promise(0).then(() => {
      // NAVIGATE should fire once with isNavigation=true.
      onNavigate.assertCallCount(1);
      assertTrue(onNavigate.getLastCall().getArgument(0).isNavigation);
      return Timer.promise(0).then(() => {
        // NAVIGATE should not fire again after the current JS execution
        // context.
        onNavigate.assertCallCount(1);
      });
    });
  },
});
