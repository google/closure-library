// Copyright 2006 The Closure Library Authors. All Rights Reserved.
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

goog.provide('goog.dom.formsTest');
goog.setTestOnly('goog.dom.formsTest');

goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.testing.PropertyReplacer');
goog.require('goog.testing.jsunit');


const stubs = new goog.testing.PropertyReplacer();

function tearDown() {
  stubs.reset();
}


/**
 * Sets up a mocked version of goog.window.openBlank.
 * @param {!Object} mockForm A mocked form Object to return on
 *     createElement('form').
 */
function mockWindowOpen(mockForm) {
  const windowOpen = function() {
    return {
      document: {
        createElement: function(name) {
          if (name == 'form') {
            return mockForm;
          }
          return {};
        }
      }
    };
  };
  stubs.setPath('goog.window.openBlank', windowOpen);
}

function testSubmitFormInNewWindowWithSubmitButton() {
  const expectedForm = [
    {name: 'in1', value: 'foo', type: 'hidden'},
    {name: 'in2', value: 'bar', type: 'hidden'},
    {name: 'in2', value: 'baaz', type: 'hidden'},
    {name: 'in3', value: '', type: 'hidden'},
    {name: 'pass', value: 'bar', type: 'hidden'},
    {name: 'textarea', value: 'foo bar baz', type: 'hidden'},
    {name: 'select1', value: '1', type: 'hidden'},
    {name: 'select2', value: 'a', type: 'hidden'},
    {name: 'select2', value: 'c', type: 'hidden'},
    {name: 'select3', value: '', type: 'hidden'},
    {name: 'checkbox1', value: 'on', type: 'hidden'},
    {name: 'radio', value: 'X', type: 'hidden'},
    {name: 'radio2', value: 'Y', type: 'hidden'},
    {name: 'submit', value: 'submitb', type: 'hidden'}
  ];

  const formElements = [];
  const mockForm = {};

  const appendChild = HTMLFormElement.prototype.appendChild;
  const submit = HTMLFormElement.prototype.submit;

  HTMLFormElement.prototype.appendChild = function(child) {
    formElements.push(child);
  };
  HTMLFormElement.prototype.submit = function() {
    assertArrayEquals(expectedForm, formElements);
    assertEquals('https://foo.xyz/baz', mockForm.action);
    assertEquals('get', mockForm.method);
  };
  mockWindowOpen(mockForm);

  const formEl = goog.dom.getElement('testform1');
  const submitEl = goog.dom.getElement('submitb');
  const result = goog.dom.forms.submitFormInNewWindow(formEl, submitEl);
  assertTrue(result);
  HTMLFormElement.prototype.appendChild = appendChild;
  HTMLFormElement.prototype.submit = submit;
}

function testSubmitFormInNewWindowWithSubmitInput() {
  const expectedForm = [
    {name: 'in1', value: 'foo', type: 'hidden'},
    {name: 'in2', value: 'bar', type: 'hidden'},
    {name: 'in2', value: 'baaz', type: 'hidden'},
    {name: 'in3', value: '', type: 'hidden'},
    {name: 'pass', value: 'bar', type: 'hidden'},
    {name: 'textarea', value: 'foo bar baz', type: 'hidden'},
    {name: 'select1', value: '1', type: 'hidden'},
    {name: 'select2', value: 'a', type: 'hidden'},
    {name: 'select2', value: 'c', type: 'hidden'},
    {name: 'select3', value: '', type: 'hidden'},
    {name: 'checkbox1', value: 'on', type: 'hidden'},
    {name: 'radio', value: 'X', type: 'hidden'},
    {name: 'radio2', value: 'Y', type: 'hidden'},
    {name: 'submit', value: 'submitv', type: 'hidden'}
  ];

  const formElements = [];
  const mockForm = {};

  const appendChild = HTMLFormElement.prototype.appendChild;
  const submit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.appendChild = function(child) {
    formElements.push(child);
  };
  HTMLFormElement.prototype.submit = function() {
    assertArrayEquals(expectedForm, formElements);
    assertEquals('https://foo.xyz/baz', mockForm.action);
    assertEquals('get', mockForm.method);
  };
  mockWindowOpen(mockForm);


  const formEl = goog.dom.getElement('testform1');
  const submitEl = goog.dom.getElement('submit');
  const result = goog.dom.forms.submitFormInNewWindow(formEl, submitEl);
  assertTrue(result);
  HTMLFormElement.prototype.appendChild = appendChild;
  HTMLFormElement.prototype.submit = submit;
}

function testSubmitFormInNewWindowWithoutSubmitButton() {
  const expectedForm = [
    {name: 'in1', value: 'foo', type: 'hidden'},
    {name: 'in2', value: 'bar', type: 'hidden'},
    {name: 'in2', value: 'baaz', type: 'hidden'},
    {name: 'in3', value: '', type: 'hidden'},
    {name: 'pass', value: 'bar', type: 'hidden'},
    {name: 'textarea', value: 'foo bar baz', type: 'hidden'},
    {name: 'select1', value: '1', type: 'hidden'},
    {name: 'select2', value: 'a', type: 'hidden'},
    {name: 'select2', value: 'c', type: 'hidden'},
    {name: 'select3', value: '', type: 'hidden'},
    {name: 'checkbox1', value: 'on', type: 'hidden'},
    {name: 'radio', value: 'X', type: 'hidden'},
    {name: 'radio2', value: 'Y', type: 'hidden'}
  ];

  const formElements = [];
  const mockForm = {};

  const appendChild = HTMLFormElement.prototype.appendChild;
  const submit = HTMLFormElement.prototype.submit;

  HTMLFormElement.prototype.appendChild = function(child) {
    formElements.push(child);
  };
  HTMLFormElement.prototype.submit = function() {
    assertArrayEquals(expectedForm, formElements);
    assertEquals('https://foo.bar/baz', mockForm.action);
    assertEquals('get', mockForm.method);
  };
  mockWindowOpen(mockForm);

  const formEl = goog.dom.getElement('testform1');
  const result = goog.dom.forms.submitFormInNewWindow(formEl);
  assertTrue(result);
  HTMLFormElement.prototype.appendChild = appendChild;
  HTMLFormElement.prototype.submit = submit;
}

function testSubmitFormInNewWindowError() {
  const formEl = goog.dom.getElement('testform1');
  const resetEl = goog.dom.getElement('reset');

  assertThrows(
      'Non-submit type elements cannot be used to submit form.',
      function() { goog.dom.forms.submitFormInNewWindow(formEl, resetEl); });
}

function testSubmitFormDataInNewWindow() {
  const expectedForm = [
    {name: 'in1', value: 'foo', type: 'hidden'},
    {name: 'in2', value: 'bar', type: 'hidden'},
    {name: 'in2', value: 'baaz', type: 'hidden'},
    {name: 'in3', value: '', type: 'hidden'},
    {name: 'pass', value: 'bar', type: 'hidden'},
    {name: 'textarea', value: 'foo bar baz', type: 'hidden'},
    {name: 'select1', value: '1', type: 'hidden'},
    {name: 'select2', value: 'a', type: 'hidden'},
    {name: 'select2', value: 'c', type: 'hidden'},
    {name: 'select3', value: '', type: 'hidden'},
    {name: 'checkbox1', value: 'on', type: 'hidden'},
    {name: 'radio', value: 'X', type: 'hidden'},
    {name: 'radio2', value: 'Y', type: 'hidden'}
  ];

  const formElements = [];
  const mockForm = {};

  const appendChild = HTMLFormElement.prototype.appendChild;
  const submit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.appendChild = function(child) {
    formElements.push(child);
  };
  HTMLFormElement.prototype.submit = function() {
    assertArrayEquals(expectedForm, formElements);
    assertEquals('https://foo.bar/baz', mockForm.action);
    assertEquals('get', mockForm.method);
  };
  mockWindowOpen(mockForm);

  const formEl = goog.dom.getElement('testform1');
  const formData = goog.dom.forms.getFormDataMap(formEl);
  const result = goog.dom.forms.submitFormDataInNewWindow(
      formEl.action, formEl.method, formData);
  assertTrue(result);
  HTMLFormElement.prototype.appendChild = appendChild;
  HTMLFormElement.prototype.submit = submit;
}

function testGetFormDataString() {
  const el = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getFormDataString(el);
  assertEquals(
      'in1=foo&in2=bar&in2=baaz&in3=&pass=bar&textarea=foo%20bar%20baz&' +
          'select1=1&select2=a&select2=c&select3=&checkbox1=on&radio=X&radio2=Y',
      result);
}

function testGetFormDataMap() {
  const el = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getFormDataMap(el);

  assertArrayEquals(['foo'], result.get('in1'));
  assertArrayEquals(['bar', 'baaz'], result.get('in2'));
  assertArrayEquals(['1'], result.get('select1'));
  assertArrayEquals(['a', 'c'], result.get('select2'));
  assertArrayEquals(['on'], result.get('checkbox1'));
  assertUndefined(result.get('select6'));
  assertUndefined(result.get('checkbox2'));
  assertArrayEquals(['X'], result.get('radio'));
  assertArrayEquals(['Y'], result.get('radio2'));
}

function testHasFileInput() {
  let el = goog.dom.getElement('testform1');
  assertFalse(goog.dom.forms.hasFileInput(el));
  el = goog.dom.getElement('testform2');
  assertTrue(goog.dom.forms.hasFileInput(el));
}


function testGetValueOnAtypicalValueElements() {
  let el = goog.dom.getElement('testdiv1');
  let result = goog.dom.forms.getValue(el);
  assertNull(result);
  el = goog.dom.getElement('testfieldset1');
  result = goog.dom.forms.getValue(el);
  assertNull(result);
  el = goog.dom.getElement('testlegend1');
  result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testHasValueInput() {
  const el = goog.dom.getElement('in1');
  const result = goog.dom.forms.hasValue(el);
  assertTrue(result);
}

function testGetValueByNameForNonExistentElement() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getValueByName(form, 'non_existent');
  assertNull(result);
}

function testHasValueByNameInput() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'in1');
  assertTrue(result);
}

function testHasValueInputEmpty() {
  const el = goog.dom.getElement('in3');
  const result = goog.dom.forms.hasValue(el);
  assertFalse(result);
}

function testHasValueByNameEmpty() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'in3');
  assertFalse(result);
}

function testHasValueRadio() {
  const el = goog.dom.getElement('radio1');
  const result = goog.dom.forms.hasValue(el);
  assertTrue(result);
}

function testHasValueByNameRadio() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'radio');
  assertTrue(result);
}

function testHasValueRadioNotChecked() {
  const el = goog.dom.getElement('radio2');
  const result = goog.dom.forms.hasValue(el);
  assertFalse(result);
}

function testHasValueByNameRadioNotChecked() {
  const form = goog.dom.getElement('testform3');
  const result = goog.dom.forms.hasValueByName(form, 'radio3');
  assertFalse(result);
}

function testHasValueSelectSingle() {
  const el = goog.dom.getElement('select1');
  const result = goog.dom.forms.hasValue(el);
  assertTrue(result);
}

function testHasValueByNameSelectSingle() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'select1');
  assertTrue(result);
}

function testHasValueSelectMultiple() {
  const el = goog.dom.getElement('select2');
  const result = goog.dom.forms.hasValue(el);
  assertTrue(result);
}

function testHasValueByNameSelectMultiple() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'select2');
  assertTrue(result);
}

function testHasValueSelectNotSelected() {
  // select without value
  const el = goog.dom.getElement('select3');
  const result = goog.dom.forms.hasValue(el);
  assertFalse(result);
}

function testHasValueByNameSelectNotSelected() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.hasValueByName(form, 'select3');
  assertFalse(result);
}

function testHasValueSelectMultipleNotSelected() {
  const el = goog.dom.getElement('select6');
  const result = goog.dom.forms.hasValue(el);
  assertFalse(result);
}

function testHasValueByNameSelectMultipleNotSelected() {
  const form = goog.dom.getElement('testform3');
  const result = goog.dom.forms.hasValueByName(form, 'select6');
  assertFalse(result);
}

// TODO(user): make this a meaningful selenium test
function testSetDisabledFalse() {}
function testSetDisabledTrue() {}

// TODO(user): make this a meaningful selenium test
function testFocusAndSelect() {
  const el = goog.dom.getElement('in1');
  goog.dom.forms.focusAndSelect(el);
}

function testGetValueInput() {
  const el = goog.dom.getElement('in1');
  const result = goog.dom.forms.getValue(el);
  assertEquals('foo', result);
}

function testSetValueInput() {
  const el = goog.dom.getElement('in3');
  goog.dom.forms.setValue(el, 'foo');
  assertEquals('foo', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, 3500);
  assertEquals('3500', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, 0);
  assertEquals('0', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, null);
  assertEquals('', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, undefined);
  assertEquals('', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, false);
  assertEquals('false', goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, {});
  assertEquals({}.toString(), goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, {toString: function() { return 'test'; }});
  assertEquals('test', goog.dom.forms.getValue(el));

  // unset
  goog.dom.forms.setValue(el);
  assertEquals('', goog.dom.forms.getValue(el));
}

function testGetValueMeter() {
  const el = goog.dom.createDom('meter', {'min': 0, 'max': 3, 'value': 2.3});
  assertEquals(2.3, goog.dom.forms.getValue(el));
}

function testSetValueMeter() {
  const el = goog.dom.createDom('meter', {'min': 1, 'max': 5, 'value': 3});

  assertEquals(3, goog.dom.forms.getValue(el));

  goog.dom.forms.setValue(el, 2);
  assertEquals(2, goog.dom.forms.getValue(el));
}

function testGetValuePassword() {
  const el = goog.dom.getElement('pass');
  const result = goog.dom.forms.getValue(el);
  assertEquals('bar', result);
}

function testGetValueByNamePassword() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getValueByName(form, 'pass');
  assertEquals('bar', result);
}

function testGetValueTextarea() {
  const el = goog.dom.getElement('textarea1');
  const result = goog.dom.forms.getValue(el);
  assertEquals('foo bar baz', result);
}

function testGetValueByNameTextarea() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getValueByName(form, 'textarea1');
  assertEquals('foo bar baz', result);
}

function testSetValueTextarea() {
  const el = goog.dom.getElement('textarea2');
  goog.dom.forms.setValue(el, 'foo bar baz');
  const result = goog.dom.forms.getValue(el);
  assertEquals('foo bar baz', result);
}

function testGetValueSelectSingle() {
  const el = goog.dom.getElement('select1');
  const result = goog.dom.forms.getValue(el);
  assertEquals('1', result);
}

function testGetValueByNameSelectSingle() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getValueByName(form, 'select1');
  assertEquals('1', result);
}

function testSetValueSelectSingle() {
  const el = goog.dom.getElement('select4');
  goog.dom.forms.setValue(el, '2');
  let result = goog.dom.forms.getValue(el);
  assertEquals('2', result);
  // unset
  goog.dom.forms.setValue(el);
  result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testSetValueSelectSingleEmptyString() {
  const el = goog.dom.getElement('select7');
  // unset
  goog.dom.forms.setValue(el);
  let result = goog.dom.forms.getValue(el);
  assertNull(result);
  goog.dom.forms.setValue(el, '');
  result = goog.dom.forms.getValue(el);
  assertEquals('', result);
}

function testGetValueSelectMultiple() {
  const el = goog.dom.getElement('select2');
  const result = goog.dom.forms.getValue(el);
  assertArrayEquals(['a', 'c'], result);
}

function testGetValueSelectMultipleNotSelected() {
  const el = goog.dom.getElement('select6');
  const result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testGetValueByNameSelectMultiple() {
  const form = goog.dom.getElement('testform1');
  const result = goog.dom.forms.getValueByName(form, 'select2');
  assertArrayEquals(['a', 'c'], result);
}

function testSetValueSelectMultiple() {
  const el = goog.dom.getElement('select5');
  goog.dom.forms.setValue(el, ['a', 'c']);
  let result = goog.dom.forms.getValue(el);
  assertArrayEquals(['a', 'c'], result);

  goog.dom.forms.setValue(el, 'a');
  result = goog.dom.forms.getValue(el);
  assertArrayEquals(['a'], result);

  // unset
  goog.dom.forms.setValue(el);
  result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testGetValueCheckbox() {
  let el = goog.dom.getElement('checkbox1');
  let result = goog.dom.forms.getValue(el);
  assertEquals('on', result);
  el = goog.dom.getElement('checkbox2');
  result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testGetValueByNameCheckbox() {
  const form = goog.dom.getElement('testform1');
  let result = goog.dom.forms.getValueByName(form, 'checkbox1');
  assertEquals('on', result);
  result = goog.dom.forms.getValueByName(form, 'checkbox2');
  assertNull(result);
}

function testGetValueRadio() {
  let el = goog.dom.getElement('radio1');
  let result = goog.dom.forms.getValue(el);
  assertEquals('X', result);
  el = goog.dom.getElement('radio2');
  result = goog.dom.forms.getValue(el);
  assertNull(result);
}

function testGetValueByNameRadio() {
  const form = goog.dom.getElement('testform1');
  let result = goog.dom.forms.getValueByName(form, 'radio');
  assertEquals('X', result);

  result = goog.dom.forms.getValueByName(form, 'radio2');
  assertEquals('Y', result);
}

function testGetValueButton() {
  const el = goog.dom.getElement('button');
  const result = goog.dom.forms.getValue(el);
  assertEquals('button', result);
}

function testGetValueSubmit() {
  const el = goog.dom.getElement('submit');
  const result = goog.dom.forms.getValue(el);
  assertEquals('submitv', result);
}

function testGetValueReset() {
  const el = goog.dom.getElement('reset');
  const result = goog.dom.forms.getValue(el);
  assertEquals('reset', result);
}

function testGetFormDataHelperAndNonInputElements() {
  const el = goog.dom.getElement('testform4');
  goog.dom.forms.getFormDataHelper_(el, {}, goog.nullFunction);
}
