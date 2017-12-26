'use strict';

/**
 * Module dependencies.
 */
var integration = require('@segment/analytics.js-integration');
var send = require('@segment/send-json');
var is = require('is');
var extend = require('@ndhoule/extend');
var toISOString = require('@segment/to-iso-string');
var toString = Object.prototype.toString; // in case this method has been overridden by the user



/**
 * Expose `logz` integration.
 */
var Logz  = exports = module.exports =  integration('Logz')
    .global('_logz')
    .option('token', '')
    .option('type', '')
    .option('apiHost', 'listener.logz.io:8071')
    .assumesPageview()
    .readyOnInitialize();

 
/**
 * Initialize.
 *
 * 
 *
 * @api public
 */

Logz.prototype.initialize = function() {
    var self = this;
    this.ready();
};
 
 

/**
 * Identify.
 *
 *  
 *
 * @api public
 * @param {Identify} identify
 */

Logz.prototype.identify = function(identify) {

  this.debug('identify');

  var traits = identify.traits();
  var id = identify.userId();

  var payload = {
    type: this.options.type,
    userId: id,
    properties: traits
  };

  this.send(payload);

};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */
Logz.prototype.track = function (track, options) {
    //Error:
    //Request header field Content-Type is not allowed by Access-Control-Allow-Headers in preflight response.
    this.debug('tracking');
 
    try {
        
         
        var category = track.category() || 'All';
        var action = track.event();
        var name = track.proxy('properties.name') || track.proxy('properties.label');
        var value = track.value() || track.revenue();

        
        var payload = {
          type: this.options.type,

          //event: track.event(),
          message : track.event(),
          
          category: category,
          action: action,

          properties: track.properties()
        };

        var userId = this.analytics.user().id();
        var anonymousId = this.analytics.user().anonymousId();
        if (userId) payload['userId'] = userId;
        if (anonymousId) payload['segmentAnonymousId']  = anonymousId;
         
        this.send(payload);

    } catch (ex) {
        if (window && window.console && typeof window.console.log == 'function') {
            this.debug("Failed to send log because of exception:\n" + ex);
        }
    }
};

/**
 * Send.
 *
 * @api public
 * @param {Object} playload
 */
Logz.prototype.send = function (playload) {
    try {
    
        var dataClean =  clean(payload);

        var parsedMsg = typeof dataClean == 'object' ? dataClean : { message:track.event() };
        var logUrl = window.location.protocol + '//listener.logz.io:';
        logUrl += (window.location.protocol === 'http:' ? '8090' : '8091') + '?token=' + this.options.token;
    
        Object.keys(parsedMsg).forEach(function(key) {
            logUrl += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(parsedMsg[key]);
        });
    
        var logImg = new Image();
        logImg.src = logUrl;

    } catch (ex) {
        if (window && window.console && typeof window.console.log == 'function') {
            this.debug("Failed to send log because of exception:\n" + ex);
        }
    }
}

/**
 * Clean all nested objects and arrays.
 * 
 * Copy. https://github.com/segment-integrations/analytics.js-integration-heap
 * 
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function clean(obj) {
    var ret = {};
  
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        var value = obj[k];
        // Heap's natively library will drop null and undefined properties anyway
        // so no need to send these
        // also prevents uncaught errors since we call .toString() on non objects
        if (value === null || value === undefined) continue;
  
        // date
        if (is.date(value)) {
          ret[k] = toISOString(value);
          continue;
        }
  
        // leave boolean as is
        if (is.bool(value)) {
          ret[k] = value;
          continue;
        }
  
        // leave  numbers as is
        if (is.number(value)) {
          ret[k] = value;
          continue;
        }
  
        // arrays of objects (eg. `products` array)
        if (toString.call(value) === '[object Array]') {
          ret = extend(ret, trample(k, value));
          continue;
        }
  
        // non objects
        if (toString.call(value) !== '[object Object]') {
          ret[k] = value.toString();
          continue;
        }
  
        ret = extend(ret, trample(k, value));
      }
    }
    
    // json
    // must flatten including the name of the original trait/property
    function trample(key, value) {
      var nestedObj = {};
      nestedObj[key] = value;
      var flattenedObj = flatten(nestedObj, { safe: true });
  
      // stringify arrays inside nested object to be consistent with top level behavior of arrays
      for (var k in flattenedObj) {
        if (is.array(flattenedObj[k])) flattenedObj[k] = JSON.stringify(flattenedObj[k]);
      }
  
      return flattenedObj;
    }
  
    return ret;
  }
  
  /**
   * Flatten nested objects
   * taken from https://www.npmjs.com/package/flat
   * @param {Object} obj
   * @return {Object} obj
   * @api public
   */
  
  function flatten(target, opts) {
    opts = opts || {};
  
    var delimiter = opts.delimiter || '.';
    var maxDepth = opts.maxDepth;
    var currentDepth = 1;
    var output = {};
  
    function step(object, prev) {
      Object.keys(object).forEach(function(key) {
        var value = object[key];
        var isarray = opts.safe && Array.isArray(value);
        var type = Object.prototype.toString.call(value);
        var isobject = type === '[object Object]' || type === '[object Array]';
  
        var newKey = prev
          ? prev + delimiter + key
          : key;
  
        if (!opts.maxDepth) {
          maxDepth = currentDepth + 1;
        }
  
        if (!isarray && isobject && Object.keys(value).length && currentDepth < maxDepth) {
          ++currentDepth;
          return step(value, newKey);
        }
  
        output[newKey] = value;
      });
    }
  
    step(target);
  
    return output;
  }
