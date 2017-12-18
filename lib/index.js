var integration = require('@segment/analytics.js-integration');


var Custom = integration('Consola')
.global('console')
.assumesPageview()
.readyOnInitialize();

Custom.prototype.track = function (event, properties) {
    window.console.log('track: ' +  event + 'console: ' +  properties);
};