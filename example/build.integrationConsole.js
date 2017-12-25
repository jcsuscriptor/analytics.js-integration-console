

'use strict';

var analytics = require('@segment/analytics.js-core')
var Integration = require('../lib/analytics.js-console')
    

/**
 * Expose the `analytics` singleton.
 */

module.exports = exports = analytics

/**
 * Expose require.
 */

analytics.require = require

    
/**
 * Add integrations.
 */
analytics.use(Integration)


//Set Object Scope Global
global.analytics = analytics;
