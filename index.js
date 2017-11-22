/**
 * Top-level module which provides all of the functions and constants.
 * @module calcost
 * @version 1.0.0
 *
 * @author Michael McCarthy
 * @copyright Michael McCarthy <michael.mccarthy@ieee.org> 2017
 * @license MIT
 */

'use strict';

/* private ********************************************************************/

const costruleModule = require('./lib/costrule');


/* exported functional constructors *******************************************/

/** Functional constructor which creates a TimeSpan object.
 * @public
 * @see {@link module:calcost/costrule~costrule} */
module.exports.costRule = costruleModule.costRule;

/* exported functions ++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/** Function used to sort DateSpan objects in an array.
 * @public
 * @see {@link module:caltime/costrule~sortCostRules}
 */
module.exports.sortCostRules = costruleModule.sortRules;

/* exported constants *********************************************************/

/** Object's data members provide all of the constants which are made
    available by the module. */
module.exports.constants = require('./lib/constants');

/** Version number of the module in SemVer string format. */
module.exports.VERSION = '1.0.0';
