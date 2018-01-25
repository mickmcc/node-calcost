# CalCost

`calcost` is a Node.js module which allows you to define time-based rules for
calculating the cost of resource usage.  The module provides `CostRule` objects
which are used to define the rules and constraints. Several rules can be
defined for a resource and then used to calculate the cost of using the
resource.

`calcost` is based on functionality which is provided by the `caltime` module.

## Example Use Case

A compute resource has variable costs. The resource costs more to use during
peak times and costs significantly less during the off-peak times.  Multiple
`CostRule` objects are defined to cover the peak period: Monday - Friday, 8am - 8pm.
A single other `CostRule` object is defined to cover all non-peak times.

Calculating the cost of a user's usage then requires creating `DateSpan` objects
for each interval of time during which the user has used the resource.  An array containing
these `DateSpan` objects is then passed to each `CostRule` for the peak times.
This calculates the cost of resource usage during peak times.

If there are any remaining `DateSpan` objects, which have not been used to
allocate costs, these are passed to the non-peak `CostRule` object. This non-peak
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

This method takes an array of `DateSpan` objects and an optional timezone
identifier and then calculates the sum of the costs accrued by all of the
`DateSpan` objects. An array of `DateSpan` objects is also returned, each
of which represents an interval of time during which no costs were accrued
because there was no overlap with the time interval defined by the `CostRule`.

```js
var calcost = require('calcost');
// functional constructor to create CostRule objects
var costrule = calcost.costRule;
// Constants object provides all of the constants defined by the module
var calcostConstants = calcost.constants;

```


## Constants

The module makes several constants available in the `constants` object. Each
constant is a data member of this object. Constants are available which can
be used to convert values between different units of time.

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
