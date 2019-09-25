// Copyright 2008 The Closure Library Authors. All Rights Reserved.
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

goog.module('goog.ui.registryTest');
goog.setTestOnly();

const googObject = goog.require('goog.object');
const registry = goog.require('goog.ui.registry');
const testSuite = goog.require('goog.testing.testSuite');


// TODO(nickreid): THis all breaks when implemented using ES6 classes because of
// issue with `goog.getUid` and `ctor.superClass_`.

// Fake component and renderer implementations, for testing only.

// UnknownComponent has no default renderer or decorator registered.
function UnknownComponent() {}

// FakeComponentX's default renderer is FakeRenderer.  It also has a
// decorator.
function FakeComponentX() {
  this.element = null;
}

FakeComponentX.prototype.decorate = function(element) {
  this.element = element;
};

// FakeComponentY doesn't have an explicitly registered default
// renderer; it should inherit the default renderer from its superclass.
// It does have a decorator registered.
function FakeComponentY() {
  FakeComponentX.call(this);
}
goog.inherits(FakeComponentY, FakeComponentX);

// FakeComponentZ is just another component.  Its default renderer is
// FakeSingletonRenderer, but it has no decorator registered.
function FakeComponentZ() {}

// FakeRenderer is a stateful renderer.
function FakeRenderer() {}

// FakeSingletonRenderer is a stateless renderer that can be used as a
// singleton.
function FakeSingletonRenderer() {}

FakeSingletonRenderer.instance_ = new FakeSingletonRenderer();

FakeSingletonRenderer.getInstance = function() {
  return FakeSingletonRenderer.instance_;
};


testSuite({
  setUp() {
    registry.setDefaultRenderer(FakeComponentX, FakeRenderer);
    registry.setDefaultRenderer(FakeComponentZ, FakeSingletonRenderer);

    registry.setDecoratorByClassName(
        'fake-component-x', () => new FakeComponentX());
    registry.setDecoratorByClassName(
        'fake-component-y', () => new FakeComponentY());
  },

  tearDown() {
    registry.reset();
  },

  testGetDefaultRenderer() {
    const rx1 = registry.getDefaultRenderer(FakeComponentX);
    const rx2 = registry.getDefaultRenderer(FakeComponentX);
    assertTrue(
        'FakeComponentX\'s default renderer must be a FakeRenderer',
        rx1 instanceof FakeRenderer);
    assertNotEquals(
        'Each call to getDefaultRenderer must create a new ' +
            'FakeRenderer',
        rx1, rx2);

    const ry = registry.getDefaultRenderer(FakeComponentY);
    assertTrue(
        'FakeComponentY must inherit its default renderer from ' +
            'its superclass',
        ry instanceof FakeRenderer);

    const rz1 = registry.getDefaultRenderer(FakeComponentZ);
    const rz2 = registry.getDefaultRenderer(FakeComponentZ);
    assertTrue(
        'FakeComponentZ\' default renderer must be a ' +
            'FakeSingletonRenderer',
        rz1 instanceof FakeSingletonRenderer);
    assertEquals(
        'Each call to getDefaultRenderer must return the ' +
            'singleton instance of FakeSingletonRenderer',
        rz1, rz2);

    assertNull(
        'getDefaultRenderer must return null for unknown component',
        registry.getDefaultRenderer(UnknownComponent));
  },

  testSetDefaultRenderer() {
    const rx1 = registry.getDefaultRenderer(FakeComponentX);
    assertTrue(
        'FakeComponentX\'s renderer must be FakeRenderer',
        rx1 instanceof FakeRenderer);

    const ry1 = registry.getDefaultRenderer(FakeComponentY);
    assertTrue(
        'FakeComponentY must inherit its default renderer from ' +
            'its superclass',
        ry1 instanceof FakeRenderer);

    registry.setDefaultRenderer(FakeComponentX, FakeSingletonRenderer);

    const rx2 = registry.getDefaultRenderer(FakeComponentX);
    assertEquals(
        'FakeComponentX\'s renderer must be FakeSingletonRenderer',
        FakeSingletonRenderer.getInstance(), rx2);

    const ry2 = registry.getDefaultRenderer(FakeComponentY);
    assertEquals(
        'FakeComponentY must inherit the new default renderer ' +
            'from its superclass',
        FakeSingletonRenderer.getInstance(), ry2);

    registry.setDefaultRenderer(FakeComponentY, FakeRenderer);

    const rx3 = registry.getDefaultRenderer(FakeComponentX);
    assertEquals(
        'FakeComponentX\'s renderer must be unchanged',
        FakeSingletonRenderer.getInstance(), rx3);

    const ry3 = registry.getDefaultRenderer(FakeComponentY);
    assertTrue(
        'FakeComponentY must now have its own default renderer',
        ry3 instanceof FakeRenderer);

    assertThrows(
        'Calling setDefaultRenderer with non-function component ' +
            'must throw error',
        () => {
          registry.setDefaultRenderer('Not function', FakeRenderer);
        });

    assertThrows(
        'Calling setDefaultRenderer with non-function renderer ' +
            'must throw error',
        () => {
          registry.setDefaultRenderer(FakeComponentX, 'Not function');
        });
  },

  testGetDecoratorByClassName() {
    const dx1 = registry.getDecoratorByClassName('fake-component-x');
    const dx2 = registry.getDecoratorByClassName('fake-component-x');
    assertTrue(
        'fake-component-x must be decorated by a FakeComponentX',
        dx1 instanceof FakeComponentX);
    assertNotEquals(
        'Each call to getDecoratorByClassName must return a ' +
            'new FakeComponentX instance',
        dx1, dx2);

    const dy1 = registry.getDecoratorByClassName('fake-component-y');
    const dy2 = registry.getDecoratorByClassName('fake-component-y');
    assertTrue(
        'fake-component-y must be decorated by a FakeComponentY',
        dy1 instanceof FakeComponentY);
    assertNotEquals(
        'Each call to getDecoratorByClassName must return a ' +
            'new FakeComponentY instance',
        dy1, dy2);

    assertNull(
        'getDecoratorByClassName must return null for unknown class',
        registry.getDecoratorByClassName('fake-component-z'));
    assertNull(
        'getDecoratorByClassName must return null for empty string',
        registry.getDecoratorByClassName(''));
  },

  testSetDecoratorByClassName() {
    let dx1;
    let dx2;

    dx1 = registry.getDecoratorByClassName('fake-component-x');
    assertTrue(
        'fake-component-x must be decorated by a FakeComponentX',
        dx1 instanceof FakeComponentX);
    registry.setDecoratorByClassName(
        'fake-component-x', () => new UnknownComponent());
    dx2 = registry.getDecoratorByClassName('fake-component-x');
    assertTrue(
        'fake-component-x must now be decorated by UnknownComponent',
        dx2 instanceof UnknownComponent);

    assertThrows(
        'Calling setDecoratorByClassName with invalid class name ' +
            'must throw error',
        () => {
          registry.setDecoratorByClassName('', () => new UnknownComponent());
        });

    assertThrows(
        'Calling setDecoratorByClassName with non-function ' +
            'decorator must throw error',
        () => {
          registry.setDecoratorByClassName('fake-component-x', 'Not function');
        });
  },

  testGetDecorator() {
    const dx = registry.getDecorator(document.getElementById('x'));
    assertTrue(
        'Decorator for element with fake-component-x class must be ' +
            'a FakeComponentX',
        dx instanceof FakeComponentX);

    const dy = registry.getDecorator(document.getElementById('y'));
    assertTrue(
        'Decorator for element with fake-component-y class must be ' +
            'a FakeComponentY',
        dy instanceof FakeComponentY);

    const dz = registry.getDecorator(document.getElementById('z'));
    assertNull('Decorator for element with unknown class must be null', dz);

    const du = registry.getDecorator(document.getElementById('u'));
    assertNull('Decorator for element without CSS class must be null', du);
  },

  testReset() {
    assertNotEquals(
        'Some renderers must be registered', 0,
        googObject.getCount(registry.defaultRenderers_));
    assertNotEquals(
        'Some decorators must be registered', 0,
        googObject.getCount(registry.decoratorFunctions_));

    registry.reset();

    assertTrue(
        'No renderers must be registered',
        googObject.isEmpty(registry.defaultRenderers_));
    assertTrue(
        'No decorators must be registered',
        googObject.isEmpty(registry.decoratorFunctions_));
  },
});
