'use strict';

/**
 * Module dependencies.
 */
var integration = require('@segment/analytics.js-integration');
var send = require('@segment/send-json');
var Parse = require('parse');


/**
 * Expose `parseplatform.org` integration.
 */
var ParseIntegration  = exports = module.exports =  integration('Parse')
    .global('_parse')
    .option('appId', '')
    .option('serverURL', 'http://localhost:1337/parse')
    .option('classTrack','Track')
    .assumesPageview()
    .readyOnInitialize();


//Class Parse. subclass of Parse.Object.
var TrackParse ;

/**
 * Initialize.
 *
 * 
 *
 * @api public
 */

ParseIntegration.prototype.initialize = function() {
    var self = this;

    TrackParse = Parse.Object.extend(this.options.classTrack);

    Parse.initialize(this.options.appId);
    Parse.serverURL = this.options.serverURL;

    this.ready();
};
 

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */
ParseIntegration.prototype.track = function (track, options) {
  
 
    var payload = {
        event: track.event(),
        properties: track.properties()
    };

    var userId = this.analytics.user().id();
    var anonymousId = this.analytics.user().anonymousId();
    if (userId) payload['userId'] = userId;
    if (anonymousId) payload['segmentAnonymousId']  = anonymousId;
 

    var trackParse = new TrackParse();

    var self = this;

    trackParse.save(payload)
        .then(function(data) {
            // The save was successful.
            self.debug('New object created with objectId: ' + data.id);
        }, function(error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            self.debug('Failed to create new object, with error code: ' + error.message);
        });
};