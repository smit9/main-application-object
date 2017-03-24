/**
 * Main application object
 */
var MainApplication = (function () {
    'use strict';

    var modules = {},
        mediator = (function () {
            var channels = {};

            return {
                /**
                 * Publish to subscribers
                 * @param channel channel name
                 * @returns {mediator} Mediator object for chaining
                 */
                publish: function (channel) {
                    if (!channels[channel]) return this;

                    var args = Array.prototype.slice.call(arguments, 1);

                    for (var i = 0, l = channels[channel].length; i < l; i++) {
                        var subscription = channels[channel][i];
                        subscription.callback.apply(subscription.context, args);
                    }

                    return this;
                },
                /**
                 * Subscribe to events
                 * @param channel channel name
                 * @param fn function to be executed on publish
                 * @returns {mediator} Mediator object for chaining
                 */
                subscribe: function (channel, fn) {
                    if (!channels[channel]) {
                        channels[channel] = [];
                    }

                    channels[channel].push({ context: this, callback: fn });

                    return this;
                },
                /**
                 * Apply publish / subscribe behavior to other objects
                 * @param obj object that needs to be modified
                 */
                applyTo: function (obj) {
                    obj.subscribe = this.subscribe;
                    obj.publish = this.publish;
                }
            };
        }()),
        config = {
            debug: true
        };

    return {
        /**
         * Init app instance
         */
        initialize: function () {
            this.startAll();
        },
        /**
         * Destroy app instance
         */
        destroy: function () {
            this.stopAll();
        },
        /**
         * Register application module
         * @param name module name
         * @param fn module function
         * @returns {app} Application object for chaining
         */
        register: function (name, fn) {
            modules[name] = {
                fn: fn,
                instance: null
            };

            if (config.debug) {
                console.log('Registered module ' + name);
            }

            return this;
        },
        /**
         * Start application module
         * @param name module name
         * @returns {app} Application object for chaining
         */
        start: function (name) {
            var module = modules[name];

            if (module && module.fn) {
                module.instance = module.fn(this, mediator);
                if (module.instance && typeof module.instance.initialize === 'function') {
                    module.instance.initialize();
                    if (config.debug) {
                        console.log('Module ' + name + ' started');
                    }
                }
            }

            return this;
        },
        /**
         * Stop application module
         * @param name module name
         * @returns {app} Application object for chaining
         */
        stop: function (name) {
            var module = modules[name],
                instance = module.instance;

            if (module && instance && typeof instance.destroy === 'function') {
                instance.destroy();
                module.instance = null;
                module.fn = null;
                modules[name] = null;
                if (config.debug) {
                    console.log('Module ' + name + ' stopped');
                }
            }

            return this;
        },
        /**
         * Start all modules
         * @returns {app} Application object for chaining
         */
        startAll: function () {
            for (var name in modules) {
                if (modules.hasOwnProperty(name)) {
                    this.start(name);
                }
            }

            return this;
        },
        /**
         * Stop all modules
         * @returns {app} Application object for chaining
         */
        stopAll: function () {
            for (var name in modules) {
                if (modules.hasOwnProperty(name)) {
                    this.stop(name);
                }
            }

            return this;
        }
    }
}());

// App initialization
$(document).ready(function () {
    MainApplication.initialize();
});
