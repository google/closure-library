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

/**
 * @fileoverview Provides facilities for creating and querying tweaks.
 * @see http://go/jstweaks
 *
 * @author agrieve@google.com (Andrew Grieve)
 */

goog.provide('goog.tweak');
goog.provide('goog.tweak.ConfigParams');

goog.require('goog.asserts');
goog.require('goog.tweak.BooleanGroup');
goog.require('goog.tweak.BooleanInGroupSetting');
goog.require('goog.tweak.BooleanSetting');
goog.require('goog.tweak.ButtonAction');
goog.require('goog.tweak.NumericSetting');
goog.require('goog.tweak.Registry');
goog.require('goog.tweak.StringSetting');


/**
 * The global reference to the registry, if it exists.
 * @type {goog.tweak.Registry}
 * @private
 */
goog.tweak.registry_ = null;


/**
 * The boolean group set by beginBooleanGroup and cleared by endBooleanGroup.
 * @type {goog.tweak.BooleanGroup}
 * @private
 */
goog.tweak.activeBooleanGroup_ = null;


/**
 * Returns/creates the registry singleton. If tweaks are not enabled, returns
 * undefined.
 * @return {!goog.tweak.Registry|undefined} The tweak registry.
 */
goog.tweak.getRegistry = function() {
  if (!goog.tweak.STRIP_TWEAKS) {
    if (!goog.tweak.registry_) {
      goog.tweak.registry_ =
          new goog.tweak.Registry();
    }
    return goog.tweak.registry_;
  }
};


/**
 * Type for configParams.
 * TODO(agrieve): Remove |Object when optional fields in struct types are
 *     implemented.
 * @typedef {{
 *     validValues:(!Array.<string>|!Array.<number>|undefined),
 *     paramName:(string|undefined),
 *     restartRequired:(boolean|undefined),
 *     callback:(Function|undefined),
 *     token:(string|undefined)
 *     }|!Object}
 */
goog.tweak.ConfigParams;


/**
 * Silences warning about properties on ConfigParams never being set when
 * running JsLibTest.
 * @return {goog.tweak.ConfigParams} Dummy return.
 * @private
 */
goog.tweak.configParamsNeverCompilerWarningWorkAround_ = function() {
  return {
    validValues: [],
    paramName: '',
    restartRequired: true,
    callback: goog.nullFunction,
    token: ''
  };
};


/**
 * Applies all extra configuration parameters in configParams.
 * @param {!goog.tweak.BaseEntry} entry The entry to apply them to.
 * @param {!goog.tweak.ConfigParams} configParams Extra configuration
 *     parameters.
 * @private
 */
goog.tweak.applyConfigParams_ = function(entry, configParams) {
  if (configParams.validValues) {
    goog.asserts.assert(entry instanceof goog.tweak.StringSetting ||
        entry instanceof goog.tweak.NumericSetting,
        'Cannot set validValues on tweak: ' + entry.label);
    entry.setValidValues(configParams.validValues);
    delete configParams.validValues;
  }
  if (goog.isDef(configParams.paramName)) {
    goog.asserts.assertInstanceof(entry, goog.tweak.BaseSetting,
        'Cannot set paramName on tweak: ' + entry.label);
    entry.setParamName(configParams.paramName);
    delete configParams.paramName;
  }
  if (goog.isDef(configParams.restartRequired)) {
    entry.setRestartRequired(configParams.restartRequired);
    delete configParams.restartRequired;
  }
  if (configParams.callback) {
    entry.addCallback(configParams.callback);
    delete configParams.callback;
    goog.asserts.assert(
        !entry.isRestartRequired() || (configParams.restartRequired == false),
        'Tweak %s should set restartRequired: false, when adding a callback.',
        entry.label);
  }
  if (configParams.token) {
    goog.asserts.assertInstanceof(entry, goog.tweak.BooleanInGroupSetting,
        'Cannot set token on tweak: ' + entry.label);
    entry.setToken(configParams.token);
    delete configParams.token;
  }
  for (var key in configParams) {
    goog.asserts.fail('Unknown config options (' + key + '=' +
        configParams[key] + ') for tweak ' + entry.label);
  }
};


/**
 * Registers a tweak using the given factoryFunc.
 * @param {!goog.tweak.BaseEntry} entry The entry to register.
 * @param {boolean|string|number=} opt_defaultValue Default value.
 * @param {goog.tweak.ConfigParams=} opt_configParams Extra
 *     configuration parameters.
 * @private
 */
goog.tweak.doRegister_ = function(entry, opt_defaultValue, opt_configParams) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    if (opt_configParams) {
      goog.tweak.applyConfigParams_(entry, opt_configParams);
    }
    if (opt_defaultValue != undefined) {
      entry.setDefaultValue(opt_defaultValue);
    }
    if (goog.tweak.activeBooleanGroup_) {
      goog.asserts.assertInstanceof(entry, goog.tweak.BooleanInGroupSetting,
          'Forgot to end Boolean Group: ' +
          goog.tweak.activeBooleanGroup_.label);
      goog.tweak.activeBooleanGroup_.addChild(
          /** @type {!goog.tweak.BooleanInGroupSetting} */ (entry));
    }
    registry.register(entry);
  }
};


/**
 * Creates and registers a group of BooleanSettings that are all set by a
 * single query parameter. A call to goog.tweak.endBooleanGroup() must be used
 * to close this group. Only goog.tweak.registerBoolean() calls are allowed with
 * the beginBooleanGroup()/endBooleanGroup().
 * @param {string} label The label for the setting.
 * @param {string} description A description of what the setting does.
 * @param {goog.tweak.ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 */
goog.tweak.beginBooleanGroup = function(label, description, opt_configParams) {
  if (!goog.tweak.STRIP_TWEAKS) {
    var entry = new goog.tweak.BooleanGroup(label, description);
    goog.tweak.doRegister_(entry, undefined, opt_configParams);
    goog.tweak.activeBooleanGroup_ = entry;
  }
};


/**
 * Stops adding boolean entries to the active boolean group.
 */
goog.tweak.endBooleanGroup = function() {
  if (!goog.tweak.STRIP_TWEAKS) {
    goog.tweak.activeBooleanGroup_ = null;
  }
};


/**
 * Creates and registers a BooleanSetting.
 * @param {string} label The label for the setting.
 * @param {string} description A description of what the setting does.
 * @param {boolean=} opt_defaultValue The default value for the setting.
 * @param {goog.tweak.ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 */
goog.tweak.registerBoolean =
    function(label, description, opt_defaultValue, opt_configParams) {
  // TODO(agrieve): There is a bug in the compiler that causes these calls not
  //     to be stripped without this outer if. Might be Issue #90.
  if (!goog.tweak.STRIP_TWEAKS) {
    if (goog.tweak.activeBooleanGroup_) {
      var entry = new goog.tweak.BooleanInGroupSetting(label, description,
          goog.tweak.activeBooleanGroup_);
    } else {
      entry = new goog.tweak.BooleanSetting(label, description);
    }
    goog.tweak.doRegister_(entry, opt_defaultValue, opt_configParams);
  }
};


/**
 * Creates and registers a StringSetting.
 * @param {string} label The label for the setting.
 * @param {string} description A description of what the setting does.
 * @param {string=} opt_defaultValue The default value for the setting.
 * @param {goog.tweak.ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 */
goog.tweak.registerString =
    function(label, description, opt_defaultValue, opt_configParams) {
  if (!goog.tweak.STRIP_TWEAKS) {
    goog.tweak.doRegister_(new goog.tweak.StringSetting(label, description),
                           opt_defaultValue, opt_configParams);
  }
};


/**
 * Creates and registers a NumericSetting.
 * @param {string} label The label for the setting.
 * @param {string} description A description of what the setting does.
 * @param {number=} opt_defaultValue The default value for the setting.
 * @param {goog.tweak.ConfigParams=} opt_configParams Extra configuration
 *     parameters.
 */
goog.tweak.registerNumber =
    function(label, description, opt_defaultValue, opt_configParams) {
  if (!goog.tweak.STRIP_TWEAKS) {
    goog.tweak.doRegister_(new goog.tweak.NumericSetting(label, description),
                           opt_defaultValue, opt_configParams);
  }
};


/**
 * Creates and registers a ButtonAction.
 * @param {string} label The label for the action.
 * @param {string} description A description of what the action does.
 * @param {!Function} callback Function to call when the button is clicked.
 */
goog.tweak.registerButton = function(label, description, callback) {
  if (!goog.tweak.STRIP_TWEAKS) {
    goog.tweak.doRegister_(
        new goog.tweak.ButtonAction(label, description, callback));
  }
};


/**
 * Sets the default value of the given tweak to the given value.
 * @param {string} key The unique string that identifies this entry.
 * @param {string|number|boolean} value The value.
 */
goog.tweak.overrideDefaultValue = function(key, value) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    registry.getEntry(key).setDefaultValue(value);
  }
};


/**
 * Returns the value of the boolean setting with the given key or undefined if
 * goog.tweak.STRIP_TWEAKS is true.
 * @param {string} key The unique string that identifies this entry.
 * @return {boolean|undefined} The value of the tweak.
 */
goog.tweak.getBoolean = function(key) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    return registry.getBooleanSetting(key).getValue();
  }
};


/**
 * Returns the value of the string setting with the given key or undefined if
 * goog.tweak.STRIP_TWEAKS is true.
 * @param {string} key The unique string that identifies this entry.
 * @return {string|undefined} The value of the tweak.
 */
goog.tweak.getString = function(key) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    return registry.getStringSetting(key).getValue();
  }
};


/**
 * Returns the value of the numeric setting with the given key or undefined if
 * goog.tweak.STRIP_TWEAKS is true.
 * @param {string} key The unique string that identifies this entry.
 * @return {number|undefined} The value of the tweak.
 */
goog.tweak.getNumber = function(key) {
  var registry = goog.tweak.getRegistry();
  if (registry) {
    return registry.getNumericSetting(key).getValue();
  }
};

