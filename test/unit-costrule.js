/**
 * unit-timerule.js
 * Copyright(c) 2017 Michael McCarthy <michael.mccarthy@ieee.org>
 * See accompanying MIT License file.
 */

 /* eslint max-len: ["error", 160] */

'use strict';

/* dependencies */
const assert = require('assert');
const caltime = require('caltime');

const tc = {};
tc.module = require('../');
tc.costruleCtor = tc.module.costRule;
tc.constants = tc.module.constants;

/* useful Date objects for testing */
/* dates which don't span a leap day transition i.e. 29th of Feb. of leap year */
const dateA = new Date(Date.UTC(2017, 6, 1, 0, 0, 0, 0)); // Saturday 1st, 1st day of July
const dateB = new Date(Date.UTC(2017, 6, 5, 16, 0, 0, 0)); // First Wed. of July, 16:00
const dateBa = new Date(Date.UTC(2017, 6, 5, 16, 30, 0, 0)); // First Wed. of July, 16:30
const dateC = new Date(Date.UTC(2017, 6, 5, 17, 0, 0, 0)); // Last Wed. of July, 17:00
const dateD = new Date(Date.UTC(2017, 6, 12, 16, 0, 0, 0)); // Second Wed. of July, 16:00
const dateE = new Date(Date.UTC(2017, 6, 12, 17, 0, 0, 0)); // Second Wed. of July, 17:00
const dateF = new Date(Date.UTC(2017, 6, 14, 12, 0, 0, 0)); // Friday 14th, 12:00
const dateG = new Date(Date.UTC(2017, 6, 15, 10, 0, 0, 0)); // Saturday 15th, 10:00
const dateH = new Date(Date.UTC(2017, 6, 15, 12, 0, 0, 0)); // Saturday 15th, 12:00
const dateI = new Date(Date.UTC(2017, 6, 15, 13, 0, 0, 0)); // Saturday 15th, 13:00
const dateJ = new Date(Date.UTC(2017, 6, 15, 14, 0, 0, 0)); // Saturday 15th, 14:00
const dateK = new Date(Date.UTC(2017, 6, 15, 16, 0, 0, 0)); // Saturday 15th, 16:00
const dateL = new Date(Date.UTC(2017, 6, 15, 17, 0, 0, 0)); // Saturday 15th, 17:00
const dateM = new Date(Date.UTC(2017, 6, 15, 18, 0, 0, 0)); // Saturday 15th, 18:00
const dateN = new Date(Date.UTC(2017, 6, 15, 22, 0, 0, 0)); // Saturday 15th, 22:00
const dateO = new Date(Date.UTC(2017, 6, 16, 2, 0, 0, 0)); // Sunday 16th, 02:00
const dateP = new Date(Date.UTC(2017, 6, 16, 13, 0, 0, 0)); // Sunday 16th, 13:00
const dateQ = new Date(Date.UTC(2017, 6, 19, 16, 0, 0, 0)); // Third Wed. of July, 16:00
const dateR = new Date(Date.UTC(2017, 6, 19, 17, 0, 0, 0)); // Third Wed. of July, 17:00
const dateS = new Date(Date.UTC(2017, 6, 26, 16, 0, 0, 0)); // Last Wed. of July, 16:00
const dateT = new Date(Date.UTC(2017, 6, 26, 17, 0, 0, 0)); // Last Wed. of July, 17:00
const dateU = new Date(Date.UTC(2017, 6, 29, 16, 0, 0, 0)); // Last Wed. of July, 16:00
const dateV = new Date(Date.UTC(2017, 6, 29, 17, 0, 0, 0)); // Last Wed. of July, 17:00
const dateX = new Date(Date.UTC(2017, 6, 31, 16, 0, 0, 0)); // Monday 31st, 16:00, Last day of July
const dateY = new Date(Date.UTC(2017, 6, 31, 17, 0, 0, 0)); // Monday 31st, 17:00, Last day of July
const dateZ = new Date(Date.UTC(2017, 6, 31, 23, 0, 0, 0)); // Monday 31st, Last day of July

/* timezones */
const TZ_UTC = 'Etc/UTC'; // UTC timezone
const TZ_PLUS_FOUR = 'Asia/Dubai'; // UTC+4 timezone
const TZ_MINUS_FOUR = 'America/Antigua'; // UTC-4 timezone

before(function() {

});

beforeEach(function() {

});

afterEach(function() {

});

after(function() {

});


describe('CostRule - Instantiation', function() {
  it('Create valid cost rule', function() {
    let timespan = caltime.timeSpan(9, 0, 0, 0, 60);
    let timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.MONDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    let costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_HOUR_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
  });

  it('Attempt to create a CostRule with invalid arguments', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 60);
    assert.throws(function() {
                     tc.costruleCtor(null,
                                      caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                      caltime.constants.MONDAY,
                                      TZ_UTC);
                    },
                    Error,
                    'Expected functional constructor to throw an error (inDurationMins).');
    assert.throws(function() {
                    tc.costruleCtor(timespan,
                                      null,
                                      caltime.constants.MONDAY,
                                      TZ_UTC);
                  },
                  Error,
                  'Expected functional constructor to throw an error (inDurationMins).');
    assert.throws(function() {
                    tc.costruleCtor(timespan,
                                      caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                      null,
                                      TZ_UTC);
                  },
                  Error,
                  'Expected functional constructor to throw an error (inDurationMins).');
    assert.throws(function() {
                    tc.costruleCtor(timespan,
                                      caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                      caltime.constants.MONDAY,
                                      null);
                  },
                  Error,
                  'Expected functional constructor to throw an error (inDurationMins).');

  });
});

describe('CostRule - Calculate Total Cost', function() {
  it('Bad Argument', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    let costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_HOUR_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    const argObject = {};
    // incorrect arguments passed to method
    assert.throws(function() {
                     costrule.totalCost(null);
                    },
                    Error,
                    'Expected function to throw an error (inDateSpans is null).');
    assert.throws(function() {
                     costrule.totalCost(argObject);
                    },
                    Error,
                    'Expected function to throw an error (inDateSpans is an object).');
  });

  it('Single overlap with DateSpan - Per Pro-Rata Milliseconds', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_MILLISECOND);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60);
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, (1.0 * caltime.constants.MSECS_PER_HOUR) , 'Incorrect total cost');
  });

  it('Single overlap with DateSpan - Per Natural Hour', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_HOUR_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60);
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0, 'Incorrect total cost');
  });
});
