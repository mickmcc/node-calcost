/** @module calcost/constants
 *
 * @copyright Michael McCarthy <michael.mccarthy@ieee.org> 2017-2018
 * @license MIT
 */

'use strict';

module.exports = Object.freeze({

  /** minimum permitted value for rate type */
  RATETYPE_MIN_VALUE: 0,
  /** Rate is cost per millisecond of resource usage */
  RATETYPE_PER_MILLISECOND: 0,
  /** Rate is cost per second of resource usage. Resource usage of a fraction
   *  of a second will be added as a proportion of the rate. */
  RATETYPE_PER_SECOND_PRORATA: 10,
  /** Rate is cost per second of resource usage. Resource usage of a fraction
   *  of a second will be added at the full rate per second.
   *  Example: Resource usage from 12:00:00:100 - 12:01:00:900 will add the cost
   *  of 1.8 seconds, rounded up to 2 seconds.  */
  RATETYPE_PER_SECOND_ROUNDUP: 11,
  /** Rate is cost per minute of resource usage. Resource usage of a fraction
   *  of a minute will be added as a proportion of the rate.
   *  Example: Resource usage from 12:00:20 - 12:01:40 will add the cost of
   *  80 seconds i.e. 1.3333 minutes. */
  RATETYPE_PER_MINUTE_PRORATA: 20,
  /** Rate is cost per minute of resource usage. Resource usage of a fraction
   *  of an minute will be added at the full rate per minute.
   *  Example: Resource usage from 12:00:20 - 12:01:40 will add the cost of
   *  80 seconds, rounded up to 2 minutes. */
  RATETYPE_PER_MINUTE_ROUNDUP: 21,
  /** Rate is cost per natural minute of resource usage. If a resource is used
   *  at any moment during a minute on the clock, the cost is added for that
   *  minute.
   *  Example: Resource usage from 12:00:20 - 12:01:10 will add the cost of
   *  2 minutes.
   *  Example: Resource usage from 12:00:20 - 12:02:10 will add the cost of
   *  3 minutes. */
  RATETYPE_PER_MINUTE_NATURAL: 22,
  /** Rate is cost per hour of resource usage. Resource usage of a fraction
   *  of an hour will be added as a proportion of the rate.
   *  Example: Resource usage from 12:30 - 13:45 will add the cost of
   *  75 minutes i.e. 1.25 hours. */
  RATETYPE_PER_HOUR_PRORATA: 30,
  /** Rate is cost per hour of resource usage. Resource usage of a fraction
   *  of an hour will be added at the full rate per hour.
   *  Example: Resource usage from 12:30 - 13:45 will add the cost of
   *  1.25 hours rounded up to 2 hours. */
  RATETYPE_PER_HOUR_ROUNDUP: 31,
  /** Rate is cost per natural hour of resource usage. If a resource is used
   *  at any moment during an hour as marked by the clock, the cost is added for
   *  that minute.
   *  Example: Resource usage from 12:30 - 13:30 will add the cost of
   *  2 hours.
   *  Example: Resource usage from 11:45 - 13:05 will add the cost of
   *  3 hours. */
  RATETYPE_PER_HOUR_NATURAL: 32,
  /** Rate is cost per day of resource usage. Resource usage of a fraction
   *  of a day will be added as a proportion of the rate. The number of hours
   *  in a standard workday are required for this calculation.
   *  Example: Assuming an 8 hour day. Resource usage from 9:00 - 18:00 will add
   *  the cost of 9 hours i.e. 1.125 days. */
  RATETYPE_PER_DAY_PRORATA: 40,
  /** Rate is cost per day of resource usage. Resource usage of a fraction
   *  of a day will be rounded-up to the next integral number of days. The
   *  number of hours in a standard workday are required for this calculation.
   *  Example: Assuming an 8 hour day. Resource usage from 9:00 - 18:00 will add
   *  the cost of 9 hours i.e. 1.125 days which is rounded-up to 2 days. */
  RATETYPE_PER_DAY_ROUNDUP: 41,
  /** Rate is cost per natural day of resource usage. If a resource is used
   *  at any moment during a natural day, the cost is added for that day.
   *  A natural day is the interval of time between 00:00 midnight and the
   *  next occurrence of midnight.
   *  Example: Resource usage from 9:00 (16th April) - 16:30 (18th April) will
   *  add the cost of 3 days.
   *  Example: Resource usage from 9:00 (16th April) - 13:00 (16th April) will
   *  add the cost of 1 day. */
  RATETYPE_PER_DAY_NATURAL: 42,
  /** maximum permitted value for rate type */
  RATETYPE_MAX_VALUE: 42
});
