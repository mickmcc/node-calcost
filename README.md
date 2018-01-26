# CalCost

`calcost` is a Node.js module which allows you to define time-based rules for
calculating the cost of resource usage.  The module provides `CostRule` objects
which are used to define the rules and their constraints. Several rules can be
defined for a resource and then used to calculate the cost of using the
resource.

## Example Use Case

A compute resource has variable costs. The resource costs more to use during
peak times and costs significantly less during the off-peak times.  Multiple
`CostRule` objects are defined to cover the peak periods: Monday-Friday, 8am-8pm.
Other `CostRule` objects are defined to cover all non-peak times.

Calculating the cost of a user's usage then requires creating `DateSpan` objects
for each interval of time during which the user has used the resource.  An array containing
these `DateSpan` objects is then passed to each `CostRule` for the peak times.
Each `CostRule` object determines if any of the `DateSpan` objects time intervals
do overlap with any interval for which it is configured to allocate costs. The
cost is allocated to each overlapping `DateSpan` and then the method `totalCost()`
returns the total cost and arrays representing the overlapping (used) time intervals
and any remainder time intervals for which costs have not been allocated.

If there are any remaining `DateSpan` objects, which have not been used to
allocate costs, these are passed to the non-peak `CostRule` objects. This non-peak
cost is added to the peak cost to generate the total cost of using the compute
resource.

## API Usage


The `calcost` module can be installed using `NPM`.

```sh
$ cd <myproject>
$ npm install --save calcost
```

Currently, the `calcost` module provides one functional constructor for the
`CostRule` object and it also provides the `constants` object.

```js
var calcost = require('calcost');
// functional constructor to create CostRule objects
var costrule = calcost.costRule;
// Constants object provides all of the constants defined by the module
var calcostConstants = calcost.constants;
```

## CostRule

A `CostRule` is an immutable object which allows a time-based rule to be defined
for the calculation of the cost of resource usage. It provides a functional
constructor `costRule` and a single method `totalCost` which is used to calculate
the cost of an array of `DateSpan` objects.

### costRule()

The `costRule` function is a functional constructor therefore it should not be
called with the `new` operator. The function accepts several arguments:
- `inTimeRule`  A `TimeRule` object which defines the interval of time during
  which the costs can be calculated using this rule.
- `inRate`  Rate per unit of time. The rate is currency-agnostic.
- `inRateType`  Argument describes how the costs should be calculated.
- `inWorkDayDuration`  Duration of a working day in minutes.

Valid values for `inRateType` are:
- `RATETYPE_PER_MILLISECOND`  Rate is the cost per millisecond.
- `RATETYPE_PER_SECOND_PRORATA`  Rate is the cost per second and/or fraction of
  a second.
- `RATETYPE_PER_SECOND_ROUNDUP`  Rate is the cost per second. Cost is rounded up
  to the nearest second.
- `RATETYPE_PER_MINUTE_PRORATA`  Rate is the cost per minute and/or fraction of
  a minute.
- `RATETYPE_PER_MINUTE_ROUNDUP`  Rate is the cost per minute. Cost is rounded up
  to the nearest minute.
- `RATETYPE_PER_MINUTE_NATURAL`  Rate is the cost per natural minute during which
  the resource is used for any duration.
- `RATETYPE_PER_HOUR_PRORATA`  Rate is the cost per hour and/or fraction of
  an hour.
- `RATETYPE_PER_HOUR_ROUNDUP`  Rate is the cost per hour. Cost is rounded up
  to the nearest hour.
- `RATETYPE_PER_HOUR_NATURAL`  Rate is the cost per natural hour during which
  the resource is used for any duration.
- `RATETYPE_PER_DAY_PRORATA`  Rate is the cost per working day and/or fraction of
  a working day. The duration of a working day must also be passed to the
  function when using this type of rate.
- `RATETYPE_PER_DAY_ROUNDUP`  Rate is the cost per working day. Cost is rounded up
  to the nearest full working day. The duration of a working day must also be
  passed to the function when using this type of rate.
- `RATETYPE_PER_DAY_NATURAL`  Rate is the cost per working day during which the
  resource is used for any duration.

#### Pro-Rata Rate Types

Pro-Rata rate types have a unit of cost defined per unit of time.  If the
resource usage includes a fraction of the rate's unit of time, then the
calculated cost will include a proportional fraction of the cost of one time
unit.

#### Round-up Rate Types

Round-up rate types calculate the cost similarly to the Pro-Rata rate, however
number of units of time used is rounded-up to the next whole integer.

#### Natural Rate Types

Natural rate types do not calculate the total resource usage by summing all
of the durations of intervals of time during which the resource was used.  This
rate type requires counting all of the *natural* time units which overlap with
intervals of resource usage.

A *natural* time unit is one which has a begin and end time which coincide with
those defined by a clock or calendar. The *natural* day is the interval of time
between 00:00 midnight and the subsequent occurrence of midnight. A *natural*
minute is the interval of time on a clock from when the seconds count is zero
until the following instant when the seconds count is zero.

#### Working Day

RATETYPE_PER_DAY_PRORATA and RATETYPE_PER_DAY_ROUNDUP require that the duration
of the *working day* interval is defined. An 8 hour work day is defined by
default but this can be any value between 0 and 24 hours.

### totalCost()

This method takes an array of `DateSpan` objects, an optional timezone
identifier, and then calculates the sum of the costs due to all of the
`DateSpan` objects for a specific `CostRule`. The method returns and object
with three data members:
- `cost`. A number containing the total sum of all of the costs accumulated by
`DateSpan` objects which overlapped with the time-spans defined by the `CostRule`.
- `usedSpans`: An array of `DateSpan` objects, each of which indicates an interval
of time for which there was an overlap and costs were accumulated by the `CostRule`.
- `remainderSpans`: An array of remainder `DateSpan` objects, each of which
represents an interval of time during which no costs were accrued because there
was no overlap with the time interval defined by the `CostRule`.

The following example code is based on a test case which is available in the
file `unit-costrule.js`. Several cost rules are defined, both for peak and
non-peak times during the week. The times are defined as:
- Tuesday from 9am-6pm at a cost of 3 units per pro-rata hour of resource usage.
- Wednesday from 9am-6pm at a cost of 4 units per pro-rata hour of resource usage.
- Friday from 9am-6pm at a cost of 6 units per pro-rata hour of resource usage.
- Friday off-peak from midnight-midnight at a cost of 1 unit per pro-rata hour of resource usage.
- Saturday off-peak from midnight-midnight at a cost of 1 unit per pro-rata hour of resource usage.
- Sunday off-peak from midnight-midnight at a cost of 1 unit per pro-rata hour of resource usage.

The actual resource is used during a combination of peak and non-peak times:
- Wednesday 5.7.2017, 16:00 - 17:00. 1 hour during peak period.
- Friday 14.7.2017, 12:00 - 17:00. 5 hours during peak period.
- Friday 14.7.2017, 19:00 - 23:00. 4 hours during non-peak period.
- Saturday 15.7.2017, 10:00 - 22:00. 12 hours during non-peak period.
- Sunday 16.7.2017, 13:00 - 17:00. 4 hours during non-peak period.

The `CostRule` objects are used in order of their priority i.e. peak cost rules are
applied before non-peak cost rules are applied. If a `CostRule` does not overlap
with a date-span of resource usage, then the `totalCost()` method will return
the non-overlapping `DateSpans` in the array `result.remainderSpans`.


```js
var caltime = require('caltime');
var calcost = require('calcost');

/* timezones */
const TZ_UTC = 'Etc/UTC'; // UTC timezone

// Peak during 09:00-18:00
const timespanPeak = caltime.timeSpan(9, 0, 0, 0, 9*60); // 09:00-18:00
// Tuesday Peak
const timeruleTuesday = caltime.timeRule(timespanPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.TUESDAY,
                                          TZ_UTC);
const costruleTuesday = costruleCtor(timeruleTuesday,
                                        3.0,
                                        calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// Wednesday Peak
const timeruleWednesday = caltime.timeRule(timespanPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.WEDNESDAY,
                                          TZ_UTC);
const costruleWednesday = costruleCtor(timeruleWednesday,
                                        4.0,
                                        calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// Friday Peak
const timeruleFriday = caltime.timeRule(timespanPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.FRIDAY,
                                          TZ_UTC);
const costruleFriday = costruleCtor(timeruleFriday,
                                        6.0,
                                        calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// Friday Off-peak
const timespanOffPeak = caltime.timeSpan(0, 0, 0, 0, 24*60); // 00:00 - 00:00+1
const timeruleOffPeakFriday = caltime.timeRule(timespanOffPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.FRIDAY,
                                          TZ_UTC);
const costruleOffPeakFriday = costruleCtor(timeruleOffPeakFriday,
                                                1.0,
                                                calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// Saturday Off-peak
const timeruleOffPeakSaturday = caltime.timeRule(timespanOffPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.SATURDAY,
                                          TZ_UTC);
const costruleOffPeakSaturday = costruleCtor(timeruleOffPeakSaturday,
                                                1.0,
                                                calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// Sunday Off-peak
const timeruleOffPeakSunday = caltime.timeRule(timespanOffPeak,
                                          caltime.constants.CONSTRAINT_DAY_OF_WEEK,
                                          caltime.constants.SUNDAY,
                                          TZ_UTC);
const costruleOffPeakSunday = costruleCtor(timeruleOffPeakSunday,
                                                1.0,
                                                calcost.constants.RATETYPE_PER_HOUR_PRORATA);
// resource used for 6 hours during peak and 20 hours off-peak.
const spanA = caltime.dateSpan(dateB, null, 1*60, 0, 0); // Wednesday, 16:00 - 17:00, 1 hr. peak
const spanB = caltime.dateSpan(dateF, null, 5*60, 0, 0); // Friday, 12:00 - 17:00, 5 hrs. peak
const spanC = caltime.dateSpan(dateFa, null, 4*60, 0, 0); // Friday 19:00 - 23:00, 4 hrs. off-peak
const spanD = caltime.dateSpan(dateG, null, 12*60, 0, 0); // Saturday, 10:00 - 22:00, 12 hrs. off-peak
const spanE = caltime.dateSpan(dateP, null, 4*60, 0, 0); // Sunday, 13:00 - 17:00, 4 hrs. off-peak
const datespans = [spanA, spanB, spanC, spanD, spanE];
// step through the cost rules to calculate the total cost
let sumCost = 0.0;
// Tuesday
let ruleResult = costruleTuesday.totalCost(datespans, TZ_UTC);
sumCost += ruleResult.cost;
// Wednesday
ruleResult = costruleWednesday.totalCost(ruleResult.remainderSpans, TZ_UTC);
sumCost += ruleResult.cost;
// Friday
ruleResult = costruleFriday.totalCost(ruleResult.remainderSpans, TZ_UTC);
sumCost += ruleResult.cost;
// Friday off-peak
ruleResult = costruleOffPeakFriday.totalCost(ruleResult.remainderSpans, TZ_UTC);
sumCost += ruleResult.cost;
// Saturday off-peak
ruleResult = costruleOffPeakSaturday.totalCost(ruleResult.remainderSpans, TZ_UTC);
sumCost += ruleResult.cost;
// Sunday off-peak
ruleResult = costruleOffPeakSunday.totalCost(ruleResult.remainderSpans, TZ_UTC);
sumCost += ruleResult.cost;
// total cost due to all cost-rules
console.log(`Total cost of resource usage: ${sumCost}`); // 54.0
```


## Constants

The module makes several constants available in the `constants` object. Each
constant is a data member of this object. These constants define the way the
costs are calculated for a specific `CostRule` when they are passed to the
`inRateType` parameter of the `costRule` functional constructor.

## API Documentation

The latest version of the API documentation can be generated using `jsdoc`. The
documentation is created in the `docs/` directory.

```sh
$ cd <calcost-git-clone>
$ npm run -s doc
```

## Support

*Bug Reports* and *New Feature Requests* should be reported at the [CalCost GitHub Issues Page](https://github.com/mickmcc/node-calcost/issues).


## Dependencies

`calcost` currently depends on three modules when in production. Other modules are
required to test or develop `calcost`. The production dependencies are:
- [Lodash](https://lodash.com/)
- [Moment Timezone](https://momentjs.com/timezone/)
- [CalTime](https://github.com/mickmcc/node-calcost/)

## License

`calcost` is copyright (c) 2017-2018 Michael McCarthy <michael.mccarthy@ieee.org>.

`calcost` is free software, licensed under the MIT licence. See the file `LICENSE`
in this distribution for more information.
