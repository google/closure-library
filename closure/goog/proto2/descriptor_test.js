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

goog.module('goog.proto2.DescriptorTest');
goog.setTestOnly();

const Descriptor = goog.require('goog.proto2.Descriptor');
const Message = goog.require('goog.proto2.Message');
const testSuite = goog.require('goog.testing.testSuite');

testSuite({
  testDescriptorConstruction() {
    const messageType = () => {};
    const descriptor = new Descriptor(
        messageType, {name: 'test', fullName: 'this.is.a.test'}, []);

    assertEquals('test', descriptor.getName());
    assertEquals('this.is.a.test', descriptor.getFullName());
    assertEquals(null, descriptor.getContainingType());
  },

  testParentDescriptor() {
    const parentType = () => {};
    const messageType = () => {};

    const parentDescriptor = new Descriptor(
        parentType, {name: 'parent', fullName: 'this.is.a.parent'}, []);

    parentType.getDescriptor = () => parentDescriptor;

    const descriptor = new Descriptor(
        messageType,
        {name: 'test', fullName: 'this.is.a.test', containingType: parentType},
        []);

    assertEquals(parentDescriptor, descriptor.getContainingType());
  },

  testStaticGetDescriptorCachesResults() {
    const messageType = function() {};

    // This method would be provided by proto_library() BUILD rule.
    messageType.prototype.getDescriptor = () => {
      if (!messageType.descriptor_) {
        // The descriptor is created lazily when we instantiate a new instance.
        const descriptorObj = {0: {name: 'test', fullName: 'this.is.a.test'}};
        messageType.descriptor_ =
            Message.createDescriptor(messageType, descriptorObj);
      }
      return messageType.descriptor_;
    };
    messageType.getDescriptor = messageType.prototype.getDescriptor;

    const descriptor = messageType.getDescriptor();
    assertEquals(descriptor, messageType.getDescriptor());  // same instance
  },
});
