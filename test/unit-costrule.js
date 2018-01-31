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
const dateFa = new Date(Date.UTC(2017, 6, 14, 19, 0, 0, 0)); // Friday 14th, 19:00
const dateG = new Date(Date.UTC(2017, 6, 15, 10, 0, 0, 0)); // Saturday 15th, 10:00
const dateH = new Date(Date.UTC(2017, 6, 15, 12, 0, 0, 0)); // Saturday 15th, 12:00
const dateHa = new Date(Date.UTC(2017, 6, 15, 12, 1, 2, 300)); // Saturday 15th, 12:01:02:300
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

/* constants */
/* seconds per hour */
const SECS_PER_HOUR = (60 * 60);

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

describe('CostRule - Total Cost - Args', function() {

  it('Bad Arguments', function() {
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
});

describe('CostRule - Total Cost - Pro-Rata', function() {

  it('Single overlap - Pro-Rata Milliseconds', function() {
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
    const spanH = caltime.dateSpan(dateH, null, 60, 4, 200); // 60 m, 4 sec, 200 msecs.
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0 * ((60.0*caltime.constants.MSECS_PER_MIN)+(4.0*caltime.constants.MSECS_PER_SEC)+(200.0)), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Seconds', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_SECOND_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60, 33, 0); // 60 mins, 33 seconds
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0*(SECS_PER_HOUR+33), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Minutes', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_MINUTE_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60, 30, 0); // 60.5 minutes
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, (1.0 * 60.5) , 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Hours', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 90); // 1.5 hours
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, (1.0*1.5), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Days, default work-day', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateF, null, 16*24*60); // Friday 12:00 + 16 days
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 12hr + 12hr + 12hr = 36hrs
    assert.equal(result.cost, (1.0*(36.0/8.0)), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Days, 10 hour work-day', function() {
    const timespan = caltime.timeSpan(10, 0, 0, 0, 12*60); // 10:00-22:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_PRORATA,
                                      (10.0 * 60));
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateG, null, 2*24*60); // Sat. & Sunday
    const datespans = [spanH];
    // check work-day duration was set correctly
    assert.equal(costrule.getWorkDayDuration(), (10.0*60), 'CostRule has incorrect work-day duration');
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 12 hours on Sat. = 1.2 work-days
    assert.equal(result.cost, (1.0*(12.0/10.0)), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Days, 24 hour work-day', function() {
    const timespan = caltime.timeSpan(10, 0, 0, 0, 12*60); // 10:00-22:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_PRORATA,
                                      (24.0 * 60));
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateG, null, 2*24*60); // Sat. & Sunday
    const datespans = [spanH];
    // check work-day duration was set correctly
    assert.equal(costrule.getWorkDayDuration(), (24.0*60), 'CostRule has incorrect work-day duration');
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 12 hours on Sat. = 1.2 work-days
    assert.equal(result.cost, (1.0*(12.0/24.0)), 'Incorrect total cost');
  });

  it('Single overlap - Pro-Rata Days, full working week rule', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.WEEKDAYS_MON_SUN,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateF, null, 4*24*60); // Friday 12:00 + 4 days
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 9hr + 12hr + 12hr + 12hr + 3hr = 48hrs
    assert.equal(result.cost, (1.0*(48.0/8.0)), 'Incorrect total cost');
  });
});

describe('CostRule - Total Cost - Natural', function() {

  it('Single overlap - Natural Minute', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_MINUTE_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    let span = caltime.dateSpan(dateH, null, 30, 20, 0); // 30 mins, 20 secs.
    const datespans = [span];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 31, 'Incorrect total cost');
  });

  it('Two overlaps - Natural Hour', function() {
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
    // first test with single DateSpan in array
    const spanA = caltime.dateSpan(dateG, null, 45); // 10:00:00:000 - 10:45:00:000
    const datespans = [spanA];
    // calculate the total cost
    let result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0, 'Incorrect total cost');
    // then test with two DateSpans in array
    const spanB = caltime.dateSpan(dateHa, null, 70); // 12:01:02:300 - 13:11:02:300
    datespans.push(spanB);
    // calculate the total cost
    result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 3.0, 'Incorrect total cost');
  });

  it('Single overlap - Natural Day, 1 day', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_DAY_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    let span = caltime.dateSpan(dateH, null, 30); // 30 mins.
    const datespans = [span];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0, 'Incorrect total cost');
  });

  it('Single overlap - Natural Day, 2 days', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                    1.0,
                                    tc.constants.RATETYPE_PER_DAY_NATURAL);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    let span = caltime.dateSpan(dateH, null, 24*60); // 24 hours
    const datespans = [span];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // rule only allocates cost on Saturday even though interval extends into Sunday
    assert.equal(result.cost, 1.0, 'Incorrect total cost');
  });
});

describe('CostRule - Total Cost - Roundup', function() {

  it('Single overlap - Roundup Seconds', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_SECOND_ROUNDUP);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60, 20, 200);
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0*(SECS_PER_HOUR+20+1), 'Incorrect total cost');
  });

  it('Single overlap - Roundup Minutes', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_MINUTE_ROUNDUP);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 60, 20, 200);
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0*(60+1), 'Incorrect total cost');
  });

  it('Single overlap - Roundup Hours', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_HOUR_ROUNDUP);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 120, 20, 0);
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0*(3), 'Incorrect total cost');
  });

  it('Single overlap - Roundup Days, default work-day', function() {
    const timespan = caltime.timeSpan(9, 0, 0, 0, 12*60); // 9:00-21:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_ROUNDUP);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateH, null, 16*(24*60), 0, 0); // 16 days i.e. 3 Saturdays
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 9hrs + 12hrs +12hrs = 33hrs i.e. (33/8) 4.125 work-days rounded-up to 5.
    assert.equal(result.cost, 1.0*5, 'Incorrect total cost');
  });

  it('Single overlap - Roundup Days, 10 hour work-day', function() {
    const timespan = caltime.timeSpan(10, 0, 0, 0, 12*60); // 10:00-22:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_ROUNDUP,
                                      (10.0*60));
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateG, null, 2*(24*60), 0, 0); // 10:00am
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 12 hours = 1.2 work-days, rounded up to 2 work-days
    assert.equal(result.cost, (1.0*2.0), 'Incorrect total cost');
  });

  it('Single overlap - Roundup Days, 24 hour work-day', function() {
    const timespan = caltime.timeSpan(10, 0, 0, 0, 12*60); // 10:00-22:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_DAY_ROUNDUP,
                                      (24.0*60));
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanH = caltime.dateSpan(dateG, null, 2*(24*60), 0, 0); // 10:00am-
    const datespans = [spanH];
    // calculate the total cost
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    // 12 hours = 0.5 work-days, rounded up to 1 work-day
    assert.equal(result.cost, 1.0*(1.0), 'Incorrect total cost');
  });
});

describe('CostRule - Total Cost - Overlaps & Remainders', function() {

  it('No overlap - Single Remainder', function() {
    const timespan = caltime.timeSpan(13, 0, 0, 0, 1*60); // 13:00-14:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanA = caltime.dateSpan(dateN, null, 60, 0, 0); // 22:00-23:00
    const datespans = [spanA];
    // no overlap therefore no cost assigned
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 0, 'Incorrect total cost');
    assert.notEqual(result.usedSpans, null, 'null not expected');
    assert.equal(typeof result.usedSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.usedSpans.length, 0, 'Expected method to return one date-span.');
    assert.notEqual(result.remainderSpans, null, 'null not expected');
    assert.equal(typeof result.remainderSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.remainderSpans.length, 1, 'Expected method to return one date-span.');
    assert.equal(result.remainderSpans[0].getBegin().getTime(), dateN.getTime(), 'Expected a different start time for overlap');
    assert.equal(result.remainderSpans[0].getTotalDuration(), 1 * caltime.constants.MSECS_PER_HOUR, 'Expected a 1 hour duration.');
  });

  it('Single overlap - Single Remainder', function() {
    const timespan = caltime.timeSpan(13, 0, 0, 0, 1*60); // 13:00-14:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanA = caltime.dateSpan(dateI, null, 120, 0, 0); // 13:00-15:00
    const datespans = [spanA];
    // calculate the cost for overlap between spanA and timerule
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 1.0, 'Incorrect total cost');
    assert.notEqual(result.usedSpans, null, 'null not expected');
    assert.equal(typeof result.usedSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.usedSpans.length, 1, 'Expected method to return one date-span.');
    assert.equal(result.usedSpans[0].getBegin().getTime(), dateI.getTime(), 'Expected a different start time for overlap');
    assert.equal(result.usedSpans[0].getTotalDuration(), 1 * caltime.constants.MSECS_PER_HOUR, 'Expected a 1 hour duration.');
    assert.notEqual(result.remainderSpans, null, 'null not expected');
    assert.equal(typeof result.remainderSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.remainderSpans.length, 1, 'Expected method to return one date-span.');
    assert.equal(result.remainderSpans[0].getTotalDuration(), 1 * caltime.constants.MSECS_PER_HOUR, 'Expected a 1 hour duration.');
  });

  it('Single overlap - Double Remainder', function() {
    const timespan = caltime.timeSpan(14, 0, 0, 0, 2*60); // 13:00-15:00
    const timerule = caltime.timeRule(timespan,
                                        caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                        caltime.constants.SATURDAY,
                                        TZ_UTC);
    assert.notEqual(timerule, null, 'TimeRule object was not constructed.');
    const costrule = tc.costruleCtor(timerule,
                                      1.0,
                                      tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costrule, null, 'CostRule object was not constructed.');
    // create an array of DateSpans
    const spanA = caltime.dateSpan(dateI, null, 4*60, 0, 0); // 13:00-17:00
    const datespans = [spanA];
    // calculate the cost for overlap between spanA and timerule
    const result = costrule.totalCost(datespans);
    assert.notEqual(result, null, 'null not expected');
    assert.equal(typeof result, 'object', 'Expected method to return an object.');
    assert.equal(result.cost, 2.0, 'Incorrect total cost');
    assert.notEqual(result.usedSpans, null, 'null not expected');
    assert.equal(typeof result.usedSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.usedSpans.length, 1, 'Expected method to return one date-span.');
    assert.equal(result.usedSpans[0].getBegin().getTime(), dateJ.getTime(), 'Expected a different start time for overlap');
    assert.equal(result.usedSpans[0].getTotalDuration(), 2 * caltime.constants.MSECS_PER_HOUR, 'Expected a 2 hour duration.');
    assert.notEqual(result.remainderSpans, null, 'null not expected');
    assert.equal(typeof result.remainderSpans, 'object', 'Expected method to return an array.');
    assert.equal(result.remainderSpans.length, 2, 'Expected method to return two date-spans.');
    assert.equal(result.remainderSpans[0].getBegin().getTime(), dateI.getTime(), 'Expected a different start time for overlap');
    assert.equal(result.remainderSpans[0].getTotalDuration(), 1 * caltime.constants.MSECS_PER_HOUR, 'Expected a 1 hour duration.');
    assert.equal(result.remainderSpans[1].getBegin().getTime(), dateK.getTime(), 'Expected a different start time for overlap');
    assert.equal(result.remainderSpans[1].getTotalDuration(), 1 * caltime.constants.MSECS_PER_HOUR, 'Expected a 1 hour duration.');
  });
});


describe('CostRule - Example Use Cases', function() {

  it('Simple Compute Costs', function() {
    // Peak during 09:00-18:00
    const timespanPeak = caltime.timeSpan(9, 0, 0, 0, 9*60); // 09:00-18:00
    // Peak
    const timerulePeak = caltime.timeRule(timespanPeak,
                                              caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                              caltime.constants.WEEKDAYS_MON_SUN,
                                              TZ_UTC);
    assert.notEqual(timerulePeak, null, 'TimeRule object was not constructed.');
    const costrulePeak = tc.costruleCtor(timerulePeak,
                                            3.0,
                                            tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costrulePeak, null, 'CostRule object was not constructed.');
    // user used computing resource for 30 hours during peak times.
    const spanA = caltime.dateSpan(dateB, null, 1*60, 0, 0); // Wednesday, 16:00 - 17:00, peak
    const spanB = caltime.dateSpan(dateF, null, 5*60, 0, 0); // Friday, 12:00 - 17:00, peak
    const spanC = caltime.dateSpan(dateFa, null, 4*60, 0, 0); // Friday 19:00 - 23:00, peak
    const spanD = caltime.dateSpan(dateG, null, 12*60, 0, 0); // Saturday, 10:00 - 22:00, peak
    const spanE = caltime.dateSpan(dateP, null, 4*60, 0, 0); // Sunday, 13:00 - 17:00, peak
    const datespans = [spanA, spanB, spanC, spanD, spanE];
    // step through the cost rules to calculate the total cost
    let sumCost = 0.0;
    // Peak
    let ruleResult = costrulePeak.totalCost(datespans, TZ_UTC);
    assert.notEqual(ruleResult, null, 'null not expected');
    assert.equal(ruleResult.cost, 30.0, 'Incorrect cost returned by cost-rule.');
    sumCost += ruleResult.cost;
    // total cost due to all cost-rules
    assert.equal(sumCost, 30.0, 'Incorrect total cost for all date-spans');
  });

  it('Compute Costs', function() {
    // Peak during 09:00-18:00
    const timespanPeak = caltime.timeSpan(9, 0, 0, 0, 9*60); // 09:00-18:00
    // Tuesday Peak
    const timeruleTuesday = caltime.timeRule(timespanPeak,
                                              caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                              caltime.constants.TUESDAY,
                                              TZ_UTC);
    assert.notEqual(timeruleTuesday, null, 'TimeRule object was not constructed.');
    const costruleTuesday = tc.costruleCtor(timeruleTuesday,
                                            3.0,
                                            tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costruleTuesday, null, 'CostRule object was not constructed.');
    // Wednesday Peak
    const timeruleWednesday = caltime.timeRule(timespanPeak,
                                              caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                              caltime.constants.WEDNESDAY,
                                              TZ_UTC);
    assert.notEqual(timeruleWednesday, null, 'TimeRule object was not constructed.');
    const costruleWednesday = tc.costruleCtor(timeruleWednesday,
                                            4.0,
                                            tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costruleWednesday, null, 'CostRule object was not constructed.');
    // Friday Peak
    const timeruleFriday = caltime.timeRule(timespanPeak,
                                              caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                              caltime.constants.FRIDAY,
                                              TZ_UTC);
    assert.notEqual(timeruleFriday, null, 'TimeRule object was not constructed.');
    const costruleFriday = tc.costruleCtor(timeruleFriday,
                                            6.0,
                                            tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costruleFriday, null, 'CostRule object was not constructed.');
    // Off-peak is all 7 days of the week
    const timespanOffPeak = caltime.timeSpan(0, 0, 0, 0, 24*60); // 00:00 - 00:00+1
    const timeruleOffPeak = caltime.timeRule(timespanOffPeak,
                                              caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                              caltime.constants.WEEKDAYS_MON_SUN,
                                              TZ_UTC);
    assert.notEqual(timeruleOffPeak, null, 'TimeRule object was not constructed.');
    const costruleOffPeak = tc.costruleCtor(timeruleOffPeak,
                                                    1.0,
                                                    tc.constants.RATETYPE_PER_HOUR_PRORATA);
    assert.notEqual(costruleOffPeak, null, 'CostRule object was not constructed.');
    // user used computing resource for ten hours during peak and 20 hours off-peak.
    const spanA = caltime.dateSpan(dateB, null, 1*60, 0, 0); // Wednesday, 16:00 - 17:00, peak
    const spanB = caltime.dateSpan(dateF, null, 5*60, 0, 0); // Friday, 12:00 - 17:00, peak
    const spanC = caltime.dateSpan(dateFa, null, 4*60, 0, 0); // Friday 19:00 - 23:00, off-peak
    const spanD = caltime.dateSpan(dateG, null, 12*60, 0, 0); // Saturday, 10:00 - 22:00, off-peak
    const spanE = caltime.dateSpan(dateP, null, 4*60, 0, 0); // Sunday, 13:00 - 17:00, off-peak
    const datespans = [spanA, spanB, spanC, spanD, spanE];
    // step through the cost rules to calculate the total cost
    let sumCost = 0.0;
    // Tuesday
    let ruleResult = costruleTuesday.totalCost(datespans, TZ_UTC);
    assert.notEqual(ruleResult, null, 'null not expected');
    assert.equal(ruleResult.cost, 0.0, 'Incorrect cost returned by cost-rule.');
    sumCost += ruleResult.cost;
    // Wednesday
    ruleResult = costruleWednesday.totalCost(ruleResult.remainderSpans, TZ_UTC);
    assert.notEqual(ruleResult, null, 'null not expected');
    assert.equal(ruleResult.cost, 4.0, 'Incorrect cost returned by cost-rule.');
    sumCost += ruleResult.cost;
    // Friday
    ruleResult = costruleFriday.totalCost(ruleResult.remainderSpans, TZ_UTC);
    assert.notEqual(ruleResult, null, 'null not expected');
    assert.equal(ruleResult.cost, 30.0, 'Incorrect cost returned by cost-rule.');
    sumCost += ruleResult.cost;
    // Off-peak
    console.log(`pre remainders: ${ruleResult.remainderSpans}`); // debug
    ruleResult = costruleOffPeak.totalCost(ruleResult.remainderSpans, TZ_UTC);
    console.log(`post remainders: ${ruleResult.remainderSpans}`); // debug
    assert.notEqual(ruleResult, null, 'null not expected');
    assert.equal(ruleResult.cost, 20.0, 'Incorrect cost returned by cost-rule.');
    sumCost += ruleResult.cost;
    // total cost due to all cost-rules
    assert.equal(sumCost, 54.0, 'Incorrect total cost for all date-spans');
  });
});
