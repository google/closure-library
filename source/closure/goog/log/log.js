/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Basic strippable logging definitions.
 * @see http://go/closurelogging
 */

goog.provide('goog.log');
goog.provide('goog.log.Level');
goog.provide('goog.log.LogRecord');
goog.provide('goog.log.Logger');

goog.require('goog.debug');
goog.require('goog.debug.LogBuffer');
goog.require('goog.debug.LogManager');
goog.require('goog.debug.LogRecord');
goog.require('goog.debug.Logger');
goog.requireType('goog.debug.Loggable');


/** @define {boolean} Whether logging is enabled. */
goog.log.ENABLED = goog.define('goog.log.ENABLED', goog.debug.LOGGING_ENABLED);


/** @const {string} */
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;



/**
 * @constructor
 * @final
 */
goog.log.Logger = goog.debug.Logger;



/**
 * @constructor
 * @final
 */
goog.log.Level = goog.debug.Logger.Level;



/**
 * @constructor
 * @final
 */
goog.log.LogRecord = goog.debug.LogRecord;


/**
 * For access of goog.log.LogBuffer.CAPACITY only.
 * @constructor
 * @final
 */
goog.log.LogBuffer = goog.debug.LogBuffer;


/**
 * Finds or creates a logger for a named subsystem. If a logger has already been
 * created with the given name it is returned. Otherwise a new logger is
 * created. If a new logger is created its log level will be configured based
 * on the goog.debug.LogManager configuration and it will configured to also
 * send logging output to its parent's handlers.
 * @see goog.debug.LogManager
 *
 * @param {string} name A name for the logger. This should be a dot-separated
 *     name and should normally be based on the package name or class name of
 *     the subsystem, such as goog.net.BrowserChannel.
 * @param {goog.log.Level=} opt_level If provided, override the
 *     default logging level with the provided level.
 * @return {goog.log.Logger} The named logger or null if logging is disabled.
 */
goog.log.getLogger = function(name, opt_level) {
  if (goog.log.ENABLED) {
    var logger = goog.debug.LogManager.getLogger(name);
    if (opt_level && logger) {
      logger.setLevel(opt_level);
    }
    return logger;
  } else {
    return null;
  }
};


/**
 * Returns the root logger.
 *
 * @return {?goog.log.Logger} The root logger, or null if logging is disabled.
 */
goog.log.getRootLogger = function() {
  return goog.log.getLogger(goog.log.ROOT_LOGGER_NAME);
};


// TODO(johnlenz): try to tighten the types to these functions.
/**
 * Adds a handler to the logger. This doesn't use the event system because
 * we want to be able to add logging to the event system.
 * @param {goog.log.Logger} logger
 * @param {Function} handler Handler function to add.
 */
goog.log.addHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    logger.addHandler(handler);
  }
};


/**
 * Removes a handler from the logger. This doesn't use the event system because
 * we want to be able to add logging to the event system.
 * @param {goog.log.Logger} logger
 * @param {Function} handler Handler function to remove.
 * @return {boolean} Whether the handler was removed.
 */
goog.log.removeHandler = function(logger, handler) {
  if (goog.log.ENABLED && logger) {
    return logger.removeHandler(handler);
  } else {
    return false;
  }
};


/**
 * Set the log level specifying which message levels will be logged by the
 * given logger.
 * @param {?goog.log.Logger} logger
 * @param {?goog.debug.Logger.Level} level The level to set.
 */
goog.log.setLevel = function(logger, level) {
  if (goog.log.ENABLED && logger) {
    logger.setLevel(level);
  }
};


/**
 * Gets the log level specifying which message levels will be logged by this
 * logger. Message levels lower than this value will be discarded.
 * The level value Level.OFF can be used to turn off logging. If the level
 * is null, it means that this node should inherit its level from its
 * nearest ancestor with a specific (non-null) level value.
 * @param {?goog.log.Logger} logger
 * @return {?goog.debug.Logger.Level} The level.
 */
goog.log.getLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    return logger.getLevel();
  }
  return null;
};


/**
 * Returns the effective level of the logger based on its ancestors'
 * levels.
 * @param {?goog.log.Logger} logger
 * @return {?goog.debug.Logger.Level} The level.
 */
goog.log.getEffectiveLevel = function(logger) {
  if (goog.log.ENABLED && logger) {
    return logger.getEffectiveLevel();
  }
  return null;
};


/**
 * Checks if a message of the given level would actually be logged
 * by this logger. This check is based on the Loggers effective
 * level, which may be inherited from its parent.
 * @param {?goog.log.Logger} logger
 * @param {?goog.debug.Logger.Level} level The level to check.
 * @return {boolean} Whether the message would be logged.
 */
goog.log.isLoggable = function(logger, level) {
  if (goog.log.ENABLED && logger) {
    return logger.isLoggable(level);
  }
  return false;
};


/**
 * Creates a new log record and adds the exception (if present) to it.
 * @param {?goog.log.Logger} logger
 * @param {?goog.debug.Logger.Level} level One of the level identifiers.
 * @param {string} msg The string message.
 * @param {?Error|?Object=} opt_exception An exception associated with the
 *     message.
 * @return {?goog.debug.LogRecord} A log record.
 */
goog.log.getLogRecord = function(logger, level, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    return logger.getLogRecord(level, msg, opt_exception);
  }
  return null;
};


/**
 * Logs a LogRecord. If the logger is currently enabled for the
 * given message level then the given message is forwarded to all the
 * registered output Handler objects.
 * @param {?goog.log.Logger} logger
 * @param {?goog.debug.LogRecord} logRecord A log record to log.
 */
goog.log.publishLogRecord = function(logger, logRecord) {
  if (goog.log.ENABLED && logger) {
    logger.logRecord(logRecord);
  }
};


/**
 * Logs a message. If the logger is currently enabled for the
 * given message level then the given message is forwarded to all the
 * registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.log.Level} level One of the level identifiers.
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error|Object=} opt_exception An exception associated with the
 *     message.
 */
goog.log.log = function(logger, level, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.log(level, msg, opt_exception);
  }
};


/**
 * Logs a message at the Level.SEVERE level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.error = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.severe(msg, opt_exception);
  }
};


/**
 * Logs a message at the Level.WARNING level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.warning = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.warning(msg, opt_exception);
  }
};


/**
 * Logs a message at the Level.INFO level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.info = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.info(msg, opt_exception);
  }
};


/**
 * Logs a message at the Level.Fine level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.fine = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.fine(msg, opt_exception);
  }
};
