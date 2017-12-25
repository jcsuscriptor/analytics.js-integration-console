'use strict';

/**
 * Module dependencies.
 */
var integration = require('@segment/analytics.js-integration');


/**
 * Expose plugin.
 */
 
module.exports = exports = function(analytics) {
    // eslint-disable-next-line no-use-before-define
    analytics.addIntegration(IntegrationConsole);
};
 

  
var IntegrationConsole  = integration('Console')
.global('_console')
.option('token', '')
.assumesPageview()
.readyOnInitialize();


/**
 * Loaded.
 *
 * @api private
 * @return {boolean}
 */

IntegrationConsole.prototype.loaded = function() {
    return true;
};

/**
 * Page
 *
 * @api public
 * @param {Page} page
 */

IntegrationConsole.prototype.page = function(page) {
    
    console.log('IntegrationConsole => page:');
    console.log(page);

};

/**
 * Identify
 *
 * @api public
 * @param {Identify} identify
 */

IntegrationConsole.prototype.identify = function(identify) {
    
    console.log('IntegrationConsole => identify: ');
    console.log(identify);

};

  
/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */
IntegrationConsole.prototype.track = function (track, options) {
    
    var props = track.properties();

    console.log('IntegrationConsole => track: event: ' +  track.event());
    console.log('IntegrationConsole => track: properties: ');
    console.log(props);

    console.log('token: '+ this.options.token);
};