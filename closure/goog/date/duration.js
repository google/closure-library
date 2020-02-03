/**
 * @license
 * Copyright The Closure Library Authors.
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Functions for formatting duration values.  Such as "3 days"
 * "3 hours", "14 minutes", "2 hours 45 minutes".
 */

goog.module('goog.date.duration');
goog.module.declareLegacyNamespace();

const DateTimeFormat = goog.require('goog.i18n.DateTimeFormat');
const MessageFormat = goog.require('goog.i18n.MessageFormat');

/**
 * Number of milliseconds in a minute.
 * @type {number}
 */
const MINUTE_MS = 60000;

/**
 * Number of milliseconds in an hour.
 * @type {number}
 */
const HOUR_MS = 60 * MINUTE_MS;

/**
 * Number of milliseconds in a day.
 * @type {number}
 */
const DAY_MS = 24 * HOUR_MS;

/** @desc The days part of the duration message: 1 day, 5 days. */
const MSG_DURATION_DAYS = goog.getMsg(
    '{COUNT, plural, ' +
    '=0 {}' +
    '=1 {{TEXT} day}' +
    'other {{TEXT} days}}');

/** @desc The hours part of the duration message: 1 hour, 5 hours. */
const MSG_DURATION_HOURS = goog.getMsg(
    '{COUNT, plural, ' +
    '=0 {}' +
    '=1 {{TEXT} hour}' +
    'other {{TEXT} hours}}');

/** @desc The minutes part of the duration message: 1 minute, 5 minutes. */
const MSG_DURATION_MINUTES = goog.getMsg(
    '{COUNT, plural, ' +
    '=0 {}' +
    '=1 {{TEXT} minute}' +
    'other {{TEXT} minutes}}');

/** @desc Duration time of zero minutes. */
const MSG_ZERO_MINUTES = goog.getMsg('0 minutes');

/**
 * Gets a duration message part for a time unit.
 * @param {string} pattern The pattern to apply.
 * @param {number} count The number of units.
 * @return {string} The formatted message part.
 */
const getDurationMessagePart = (pattern, count) => {
  return new MessageFormat(pattern).format({
    'COUNT': count,
    'TEXT': DateTimeFormat.localizeNumbers(count),
  });
};

/**
 * Accepts a duration in milliseconds and outputs an absolute duration time in
 * form of "1 day", "2 hours", "20 minutes", "2 days 1 hour 15 minutes" etc.
 * @param {number} durationMs Duration in milliseconds.
 * @return {string} The formatted duration.
 */
exports.format = (durationMs) => {
  let ms = Math.abs(durationMs);

  // Handle durations shorter than 1 minute.
  if (ms < MINUTE_MS) {
    return MSG_ZERO_MINUTES;
  }

  const days = Math.floor(ms / DAY_MS);
  ms %= DAY_MS;

  const hours = Math.floor(ms / HOUR_MS);
  ms %= HOUR_MS;

  const minutes = Math.floor(ms / MINUTE_MS);
  ms %= MINUTE_MS;

  // We need a space after the days if there are hours or minutes to come.
  const daysSeparator = days * (hours + minutes) ? ' ' : '';
  // We need a space after the hours if there are minutes to come.
  const hoursSeparator = hours * minutes ? ' ' : '';

  const daysPart = getDurationMessagePart(MSG_DURATION_DAYS, days);
  const hoursPart = getDurationMessagePart(MSG_DURATION_HOURS, hours);
  const minutesPart = getDurationMessagePart(MSG_DURATION_MINUTES, minutes);

  /**
   * @desc Duration time text concatenated from the individual time unit message
   * parts. The separator will be a space (e.g. '1 day 2 hours 24 minutes') or
   * nothing in case one/two of the duration parts is empty (
   * e.g. '1 hour 30 minutes', '3 days 15 minutes', '2 hours').
   */
  const MSG_CONCATENATED_DURATION_TEXT = goog.getMsg(
      '{$daysPart}{$daysSeparator}{$hoursPart}{$hoursSeparator}{$minutesPart}',
      {
        'daysPart': daysPart,
        'daysSeparator': daysSeparator,
        'hoursPart': hoursPart,
        'hoursSeparator': hoursSeparator,
        'minutesPart': minutesPart,
      });
  return MSG_CONCATENATED_DURATION_TEXT;
};
