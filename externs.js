/*
 * Copyright 2014 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview AngularJS' HTTP promises. This version of the externs file
 * provides templated promises.
 * @see https://docs.angularjs.org/api/ng/service/$http
 * @externs
 */

/**
 * Left here for backwards compatibility, but no longer used.
 *
 * @typedef {function((string|Object), number,
 *     function(string=): (string|Object|null), angular.$http.Config)}
 */
angular.HttpCallback;

/**
 * @constructor
 * @template T
 */
angular.$http.Response = function() {};

/** @type {T} */
angular.$http.Response.prototype.data;

/** @type {number} */
angular.$http.Response.prototype.status;

/**
 * @param {string=} name
 * @return {string|Object}
 */
angular.$http.Response.prototype.headers = function(name) {};

/** @type {!angular.$http.Config} */
angular.$http.Response.prototype.config;

/**
 * @constructor
 * @extends {angular.$q.Promise.<!angular.$http.Response.<T>>}
 * @template T
 */
angular.$http.HttpPromise = function() {};

/**
 * @param {function(T, number, function(string=):
 *     (string|Object|null), angular.$http.Config)} callback
 * @return {!angular.$http.HttpPromise.<T>} Promise for chaining.
 */
angular.$http.HttpPromise.prototype.success = function(callback) {};

/**
 * @param {function(*, number, function(string=):
 *     (string|Object|null), angular.$http.Config)} callback
 * @return {!angular.$http.HttpPromise.<T>} Promise for chaining.
 */
angular.$http.HttpPromise.prototype.error = function(callback) {};
/*
 * Copyright 2014 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for the $q service in Angular 1.4
 * NOTE: Due to a JS compiler bug, any use of a templated class must occur after
 * the class is defined. Please be careful with the ordering of the classes and
 * functions.
 * @see https://docs.angularjs.org/api/ng/service/$q
 * @externs
 */

/******************************************************************************
 * $q Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$q = function() {};

/**
 * @constructor
 * @template T
 */
angular.$q.Promise = function() {};

/**
 * Apply Type Transformation Language to allow more accurate templated type
 * definition.
 * This is copied from <code>goog.Thenable.prototype.then</code>, with the only
 * difference being the raw type as angular.$q.Promise instead of goog.Promise.
 *
 * @param {?(function(this:THIS, T): VALUE)=} opt_onFulfilled
 * @param {?(function(?): ?)=} opt_onRejected
 * @param {?(function(?): ?)=} opt_notifyCallback
 * @return {RESULT}
 * @template THIS
 * @template VALUE
 * @template RESULT := type('angular.$q.Promise',
 *     cond(isUnknown(VALUE), unknown(),
 *       mapunion(VALUE, (V) =>
 *         cond(isTemplatized(V) && sub(rawTypeOf(V), 'IThenable'),
 *           templateTypeOf(V, 0),
 *           cond(sub(V, 'angular.$q.Promise'),
 *              unknown(),
 *              V)))))
 *  =:
 */
angular.$q.Promise.prototype.then =
    function(opt_onFulfilled, opt_onRejected, opt_notifyCallback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise.<T>}
 */
angular.$q.Promise.prototype.catch = function(callback) {};

/**
 * @param {?function(?)} callback
 * @return {!angular.$q.Promise.<T>}
 */
angular.$q.Promise.prototype.finally = function(callback) {};

/**
 * @constructor
 * @template T
 */
angular.$q.Deferred = function() {};

/** @param {T=} opt_value */
angular.$q.Deferred.prototype.resolve = function(opt_value) {};

/** @param {*=} opt_reason */
angular.$q.Deferred.prototype.reject = function(opt_reason) {};

/** @param {*=} opt_value */
angular.$q.Deferred.prototype.notify = function(opt_value) {};

/** @type {!angular.$q.Promise.<T>} */
angular.$q.Deferred.prototype.promise;

/**
 * $q.all has different output type based on the input type.
 * When {@code promise} is an array, the output is an array too: for each item n
 * in the input array, the corresponding item in the returned array would be the
 * the same type of n, or if n is a templated $q.Promise, the type of the
 * resolve value.
 * When {@code promise} is in form of a record, the output should be also be a
 * record with the same properties.
 * When {@code promise} is other forms, the returned type is an Object.
 *
 * @param {VALUE} promises
 * @template VALUE
 * @return {ALLTYPE}
 * @template ALLTYPE := type('angular.$q.Promise',
 *   cond(isUnknown(VALUE), unknown(),
 *     mapunion(VALUE, (x) =>
 *       cond(sub(x, 'Array'),
 *         cond(isTemplatized(x) && sub(rawTypeOf(x), 'IThenable'),
 *           type('Array', templateTypeOf(x, 0)),
 *           'Array'
 *         ),
 *         cond(isRecord(x),
 *           maprecord(record(x), (kx, vx) => record({[kx]:
 *             cond(isTemplatized(vx) && sub(rawTypeOf(vx), 'IThenable'),
 *               templateTypeOf(vx, 0),
 *               cond(sub(vx, 'angular.$q.Promise'),
 *                 unknown(),
 *                 vx
 *               )
 *             )
 *           })),
 *           'Object')))))
 * =:
 */
angular.$q.prototype.all = function(promises) {};

/**
 * @return {!angular.$q.Deferred}
 */
angular.$q.prototype.defer = function() {};

/**
 * @param {*=} opt_reason
 * @return {!angular.$q.Promise}
 */
angular.$q.prototype.reject = function(opt_reason) {};

/**
 * @param {RESULT} value
 * @return {!angular.$q.Promise.<RESULT>}
 * @template RESULT
 */
angular.$q.prototype.when = function(value) {};
/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for Angular 1.
 *
 * TODO: Mocks.
 * TODO: Remaining Services:
 *     $cookieStore
 *     $document
 *     $httpBackend
 *     $interpolate
 *     $locale
 *     $resource
 *     $rootElement
 *     $rootScope
 *     $rootScopeProvider
 *
 * TODO: Resolve two issues with angular.$http
 *         1) angular.$http isn't declared as a
 *            callable type. It should be declared as a function, and properties
 *            added following the technique used by $timeout, $parse and
 *            $interval.
 *         2) angular.$http.delete cannot be added as an extern
 *            as it is a reserved keyword.
 *            Its use is potentially not supported in IE.
 *            It may be aliased as 'remove' in a future version.
 *
 * @see http://angularjs.org/
 * @externs
 */

/**
 * @typedef {(Window|Document|Element|Array.<Element>|string|!angular.JQLite|
 *     NodeList|{length: number})}
 */
var JQLiteSelector;

/**
 * @const
 */
var angular = {};

/**
 * @param {T} self Specifies the object which this should point to when the
 *     function is run.
 * @param {?function(this:T, ...)} fn A function to partially apply.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 * @param {...*} args Additional arguments that are partially applied to the
 *     function.
 * @template T
 */
angular.bind = function(self, fn, args) {};

/** @typedef {{strictDi: (boolean|undefined)}} */
angular.BootstrapOptions;

/**
 * @param {Element|HTMLDocument} element
 * @param {Array.<string|Function>=} opt_modules
 * @param {angular.BootstrapOptions=} opt_config
 * @return {!angular.$injector}
 */
angular.bootstrap = function(element, opt_modules, opt_config) {};

/**
 * @param {T} source
 * @param {(Object|Array)=} opt_dest
 * @return {T}
 * @template T
 */
angular.copy = function(source, opt_dest) {};

/**
 * @param {(JQLiteSelector|Object)} element
 * @param {(JQLiteSelector|Object)=} opt_context
 * @return {!angular.JQLite}
 */
angular.element = function(element, opt_context) {};

/**
 * @param {*} o1
 * @param {*} o2
 * @return {boolean}
 */
angular.equals = function(o1, o2) {};

/**
 * @param {Object} dest
 * @param {...Object} srcs
 */
angular.extend = function(dest, srcs) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {Object|Array}
 */
angular.forEach = function(obj, iterator, opt_context) {};

/**
 * @param {string|T} json
 * @return {Object|Array|Date|T}
 * @template T
 */
angular.fromJson = function(json) {};

/**
 * @param {*} arg
 * @return {*}
 */
angular.identity = function(arg) {};

/**
 * @param {Array.<string|Function>} modules
 * @return {!angular.$injector}
 */
angular.injector = function(modules) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isArray = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isDate = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isDefined = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isElement = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isFunction = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isNumber = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isObject = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isString = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isUndefined = function(value) {};

/**
 * @param {string} s
 * @return {string}
 */
angular.lowercase = function(s) {};

/**
 * @param {Object} dest
 * @param {...Object} srcs
 */
angular.merge = function(dest, srcs) {};

angular.mock = {};

/**
 * @param {string} name
 * @param {Array.<string>=} opt_requires
 * @param {angular.Injectable=} opt_configFn
 * @return {!angular.Module}
 */
angular.module = function(name, opt_requires, opt_configFn) {};

angular.noop = function() {};

/**
 * @param {Object|Array|Date|string|number} obj
 * @param {boolean=} opt_pretty
 * @return {string}
 */
angular.toJson = function(obj, opt_pretty) {};

/**
 * @param {string} s
 * @return {string}
 */
angular.uppercase = function(s) {};

/**
 * @typedef {{
 *   animate: (function(!angular.JQLite, !Object, !Object, !Function,
 *       !Object=):(!Function|undefined)|undefined),
 *   enter: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   leave: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   move: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeAddClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   addClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeRemoveClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   removeClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeSetClass: (function(!angular.JQLite, string, string, !Function,
 *       !Object=):(!Function|undefined)|undefined),
 *   setClass: (function(!angular.JQLite, string, string, !Function, !Object=):
 *       (!Function|undefined)|undefined)
 *   }}
 */
angular.Animation;

/**
 * @param {!angular.JQLite} element
 * @param {!Object} from
 * @param {!Object} to
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.animate =
    function(element, from, to, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.enter = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.leave = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.move = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeAddClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.addClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeRemoveClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.removeClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} addedClass
 * @param {string} removedClass
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeSetClass =
    function(element, addedClass, removedClass, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} addedClass
 * @param {string} removedClass
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.setClass =
    function(element, addedClass, removedClass, doneFn, opt_options) {};

/**
 * @constructor
 */
angular.Attributes = function() {};

/**
 * @type {Object.<string, string>}
 */
angular.Attributes.prototype.$attr;

/**
 * @param {string} classVal
 */
angular.Attributes.prototype.$addClass = function(classVal) {};

/**
 * @param {string} classVal
 */
angular.Attributes.prototype.$removeClass = function(classVal) {};

/**
 * @param {string} newClasses
 * @param {string} oldClasses
 */
angular.Attributes.prototype.$updateClass = function(newClasses, oldClasses) {};

/**
 * @param {string} name
 * @return {string}
 */
angular.Attributes.prototype.$normalize = function(name) {};

/**
 * @param {string} key
 * @param {function(*)} fn
 * @return {function()}
 */
angular.Attributes.prototype.$observe = function(key, fn) {};

/**
 * @param {string} key
 * @param {?(string|boolean)} value
 * @param {boolean=} opt_writeAttr
 * @param {string=} opt_attrName
 */
angular.Attributes.prototype.$set =
    function(key, value, opt_writeAttr, opt_attrName) {};

/**
 * @typedef {{
 *   pre: (function(
 *           !angular.Scope=,
 *           !angular.JQLite=,
 *           !angular.Attributes=,
 *           (!Object|!Array.<!Object>)=)|
 *       undefined),
 *   post: (function(
 *           !angular.Scope=,
 *           !angular.JQLite=,
 *           !angular.Attributes=,
 *           (!Object|Array.<!Object>)=)|
 *       undefined)
 *   }}
 */
angular.LinkingFunctions;

/**
 * @param {!angular.Scope=} scope
 * @param {!angular.JQLite=} iElement
 * @param {!angular.Attributes=} iAttrs
 * @param {(!Object|!Array.<!Object>)=} controller
 */
angular.LinkingFunctions.pre = function(scope, iElement, iAttrs, controller) {};

/**
 * @param {!angular.Scope=} scope
 * @param {!angular.JQLite=} iElement
 * @param {!angular.Attributes=} iAttrs
 * @param {(!Object|!Array.<!Object>)=} controller
 */
angular.LinkingFunctions.post = function(scope, iElement, iAttrs, controller) {
};

/**
 * @typedef {{
 *   bindToController: (boolean|!Object<string, string>|undefined),
 *   compile: (function(
 *       !angular.JQLite=, !angular.Attributes=, Function=)|undefined),
 *   controller: (angular.Injectable|string|undefined),
 *   controllerAs: (string|undefined),
 *   link: (function(
 *       !angular.Scope=, !angular.JQLite=, !angular.Attributes=,
 *       (!Object|!Array.<!Object>)=)|
 *       !angular.LinkingFunctions|
 *       undefined),
 *   name: (string|undefined),
 *   priority: (number|undefined),
 *   replace: (boolean|undefined),
 *   require: (string|Array.<string>|undefined),
 *   restrict: (string|undefined),
 *   scope: (boolean|Object.<string, string>|undefined),
 *   template: (string|
 *       function(!angular.JQLite=,!angular.Attributes=): string|
 *       undefined),
 *   templateNamespace: (string|undefined),
 *   templateUrl: (string|
 *       function(!angular.JQLite=,!angular.Attributes=)|
 *       undefined),
 *   terminal: (boolean|undefined),
 *   transclude: (boolean|string|undefined)
 *   }}
 */
angular.Directive;

/**
 * @typedef {(Function|Array.<string|Function>)}
 */
angular.Injectable;

/**
 * @constructor
 */
angular.JQLite = function() {};

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.addClass = function(name) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.after = function(element) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.append = function(element) {};

/**
 * @param {string} name
 * @param {(string|boolean)=} opt_value
 * @return {!angular.JQLite|string|boolean}
 */
angular.JQLite.prototype.attr = function(name, opt_value) {};

/**
 * @param {string} type
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.bind = function(type, fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.children = function() {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.clone = function() {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.contents = function() {};

/**
 * @param {string=} opt_name
 * @return {Object}
 */
angular.JQLite.prototype.controller = function(opt_name) {};

/**
 * @param {(string|!Object)} nameOrObject
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.prototype.css = function(nameOrObject, opt_value) {};

/**
 * @param {string=} opt_key
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.prototype.data = function(opt_key, opt_value) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.detach = function() {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.empty = function() {};

/**
 * @param {number} index
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.eq = function(index) {};

/**
 * @param {string} selector
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.find = function(selector) {};

/**
 * @param {string} name
 * @return {boolean}
 */
angular.JQLite.prototype.hasClass = function(name) {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.prototype.html = function(opt_value) {};

/**
 * @param {string=} opt_key
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.prototype.inheritedData = function(opt_key, opt_value) {};

/**
 * @return {!angular.$injector}
 */
angular.JQLite.prototype.injector = function() {};

/** @type {number} */
angular.JQLite.prototype.length;

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.next = function() {};

/**
 * @param {string} type
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.on = function(type, fn) {};

/**
 * @param {string} events
 * @param {Object|function(Event)} dataOrHandler
 * @param {function(Event)=} opt_handler
 */
angular.JQLite.prototype.one = function(events, dataOrHandler, opt_handler) {};

/**
 * @param {string=} opt_type
 * @param {Function=} opt_fn
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.off = function(opt_type, opt_fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.parent = function() {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.prepend = function(element) {};

/**
 * @param {string} name
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.prototype.prop = function(name, opt_value) {};

/**
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.ready = function(fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.remove = function() {};

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.removeAttr = function(name) {};

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.removeClass = function(name) {};

/**
 * @param {string=} opt_name
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.removeData = function(opt_name) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.replaceWith = function(element) {};

/**
 * @return {!angular.Scope}
 */
angular.JQLite.prototype.scope = function() {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.prototype.text = function(opt_value) {};

/**
 * @param {string} name
 * @param {boolean=} opt_condition
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.toggleClass = function(name, opt_condition) {};

/**
 * @param {string} type
 * @param {*=} opt_value
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.triggerHandler = function(type, opt_value) {};

/**
 * @param {string=} opt_type
 * @param {Function=} opt_fn
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.unbind = function(opt_type, opt_fn) {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.prototype.val = function(opt_value) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prototype.wrap = function(element) {};

/** @constructor */
angular.Module = function() {};

/**
 * @param {string} name
 * @param {angular.Injectable} animationFactory
 */
angular.Module.prototype.animation = function(name, animationFactory) {};

/**
 * @param {angular.Injectable} configFn
 * @return {!angular.Module}
 */
angular.Module.prototype.config = function(configFn) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {!angular.Module}
 */
angular.Module.prototype.constant = function(name, object) {};

/**
 * Intended to be called with either a name string and a constructor, or an
 * Object with names as keys and constructors as values.
 *
 * @param {string|!Object.<angular.Injectable>} name
 * @param {angular.Injectable=} opt_constructor
 * @return {!angular.Module}
 */
angular.Module.prototype.controller = function(name, opt_constructor) {};

/**
 * Intended to be called with either a name string and a directive factory, or
 * an Object with names as keys and directive factories as values.
 *
 * @param {string|!Object.<angular.Injectable>} name
 * @param {angular.Injectable=} opt_directiveFactory
 * @return {!angular.Module}
 */
angular.Module.prototype.directive = function(name, opt_directiveFactory) {};

/**
 * @param {string} name
 * @param {angular.Injectable} providerFunction
 * @return {!angular.Module}
 */
angular.Module.prototype.factory = function(name, providerFunction) {};

/**
 * @param {string} name
 * @param {angular.Injectable} filterFactory
 * @return {!angular.Module}
 */
angular.Module.prototype.filter = function(name, filterFactory) {};

/**
 * @param {string} name
 * @param {angular.$provide.Provider|angular.Injectable} providerType
 * @return {!angular.Module}
 */
angular.Module.prototype.provider = function(name, providerType) {};

/**
 * @param {angular.Injectable} initializationFn
 * @return {!angular.Module}
 */
angular.Module.prototype.run = function(initializationFn) {};

/**
 * @param {string} name
 * @param {angular.Injectable} constructor
 * @return {!angular.Module}
 */
angular.Module.prototype.service = function(name, constructor) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {!angular.Module}
 */
angular.Module.prototype.value = function(name, object) {};

/**
 * @param {string} name
 * @param {!angular.Injectable} decorator
 * @return {!angular.Module}
 */
angular.Module.prototype.decorator = function(name, decorator) {};

/**
 * @type {string}
 */
angular.Module.prototype.name = '';

/**
 * @type {Array.<string>}
 */
angular.Module.prototype.requires;

/** @constructor */
angular.Scope = function() {};

/** @type {string} */
angular.Scope.prototype.$$phase;

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 * @return {*}
 */
angular.Scope.prototype.$apply = function(opt_exp) {};

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 */
angular.Scope.prototype.$applyAsync = function(opt_exp) {};

/**
 * @param {string} name
 * @param {...*} args
 */
angular.Scope.prototype.$broadcast = function(name, args) {};

angular.Scope.prototype.$destroy = function() {};

angular.Scope.prototype.$digest = function() {};

/**
 * @param {string} name
 * @param {...*} args
 */
angular.Scope.prototype.$emit = function(name, args) {};

/**
 * @param {(string|function(angular.Scope):?)=} opt_exp
 * @param {Object=} opt_locals
 * @return {*}
 */
angular.Scope.prototype.$eval = function(opt_exp, opt_locals) {};

/**
 * @param {(string|function())=} opt_exp
 */
angular.Scope.prototype.$evalAsync = function(opt_exp) {};

/** @type {string} */
angular.Scope.prototype.$id;

/**
 * @param {boolean=} opt_isolate
 * @return {!angular.Scope}
 */
angular.Scope.prototype.$new = function(opt_isolate) {};

/**
 * @param {string} name
 * @param {function(!angular.Scope.Event, ...?)} listener
 * @return {function()}
 */
angular.Scope.prototype.$on = function(name, listener) {};

/** @type {!angular.Scope} */
angular.Scope.prototype.$parent;

/** @type {!angular.Scope} */
angular.Scope.prototype.$root;

/**
 * @param {string|!Function} exp
 * @param {(string|Function)=} opt_listener
 * @param {boolean=} opt_objectEquality
 * @return {function()}
 */
angular.Scope.prototype.$watch =
    function(exp, opt_listener, opt_objectEquality) {};

/**
 * @param {string|!Function} exp
 * @param {(string|Function)=} opt_listener
 * @return {function()}
 */
angular.Scope.prototype.$watchCollection = function(exp, opt_listener) {};

/**
 * @param {Array<string|!Function>} exps
 * @param {(string|Function)=} opt_listener
 * @return {function()}
 */
angular.Scope.prototype.$watchGroup = function(exps, opt_listener) {};

/**
 * @typedef {{
 *   currentScope: !angular.Scope,
 *   defaultPrevented: boolean,
 *   name: string,
 *   preventDefault: function(),
 *   stopPropagation: function(),
 *   targetScope: !angular.Scope
 *   }}
 */
angular.Scope.Event;

/** @type {!angular.Scope} */
angular.Scope.Event.currentScope;

/** @type {boolean} */
angular.Scope.Event.defaultPrevented;

/** @type {string} */
angular.Scope.Event.name;

angular.Scope.Event.preventDefault = function() {};

angular.Scope.Event.stopPropagation = function() {};

/** @type {!angular.Scope} */
angular.Scope.Event.targetScope;

/**
 * @type {Object}
 */
angular.version = {};

/**
 * @type {string}
 */
angular.version.full = '';

/**
 * @type {number}
 */
angular.version.major = 0;

/**
 * @type {number}
 */
angular.version.minor = 0;

/**
 * @type {number}
 */
angular.version.dot = 0;

/**
 * @type {string}
 */
angular.version.codeName = '';

/******************************************************************************
 * $anchorScroll Service
 *****************************************************************************/

/**
 * @typedef {function()}
 */
angular.$anchorScroll;

/******************************************************************************
 * $anchorScrollProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   disableAutoScrolling: function()
 *   }}
 */
angular.$anchorScrollProvider;

/**
 * @type {function()}
 */
angular.$anchorScrollProvider.disableAutoScrolling = function() {};

/******************************************************************************
 * $animate Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$animate = function() {};

/**
 * @param {JQLiteSelector} element
 * @param {Object} from
 * @param {Object} to
 * @param {string=} opt_className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.animate = function(
    element, from, to, opt_className, opt_options) {};

/**
 * @param {string} event
 * @param {JQLiteSelector} container
 * @param {function(JQLiteSelector, string)} callback
 */
angular.$animate.prototype.on = function(event, container, callback) {};

/**
 * @param {string} event
 * @param {JQLiteSelector=} opt_container
 * @param {function(JQLiteSelector, string)=} opt_callback
 */
angular.$animate.prototype.off = function(event, opt_container, opt_callback) {
};

/**
 * @param {JQLiteSelector} element
 * @param {JQLiteSelector} parentElement
 */
angular.$animate.prototype.pin = function(element, parentElement) {};

/**
 * @param {JQLiteSelector} element
 * @param {JQLiteSelector} parentElement
 * @param {JQLiteSelector} afterElement
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.enter = function(
    element, parentElement, afterElement, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.leave = function(element, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {JQLiteSelector} parentElement
 * @param {JQLiteSelector} afterElement
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.move = function(
    element, parentElement, afterElement, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.addClass = function(
    element, className, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.removeClass = function(
    element, className, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} add
 * @param {string} remove
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.setClass = function(
    element, add, remove, opt_options) {};

/**
 * @param {(boolean|JQLiteSelector)=} opt_elementOrValue
 * @param {boolean=} opt_value
 * @return {boolean}
 */
angular.$animate.prototype.enabled = function(opt_elementOrValue, opt_value) {};

/**
 * @param {angular.$q.Promise} animationPromise
 */
angular.$animate.prototype.cancel = function(animationPromise) {};

/******************************************************************************
 * $animateProvider Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$animateProvider = function() {};

/**
 * @param {string} name
 * @param {Function} factory
 */
angular.$animateProvider.prototype.register = function(name, factory) {};

/**
 * @param {RegExp=} opt_expression
 */
angular.$animateProvider.prototype.classNameFilter = function(
    opt_expression) {};

/******************************************************************************
 * $ariaProvider Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$ariaProvider = function() {};

/**
 * @param {!{
 *   ariaHidden: (boolean|undefined),
 *   ariaChecked: (boolean|undefined),
 *   ariaDisabled: (boolean|undefined),
 *   ariaRequired: (boolean|undefined),
 *   ariaInvalid: (boolean|undefined),
 *   ariaMultiline: (boolean|undefined),
 *   ariaValue: (boolean|undefined),
 *   tabindex: (boolean|undefined),
 *   bindKeypress: (boolean|undefined),
 *   bindRoleForClick: (boolean|undefined)
 * }} config
 */
angular.$ariaProvider.prototype.config = function(config) {};

/******************************************************************************
 * $compile Service
 *****************************************************************************/

/**
 * @typedef {
 *   function(
 *       (JQLiteSelector|Object),
 *       function(!angular.Scope, Function=)=, number=):
 *           function(!angular.Scope,
 *               function(!angular.JQLite, !angular.Scope=)=,
 *                   angular.$compile.LinkOptions=): !angular.JQLite}
 */
angular.$compile;

/**
 * @typedef {{
 *   parentBoundTranscludeFn: (Function|undefined),
 *   transcludeControllers: (Object|undefined),
 *   futureParentElement: (angular.JQLite|undefined)
 * }}
 */
angular.$compile.LinkOptions;

// TODO(martinprobst): remaining $compileProvider methods.

/**
 * @constructor
 */
angular.$compileProvider = function() {};

/**
 * @param {boolean=} opt_enabled
 * @return {boolean|!angular.$compileProvider}
 */
angular.$compileProvider.prototype.debugInfoEnabled = function(opt_enabled) {};

/**
 * @param {!RegExp=} opt_expression
 * @return {!RegExp|!angular.$compileProvider}
 */
angular.$compileProvider.prototype.aHrefSanitizationWhitelist = function(
    opt_expression) {};

/**
 * @param {!RegExp=} opt_expression
 * @return {!RegExp|!angular.$compileProvider}
 */
angular.$compileProvider.prototype.imgSrcSanitizationWhitelist = function(
    opt_expression) {};

/******************************************************************************
 * $cacheFactory Service
 *****************************************************************************/

/**
 * @typedef {
 *   function(string, angular.$cacheFactory.Options=):
 *       !angular.$cacheFactory.Cache}
 */
angular.$cacheFactory;

/**
 * @typedef {function(string): ?angular.$cacheFactory.Cache}
 */
angular.$cacheFactory.get;

/** @typedef {{capacity: (number|undefined)}} */
angular.$cacheFactory.Options;

/**
 * @template T
 * @constructor
 */
angular.$cacheFactory.Cache = function() {};

/**
 * @return {!angular.$cacheFactory.Cache.Info}
 */
angular.$cacheFactory.Cache.prototype.info = function() {};

/**
 * @param {string} key
 * @param {T} value
 */
angular.$cacheFactory.Cache.prototype.put = function(key, value) {};

/**
 * @param {string} key
 * @return {T}
 */
angular.$cacheFactory.Cache.prototype.get = function(key) {};

/**
 * @param {string} key
 */
angular.$cacheFactory.Cache.prototype.remove = function(key) {};

angular.$cacheFactory.Cache.prototype.removeAll = function() {};
angular.$cacheFactory.Cache.prototype.destroy = function() {};

/**
 * @typedef {{
 *   id: string,
 *   size: number,
 *   options: angular.$cacheFactory.Options
 *   }}
 */
angular.$cacheFactory.Cache.Info;

/******************************************************************************
 * $controller Service
 *****************************************************************************/

/**
 * @typedef {function((Function|string), Object):Object}
 */
angular.$controller;

/******************************************************************************
 * $controllerProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   register: function((string|Object), angular.Injectable=),
 *   allowGlobals: function()
 *   }}
 */
angular.$controllerProvider;

/******************************************************************************
 * $cookies Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$cookies = function() {};

/**
 * @param {string} key
 * @return {string|undefined}
 */
angular.$cookies.prototype.get = function(key) {};

/**
 * @param {string} key
 * @return {?Object|undefined}
 */
angular.$cookies.prototype.getObject = function(key) {};

/**
 * @return {!Object<string, string>}
 */
angular.$cookies.prototype.getAll = function() {};

/**
 * @param {string} key
 * @param {string} value
 * @param {!angular.$cookies.Config=} opt_options
 */
angular.$cookies.prototype.put = function(key, value, opt_options) {};

/**
 * @param {string} key
 * @param {?Object} value
 * @param {!angular.$cookies.Config=} opt_options
 */
angular.$cookies.prototype.putObject = function(key, value, opt_options) {};

/**
 * @param {string} key
 * @param {!angular.$cookies.Config=} opt_options
 */
angular.$cookies.prototype.remove = function(key, opt_options) {};

/**
 * See:
 * https://docs.angularjs.org/api/ngCookies/provider/$cookiesProvider#defaults
 * @typedef {{
 *   path: (string|undefined),
 *   domain: (string|undefined),
 *   date: (string|!Date|undefined),
 *   secure: (boolean|undefined)
 * }}
 */
angular.$cookies.Config;

/**
 * @constructor
 */
angular.$cookiesProvider = function() {};

/**
 * @type {angular.$cookies.Config}
 */
angular.$cookiesProvider.prototype.defaults;

/******************************************************************************
 * $exceptionHandler Service
 *****************************************************************************/

/**
 * @typedef {function(Error, string=)}
 */
angular.$exceptionHandler;

/******************************************************************************
 * $filter Service
 *****************************************************************************/

/**
 * @typedef {function(string): !Function}
 */
angular.$filter;

/**
 * The 'orderBy' filter is available through $filterProvider and AngularJS
 * injection; but is not accessed through a documented public API of AngularJS.
 * <p>In current AngularJS version the injection is satisfied by
 * angular.orderByFunction, where the implementation is found.
 * <p>See http://docs.angularjs.org/api/ng.filter:orderBy.
 * @typedef {function(Array,
 *     (string|function(?):*|Array.<(string|function(?):*)>),
 *     boolean=): Array}
 */
angular.$filter.orderBy;

/**
 * @typedef {function(Array,
 *     (string|Object|function(?):*),
 *     (function(?):*|boolean)=): Array}
 */
angular.$filter.filter;

/******************************************************************************
 * $filterProvider Service
 *****************************************************************************/

/**
 * @typedef {{register: function(string, angular.Injectable)}}
 */
angular.$filterProvider;

/**
 * @param {string} name
 * @param {angular.Injectable} fn
 */
angular.$filterProvider.register = function(name, fn) {};

/******************************************************************************
 * $http Service
 *****************************************************************************/

/**
 * This is a typedef because the closure compiler does not allow
 * defining a type that is a function with properties.
 * If you are trying to use the $http service as a function, try
 * using one of the helper functions instead.
 * @typedef {{
 *   delete: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   get: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   head: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   jsonp: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   patch: function(string, *, angular.$http.Config=):
 *       !angular.$http.HttpPromise,
 *   post: function(string, *, angular.$http.Config=):
 *       !angular.$http.HttpPromise,
 *   put: function(string, *, angular.$http.Config=):!angular.$http.HttpPromise,
 *   defaults: angular.$http.Config,
 *   pendingRequests: !Array.<angular.$http.Config>
 * }}
 */
angular.$http;

/**
 * @typedef {{
 *   cache: (boolean|!angular.$cacheFactory.Cache|undefined),
 *   data: (string|Object|undefined),
 *   headers: (Object|undefined),
 *   method: (string|undefined),
 *   params: (Object.<(string|Object)>|undefined),
 *   responseType: (string|undefined),
 *   timeout: (number|!angular.$q.Promise|undefined),
 *   transformRequest:
 *       (function((string|Object), Object):(string|Object)|
 *       Array.<function((string|Object), Object):(string|Object)>|undefined),
 *   transformResponse:
 *       (function((string|Object), Object):(string|Object)|
 *       Array.<function((string|Object), Object):(string|Object)>|undefined),
 *   url: (string|undefined),
 *   withCredentials: (boolean|undefined),
 *   xsrfCookieName: (string|undefined),
 *   xsrfHeaderName: (string|undefined)
 * }}
 */
angular.$http.Config;

angular.$http.Config.transformRequest;

angular.$http.Config.transformResponse;

// /**
//  * This extern is currently incomplete as delete is a reserved word.
//  * To use delete, index $http.
//  * Example: $http['delete'](url, opt_config);
//  * @param {string} url
//  * @param {angular.$http.Config=} opt_config
//  * @return {!angular.$http.HttpPromise}
//  */
// angular.$http.delete = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.get = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.head = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.jsonp = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.patch = function(url, data, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.post = function(url, data, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.put = function(url, data, opt_config) {};

/**
 * @type {angular.$http.Config}
 */
angular.$http.defaults;

/**
 * @type {Array.<angular.$http.Config>}
 * @const
 */
angular.$http.pendingRequests;

/**
 * @typedef {{
 *   request: (undefined|(function(!angular.$http.Config):
 *       !angular.$http.Config|!angular.$q.Promise.<!angular.$http.Config>)),
 *   requestError: (undefined|(function(Object): !angular.$q.Promise|Object)),
 *   response: (undefined|(function(!angular.$http.Response):
 *       !angular.$http.Response|!angular.$q.Promise.<!angular.$http.Response>)),
 *   responseError: (undefined|(function(Object): !angular.$q.Promise|Object))
 *   }}
 */
angular.$http.Interceptor;

/**
 * @constructor
 */
angular.$HttpProvider = function() {};

/**
 * @type {angular.$http.Config}
 */
angular.$HttpProvider.prototype.defaults;

/**
 * @type {!Array.<string|function(...*): !angular.$http.Interceptor>}
 */
angular.$HttpProvider.prototype.interceptors;

/**
 * @param {boolean=} opt_value
 * @return {boolean|!angular.$HttpProvider}
 */
angular.$HttpProvider.prototype.useApplyAsync = function(opt_value) {};

/******************************************************************************
 * $injector Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$injector = function() {};

/**
 * @param {angular.Injectable} fn
 * @return {Array.<string>}
 */
angular.$injector.prototype.annotate = function(fn) {};

/**
 * @param {string} name
 * @return {?}
 */
angular.$injector.prototype.get = function(name) {};

/**
 * @param {string} name
 * @return {boolean}
 */
angular.$injector.prototype.has = function(name) {};

/**
 * @param {!Function} type
 * @param {Object=} opt_locals
 * @return {Object}
 */
angular.$injector.prototype.instantiate = function(type, opt_locals) {};

/**
 * @param {angular.Injectable} fn
 * @param {Object=} opt_self
 * @param {Object=} opt_locals
 * @return {?}
 */
angular.$injector.prototype.invoke = function(fn, opt_self, opt_locals) {};

/******************************************************************************
 * $interpolateProvider Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$interpolateProvider = function() {};

/** @type {function(string)} */
angular.$interpolateProvider.prototype.startSymbol;

/** @type {function(string)} */
angular.$interpolateProvider.prototype.endSymbol;

/******************************************************************************
 * $interval Service
 *****************************************************************************/

/**
 * @typedef {
 *  function(function(), number=, number=, boolean=):!angular.$q.Promise
 * }
 */
angular.$interval;

/**
 * Augment the angular.$interval type definition by reopening the type via an
 * artificial angular.$interval instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$interval}
 */
angular.$interval_;

/**
 * @type {function(!angular.$q.Promise):boolean}
 */
angular.$interval_.cancel = function(promise) {};

/******************************************************************************
 * $location Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$location = function() {};

/**
 * @return {string}
 */
angular.$location.prototype.absUrl = function() {};

/**
 * @param {string=} opt_hash
 * @return {string}
 */
angular.$location.prototype.hash = function(opt_hash) {};

/**
 * @return {string}
 */
angular.$location.prototype.host = function() {};

/**
 * @param {string=} opt_path
 * @return {string|!angular.$location}
 */
angular.$location.prototype.path = function(opt_path) {};

/**
 * @return {number}
 */
angular.$location.prototype.port = function() {};

/**
 * @return {string}
 */
angular.$location.prototype.protocol = function() {};

/**
 * @type {function()}
 */
angular.$location.prototype.replace = function() {};

/**
 * @param {(string|Object.<string, string>)=} opt_search
 * @param {?(string|Array.<string>|boolean|number)=} opt_paramValue
 * @return {(!Object|!angular.$location)}
 */
angular.$location.prototype.search = function(opt_search, opt_paramValue) {};

/**
 * @param {string=} opt_url
 * @return {string}
 */
angular.$location.prototype.url = function(opt_url) {};

/******************************************************************************
 * $locationProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   enabled: (boolean|undefined),
 *   requireBase: (boolean|undefined)
 * }}
 */
angular.$locationProvider.html5ModeConfig;

/**
 * @constructor
 */
angular.$locationProvider = function() {};

/**
 * @param {string=} opt_prefix
 * @return {string|!angular.$locationProvider}
 */
angular.$locationProvider.prototype.hashPrefix = function(opt_prefix) {};

/**
 * @param {(boolean|angular.$locationProvider.html5ModeConfig)=} opt_mode
 * @return {boolean|!angular.$locationProvider}
 */
angular.$locationProvider.prototype.html5Mode = function(opt_mode) {};

/******************************************************************************
 * $log Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$log = function() {};

/**
 * @param {...*} var_args
 */
angular.$log.prototype.debug = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.prototype.error = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.prototype.info = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.prototype.log = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.prototype.warn = function(var_args) {};

/******************************************************************************
 * NgModelController
 *****************************************************************************/

/**
 * @constructor
 */
angular.NgModelController = function() {};

/**
 * @type {?}
 */
angular.NgModelController.prototype.$modelValue;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$dirty;

/**
 * @type {!Object.<boolean>}
 */
angular.NgModelController.prototype.$error;

/**
 * @type {!Array.<function(?):*>}
 */
angular.NgModelController.prototype.$formatters;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$invalid;

/**
 * @type {!Array.<function(?):*>}
 */
angular.NgModelController.prototype.$parsers;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$pristine;

angular.NgModelController.prototype.$render = function() {};

/**
 * @param {string} key
 * @param {boolean} isValid
 */
angular.NgModelController.prototype.$setValidity = function(key, isValid) {};

/**
 * @param {?} value
 */
angular.NgModelController.prototype.$setViewValue = function(value) {};

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$valid;

/**
 * @type {!Array.<function()>}
 */
angular.NgModelController.prototype.$viewChangeListeners;

/**
 * @type {?}
 */
angular.NgModelController.prototype.$viewValue;

/**
 * @type {!Object.<string, function(?, ?):*>}
 */
angular.NgModelController.prototype.$validators;

/**
 * @type {Object.<string, function(?, ?):*>}
 */
angular.NgModelController.prototype.$asyncValidators;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$untouched;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$touched;

/**
 * @param {?} value
 */
angular.NgModelController.prototype.$isEmpty = function(value) {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setPristine = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setDirty = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setUntouched = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setTouched = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$rollbackViewValue = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$validate = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$commitViewValue = function() {};

/******************************************************************************
 * FormController
 *****************************************************************************/

/**
 * @constructor
 */
angular.FormController = function() {};

/**
 * @param {*} control
 */
angular.FormController.prototype.$addControl = function(control) {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$rollbackViewValue = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$commitViewValue = function() {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$dirty;

/**
 * @type {!Object.<boolean|!Array.<*>>}
 */
angular.FormController.prototype.$error;

/**
 * @type {boolean}
 */
angular.FormController.prototype.$invalid;

/**
 * @type {string}
 */
angular.FormController.prototype.$name;

/**
 * @type {boolean}
 */
angular.FormController.prototype.$pristine;

/**
 * @param {*} control
 */
angular.FormController.prototype.$removeControl = function(control) {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setDirty = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setPristine = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setUntouched = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setSubmitted = function() {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$submitted;

/**
 * @param {string} validationToken
 * @param {boolean} isValid
 * @param {*} control
 */
angular.FormController.prototype.$setValidity = function(
    validationToken, isValid, control) {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$valid;

/******************************************************************************
 * $parse Service
 *****************************************************************************/

/**
 * @typedef {function(string):!angular.$parse.Expression}
 */
angular.$parse;

/**
 * @typedef {function((!angular.Scope|!Object), Object=):*}
 */
angular.$parse.Expression;

/**
 * Augment the angular.$parse.Expression type definition by reopening the type
 * via an artificial angular.$parse instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$parse.Expression}
 */
angular.$parse_;

/**
 * @type {function((!angular.Scope|!Object), *)}
 */
angular.$parse_.assign = function(scope, newValue) {};

/******************************************************************************
 * $provide Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$provide = function() {};

/** @typedef {{$get: (!Array.<string|!Function>|!Function)}} */
angular.$provide.Provider;

/** @typedef {(!Array.<string|!Function>|!Function)} */
angular.$provide.Provider.$get;

/**
 * @param {string} name
 * @param {*} object
 * @return {Object}
 */
angular.$provide.prototype.constant = function(name, object) {};

/**
 * @param {string} name
 * @param {!angular.Injectable} decorator
 */
angular.$provide.prototype.decorator = function(name, decorator) {};

/**
 * @param {string} name
 * @param {angular.Injectable} providerFunction
 * @return {Object}
 */
angular.$provide.prototype.factory = function(name, providerFunction) {};

/**
 * @param {string} name
 * @param {angular.Injectable|angular.$provide.Provider}
 *     providerType
 * @return {Object}
 */
angular.$provide.prototype.provider = function(name, providerType) {};

/**
 * @param {string} name
 * @param {angular.Injectable} constructor
 * @return {Object}
 */
angular.$provide.prototype.service = function(name, constructor) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {Object}
 */
angular.$provide.prototype.value = function(name, object) {};

/******************************************************************************
 * $route Service
 *****************************************************************************/

/** @constructor */
angular.$route = function() {};

/** @type {function()} */
angular.$route.prototype.reload = function() {};

/**
 * @param {!Object<string,string>} object
 */
angular.$route.prototype.updateParams = function(object) {};

/** @type {!angular.$route.Route} */
angular.$route.prototype.current;

/** @type {Array.<!angular.$route.Route>} */
angular.$route.prototype.routes;

/** @constructor */
angular.$route.Route = function() {};

/** @type {angular.$routeProvider.Params} */
angular.$route.Route.prototype.$route;

/** @type {Object.<string, *>} */
angular.$route.Route.prototype.locals;

/** @type {Object.<string, string>} */
angular.$route.Route.prototype.params;

/** @type {Object.<string, string>} */
angular.$route.Route.prototype.pathParams;

/** @type {Object.<string, *>} */
angular.$route.Route.prototype.scope;

/** @type {string|undefined} */
angular.$route.Route.prototype.originalPath;

/** @type {RegExp|undefined} */
angular.$route.Route.prototype.regexp;

/******************************************************************************
 * $routeParams Service
 *****************************************************************************/

// TODO: This should be !Object.<string|boolean> because valueless query params
// (without even an equal sign) come through as boolean "true".

/** @typedef {!Object.<string>} */
angular.$routeParams;

/******************************************************************************
 * $routeProvider Service
 *****************************************************************************/

/** @constructor */
angular.$routeProvider = function() {};

/**
 * @param {(string|!angular.$routeProvider.Params)} params
 * @return {!angular.$routeProvider}
 */
angular.$routeProvider.prototype.otherwise = function(params) {};

/**
 * @param {string} path
 * @param {angular.$routeProvider.Params} route
 * @return {!angular.$routeProvider}
 */
angular.$routeProvider.prototype.when = function(path, route) {};

/**
 * @typedef {{
 *   controller: (angular.Injectable|string|undefined),
 *   controllerAs: (string|undefined),
 *   template: (string|undefined),
 *   templateUrl: (string|function(!Object.<string,string>=)|undefined),
 *   resolve: (Object.<string, (
 *       string|angular.Injectable|!angular.$q.Promise
 *       )>|undefined),
 *   redirectTo: (
 *       string|function(Object.<string>, string, Object): string|undefined),
 *   reloadOnSearch: (boolean|undefined)
 *   }}
 */
angular.$routeProvider.Params;

/** @type {angular.Injectable|string} */
angular.$routeProvider.Params.controller;

/** @type {string} */
angular.$routeProvider.Params.controllerAs;

/** @type {string} */
angular.$routeProvider.Params.template;

/** @type {string|function(!Object.<string,string>=)} */
angular.$routeProvider.Params.templateUrl;

/** @type {Object.<string, (string|angular.Injectable|!angular.$q.Promise)>} */
angular.$routeProvider.Params.resolve;

/** @type {string|function(Object.<string>, string, Object): string} */
angular.$routeProvider.Params.redirectTo;

/** @type {boolean} */
angular.$routeProvider.Params.reloadOnSearch;

/******************************************************************************
 * $sanitize Service
 *****************************************************************************/

/** @typedef {function(string):string} */
angular.$sanitize;

/******************************************************************************
 * $sce Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng.$sce
 *
 * @typedef {{
 *   HTML: string,
 *   CSS: string,
 *   URL: string,
 *   JS: string,
 *   RESOURCE_URL: string,
 *   isEnabled: function(): boolean,
 *   parseAs: function(string, string): !angular.$parse.Expression,
 *   getTrusted: function(string, *): string,
 *   trustAs: function(string, string): *,
 *   parseAsHtml: function(string): !angular.$parse.Expression,
 *   parseAsCss: function(string): !angular.$parse.Expression,
 *   parseAsUrl: function(string): !angular.$parse.Expression,
 *   parseAsJs: function(string): !angular.$parse.Expression,
 *   parseAsResourceUrl: function(string): !angular.$parse.Expression,
 *   getTrustedHtml: function(*): string,
 *   getTrustedCss: function(*): string,
 *   getTrustedUrl: function(*): string,
 *   getTrustedJs: function(*): string,
 *   getTrustedResourceUrl: function(*): string,
 *   trustAsHtml: function(string): *,
 *   trustAsCss: function(string): *,
 *   trustAsUrl: function(string): *,
 *   trustAsJs: function(string): *,
 *   trustAsResourceUrl: function(string): *
 *   }}
 *****************************************************************************/
angular.$sce;


/** @const {string} */
angular.$sce.HTML;

/** @const {string} */
angular.$sce.CSS;

/** @const {string} */
angular.$sce.URL;

/** @const {string} */
angular.$sce.JS;

/** @const {string} */
angular.$sce.RESOURCE_URL;

/** @return {boolean} */
angular.$sce.isEnabled = function() {};

/**
 * @param {string} type
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAs = function(type, expression) {};

/**
 * @param {string} type
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrusted = function(type, maybeTrusted) {};

/**
 * @param {string} type
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAs = function(type, trustedValue) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsHtml = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsCss = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsUrl = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsJs = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsResourceUrl = function(expression) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedHtml = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedCss = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedUrl = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedJs = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedResourceUrl = function(maybeTrusted) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsHtml = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsCss = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsUrl = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsJs = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsResourceUrl = function(trustedValue) {};

/******************************************************************************
 * $sceDelegate Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng/service/$sceDelegate
 *
 * @constructor
 */
angular.$sceDelegate = function() {};

/**
 * @param {string} type
 * @param {*} value
 * @return {*}
 */
angular.$sceDelegate.prototype.trustAs = function(type, value) {};

/**
 * Note: because this method overrides Object.prototype.valueOf, the value
 * parameter needs to be annotated as optional to keep the compiler happy (as
 * otherwise the signature won't match Object.prototype.valueOf).
 *
 * @override
 * @param {*=} value
 * @return {*}
 */
angular.$sceDelegate.prototype.valueOf = function(value) {};

/**
 * @param {string} type
 * @param {*} maybeTrusted
 * @return {*}
 */
angular.$sceDelegate.prototype.getTrusted = function(type, maybeTrusted) {};

/******************************************************************************
 * $sceDelegateProvider Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
 *
 * @constructor
 */
angular.$sceDelegateProvider = function() {};

/**
 * @param {Array.<string>=} opt_whitelist
 * @return {!Array.<string>}
 */
angular.$sceDelegateProvider.prototype.resourceUrlWhitelist = function(
    opt_whitelist) {};

/**
 * @param {Array.<string>=} opt_blacklist
 * @return {!Array.<string>}
 */
angular.$sceDelegateProvider.prototype.resourceUrlBlacklist = function(
    opt_blacklist) {};

/******************************************************************************
 * $templateCache Service
 *****************************************************************************/

/**
 * @typedef {!angular.$cacheFactory.Cache.<string>}
 */
angular.$templateCache;

/******************************************************************************
 * $timeout Service
 *****************************************************************************/

/**
 * @typedef {function(Function, number=, boolean=, ...*):!angular.$q.Promise}
 */
angular.$timeout;

/**
 * Augment the angular.$timeout type definition by reopening the type via an
 * artificial angular.$timeout instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$timeout}
 */
angular.$timeout_;

/**
 * @type {function(angular.$q.Promise=):boolean}
 */
angular.$timeout_.cancel = function(promise) {};

/******************************************************************************
 * $window Service
 *****************************************************************************/

/** @typedef {!Window} */
angular.$window;
/*
 * Copyright 2010 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for the Google Maps v3.24 API.
 * @see http://code.google.com/apis/maps/documentation/javascript/reference.html
 * @externs
 */

/**
 * @const
 * @suppress {const|duplicate}
 */
var google = {};

/** @const */
google.maps = {};

/**
 * @enum {number}
 */
google.maps.Animation = {
  BOUNCE: 0,
  DROP: 1
};

/**
 * @interface
 */
google.maps.Attribution = function() {};

/**
 * @type {string}
 */
google.maps.Attribution.prototype.iosDeepLinkId;

/**
 * @type {string}
 */
google.maps.Attribution.prototype.source;

/**
 * @type {string}
 */
google.maps.Attribution.prototype.webUrl;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.BicyclingLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.BicyclingLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.BicyclingLayer.prototype.setMap = function(map) {};

/**
 * @param {(google.maps.CircleOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Circle = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Circle.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Circle.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Circle.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Circle.prototype.getRadius = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getVisible = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} center
 * @return {undefined}
 */
google.maps.Circle.prototype.setCenter = function(center) {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Circle.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Circle.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Circle.prototype.setMap = function(map) {};

/**
 * @param {google.maps.CircleOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Circle.prototype.setOptions = function(options) {};

/**
 * @param {number} radius
 * @return {undefined}
 */
google.maps.Circle.prototype.setRadius = function(radius) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Circle.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.CircleOptions = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.CircleOptions.prototype.center;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.CircleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.fillOpacity;

/**
 * @type {google.maps.Map}
 */
google.maps.CircleOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.radius;

/**
 * @type {string}
 */
google.maps.CircleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.CircleOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.zIndex;

/**
 * @enum {number}
 */
google.maps.ControlPosition = {
  BOTTOM_CENTER: 0,
  BOTTOM_LEFT: 1,
  BOTTOM_RIGHT: 2,
  LEFT_BOTTOM: 3,
  LEFT_CENTER: 4,
  LEFT_TOP: 5,
  RIGHT_BOTTOM: 6,
  RIGHT_CENTER: 7,
  RIGHT_TOP: 8,
  TOP_CENTER: 9,
  TOP_LEFT: 10,
  TOP_RIGHT: 11
};

/**
 * @param {(google.maps.Data.DataOptions|Object.<string>)=} opt_options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Data = function(opt_options) {};

/**
 * @param {google.maps.Data.Feature|google.maps.Data.FeatureOptions|Object.<string>} feature
 * @return {google.maps.Data.Feature}
 */
google.maps.Data.prototype.add = function(feature) {};

/**
 * @param {Object} geoJson
 * @param {(google.maps.Data.GeoJsonOptions|Object.<string>)=} opt_options
 * @return {Array<google.maps.Data.Feature>}
 */
google.maps.Data.prototype.addGeoJson = function(geoJson, opt_options) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @return {boolean}
 */
google.maps.Data.prototype.contains = function(feature) {};

/**
 * @param {function(google.maps.Data.Feature)} callback
 * @return {undefined}
 */
google.maps.Data.prototype.forEach = function(callback) {};

/**
 * @nosideeffects
 * @return {google.maps.ControlPosition}
 */
google.maps.Data.prototype.getControlPosition = function() {};

/**
 * @nosideeffects
 * @return {Array<string>}
 */
google.maps.Data.prototype.getControls = function() {};

/**
 * @nosideeffects
 * @return {?string}
 */
google.maps.Data.prototype.getDrawingMode = function() {};

/**
 * @param {number|string} id
 * @return {google.maps.Data.Feature|undefined}
 */
google.maps.Data.prototype.getFeatureById = function(id) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Data.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.prototype.getStyle = function() {};

/**
 * @param {string} url
 * @param {(google.maps.Data.GeoJsonOptions|Object.<string>)=} opt_options
 * @param {function(Array<google.maps.Data.Feature>)=} opt_callback
 * @return {undefined}
 */
google.maps.Data.prototype.loadGeoJson = function(url, opt_options, opt_callback) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @param {google.maps.Data.StyleOptions|Object.<string>} style
 * @return {undefined}
 */
google.maps.Data.prototype.overrideStyle = function(feature, style) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @return {undefined}
 */
google.maps.Data.prototype.remove = function(feature) {};

/**
 * @param {google.maps.Data.Feature=} opt_feature
 * @return {undefined}
 */
google.maps.Data.prototype.revertStyle = function(opt_feature) {};

/**
 * @param {google.maps.ControlPosition} controlPosition
 * @return {undefined}
 */
google.maps.Data.prototype.setControlPosition = function(controlPosition) {};

/**
 * @param {Array<string>} controls
 * @return {undefined}
 */
google.maps.Data.prototype.setControls = function(controls) {};

/**
 * @param {?string} drawingMode
 * @return {undefined}
 */
google.maps.Data.prototype.setDrawingMode = function(drawingMode) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Data.prototype.setMap = function(map) {};

/**
 * @param {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>} style
 * @return {undefined}
 */
google.maps.Data.prototype.setStyle = function(style) {};

/**
 * @param {function(Object)} callback
 * @return {undefined}
 */
google.maps.Data.prototype.toGeoJson = function(callback) {};

/**
 * @interface
 */
google.maps.Data.AddFeatureEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.AddFeatureEvent.prototype.feature;

/**
 * @interface
 */
google.maps.Data.DataOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.Data.DataOptions.prototype.controlPosition;

/**
 * @type {Array<string>}
 */
google.maps.Data.DataOptions.prototype.controls;

/**
 * @type {string}
 */
google.maps.Data.DataOptions.prototype.drawingMode;

/**
 * @type {function(google.maps.Data.Geometry): google.maps.Data.Feature}
 */
google.maps.Data.DataOptions.prototype.featureFactory;

/**
 * @type {google.maps.Map}
 */
google.maps.Data.DataOptions.prototype.map;

/**
 * @type {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.DataOptions.prototype.style;

/**
 * @param {(google.maps.Data.FeatureOptions|Object.<string>)=} opt_options
 * @constructor
 */
google.maps.Data.Feature = function(opt_options) {};

/**
 * @param {function(*, string)} callback
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.forEachProperty = function(callback) {};

/**
 * @nosideeffects
 * @return {google.maps.Data.Geometry}
 */
google.maps.Data.Feature.prototype.getGeometry = function() {};

/**
 * @nosideeffects
 * @return {number|string|undefined}
 */
google.maps.Data.Feature.prototype.getId = function() {};

/**
 * @param {string} name
 * @return {*}
 */
google.maps.Data.Feature.prototype.getProperty = function(name) {};

/**
 * @param {string} name
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.removeProperty = function(name) {};

/**
 * @param {google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral} newGeometry
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.setGeometry = function(newGeometry) {};

/**
 * @param {string} name
 * @param {*} newValue
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.setProperty = function(name, newValue) {};

/**
 * @param {function(Object)} callback
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.toGeoJson = function(callback) {};

/**
 * @interface
 */
google.maps.Data.FeatureOptions = function() {};

/**
 * @type {google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.Data.FeatureOptions.prototype.geometry;

/**
 * @type {number|string}
 */
google.maps.Data.FeatureOptions.prototype.id;

/**
 * @type {Object}
 */
google.maps.Data.FeatureOptions.prototype.properties;

/**
 * @interface
 */
google.maps.Data.GeoJsonOptions = function() {};

/**
 * @type {string}
 */
google.maps.Data.GeoJsonOptions.prototype.idPropertyName;

/**
 * @constructor
 */
google.maps.Data.Geometry = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Data.Geometry.prototype.getType = function() {};

/**
 * @param {Array<google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.GeometryCollection = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.Data.Geometry>}
 */
google.maps.Data.GeometryCollection.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.Geometry}
 */
google.maps.Data.GeometryCollection.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.GeometryCollection.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.GeometryCollection.prototype.getType = function() {};

/**
 * @param {Array<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.LineString = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.LatLng>}
 */
google.maps.Data.LineString.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.LineString.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.LineString.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.LineString.prototype.getType = function() {};

/**
 * @param {Array<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.LinearRing = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.LatLng>}
 */
google.maps.Data.LinearRing.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.LinearRing.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.LinearRing.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.LinearRing.prototype.getType = function() {};

/**
 * @extends {google.maps.MouseEvent}
 * @constructor
 */
google.maps.Data.MouseEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.MouseEvent.prototype.feature;

/**
 * @param {Array<google.maps.Data.LineString|Array<google.maps.LatLng|google.maps.LatLngLiteral>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiLineString = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.Data.LineString>}
 */
google.maps.Data.MultiLineString.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.LineString}
 */
google.maps.Data.MultiLineString.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiLineString.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiLineString.prototype.getType = function() {};

/**
 * @param {Array<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiPoint = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.LatLng>}
 */
google.maps.Data.MultiPoint.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.MultiPoint.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiPoint.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiPoint.prototype.getType = function() {};

/**
 * @param {Array<google.maps.Data.Polygon|Array<google.maps.Data.LinearRing|Array<google.maps.LatLng|google.maps.LatLngLiteral>>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiPolygon = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.Data.Polygon>}
 */
google.maps.Data.MultiPolygon.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.Polygon}
 */
google.maps.Data.MultiPolygon.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiPolygon.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiPolygon.prototype.getType = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.Point = function(latLng) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Data.Point.prototype.get = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.Point.prototype.getType = function() {};

/**
 * @param {Array<google.maps.Data.LinearRing|Array<google.maps.LatLng|google.maps.LatLngLiteral>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.Polygon = function(elements) {};

/**
 * @nosideeffects
 * @return {Array<google.maps.Data.LinearRing>}
 */
google.maps.Data.Polygon.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.LinearRing}
 */
google.maps.Data.Polygon.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.Polygon.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.Polygon.prototype.getType = function() {};

/**
 * @interface
 */
google.maps.Data.RemoveFeatureEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.RemoveFeatureEvent.prototype.feature;

/**
 * @interface
 */
google.maps.Data.RemovePropertyEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.RemovePropertyEvent.prototype.feature;

/**
 * @type {string}
 */
google.maps.Data.RemovePropertyEvent.prototype.name;

/**
 * @type {*}
 */
google.maps.Data.RemovePropertyEvent.prototype.oldValue;

/**
 * @interface
 */
google.maps.Data.SetGeometryEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.SetGeometryEvent.prototype.feature;

/**
 * @type {google.maps.Data.Geometry}
 */
google.maps.Data.SetGeometryEvent.prototype.newGeometry;

/**
 * @type {google.maps.Data.Geometry}
 */
google.maps.Data.SetGeometryEvent.prototype.oldGeometry;

/**
 * @interface
 */
google.maps.Data.SetPropertyEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.SetPropertyEvent.prototype.feature;

/**
 * @type {string}
 */
google.maps.Data.SetPropertyEvent.prototype.name;

/**
 * @type {*}
 */
google.maps.Data.SetPropertyEvent.prototype.newValue;

/**
 * @type {*}
 */
google.maps.Data.SetPropertyEvent.prototype.oldValue;

/**
 * @interface
 */
google.maps.Data.StyleOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.clickable;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.cursor;

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.fillOpacity;

/**
 * @type {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.Data.StyleOptions.prototype.icon;

/**
 * @type {google.maps.MarkerShape}
 */
google.maps.Data.StyleOptions.prototype.shape;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.strokeWeight;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.title;

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.zIndex;

/**
 * @typedef {function(google.maps.Data.Feature):google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.StylingFunction;

/**
 * @interface
 */
google.maps.DirectionsGeocodedWaypoint = function() {};

/**
 * @type {boolean}
 */
google.maps.DirectionsGeocodedWaypoint.prototype.partial_match;

/**
 * @type {string}
 */
google.maps.DirectionsGeocodedWaypoint.prototype.place_id;

/**
 * @type {Array<string>}
 */
google.maps.DirectionsGeocodedWaypoint.prototype.types;

/**
 * @interface
 */
google.maps.DirectionsLeg = function() {};

/**
 * @type {google.maps.Time}
 */
google.maps.DirectionsLeg.prototype.arrival_time;

/**
 * @type {google.maps.Time}
 */
google.maps.DirectionsLeg.prototype.departure_time;

/**
 * @type {google.maps.Distance}
 */
google.maps.DirectionsLeg.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsLeg.prototype.duration;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsLeg.prototype.duration_in_traffic;

/**
 * @type {string}
 */
google.maps.DirectionsLeg.prototype.end_address;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsLeg.prototype.end_location;

/**
 * @type {string}
 */
google.maps.DirectionsLeg.prototype.start_address;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsLeg.prototype.start_location;

/**
 * @type {Array<google.maps.DirectionsStep>}
 */
google.maps.DirectionsLeg.prototype.steps;

/**
 * @type {Array<google.maps.LatLng>}
 */
google.maps.DirectionsLeg.prototype.via_waypoints;

/**
 * @param {(google.maps.DirectionsRendererOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.DirectionsRenderer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.DirectionsResult}
 */
google.maps.DirectionsRenderer.prototype.getDirections = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.DirectionsRenderer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {Node}
 */
google.maps.DirectionsRenderer.prototype.getPanel = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.DirectionsRenderer.prototype.getRouteIndex = function() {};

/**
 * @param {google.maps.DirectionsResult} directions
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setDirections = function(directions) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.DirectionsRendererOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setOptions = function(options) {};

/**
 * @param {Node} panel
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setPanel = function(panel) {};

/**
 * @param {number} routeIndex
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setRouteIndex = function(routeIndex) {};

/**
 * @interface
 */
google.maps.DirectionsRendererOptions = function() {};

/**
 * @type {google.maps.DirectionsResult}
 */
google.maps.DirectionsRendererOptions.prototype.directions;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.hideRouteList;

/**
 * @type {google.maps.InfoWindow}
 */
google.maps.DirectionsRendererOptions.prototype.infoWindow;

/**
 * @type {google.maps.Map}
 */
google.maps.DirectionsRendererOptions.prototype.map;

/**
 * @type {google.maps.MarkerOptions|Object.<string>}
 */
google.maps.DirectionsRendererOptions.prototype.markerOptions;

/**
 * @type {Node}
 */
google.maps.DirectionsRendererOptions.prototype.panel;

/**
 * @type {google.maps.PolylineOptions|Object.<string>}
 */
google.maps.DirectionsRendererOptions.prototype.polylineOptions;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.preserveViewport;

/**
 * @type {number}
 */
google.maps.DirectionsRendererOptions.prototype.routeIndex;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressBicyclingLayer;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressInfoWindows;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressMarkers;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressPolylines;

/**
 * @interface
 */
google.maps.DirectionsRequest = function() {};

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidFerries;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidHighways;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidTolls;

/**
 * @type {string|google.maps.LatLng|google.maps.Place}
 */
google.maps.DirectionsRequest.prototype.destination;

/**
 * @type {google.maps.DrivingOptions|Object.<string>}
 */
google.maps.DirectionsRequest.prototype.drivingOptions;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.optimizeWaypoints;

/**
 * @type {string|google.maps.LatLng|google.maps.Place}
 */
google.maps.DirectionsRequest.prototype.origin;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.provideRouteAlternatives;

/**
 * @type {string}
 */
google.maps.DirectionsRequest.prototype.region;

/**
 * @type {google.maps.TransitOptions|Object.<string>}
 */
google.maps.DirectionsRequest.prototype.transitOptions;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DirectionsRequest.prototype.travelMode;

/**
 * @type {google.maps.UnitSystem}
 */
google.maps.DirectionsRequest.prototype.unitSystem;

/**
 * @type {Array<google.maps.DirectionsWaypoint>}
 */
google.maps.DirectionsRequest.prototype.waypoints;

/**
 * @interface
 */
google.maps.DirectionsResult = function() {};

/**
 * @type {Array<google.maps.DirectionsGeocodedWaypoint>}
 */
google.maps.DirectionsResult.prototype.geocoded_waypoints;

/**
 * @type {Array<google.maps.DirectionsRoute>}
 */
google.maps.DirectionsResult.prototype.routes;

/**
 * @interface
 */
google.maps.DirectionsRoute = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.DirectionsRoute.prototype.bounds;

/**
 * @type {string}
 */
google.maps.DirectionsRoute.prototype.copyrights;

/**
 * @type {google.maps.TransitFare}
 */
google.maps.DirectionsRoute.prototype.fare;

/**
 * @type {Array<google.maps.DirectionsLeg>}
 */
google.maps.DirectionsRoute.prototype.legs;

/**
 * @type {Array<google.maps.LatLng>}
 */
google.maps.DirectionsRoute.prototype.overview_path;

/**
 * @type {string}
 */
google.maps.DirectionsRoute.prototype.overview_polyline;

/**
 * @type {Array<string>}
 */
google.maps.DirectionsRoute.prototype.warnings;

/**
 * @type {Array<number>}
 */
google.maps.DirectionsRoute.prototype.waypoint_order;

/**
 * @constructor
 */
google.maps.DirectionsService = function() {};

/**
 * @param {google.maps.DirectionsRequest|Object.<string>} request
 * @param {function(google.maps.DirectionsResult, google.maps.DirectionsStatus)} callback
 * @return {undefined}
 */
google.maps.DirectionsService.prototype.route = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DirectionsStatus = {
  INVALID_REQUEST: '0',
  MAX_WAYPOINTS_EXCEEDED: '1',
  NOT_FOUND: '2',
  OK: '3',
  OVER_QUERY_LIMIT: '4',
  REQUEST_DENIED: '5',
  UNKNOWN_ERROR: '6',
  ZERO_RESULTS: '7'
};

/**
 * @interface
 */
google.maps.DirectionsStep = function() {};

/**
 * @type {google.maps.Distance}
 */
google.maps.DirectionsStep.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsStep.prototype.duration;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsStep.prototype.end_location;

/**
 * @type {string}
 */
google.maps.DirectionsStep.prototype.instructions;

/**
 * @type {Array<google.maps.LatLng>}
 */
google.maps.DirectionsStep.prototype.path;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsStep.prototype.start_location;

/**
 * @type {Array<google.maps.DirectionsStep>}
 */
google.maps.DirectionsStep.prototype.steps;

/**
 * @type {google.maps.TransitDetails}
 */
google.maps.DirectionsStep.prototype.transit;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DirectionsStep.prototype.travel_mode;

/**
 * @interface
 */
google.maps.DirectionsWaypoint = function() {};

/**
 * @type {string|google.maps.LatLng|google.maps.Place}
 */
google.maps.DirectionsWaypoint.prototype.location;

/**
 * @type {boolean}
 */
google.maps.DirectionsWaypoint.prototype.stopover;

/**
 * @interface
 */
google.maps.Distance = function() {};

/**
 * @type {string}
 */
google.maps.Distance.prototype.text;

/**
 * @type {number}
 */
google.maps.Distance.prototype.value;

/**
 * @enum {string}
 */
google.maps.DistanceMatrixElementStatus = {
  NOT_FOUND: '0',
  OK: '1',
  ZERO_RESULTS: '2'
};

/**
 * @interface
 */
google.maps.DistanceMatrixRequest = function() {};

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidFerries;

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidHighways;

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidTolls;

/**
 * @type {Array<string|google.maps.LatLng|google.maps.Place>}
 */
google.maps.DistanceMatrixRequest.prototype.destinations;

/**
 * @type {google.maps.DrivingOptions|Object.<string>}
 */
google.maps.DistanceMatrixRequest.prototype.drivingOptions;

/**
 * @type {Array<string|google.maps.LatLng|google.maps.Place>}
 */
google.maps.DistanceMatrixRequest.prototype.origins;

/**
 * @type {string}
 */
google.maps.DistanceMatrixRequest.prototype.region;

/**
 * @type {google.maps.TransitOptions|Object.<string>}
 */
google.maps.DistanceMatrixRequest.prototype.transitOptions;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DistanceMatrixRequest.prototype.travelMode;

/**
 * @type {google.maps.UnitSystem}
 */
google.maps.DistanceMatrixRequest.prototype.unitSystem;

/**
 * @interface
 */
google.maps.DistanceMatrixResponse = function() {};

/**
 * @type {Array<string>}
 */
google.maps.DistanceMatrixResponse.prototype.destinationAddresses;

/**
 * @type {Array<string>}
 */
google.maps.DistanceMatrixResponse.prototype.originAddresses;

/**
 * @type {Array<google.maps.DistanceMatrixResponseRow>}
 */
google.maps.DistanceMatrixResponse.prototype.rows;

/**
 * @interface
 */
google.maps.DistanceMatrixResponseElement = function() {};

/**
 * @type {google.maps.Distance}
 */
google.maps.DistanceMatrixResponseElement.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DistanceMatrixResponseElement.prototype.duration;

/**
 * @type {google.maps.Duration}
 */
google.maps.DistanceMatrixResponseElement.prototype.duration_in_traffic;

/**
 * @type {google.maps.TransitFare}
 */
google.maps.DistanceMatrixResponseElement.prototype.fare;

/**
 * @type {google.maps.DistanceMatrixElementStatus}
 */
google.maps.DistanceMatrixResponseElement.prototype.status;

/**
 * @interface
 */
google.maps.DistanceMatrixResponseRow = function() {};

/**
 * @type {Array<google.maps.DistanceMatrixResponseElement>}
 */
google.maps.DistanceMatrixResponseRow.prototype.elements;

/**
 * @constructor
 */
google.maps.DistanceMatrixService = function() {};

/**
 * @param {google.maps.DistanceMatrixRequest|Object.<string>} request
 * @param {function(google.maps.DistanceMatrixResponse, google.maps.DistanceMatrixStatus)} callback
 * @return {undefined}
 */
google.maps.DistanceMatrixService.prototype.getDistanceMatrix = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DistanceMatrixStatus = {
  INVALID_REQUEST: '0',
  MAX_DIMENSIONS_EXCEEDED: '1',
  MAX_ELEMENTS_EXCEEDED: '2',
  OK: '3',
  OVER_QUERY_LIMIT: '4',
  REQUEST_DENIED: '5',
  UNKNOWN_ERROR: '6'
};

/**
 * @interface
 */
google.maps.DrivingOptions = function() {};

/**
 * @type {Date}
 */
google.maps.DrivingOptions.prototype.departureTime;

/**
 * @type {google.maps.TrafficModel}
 */
google.maps.DrivingOptions.prototype.trafficModel;

/**
 * @interface
 */
google.maps.Duration = function() {};

/**
 * @type {string}
 */
google.maps.Duration.prototype.text;

/**
 * @type {number}
 */
google.maps.Duration.prototype.value;

/**
 * @interface
 */
google.maps.ElevationResult = function() {};

/**
 * @type {number}
 */
google.maps.ElevationResult.prototype.elevation;

/**
 * @type {google.maps.LatLng}
 */
google.maps.ElevationResult.prototype.location;

/**
 * @type {number}
 */
google.maps.ElevationResult.prototype.resolution;

/**
 * @constructor
 */
google.maps.ElevationService = function() {};

/**
 * @param {google.maps.PathElevationRequest|Object.<string>} request
 * @param {function(Array<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationAlongPath = function(request, callback) {};

/**
 * @param {google.maps.LocationElevationRequest|Object.<string>} request
 * @param {function(Array<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationForLocations = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.ElevationStatus = {
  INVALID_REQUEST: '0',
  OK: '1',
  OVER_QUERY_LIMIT: '2',
  REQUEST_DENIED: '3',
  UNKNOWN_ERROR: '4'
};

/**
 * @interface
 */
google.maps.FullscreenControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.FullscreenControlOptions.prototype.position;

/**
 * @interface
 */
google.maps.FusionTablesCell = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesCell.prototype.columnName;

/**
 * @type {string}
 */
google.maps.FusionTablesCell.prototype.value;

/**
 * @constructor
 */
google.maps.FusionTablesHeatmap = function() {};

/**
 * @type {boolean}
 */
google.maps.FusionTablesHeatmap.prototype.enabled;

/**
 * @param {google.maps.FusionTablesLayerOptions|Object.<string>} options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.FusionTablesLayer = function(options) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.FusionTablesLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.FusionTablesLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.FusionTablesLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.FusionTablesLayer.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.FusionTablesLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.FusionTablesLayerOptions.prototype.clickable;

/**
 * @type {google.maps.FusionTablesHeatmap}
 */
google.maps.FusionTablesLayerOptions.prototype.heatmap;

/**
 * @type {google.maps.Map}
 */
google.maps.FusionTablesLayerOptions.prototype.map;

/**
 * @type {google.maps.FusionTablesQuery}
 */
google.maps.FusionTablesLayerOptions.prototype.query;

/**
 * @type {Array<google.maps.FusionTablesStyle>}
 */
google.maps.FusionTablesLayerOptions.prototype.styles;

/**
 * @type {boolean}
 */
google.maps.FusionTablesLayerOptions.prototype.suppressInfoWindows;

/**
 * @constructor
 */
google.maps.FusionTablesMarkerOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesMarkerOptions.prototype.iconName;

/**
 * @interface
 */
google.maps.FusionTablesMouseEvent = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesMouseEvent.prototype.infoWindowHtml;

/**
 * @type {google.maps.LatLng}
 */
google.maps.FusionTablesMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.FusionTablesMouseEvent.prototype.pixelOffset;

/**
 * @type {Object<google.maps.FusionTablesCell>}
 */
google.maps.FusionTablesMouseEvent.prototype.row;

/**
 * @constructor
 */
google.maps.FusionTablesPolygonOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesPolygonOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.fillOpacity;

/**
 * @type {string}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeWeight;

/**
 * @constructor
 */
google.maps.FusionTablesPolylineOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeWeight;

/**
 * @constructor
 */
google.maps.FusionTablesQuery = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.from;

/**
 * @type {number}
 */
google.maps.FusionTablesQuery.prototype.limit;

/**
 * @type {number}
 */
google.maps.FusionTablesQuery.prototype.offset;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.orderBy;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.select;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.where;

/**
 * @constructor
 */
google.maps.FusionTablesStyle = function() {};

/**
 * @type {google.maps.FusionTablesMarkerOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.markerOptions;

/**
 * @type {google.maps.FusionTablesPolygonOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.polygonOptions;

/**
 * @type {google.maps.FusionTablesPolylineOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.polylineOptions;

/**
 * @type {string}
 */
google.maps.FusionTablesStyle.prototype.where;

/**
 * @constructor
 */
google.maps.Geocoder = function() {};

/**
 * @param {google.maps.GeocoderRequest|Object.<string>} request
 * @param {function(Array<google.maps.GeocoderResult>, google.maps.GeocoderStatus)} callback
 * @return {undefined}
 */
google.maps.Geocoder.prototype.geocode = function(request, callback) {};

/**
 * @constructor
 */
google.maps.GeocoderAddressComponent = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderAddressComponent.prototype.long_name;

/**
 * @type {string}
 */
google.maps.GeocoderAddressComponent.prototype.short_name;

/**
 * @type {Array<string>}
 */
google.maps.GeocoderAddressComponent.prototype.types;

/**
 * @interface
 */
google.maps.GeocoderComponentRestrictions = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.administrativeArea;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.country;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.locality;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.postalCode;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.route;

/**
 * @constructor
 */
google.maps.GeocoderGeometry = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.GeocoderGeometry.prototype.bounds;

/**
 * @type {google.maps.LatLng}
 */
google.maps.GeocoderGeometry.prototype.location;

/**
 * @type {google.maps.GeocoderLocationType}
 */
google.maps.GeocoderGeometry.prototype.location_type;

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.GeocoderGeometry.prototype.viewport;

/**
 * @enum {string}
 */
google.maps.GeocoderLocationType = {
  APPROXIMATE: '0',
  GEOMETRIC_CENTER: '1',
  RANGE_INTERPOLATED: '2',
  ROOFTOP: '3'
};

/**
 * @interface
 */
google.maps.GeocoderRequest = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderRequest.prototype.address;

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.GeocoderRequest.prototype.bounds;

/**
 * @type {google.maps.GeocoderComponentRestrictions}
 */
google.maps.GeocoderRequest.prototype.componentRestrictions;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.GeocoderRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.GeocoderRequest.prototype.placeId;

/**
 * @type {string}
 */
google.maps.GeocoderRequest.prototype.region;

/**
 * @constructor
 */
google.maps.GeocoderResult = function() {};

/**
 * @type {Array<google.maps.GeocoderAddressComponent>}
 */
google.maps.GeocoderResult.prototype.address_components;

/**
 * @type {string}
 */
google.maps.GeocoderResult.prototype.formatted_address;

/**
 * @type {google.maps.GeocoderGeometry}
 */
google.maps.GeocoderResult.prototype.geometry;

/**
 * @type {boolean}
 */
google.maps.GeocoderResult.prototype.partial_match;

/**
 * @type {string}
 */
google.maps.GeocoderResult.prototype.place_id;

/**
 * @type {Array<string>}
 */
google.maps.GeocoderResult.prototype.postcode_localities;

/**
 * @type {Array<string>}
 */
google.maps.GeocoderResult.prototype.types;

/**
 * @enum {string}
 */
google.maps.GeocoderStatus = {
  ERROR: '0',
  INVALID_REQUEST: '1',
  OK: '2',
  OVER_QUERY_LIMIT: '3',
  REQUEST_DENIED: '4',
  UNKNOWN_ERROR: '5',
  ZERO_RESULTS: '6'
};

/**
 * @param {string} url
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} bounds
 * @param {(google.maps.GroundOverlayOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.GroundOverlay = function(url, bounds, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.GroundOverlay.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.GroundOverlay.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.GroundOverlay.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.GroundOverlay.prototype.getUrl = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.GroundOverlay.prototype.setMap = function(map) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.GroundOverlay.prototype.setOpacity = function(opacity) {};

/**
 * @interface
 */
google.maps.GroundOverlayOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.GroundOverlayOptions.prototype.clickable;

/**
 * @type {google.maps.Map}
 */
google.maps.GroundOverlayOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.GroundOverlayOptions.prototype.opacity;

/**
 * @interface
 */
google.maps.Icon = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.Icon.prototype.anchor;

/**
 * @type {google.maps.Point}
 */
google.maps.Icon.prototype.labelOrigin;

/**
 * @type {google.maps.Point}
 */
google.maps.Icon.prototype.origin;

/**
 * @type {google.maps.Size}
 */
google.maps.Icon.prototype.scaledSize;

/**
 * @type {google.maps.Size}
 */
google.maps.Icon.prototype.size;

/**
 * @type {string}
 */
google.maps.Icon.prototype.url;

/**
 * @interface
 */
google.maps.IconSequence = function() {};

/**
 * @type {boolean}
 */
google.maps.IconSequence.prototype.fixedRotation;

/**
 * @type {google.maps.Symbol}
 */
google.maps.IconSequence.prototype.icon;

/**
 * @type {string}
 */
google.maps.IconSequence.prototype.offset;

/**
 * @type {string}
 */
google.maps.IconSequence.prototype.repeat;

/**
 * @param {google.maps.ImageMapTypeOptions|Object.<string>} opts
 * @implements {google.maps.MapType}
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.ImageMapType = function(opts) {};

/**
 * @type {string}
 */
google.maps.ImageMapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.ImageMapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.ImageMapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.ImageMapType.prototype.tileSize;

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.ImageMapType.prototype.getOpacity = function() {};

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Document} ownerDocument
 * @return {Node}
 */
google.maps.ImageMapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

/**
 * @param {Node} tileDiv
 * @return {undefined}
 */
google.maps.ImageMapType.prototype.releaseTile = function(tileDiv) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.ImageMapType.prototype.setOpacity = function(opacity) {};

/**
 * @interface
 */
google.maps.ImageMapTypeOptions = function() {};

/**
 * @type {string}
 */
google.maps.ImageMapTypeOptions.prototype.alt;

/**
 * @type {function(google.maps.Point, number): string}
 */
google.maps.ImageMapTypeOptions.prototype.getTileUrl;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.ImageMapTypeOptions.prototype.name;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.opacity;

/**
 * @type {google.maps.Size}
 */
google.maps.ImageMapTypeOptions.prototype.tileSize;

/**
 * @param {(google.maps.InfoWindowOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.InfoWindow = function(opt_opts) {};

/**
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.close = function() {};

/**
 * @nosideeffects
 * @return {string|Node}
 */
google.maps.InfoWindow.prototype.getContent = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.InfoWindow.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.InfoWindow.prototype.getZIndex = function() {};

/**
 * @param {(google.maps.Map|google.maps.StreetViewPanorama)=} opt_map
 * @param {google.maps.MVCObject=} opt_anchor
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.open = function(opt_map, opt_anchor) {};

/**
 * @param {string|Node} content
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setContent = function(content) {};

/**
 * @param {google.maps.InfoWindowOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} position
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setPosition = function(position) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setZIndex = function(zIndex) {};

/**
 * @interface
 */
google.maps.InfoWindowOptions = function() {};

/**
 * @type {string|Node}
 */
google.maps.InfoWindowOptions.prototype.content;

/**
 * @type {boolean}
 */
google.maps.InfoWindowOptions.prototype.disableAutoPan;

/**
 * @type {number}
 */
google.maps.InfoWindowOptions.prototype.maxWidth;

/**
 * @type {google.maps.Size}
 */
google.maps.InfoWindowOptions.prototype.pixelOffset;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.InfoWindowOptions.prototype.position;

/**
 * @type {number}
 */
google.maps.InfoWindowOptions.prototype.zIndex;

/**
 * @constructor
 */
google.maps.KmlAuthor = function() {};

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.email;

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.uri;

/**
 * @constructor
 */
google.maps.KmlFeatureData = function() {};

/**
 * @type {google.maps.KmlAuthor}
 */
google.maps.KmlFeatureData.prototype.author;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.description;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.id;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.infoWindowHtml;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.snippet;

/**
 * @param {(google.maps.KmlLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.KmlLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.KmlLayer.prototype.getDefaultViewport = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.KmlLayer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.KmlLayerMetadata}
 */
google.maps.KmlLayer.prototype.getMetadata = function() {};

/**
 * @nosideeffects
 * @return {google.maps.KmlLayerStatus}
 */
google.maps.KmlLayer.prototype.getStatus = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.KmlLayer.prototype.getUrl = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.KmlLayer.prototype.getZIndex = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.KmlLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setOptions = function(options) {};

/**
 * @param {string} url
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setUrl = function(url) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setZIndex = function(zIndex) {};

/**
 * @constructor
 */
google.maps.KmlLayerMetadata = function() {};

/**
 * @type {google.maps.KmlAuthor}
 */
google.maps.KmlLayerMetadata.prototype.author;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.description;

/**
 * @type {boolean}
 */
google.maps.KmlLayerMetadata.prototype.hasScreenOverlays;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.snippet;

/**
 * @interface
 */
google.maps.KmlLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.clickable;

/**
 * @type {google.maps.Map}
 */
google.maps.KmlLayerOptions.prototype.map;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.preserveViewport;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.screenOverlays;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.suppressInfoWindows;

/**
 * @type {string}
 */
google.maps.KmlLayerOptions.prototype.url;

/**
 * @type {number}
 */
google.maps.KmlLayerOptions.prototype.zIndex;

/**
 * @enum {string}
 */
google.maps.KmlLayerStatus = {
  DOCUMENT_NOT_FOUND: '0',
  DOCUMENT_TOO_LARGE: '1',
  FETCH_ERROR: '2',
  INVALID_DOCUMENT: '3',
  INVALID_REQUEST: '4',
  LIMITS_EXCEEDED: '5',
  OK: '6',
  TIMED_OUT: '7',
  UNKNOWN: '8'
};

/**
 * @constructor
 */
google.maps.KmlMouseEvent = function() {};

/**
 * @type {google.maps.KmlFeatureData}
 */
google.maps.KmlMouseEvent.prototype.featureData;

/**
 * @type {google.maps.LatLng}
 */
google.maps.KmlMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.KmlMouseEvent.prototype.pixelOffset;

/**
 * @param {number} lat
 * @param {number} lng
 * @param {boolean=} opt_noWrap
 * @constructor
 */
google.maps.LatLng = function(lat, lng, opt_noWrap) {};

/**
 * @param {google.maps.LatLng} other
 * @return {boolean}
 */
google.maps.LatLng.prototype.equals = function(other) {};

/**
 * @return {number}
 */
google.maps.LatLng.prototype.lat = function() {};

/**
 * @return {number}
 */
google.maps.LatLng.prototype.lng = function() {};

/**
 * @return {google.maps.LatLngLiteral}
 */
google.maps.LatLng.prototype.toJSON = function() {};

/**
 * @return {string}
 */
google.maps.LatLng.prototype.toString = function() {};

/**
 * @param {number=} opt_precision
 * @return {string}
 */
google.maps.LatLng.prototype.toUrlValue = function(opt_precision) {};

/**
 * @param {(google.maps.LatLng|google.maps.LatLngLiteral)=} opt_sw
 * @param {(google.maps.LatLng|google.maps.LatLngLiteral)=} opt_ne
 * @constructor
 */
google.maps.LatLngBounds = function(opt_sw, opt_ne) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.contains = function(latLng) {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} other
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.equals = function(other) {};

/**
 * @param {google.maps.LatLng} point
 * @return {google.maps.LatLngBounds}
 */
google.maps.LatLngBounds.prototype.extend = function(point) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getNorthEast = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getSouthWest = function() {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} other
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.intersects = function(other) {};

/**
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.isEmpty = function() {};

/**
 * @return {google.maps.LatLngBoundsLiteral}
 */
google.maps.LatLngBounds.prototype.toJSON = function() {};

/**
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.toSpan = function() {};

/**
 * @return {string}
 */
google.maps.LatLngBounds.prototype.toString = function() {};

/**
 * @param {number=} opt_precision
 * @return {string}
 */
google.maps.LatLngBounds.prototype.toUrlValue = function(opt_precision) {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} other
 * @return {google.maps.LatLngBounds}
 */
google.maps.LatLngBounds.prototype.union = function(other) {};

/**
 * @interface
 */
google.maps.LatLngBoundsLiteral = function() {};

/**
 * @type {number}
 */
google.maps.LatLngBoundsLiteral.prototype.east;

/**
 * @type {number}
 */
google.maps.LatLngBoundsLiteral.prototype.north;

/**
 * @type {number}
 */
google.maps.LatLngBoundsLiteral.prototype.south;

/**
 * @type {number}
 */
google.maps.LatLngBoundsLiteral.prototype.west;

/**
 * @interface
 */
google.maps.LatLngLiteral = function() {};

/**
 * @type {number}
 */
google.maps.LatLngLiteral.prototype.lat;

/**
 * @type {number}
 */
google.maps.LatLngLiteral.prototype.lng;

/**
 * @interface
 */
google.maps.LocationElevationRequest = function() {};

/**
 * @type {Array<google.maps.LatLng>}
 */
google.maps.LocationElevationRequest.prototype.locations;

/**
 * @param {Array=} opt_array
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MVCArray = function(opt_array) {};

/**
 * @return {undefined}
 */
google.maps.MVCArray.prototype.clear = function() {};

/**
 * @param {function(?, number)} callback
 * @return {undefined}
 */
google.maps.MVCArray.prototype.forEach = function(callback) {};

/**
 * @nosideeffects
 * @return {Array}
 */
google.maps.MVCArray.prototype.getArray = function() {};

/**
 * @param {number} i
 * @return {?}
 */
google.maps.MVCArray.prototype.getAt = function(i) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.MVCArray.prototype.getLength = function() {};

/**
 * @param {number} i
 * @param {?} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.insertAt = function(i, elem) {};

/**
 * @return {?}
 */
google.maps.MVCArray.prototype.pop = function() {};

/**
 * @param {?} elem
 * @return {number}
 */
google.maps.MVCArray.prototype.push = function(elem) {};

/**
 * @param {number} i
 * @return {?}
 */
google.maps.MVCArray.prototype.removeAt = function(i) {};

/**
 * @param {number} i
 * @param {?} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.setAt = function(i, elem) {};

/**
 * @constructor
 */
google.maps.MVCObject = function() {};

/**
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.MVCObject.prototype.addListener = function(eventName, handler) {};

/**
 * @param {string} key
 * @param {google.maps.MVCObject} target
 * @param {?string=} opt_targetKey
 * @param {boolean=} opt_noNotify
 * @return {undefined}
 */
google.maps.MVCObject.prototype.bindTo = function(key, target, opt_targetKey, opt_noNotify) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.changed = function(key) {};

/**
 * @param {string} key
 * @return {?}
 */
google.maps.MVCObject.prototype.get = function(key) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.notify = function(key) {};

/**
 * @param {string} key
 * @param {?} value
 * @return {undefined}
 */
google.maps.MVCObject.prototype.set = function(key, value) {};

/**
 * @param {Object|undefined} values
 * @return {undefined}
 */
google.maps.MVCObject.prototype.setValues = function(values) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.unbind = function(key) {};

/**
 * @return {undefined}
 */
google.maps.MVCObject.prototype.unbindAll = function() {};

/**
 * @param {Element} mapDiv
 * @param {(google.maps.MapOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Map = function(mapDiv, opt_opts) {};

/**
 * @type {Array<google.maps.MVCArray<Node>>}
 */
google.maps.Map.prototype.controls;

/**
 * @type {google.maps.Data}
 */
google.maps.Map.prototype.data;

/**
 * @type {google.maps.MapTypeRegistry}
 */
google.maps.Map.prototype.mapTypes;

/**
 * @type {google.maps.MVCArray<google.maps.MapType>}
 */
google.maps.Map.prototype.overlayMapTypes;

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} bounds
 * @return {undefined}
 */
google.maps.Map.prototype.fitBounds = function(bounds) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Map.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Map.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {Element}
 */
google.maps.Map.prototype.getDiv = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getHeading = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapTypeId|string}
 */
google.maps.Map.prototype.getMapTypeId = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Projection}
 */
google.maps.Map.prototype.getProjection = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPanorama}
 */
google.maps.Map.prototype.getStreetView = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getTilt = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getZoom = function() {};

/**
 * @param {number} x
 * @param {number} y
 * @return {undefined}
 */
google.maps.Map.prototype.panBy = function(x, y) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @return {undefined}
 */
google.maps.Map.prototype.panTo = function(latLng) {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} latLngBounds
 * @return {undefined}
 */
google.maps.Map.prototype.panToBounds = function(latLngBounds) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @return {undefined}
 */
google.maps.Map.prototype.setCenter = function(latlng) {};

/**
 * @param {number} heading
 * @return {undefined}
 */
google.maps.Map.prototype.setHeading = function(heading) {};

/**
 * @param {google.maps.MapTypeId|string} mapTypeId
 * @return {undefined}
 */
google.maps.Map.prototype.setMapTypeId = function(mapTypeId) {};

/**
 * @param {google.maps.MapOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Map.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.StreetViewPanorama} panorama
 * @return {undefined}
 */
google.maps.Map.prototype.setStreetView = function(panorama) {};

/**
 * @param {number} tilt
 * @return {undefined}
 */
google.maps.Map.prototype.setTilt = function(tilt) {};

/**
 * @param {number} zoom
 * @return {undefined}
 */
google.maps.Map.prototype.setZoom = function(zoom) {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MapCanvasProjection = function() {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromContainerPixelToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromDivPixelToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
google.maps.MapCanvasProjection.prototype.fromLatLngToContainerPixel = function(latLng) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
google.maps.MapCanvasProjection.prototype.fromLatLngToDivPixel = function(latLng) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.MapCanvasProjection.prototype.getWorldWidth = function() {};

/**
 * @interface
 */
google.maps.MapOptions = function() {};

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.backgroundColor;

/**
 * @type {google.maps.LatLng}
 */
google.maps.MapOptions.prototype.center;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.disableDefaultUI;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.disableDoubleClickZoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.draggable;

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.draggableCursor;

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.draggingCursor;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.fullscreenControl;

/**
 * @type {google.maps.FullscreenControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.fullscreenControlOptions;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.heading;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.keyboardShortcuts;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.mapMaker;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.mapTypeControl;

/**
 * @type {google.maps.MapTypeControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.mapTypeControlOptions;

/**
 * @type {google.maps.MapTypeId}
 */
google.maps.MapOptions.prototype.mapTypeId;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.minZoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.noClear;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.overviewMapControl;

/**
 * @type {google.maps.OverviewMapControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.overviewMapControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.panControl;

/**
 * @type {google.maps.PanControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.panControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.rotateControl;

/**
 * @type {google.maps.RotateControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.rotateControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.scaleControl;

/**
 * @type {google.maps.ScaleControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.scaleControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.scrollwheel;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.signInControl;

/**
 * @type {google.maps.StreetViewPanorama}
 */
google.maps.MapOptions.prototype.streetView;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.streetViewControl;

/**
 * @type {google.maps.StreetViewControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.streetViewControlOptions;

/**
 * @type {Array<google.maps.MapTypeStyle>}
 */
google.maps.MapOptions.prototype.styles;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.tilt;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.zoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.zoomControl;

/**
 * @type {google.maps.ZoomControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.zoomControlOptions;

/**
 * @constructor
 */
google.maps.MapPanes = function() {};

/**
 * @type {Element}
 */
google.maps.MapPanes.prototype.floatPane;

/**
 * @type {Element}
 */
google.maps.MapPanes.prototype.mapPane;

/**
 * @type {Element}
 */
google.maps.MapPanes.prototype.markerLayer;

/**
 * @type {Element}
 */
google.maps.MapPanes.prototype.overlayLayer;

/**
 * @type {Element}
 */
google.maps.MapPanes.prototype.overlayMouseTarget;

/**
 * @interface
 */
google.maps.MapType = function() {};

/**
 * @type {string}
 */
google.maps.MapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.MapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.MapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.MapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.MapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.MapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.MapType.prototype.tileSize;

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Document} ownerDocument
 * @return {Node}
 */
google.maps.MapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

/**
 * @param {Node} tile
 * @return {undefined}
 */
google.maps.MapType.prototype.releaseTile = function(tile) {};

/**
 * @interface
 */
google.maps.MapTypeControlOptions = function() {};

/**
 * @type {Array<google.maps.MapTypeId|string>}
 */
google.maps.MapTypeControlOptions.prototype.mapTypeIds;

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.MapTypeControlOptions.prototype.position;

/**
 * @type {google.maps.MapTypeControlStyle}
 */
google.maps.MapTypeControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.MapTypeControlStyle = {
  DEFAULT: 0,
  DROPDOWN_MENU: 1,
  HORIZONTAL_BAR: 2
};

/**
 * @enum {string}
 */
google.maps.MapTypeId = {
  HYBRID: '0',
  ROADMAP: '1',
  SATELLITE: '2',
  TERRAIN: '3'
};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MapTypeRegistry = function() {};

/**
 * @param {string} id
 * @param {google.maps.MapType|undefined} mapType
 * @return {undefined}
 * @override
 */
google.maps.MapTypeRegistry.prototype.set = function(id, mapType) {};

/**
 * @interface
 */
google.maps.MapTypeStyle = function() {};

/**
 * @type {string}
 */
google.maps.MapTypeStyle.prototype.elementType;

/**
 * @type {string}
 */
google.maps.MapTypeStyle.prototype.featureType;

/**
 * @type {Array<google.maps.MapTypeStyler>}
 */
google.maps.MapTypeStyle.prototype.stylers;

/**
 * @interface
 */
google.maps.MapTypeStyler = function() {};

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.color;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.gamma;

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.hue;

/**
 * @type {boolean}
 */
google.maps.MapTypeStyler.prototype.invert_lightness;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.lightness;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.saturation;

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.visibility;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.weight;

/**
 * @constructor
 */
google.maps.MapsEventListener = function() {};

/**
 * @return {undefined}
 */
google.maps.MapsEventListener.prototype.remove = function() {};

/**
 * @param {(google.maps.MarkerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Marker = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {?google.maps.Animation}
 */
google.maps.Marker.prototype.getAnimation = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Attribution}
 */
google.maps.Marker.prototype.getAttribution = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getClickable = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Marker.prototype.getCursor = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.Marker.prototype.getIcon = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MarkerLabel}
 */
google.maps.Marker.prototype.getLabel = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.Marker.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Marker.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MarkerPlace}
 */
google.maps.Marker.prototype.getPlace = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Marker.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MarkerShape}
 */
google.maps.Marker.prototype.getShape = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Marker.prototype.getTitle = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getVisible = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Marker.prototype.getZIndex = function() {};

/**
 * @param {?google.maps.Animation} animation
 * @return {undefined}
 */
google.maps.Marker.prototype.setAnimation = function(animation) {};

/**
 * @param {google.maps.Attribution} attribution
 * @return {undefined}
 */
google.maps.Marker.prototype.setAttribution = function(attribution) {};

/**
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setClickable = function(flag) {};

/**
 * @param {string} cursor
 * @return {undefined}
 */
google.maps.Marker.prototype.setCursor = function(cursor) {};

/**
 * @param {?boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setDraggable = function(flag) {};

/**
 * @param {string|google.maps.Icon|google.maps.Symbol} icon
 * @return {undefined}
 */
google.maps.Marker.prototype.setIcon = function(icon) {};

/**
 * @param {string|google.maps.MarkerLabel} label
 * @return {undefined}
 */
google.maps.Marker.prototype.setLabel = function(label) {};

/**
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @return {undefined}
 */
google.maps.Marker.prototype.setMap = function(map) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.Marker.prototype.setOpacity = function(opacity) {};

/**
 * @param {google.maps.MarkerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Marker.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MarkerPlace} place
 * @return {undefined}
 */
google.maps.Marker.prototype.setPlace = function(place) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @return {undefined}
 */
google.maps.Marker.prototype.setPosition = function(latlng) {};

/**
 * @param {google.maps.MarkerShape} shape
 * @return {undefined}
 */
google.maps.Marker.prototype.setShape = function(shape) {};

/**
 * @param {string} title
 * @return {undefined}
 */
google.maps.Marker.prototype.setTitle = function(title) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Marker.prototype.setVisible = function(visible) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.Marker.prototype.setZIndex = function(zIndex) {};

/**
 * @constant
 * @type {number|string}
 */
google.maps.Marker.MAX_ZINDEX;

/**
 * @interface
 */
google.maps.MarkerLabel = function() {};

/**
 * @type {string}
 */
google.maps.MarkerLabel.prototype.color;

/**
 * @type {string}
 */
google.maps.MarkerLabel.prototype.fontFamily;

/**
 * @type {string}
 */
google.maps.MarkerLabel.prototype.fontSize;

/**
 * @type {string}
 */
google.maps.MarkerLabel.prototype.fontWeight;

/**
 * @type {string}
 */
google.maps.MarkerLabel.prototype.text;

/**
 * @interface
 */
google.maps.MarkerOptions = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.MarkerOptions.prototype.anchorPoint;

/**
 * @type {google.maps.Animation}
 */
google.maps.MarkerOptions.prototype.animation;

/**
 * @type {google.maps.Attribution}
 */
google.maps.MarkerOptions.prototype.attribution;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.crossOnDrag;

/**
 * @type {string}
 */
google.maps.MarkerOptions.prototype.cursor;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.draggable;

/**
 * @type {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.MarkerOptions.prototype.icon;

/**
 * @type {string|google.maps.MarkerLabel}
 */
google.maps.MarkerOptions.prototype.label;

/**
 * @type {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.MarkerOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.MarkerOptions.prototype.opacity;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.optimized;

/**
 * @type {google.maps.MarkerPlace}
 */
google.maps.MarkerOptions.prototype.place;

/**
 * @type {google.maps.LatLng}
 */
google.maps.MarkerOptions.prototype.position;

/**
 * @type {google.maps.MarkerShape}
 */
google.maps.MarkerOptions.prototype.shape;

/**
 * @type {string}
 */
google.maps.MarkerOptions.prototype.title;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.MarkerOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.MarkerPlace = function() {};

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.MarkerPlace.prototype.location;

/**
 * @type {string}
 */
google.maps.MarkerPlace.prototype.placeId;

/**
 * @type {string}
 */
google.maps.MarkerPlace.prototype.query;

/**
 * @interface
 */
google.maps.MarkerShape = function() {};

/**
 * @type {Array<number>}
 */
google.maps.MarkerShape.prototype.coords;

/**
 * @type {string}
 */
google.maps.MarkerShape.prototype.type;

/**
 * @interface
 */
google.maps.MaxZoomResult = function() {};

/**
 * @type {google.maps.MaxZoomStatus}
 */
google.maps.MaxZoomResult.prototype.status;

/**
 * @type {number}
 */
google.maps.MaxZoomResult.prototype.zoom;

/**
 * @constructor
 */
google.maps.MaxZoomService = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @param {function(google.maps.MaxZoomResult)} callback
 * @return {undefined}
 */
google.maps.MaxZoomService.prototype.getMaxZoomAtLatLng = function(latlng, callback) {};

/**
 * @enum {string}
 */
google.maps.MaxZoomStatus = {
  ERROR: '0',
  OK: '1'
};

/**
 * @constructor
 */
google.maps.MouseEvent = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.MouseEvent.prototype.latLng;

/**
 * @return {undefined}
 */
google.maps.MouseEvent.prototype.stop = function() {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.OverlayView = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.draw = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.OverlayView.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapPanes}
 */
google.maps.OverlayView.prototype.getPanes = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapCanvasProjection}
 */
google.maps.OverlayView.prototype.getProjection = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.onAdd = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.onRemove = function() {};

/**
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @return {undefined}
 */
google.maps.OverlayView.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.OverviewMapControlOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.OverviewMapControlOptions.prototype.opened;

/**
 * @interface
 */
google.maps.PanControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.PanControlOptions.prototype.position;

/**
 * @interface
 */
google.maps.PathElevationRequest = function() {};

/**
 * @type {Array<google.maps.LatLng>}
 */
google.maps.PathElevationRequest.prototype.path;

/**
 * @type {number}
 */
google.maps.PathElevationRequest.prototype.samples;

/**
 * @interface
 */
google.maps.Place = function() {};

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.Place.prototype.location;

/**
 * @type {string}
 */
google.maps.Place.prototype.placeId;

/**
 * @type {string}
 */
google.maps.Place.prototype.query;

/**
 * @param {number} x
 * @param {number} y
 * @constructor
 */
google.maps.Point = function(x, y) {};

/**
 * @type {number}
 */
google.maps.Point.prototype.x;

/**
 * @type {number}
 */
google.maps.Point.prototype.y;

/**
 * @param {google.maps.Point} other
 * @return {boolean}
 */
google.maps.Point.prototype.equals = function(other) {};

/**
 * @return {string}
 */
google.maps.Point.prototype.toString = function() {};

/**
 * @extends {google.maps.MouseEvent}
 * @constructor
 */
google.maps.PolyMouseEvent = function() {};

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.edge;

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.path;

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.vertex;

/**
 * @param {(google.maps.PolygonOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polygon = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Polygon.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray<google.maps.LatLng>}
 */
google.maps.Polygon.prototype.getPath = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>}
 */
google.maps.Polygon.prototype.getPaths = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getVisible = function() {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Polygon.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Polygon.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Polygon.prototype.setMap = function(map) {};

/**
 * @param {google.maps.PolygonOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Polygon.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray<google.maps.LatLng>|Array<google.maps.LatLng|google.maps.LatLngLiteral>} path
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPath = function(path) {};

/**
 * @param {google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>|google.maps.MVCArray<google.maps.LatLng>|Array<Array<google.maps.LatLng|google.maps.LatLngLiteral>>|Array<google.maps.LatLng|google.maps.LatLngLiteral>} paths
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPaths = function(paths) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Polygon.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.PolygonOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.PolygonOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.fillOpacity;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.geodesic;

/**
 * @type {google.maps.Map}
 */
google.maps.PolygonOptions.prototype.map;

/**
 * @type {google.maps.MVCArray<google.maps.MVCArray<google.maps.LatLng>>|google.maps.MVCArray<google.maps.LatLng>|Array<Array<google.maps.LatLng|google.maps.LatLngLiteral>>|Array<google.maps.LatLng|google.maps.LatLngLiteral>}
 */
google.maps.PolygonOptions.prototype.paths;

/**
 * @type {string}
 */
google.maps.PolygonOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.PolygonOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.zIndex;

/**
 * @param {(google.maps.PolylineOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polyline = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Polyline.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray<google.maps.LatLng>}
 */
google.maps.Polyline.prototype.getPath = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getVisible = function() {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Polyline.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Polyline.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Polyline.prototype.setMap = function(map) {};

/**
 * @param {google.maps.PolylineOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Polyline.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray<google.maps.LatLng>|Array<google.maps.LatLng|google.maps.LatLngLiteral>} path
 * @return {undefined}
 */
google.maps.Polyline.prototype.setPath = function(path) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Polyline.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.PolylineOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.editable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.geodesic;

/**
 * @type {Array<google.maps.IconSequence>}
 */
google.maps.PolylineOptions.prototype.icons;

/**
 * @type {google.maps.Map}
 */
google.maps.PolylineOptions.prototype.map;

/**
 * @type {google.maps.MVCArray<google.maps.LatLng>|Array<google.maps.LatLng|google.maps.LatLngLiteral>}
 */
google.maps.PolylineOptions.prototype.path;

/**
 * @type {string}
 */
google.maps.PolylineOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.Projection = function() {};

/**
 * @param {google.maps.LatLng} latLng
 * @param {google.maps.Point=} opt_point
 * @return {google.maps.Point}
 */
google.maps.Projection.prototype.fromLatLngToPoint = function(latLng, opt_point) {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.Projection.prototype.fromPointToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {(google.maps.RectangleOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Rectangle = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Rectangle.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Rectangle.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getVisible = function() {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} bounds
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setBounds = function(bounds) {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setMap = function(map) {};

/**
 * @param {google.maps.RectangleOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setOptions = function(options) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.RectangleOptions = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.RectangleOptions.prototype.bounds;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.RectangleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.fillOpacity;

/**
 * @type {google.maps.Map}
 */
google.maps.RectangleOptions.prototype.map;

/**
 * @type {string}
 */
google.maps.RectangleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.RectangleOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.RotateControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.RotateControlOptions.prototype.position;

/**
 * @param {Node} container
 * @param {(google.maps.SaveWidgetOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.SaveWidget = function(container, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.Attribution}
 */
google.maps.SaveWidget.prototype.getAttribution = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MarkerPlace}
 */
google.maps.SaveWidget.prototype.getPlace = function() {};

/**
 * @param {google.maps.Attribution} attribution
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setAttribution = function(attribution) {};

/**
 * @param {google.maps.SaveWidgetOptions|Object.<string>} opts
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setOptions = function(opts) {};

/**
 * @param {google.maps.MarkerPlace} place
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setPlace = function(place) {};

/**
 * @interface
 */
google.maps.SaveWidgetOptions = function() {};

/**
 * @type {google.maps.Attribution}
 */
google.maps.SaveWidgetOptions.prototype.attribution;

/**
 * @type {google.maps.MarkerPlace}
 */
google.maps.SaveWidgetOptions.prototype.place;

/**
 * @interface
 */
google.maps.ScaleControlOptions = function() {};

/**
 * @type {google.maps.ScaleControlStyle}
 */
google.maps.ScaleControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.ScaleControlStyle = {
  DEFAULT: 0
};

/**
 * @param {number} width
 * @param {number} height
 * @param {string=} opt_widthUnit
 * @param {string=} opt_heightUnit
 * @constructor
 */
google.maps.Size = function(width, height, opt_widthUnit, opt_heightUnit) {};

/**
 * @type {number}
 */
google.maps.Size.prototype.height;

/**
 * @type {number}
 */
google.maps.Size.prototype.width;

/**
 * @param {google.maps.Size} other
 * @return {boolean}
 */
google.maps.Size.prototype.equals = function(other) {};

/**
 * @return {string}
 */
google.maps.Size.prototype.toString = function() {};

/**
 * @interface
 */
google.maps.StreetViewAddressControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewAddressControlOptions.prototype.position;

/**
 * @interface
 */
google.maps.StreetViewControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewControlOptions.prototype.position;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StreetViewCoverageLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.StreetViewCoverageLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.StreetViewCoverageLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.StreetViewLink = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewLink.prototype.description;

/**
 * @type {number}
 */
google.maps.StreetViewLink.prototype.heading;

/**
 * @type {string}
 */
google.maps.StreetViewLink.prototype.pano;

/**
 * @interface
 */
google.maps.StreetViewLocation = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.description;

/**
 * @type {google.maps.LatLng}
 */
google.maps.StreetViewLocation.prototype.latLng;

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.pano;

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.shortDescription;

/**
 * @interface
 */
google.maps.StreetViewLocationRequest = function() {};

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.StreetViewLocationRequest.prototype.location;

/**
 * @type {google.maps.StreetViewPreference}
 */
google.maps.StreetViewLocationRequest.prototype.preference;

/**
 * @type {number}
 */
google.maps.StreetViewLocationRequest.prototype.radius;

/**
 * @type {google.maps.StreetViewSource}
 */
google.maps.StreetViewLocationRequest.prototype.source;

/**
 * @interface
 */
google.maps.StreetViewPanoRequest = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewPanoRequest.prototype.pano;

/**
 * @param {Element} container
 * @param {(google.maps.StreetViewPanoramaOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StreetViewPanorama = function(container, opt_opts) {};

/**
 * @type {Array<google.maps.MVCArray<Node>>}
 */
google.maps.StreetViewPanorama.prototype.controls;

/**
 * @nosideeffects
 * @return {Array<google.maps.StreetViewLink>}
 */
google.maps.StreetViewPanorama.prototype.getLinks = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewLocation}
 */
google.maps.StreetViewPanorama.prototype.getLocation = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.StreetViewPanorama.prototype.getPano = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanorama.prototype.getPhotographerPov = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.StreetViewPanorama.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanorama.prototype.getPov = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewStatus}
 */
google.maps.StreetViewPanorama.prototype.getStatus = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.StreetViewPanorama.prototype.getVisible = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.StreetViewPanorama.prototype.getZoom = function() {};

/**
 * @param {function(string):google.maps.StreetViewPanoramaData} provider
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.registerPanoProvider = function(provider) {};

/**
 * @param {Array<google.maps.StreetViewLink>} links
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setLinks = function(links) {};

/**
 * @param {google.maps.StreetViewPanoramaOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setOptions = function(options) {};

/**
 * @param {string} pano
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPano = function(pano) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPosition = function(latLng) {};

/**
 * @param {google.maps.StreetViewPov} pov
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPov = function(pov) {};

/**
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setVisible = function(flag) {};

/**
 * @param {number} zoom
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setZoom = function(zoom) {};

/**
 * @interface
 */
google.maps.StreetViewPanoramaData = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaData.prototype.copyright;

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaData.prototype.imageDate;

/**
 * @type {Array<google.maps.StreetViewLink>}
 */
google.maps.StreetViewPanoramaData.prototype.links;

/**
 * @type {google.maps.StreetViewLocation}
 */
google.maps.StreetViewPanoramaData.prototype.location;

/**
 * @type {google.maps.StreetViewTileData}
 */
google.maps.StreetViewPanoramaData.prototype.tiles;

/**
 * @interface
 */
google.maps.StreetViewPanoramaOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControl;

/**
 * @type {google.maps.StreetViewAddressControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControlOptions;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.clickToGo;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.disableDefaultUI;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.disableDoubleClickZoom;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.enableCloseButton;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.fullscreenControl;

/**
 * @type {google.maps.FullscreenControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.fullscreenControlOptions;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.imageDateControl;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.linksControl;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControl;

/**
 * @type {google.maps.PanControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControlOptions;

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaOptions.prototype.pano;

/**
 * @type {function(string): google.maps.StreetViewPanoramaData}
 */
google.maps.StreetViewPanoramaOptions.prototype.panoProvider;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.StreetViewPanoramaOptions.prototype.position;

/**
 * @type {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanoramaOptions.prototype.pov;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.scrollwheel;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.visible;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.zoomControl;

/**
 * @type {google.maps.ZoomControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.zoomControlOptions;

/**
 * @constructor
 */
google.maps.StreetViewPov = function() {};

/**
 * @type {number}
 */
google.maps.StreetViewPov.prototype.heading;

/**
 * @type {number}
 */
google.maps.StreetViewPov.prototype.pitch;

/**
 * @enum {string}
 */
google.maps.StreetViewPreference = {
  BEST: '0',
  NEAREST: '1'
};

/**
 * @constructor
 */
google.maps.StreetViewService = function() {};

/**
 * @param {google.maps.StreetViewLocationRequest|google.maps.StreetViewPanoRequest|Object.<string>} request
 * @param {function(google.maps.StreetViewPanoramaData, google.maps.StreetViewStatus)} callback
 * @return {undefined}
 */
google.maps.StreetViewService.prototype.getPanorama = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.StreetViewSource = {
  DEFAULT: '0',
  OUTDOOR: '1'
};

/**
 * @enum {string}
 */
google.maps.StreetViewStatus = {
  OK: '0',
  UNKNOWN_ERROR: '1',
  ZERO_RESULTS: '2'
};

/**
 * @interface
 */
google.maps.StreetViewTileData = function() {};

/**
 * @type {number}
 */
google.maps.StreetViewTileData.prototype.centerHeading;

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.tileSize;

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.worldSize;

/**
 * @param {string} pano
 * @param {number} tileZoom
 * @param {number} tileX
 * @param {number} tileY
 * @return {string}
 */
google.maps.StreetViewTileData.prototype.getTileUrl = function(pano, tileZoom, tileX, tileY) {};

/**
 * @enum {number}
 */
google.maps.StrokePosition = {
  CENTER: 0,
  INSIDE: 1,
  OUTSIDE: 2
};

/**
 * @param {Array<google.maps.MapTypeStyle>} styles
 * @param {(google.maps.StyledMapTypeOptions|Object.<string>)=} opt_options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StyledMapType = function(styles, opt_options) {};

/**
 * @type {string}
 */
google.maps.StyledMapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.StyledMapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.StyledMapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.StyledMapType.prototype.tileSize;

/**
 * @interface
 */
google.maps.StyledMapTypeOptions = function() {};

/**
 * @type {string}
 */
google.maps.StyledMapTypeOptions.prototype.alt;

/**
 * @type {number}
 */
google.maps.StyledMapTypeOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.StyledMapTypeOptions.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.StyledMapTypeOptions.prototype.name;

/**
 * @interface
 */
google.maps.Symbol = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.Symbol.prototype.anchor;

/**
 * @type {string}
 */
google.maps.Symbol.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.fillOpacity;

/**
 * @type {google.maps.Point}
 */
google.maps.Symbol.prototype.labelOrigin;

/**
 * @type {google.maps.SymbolPath|string}
 */
google.maps.Symbol.prototype.path;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.rotation;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.scale;

/**
 * @type {string}
 */
google.maps.Symbol.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.strokeWeight;

/**
 * @enum {number}
 */
google.maps.SymbolPath = {
  BACKWARD_CLOSED_ARROW: 0,
  BACKWARD_OPEN_ARROW: 1,
  CIRCLE: 2,
  FORWARD_CLOSED_ARROW: 3,
  FORWARD_OPEN_ARROW: 4
};

/**
 * @interface
 */
google.maps.Time = function() {};

/**
 * @type {string}
 */
google.maps.Time.prototype.text;

/**
 * @type {string}
 */
google.maps.Time.prototype.time_zone;

/**
 * @type {Date}
 */
google.maps.Time.prototype.value;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.TrafficLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.TrafficLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.TrafficLayer.prototype.setMap = function(map) {};

/**
 * @enum {string}
 */
google.maps.TrafficModel = {
  BEST_GUESS: '0',
  OPTIMISTIC: '1',
  PESSIMISTIC: '2'
};

/**
 * @interface
 */
google.maps.TransitAgency = function() {};

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.phone;

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.url;

/**
 * @interface
 */
google.maps.TransitDetails = function() {};

/**
 * @type {google.maps.TransitStop}
 */
google.maps.TransitDetails.prototype.arrival_stop;

/**
 * @type {google.maps.Time}
 */
google.maps.TransitDetails.prototype.arrival_time;

/**
 * @type {google.maps.TransitStop}
 */
google.maps.TransitDetails.prototype.departure_stop;

/**
 * @type {google.maps.Time}
 */
google.maps.TransitDetails.prototype.departure_time;

/**
 * @type {string}
 */
google.maps.TransitDetails.prototype.headsign;

/**
 * @type {number}
 */
google.maps.TransitDetails.prototype.headway;

/**
 * @type {google.maps.TransitLine}
 */
google.maps.TransitDetails.prototype.line;

/**
 * @type {number}
 */
google.maps.TransitDetails.prototype.num_stops;

/**
 * @interface
 */
google.maps.TransitFare = function() {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.TransitLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.TransitLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.TransitLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.TransitLine = function() {};

/**
 * @type {Array<google.maps.TransitAgency>}
 */
google.maps.TransitLine.prototype.agencies;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.color;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.icon;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.short_name;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.text_color;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.url;

/**
 * @type {google.maps.TransitVehicle}
 */
google.maps.TransitLine.prototype.vehicle;

/**
 * @enum {string}
 */
google.maps.TransitMode = {
  BUS: '0',
  RAIL: '1',
  SUBWAY: '2',
  TRAIN: '3',
  TRAM: '4'
};

/**
 * @interface
 */
google.maps.TransitOptions = function() {};

/**
 * @type {Date}
 */
google.maps.TransitOptions.prototype.arrivalTime;

/**
 * @type {Date}
 */
google.maps.TransitOptions.prototype.departureTime;

/**
 * @type {Array<google.maps.TransitMode>}
 */
google.maps.TransitOptions.prototype.modes;

/**
 * @type {google.maps.TransitRoutePreference}
 */
google.maps.TransitOptions.prototype.routingPreference;

/**
 * @enum {string}
 */
google.maps.TransitRoutePreference = {
  FEWER_TRANSFERS: '0',
  LESS_WALKING: '1'
};

/**
 * @interface
 */
google.maps.TransitStop = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.TransitStop.prototype.location;

/**
 * @type {string}
 */
google.maps.TransitStop.prototype.name;

/**
 * @interface
 */
google.maps.TransitVehicle = function() {};

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.icon;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.local_icon;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.type;

/**
 * @enum {string}
 */
google.maps.TravelMode = {
  BICYCLING: '0',
  DRIVING: '1',
  TRANSIT: '2',
  WALKING: '3'
};

/**
 * @enum {number}
 */
google.maps.UnitSystem = {
  IMPERIAL: 0,
  METRIC: 1
};

/**
 * @interface
 */
google.maps.ZoomControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.ZoomControlOptions.prototype.position;

/**
 * @type {google.maps.ZoomControlStyle}
 */
google.maps.ZoomControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.ZoomControlStyle = {
  DEFAULT: 0,
  LARGE: 1,
  SMALL: 2
};

/** @const */
google.maps.drawing = {};

/**
 * @interface
 */
google.maps.drawing.DrawingControlOptions = function() {};

/**
 * @type {Array<google.maps.drawing.OverlayType>}
 */
google.maps.drawing.DrawingControlOptions.prototype.drawingModes;

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.drawing.DrawingControlOptions.prototype.position;

/**
 * @param {(google.maps.drawing.DrawingManagerOptions|Object.<string>)=} opt_options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.drawing.DrawingManager = function(opt_options) {};

/**
 * @nosideeffects
 * @return {?google.maps.drawing.OverlayType}
 */
google.maps.drawing.DrawingManager.prototype.getDrawingMode = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.drawing.DrawingManager.prototype.getMap = function() {};

/**
 * @param {?google.maps.drawing.OverlayType} drawingMode
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setDrawingMode = function(drawingMode) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setMap = function(map) {};

/**
 * @param {google.maps.drawing.DrawingManagerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.drawing.DrawingManagerOptions = function() {};

/**
 * @type {google.maps.CircleOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.circleOptions;

/**
 * @type {boolean}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControl;

/**
 * @type {google.maps.drawing.DrawingControlOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControlOptions;

/**
 * @type {google.maps.drawing.OverlayType}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingMode;

/**
 * @type {google.maps.Map}
 */
google.maps.drawing.DrawingManagerOptions.prototype.map;

/**
 * @type {google.maps.MarkerOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.markerOptions;

/**
 * @type {google.maps.PolygonOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polygonOptions;

/**
 * @type {google.maps.PolylineOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polylineOptions;

/**
 * @type {google.maps.RectangleOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.rectangleOptions;

/**
 * @constructor
 */
google.maps.drawing.OverlayCompleteEvent = function() {};

/**
 * @type {google.maps.Marker|google.maps.Polygon|google.maps.Polyline|google.maps.Rectangle|google.maps.Circle}
 */
google.maps.drawing.OverlayCompleteEvent.prototype.overlay;

/**
 * @type {google.maps.drawing.OverlayType}
 */
google.maps.drawing.OverlayCompleteEvent.prototype.type;

/**
 * @enum {string}
 */
google.maps.drawing.OverlayType = {
  CIRCLE: '0',
  MARKER: '1',
  POLYGON: '2',
  POLYLINE: '3',
  RECTANGLE: '4'
};

/** @const */
google.maps.event = {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @param {boolean=} opt_capture
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addDomListener = function(instance, eventName, handler, opt_capture) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @param {boolean=} opt_capture
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addDomListenerOnce = function(instance, eventName, handler, opt_capture) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addListener = function(instance, eventName, handler) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addListenerOnce = function(instance, eventName, handler) {};

/**
 * @param {Object} instance
 * @return {undefined}
 */
google.maps.event.clearInstanceListeners = function(instance) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @return {undefined}
 */
google.maps.event.clearListeners = function(instance, eventName) {};

/**
 * @param {google.maps.MapsEventListener} listener
 * @return {undefined}
 */
google.maps.event.removeListener = function(listener) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {...*} var_args
 * @return {undefined}
 */
google.maps.event.trigger = function(instance, eventName, var_args) {};

/** @const */
google.maps.geometry = {};

/** @const */
google.maps.geometry.encoding = {};

/**
 * @param {string} encodedPath
 * @return {Array<google.maps.LatLng>}
 */
google.maps.geometry.encoding.decodePath = function(encodedPath) {};

/**
 * @param {Array<google.maps.LatLng>|google.maps.MVCArray<google.maps.LatLng>} path
 * @return {string}
 */
google.maps.geometry.encoding.encodePath = function(path) {};

/** @const */
google.maps.geometry.poly = {};

/**
 * @param {google.maps.LatLng} point
 * @param {google.maps.Polygon} polygon
 * @return {boolean}
 */
google.maps.geometry.poly.containsLocation = function(point, polygon) {};

/**
 * @param {google.maps.LatLng} point
 * @param {google.maps.Polygon|google.maps.Polyline} poly
 * @param {number=} opt_tolerance
 * @return {boolean}
 */
google.maps.geometry.poly.isLocationOnEdge = function(point, poly, opt_tolerance) {};

/** @const */
google.maps.geometry.spherical = {};

/**
 * @param {Array<google.maps.LatLng>|google.maps.MVCArray<google.maps.LatLng>} path
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeArea = function(path, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeDistanceBetween = function(from, to, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @return {number}
 */
google.maps.geometry.spherical.computeHeading = function(from, to) {};

/**
 * @param {Array<google.maps.LatLng>|google.maps.MVCArray<google.maps.LatLng>} path
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeLength = function(path, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {number} distance
 * @param {number} heading
 * @param {number=} opt_radius
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.computeOffset = function(from, distance, heading, opt_radius) {};

/**
 * @param {google.maps.LatLng} to
 * @param {number} distance
 * @param {number} heading
 * @param {number=} opt_radius
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.computeOffsetOrigin = function(to, distance, heading, opt_radius) {};

/**
 * @param {Array<google.maps.LatLng>|google.maps.MVCArray<google.maps.LatLng>} loop
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeSignedArea = function(loop, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @param {number} fraction
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.interpolate = function(from, to, fraction) {};

/** @const */
google.maps.places = {};

/**
 * @param {HTMLInputElement} inputField
 * @param {(google.maps.places.AutocompleteOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.places.Autocomplete = function(inputField, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.places.Autocomplete.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.places.PlaceResult}
 */
google.maps.places.Autocomplete.prototype.getPlace = function() {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} bounds
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setBounds = function(bounds) {};

/**
 * @param {google.maps.places.ComponentRestrictions} restrictions
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setComponentRestrictions = function(restrictions) {};

/**
 * @param {Array<string>} types
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setTypes = function(types) {};

/**
 * @interface
 */
google.maps.places.AutocompleteOptions = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.AutocompleteOptions.prototype.bounds;

/**
 * @type {google.maps.places.ComponentRestrictions}
 */
google.maps.places.AutocompleteOptions.prototype.componentRestrictions;

/**
 * @type {Array<string>}
 */
google.maps.places.AutocompleteOptions.prototype.types;

/**
 * @interface
 */
google.maps.places.AutocompletePrediction = function() {};

/**
 * @type {string}
 */
google.maps.places.AutocompletePrediction.prototype.description;

/**
 * @type {Array<google.maps.places.PredictionSubstring>}
 */
google.maps.places.AutocompletePrediction.prototype.matched_substrings;

/**
 * @type {string}
 */
google.maps.places.AutocompletePrediction.prototype.place_id;

/**
 * @type {Array<google.maps.places.PredictionTerm>}
 */
google.maps.places.AutocompletePrediction.prototype.terms;

/**
 * @type {Array<string>}
 */
google.maps.places.AutocompletePrediction.prototype.types;

/**
 * @constructor
 */
google.maps.places.AutocompleteService = function() {};

/**
 * @param {google.maps.places.AutocompletionRequest|Object.<string>} request
 * @param {function(Array<google.maps.places.AutocompletePrediction>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.AutocompleteService.prototype.getPlacePredictions = function(request, callback) {};

/**
 * @param {google.maps.places.QueryAutocompletionRequest|Object.<string>} request
 * @param {function(Array<google.maps.places.QueryAutocompletePrediction>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.AutocompleteService.prototype.getQueryPredictions = function(request, callback) {};

/**
 * @interface
 */
google.maps.places.AutocompletionRequest = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.AutocompletionRequest.prototype.bounds;

/**
 * @type {google.maps.places.ComponentRestrictions}
 */
google.maps.places.AutocompletionRequest.prototype.componentRestrictions;

/**
 * @type {string}
 */
google.maps.places.AutocompletionRequest.prototype.input;

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.AutocompletionRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.AutocompletionRequest.prototype.offset;

/**
 * @type {number}
 */
google.maps.places.AutocompletionRequest.prototype.radius;

/**
 * @type {Array<string>}
 */
google.maps.places.AutocompletionRequest.prototype.types;

/**
 * @interface
 */
google.maps.places.ComponentRestrictions = function() {};

/**
 * @type {string}
 */
google.maps.places.ComponentRestrictions.prototype.country;

/**
 * @constructor
 */
google.maps.places.PhotoOptions = function() {};

/**
 * @type {number}
 */
google.maps.places.PhotoOptions.prototype.maxHeight;

/**
 * @type {number}
 */
google.maps.places.PhotoOptions.prototype.maxWidth;

/**
 * @constructor
 */
google.maps.places.PlaceAspectRating = function() {};

/**
 * @type {number}
 */
google.maps.places.PlaceAspectRating.prototype.rating;

/**
 * @type {string}
 */
google.maps.places.PlaceAspectRating.prototype.type;

/**
 * @interface
 */
google.maps.places.PlaceDetailsRequest = function() {};

/**
 * @type {string}
 */
google.maps.places.PlaceDetailsRequest.prototype.placeId;

/**
 * @interface
 */
google.maps.places.PlaceGeometry = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.PlaceGeometry.prototype.location;

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.PlaceGeometry.prototype.viewport;

/**
 * @interface
 */
google.maps.places.PlacePhoto = function() {};

/**
 * @type {number}
 */
google.maps.places.PlacePhoto.prototype.height;

/**
 * @type {Array<string>}
 */
google.maps.places.PlacePhoto.prototype.html_attributions;

/**
 * @type {number}
 */
google.maps.places.PlacePhoto.prototype.width;

/**
 * @param {google.maps.places.PhotoOptions|Object.<string>} opts
 * @return {string}
 */
google.maps.places.PlacePhoto.prototype.getUrl = function(opts) {};

/**
 * @interface
 */
google.maps.places.PlaceResult = function() {};

/**
 * @type {Array<google.maps.GeocoderAddressComponent>}
 */
google.maps.places.PlaceResult.prototype.address_components;

/**
 * @type {Array<google.maps.places.PlaceAspectRating>}
 */
google.maps.places.PlaceResult.prototype.aspects;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.formatted_address;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.formatted_phone_number;

/**
 * @type {google.maps.places.PlaceGeometry}
 */
google.maps.places.PlaceResult.prototype.geometry;

/**
 * @type {Array<string>}
 */
google.maps.places.PlaceResult.prototype.html_attributions;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.icon;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.international_phone_number;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.name;

/**
 * @type {boolean}
 */
google.maps.places.PlaceResult.prototype.permanently_closed;

/**
 * @type {Array<google.maps.places.PlacePhoto>}
 */
google.maps.places.PlaceResult.prototype.photos;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.place_id;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.price_level;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.rating;

/**
 * @type {Array<google.maps.places.PlaceReview>}
 */
google.maps.places.PlaceResult.prototype.reviews;

/**
 * @type {Array<string>}
 */
google.maps.places.PlaceResult.prototype.types;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.url;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.utc_offset;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.vicinity;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.website;

/**
 * @constructor
 */
google.maps.places.PlaceReview = function() {};

/**
 * @type {Array<google.maps.places.PlaceAspectRating>}
 */
google.maps.places.PlaceReview.prototype.aspects;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.author_name;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.author_url;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.language;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.text;

/**
 * @constructor
 */
google.maps.places.PlaceSearchPagination = function() {};

/**
 * @type {boolean}
 */
google.maps.places.PlaceSearchPagination.prototype.hasNextPage;

/**
 * @return {undefined}
 */
google.maps.places.PlaceSearchPagination.prototype.nextPage = function() {};

/**
 * @interface
 */
google.maps.places.PlaceSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.PlaceSearchRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.keyword;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.PlaceSearchRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.maxPriceLevel;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.minPriceLevel;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.name;

/**
 * @type {boolean}
 */
google.maps.places.PlaceSearchRequest.prototype.openNow;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.radius;

/**
 * @type {google.maps.places.RankBy}
 */
google.maps.places.PlaceSearchRequest.prototype.rankBy;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.type;

/**
 * @param {HTMLDivElement|google.maps.Map} attrContainer
 * @constructor
 */
google.maps.places.PlacesService = function(attrContainer) {};

/**
 * @param {google.maps.places.PlaceDetailsRequest|Object.<string>} request
 * @param {function(google.maps.places.PlaceResult, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.getDetails = function(request, callback) {};

/**
 * @param {google.maps.places.PlaceSearchRequest|Object.<string>} request
 * @param {function(Array<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus,
               google.maps.places.PlaceSearchPagination)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.nearbySearch = function(request, callback) {};

/**
 * @param {google.maps.places.RadarSearchRequest|Object.<string>} request
 * @param {function(Array<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.radarSearch = function(request, callback) {};

/**
 * @param {google.maps.places.TextSearchRequest|Object.<string>} request
 * @param {function(Array<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus,
   google.maps.places.PlaceSearchPagination)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.textSearch = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.places.PlacesServiceStatus = {
  INVALID_REQUEST: '0',
  OK: '1',
  OVER_QUERY_LIMIT: '2',
  REQUEST_DENIED: '3',
  UNKNOWN_ERROR: '4',
  ZERO_RESULTS: '5'
};

/**
 * @interface
 */
google.maps.places.PredictionSubstring = function() {};

/**
 * @type {number}
 */
google.maps.places.PredictionSubstring.prototype.length;

/**
 * @type {number}
 */
google.maps.places.PredictionSubstring.prototype.offset;

/**
 * @interface
 */
google.maps.places.PredictionTerm = function() {};

/**
 * @type {number}
 */
google.maps.places.PredictionTerm.prototype.offset;

/**
 * @type {string}
 */
google.maps.places.PredictionTerm.prototype.value;

/**
 * @interface
 */
google.maps.places.QueryAutocompletePrediction = function() {};

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletePrediction.prototype.description;

/**
 * @type {Array<google.maps.places.PredictionSubstring>}
 */
google.maps.places.QueryAutocompletePrediction.prototype.matched_substrings;

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletePrediction.prototype.place_id;

/**
 * @type {Array<google.maps.places.PredictionTerm>}
 */
google.maps.places.QueryAutocompletePrediction.prototype.terms;

/**
 * @interface
 */
google.maps.places.QueryAutocompletionRequest = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.QueryAutocompletionRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletionRequest.prototype.input;

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.QueryAutocompletionRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.QueryAutocompletionRequest.prototype.offset;

/**
 * @type {number}
 */
google.maps.places.QueryAutocompletionRequest.prototype.radius;

/**
 * @interface
 */
google.maps.places.RadarSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.RadarSearchRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.RadarSearchRequest.prototype.keyword;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.RadarSearchRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.places.RadarSearchRequest.prototype.name;

/**
 * @type {number}
 */
google.maps.places.RadarSearchRequest.prototype.radius;

/**
 * @type {string}
 */
google.maps.places.RadarSearchRequest.prototype.type;

/**
 * @enum {number}
 */
google.maps.places.RankBy = {
  DISTANCE: 0,
  PROMINENCE: 1
};

/**
 * @param {HTMLInputElement} inputField
 * @param {(google.maps.places.SearchBoxOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.places.SearchBox = function(inputField, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.places.SearchBox.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {Array<google.maps.places.PlaceResult>}
 */
google.maps.places.SearchBox.prototype.getPlaces = function() {};

/**
 * @param {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral} bounds
 * @return {undefined}
 */
google.maps.places.SearchBox.prototype.setBounds = function(bounds) {};

/**
 * @interface
 */
google.maps.places.SearchBoxOptions = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.SearchBoxOptions.prototype.bounds;

/**
 * @interface
 */
google.maps.places.TextSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral}
 */
google.maps.places.TextSearchRequest.prototype.bounds;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.TextSearchRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.places.TextSearchRequest.prototype.query;

/**
 * @type {number}
 */
google.maps.places.TextSearchRequest.prototype.radius;

/**
 * @type {string}
 */
google.maps.places.TextSearchRequest.prototype.type;

/** @const */
google.maps.visualization = {};

/**
 * @param {(google.maps.visualization.HeatmapLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.visualization.HeatmapLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray<google.maps.LatLng|google.maps.visualization.WeightedLocation>}
 */
google.maps.visualization.HeatmapLayer.prototype.getData = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.visualization.HeatmapLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.MVCArray<google.maps.LatLng|google.maps.visualization.WeightedLocation>|
    Array<google.maps.LatLng|google.maps.visualization.WeightedLocation>} data
 * @return {undefined}
 */
google.maps.visualization.HeatmapLayer.prototype.setData = function(data) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.visualization.HeatmapLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.visualization.HeatmapLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.visualization.HeatmapLayer.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.visualization.HeatmapLayerOptions = function() {};

/**
 * @type {google.maps.MVCArray<google.maps.LatLng>}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.data;

/**
 * @type {boolean}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.dissipating;

/**
 * @type {Array<string>}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.gradient;

/**
 * @type {google.maps.Map}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.maxIntensity;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.opacity;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.radius;

/**
 * @interface
 */
google.maps.visualization.WeightedLocation = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.visualization.WeightedLocation.prototype.location;

/**
 * @type {number}
 */
google.maps.visualization.WeightedLocation.prototype.weight;

/*
 * Copyright 2011 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for jQuery 1.9 - 1.11 & 2.0 - 2.1
 *
 * The jQuery API is identical for the 1.9.x+ and 2.0+ branches. In addition,
 * the API has not changed in releases since that date. These externs are valid
 * for all jQuery releases since 1.9 and 2.0.
 *
 * Note that some functions use different return types depending on the number
 * of parameters passed in. In these cases, you may need to annotate the type
 * of the result in your code, so the JSCompiler understands which type you're
 * expecting. For example:
 *    <code>var elt = /** @type {Element} * / (foo.get(0));</code>
 *
 * @see http://api.jquery.com/
 * @externs
 */

/**
 * @typedef {(Window|Document|Element|Array<Element>|string|jQuery|
 *     NodeList)}
 */
var jQuerySelector;

/** @typedef {function(...)|Array<function(...)>} */
var jQueryCallback;

/** @typedef {
              {
               accepts: (Object<string, string>|undefined),
               async: (?boolean|undefined),
               beforeSend: (function(jQuery.jqXHR, (jQueryAjaxSettings|Object<string, *>))|undefined),
               cache: (?boolean|undefined),
               complete: (function(jQuery.jqXHR, string)|undefined),
               contents: (Object<string, RegExp>|undefined),
               contentType: (?string|undefined),
               context: (Object<?, ?>|jQueryAjaxSettings|undefined),
               converters: (Object<string, Function>|undefined),
               crossDomain: (?boolean|undefined),
               data: (Object<?, ?>|?string|Array<?>|undefined),
               dataFilter: (function(string, string):?|undefined),
               dataType: (?string|undefined),
               error: (function(jQuery.jqXHR, string, string)|undefined),
               global: (?boolean|undefined),
               headers: (Object<?, ?>|undefined),
               ifModified: (?boolean|undefined),
               isLocal: (?boolean|undefined),
               jsonp: (?string|undefined),
               jsonpCallback: (?string|function()|undefined),
               mimeType: (?string|undefined),
               password: (?string|undefined),
               processData: (?boolean|undefined),
               scriptCharset: (?string|undefined),
               statusCode: (Object<number, function()>|undefined),
               success: (function(?, string, jQuery.jqXHR)|undefined),
               timeout: (?number|undefined),
               traditional: (?boolean|undefined),
               type: (?string|undefined),
               url: (?string|undefined),
               username: (?string|undefined),
               xhr: (function():(ActiveXObject|XMLHttpRequest)|undefined),
               xhrFields: (Object<?, ?>|undefined)
              }} */
var jQueryAjaxSettings;

/**
 * @constructor
 * @param {(jQuerySelector|Element|Object|Array<Element>|jQuery|string|
 *     function())=} arg1
 * @param {(Element|jQuery|Document|
 *     Object<string, (string|function(!jQuery.Event))>)=} arg2
 * @return {!jQuery}
 */
var jQuery = function(arg1, arg2) {};

/**
 * @typedef {jQuery}
 */
var $;

/**
 * @param {(jQuerySelector|Array<Element>|string|jQuery)} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.add = function(arg1, context) {};

/**
 * @param {(jQuerySelector|Array<Element>|string|jQuery)=} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.addBack = function(arg1) {};

/**
 * @param {(string|function(number,String))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.addClass = function(arg1) {};

/**
 * @param {(string|Element|jQuery|function(number))} arg1
 * @param {(string|Element|Array<Element>|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.after = function(arg1, content) {};

/**
 * @param {(string|jQueryAjaxSettings|Object<string,*>)} arg1
 * @param {(jQueryAjaxSettings|Object<string, *>)=} settings
 * @return {!jQuery.jqXHR}
 */
jQuery.ajax = function(arg1, settings) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxComplete = function(handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>),*)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxError = function(handler) {};

/**
 * @param {(string|function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR))} dataTypes
 * @param {function((jQueryAjaxSettings|Object<string, *>),(jQueryAjaxSettings|Object<string, *>),jQuery.jqXHR)=} handler
 */
jQuery.ajaxPrefilter = function(dataTypes, handler) {};

/**
 * @param {function(!jQuery.Event,jQuery.jqXHR,(jQueryAjaxSettings|Object<string, *>))} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSend = function(handler) {};

/** @const {jQueryAjaxSettings|Object<string, *>} */
jQuery.ajaxSettings;

/** @type {Object<string, boolean>} */
jQuery.ajaxSettings.flatOptions = {};

/** @type {boolean} */
jQuery.ajaxSettings.processData;

/** @type {Object<string, string>} */
jQuery.ajaxSettings.responseFields = {};

/** @param {jQueryAjaxSettings|Object<string, *>} options */
jQuery.ajaxSetup = function(options) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStart = function(handler) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxStop = function(handler) {};

/**
 * @param {function(!jQuery.Event,XMLHttpRequest,(jQueryAjaxSettings|Object<string, *>), ?)} handler
 * @return {!jQuery}
 */
jQuery.prototype.ajaxSuccess = function(handler) {};

/**
 * @deprecated Please use .addBack(selector) instead.
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.andSelf = function() {};

/**
 * @param {Object<string,*>} properties
 * @param {(string|number|function()|Object<string,*>)=} arg2
 * @param {(string|function())=} easing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.animate = function(properties, arg2, easing, complete) {};

/**
 * @param {(string|Element|Array<Element>|jQuery|function(number,string))} arg1
 * @param {...(string|Element|Array<Element>|jQuery)} content
 * @return {!jQuery}
 */
jQuery.prototype.append = function(arg1, content) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.appendTo = function(target) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,string))=} arg2
 * @return {(string|!jQuery)}
 */
jQuery.prototype.attr = function(arg1, arg2) {};

/**
 * @param {(string|Element|jQuery|function())} arg1
 * @param {(string|Element|Array<Element>|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.before = function(arg1, content) {};

/**
 * @param {(string|Object<string, function(!jQuery.Event)>)} arg1
 * @param {(Object<string, *>|function(!jQuery.Event)|boolean)=} eventData
 * @param {(function(!jQuery.Event)|boolean)=} arg3
 * @return {!jQuery}
 */
jQuery.prototype.bind = function(arg1, eventData, arg3) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.blur = function(arg1, handler) {};

/**
 * @constructor
 * @private
 */
jQuery.callbacks = function () {};

/**
 * @param {string=} flags
 * @return {!jQuery.callbacks}
 */
jQuery.Callbacks = function (flags) {};

/** @param {function()} callbacks */
jQuery.callbacks.prototype.add = function(callbacks) {};

/** @return {undefined} */
jQuery.callbacks.prototype.disable = function() {};

/** @return {undefined} */
jQuery.callbacks.prototype.empty = function() {};

/** @param {...*} var_args */
jQuery.callbacks.prototype.fire = function(var_args) {};

/** @return {boolean} */
jQuery.callbacks.prototype.fired = function() {};

/** @param {...*} var_args */
jQuery.callbacks.prototype.fireWith = function(var_args) {};

/**
 * @param {function()} callback
 * @return {boolean}
 * @nosideeffects
 */
jQuery.callbacks.prototype.has = function(callback) {};

/** @return {undefined} */
jQuery.callbacks.prototype.lock = function() {};

/** @return {boolean} */
jQuery.callbacks.prototype.locked = function() {};

/** @param {function()} callbacks */
jQuery.callbacks.prototype.remove = function(callbacks) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.change = function(arg1, handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.children = function(selector) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.clearQueue = function(queueName) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.click = function(arg1, handler) {};

/**
 * @param {boolean=} withDataAndEvents
 * @param {boolean=} deepWithDataAndEvents
 * @return {!jQuery}
 * @suppress {checkTypes} see https://code.google.com/p/closure-compiler/issues/detail?id=583
 */
jQuery.prototype.clone = function(withDataAndEvents, deepWithDataAndEvents) {};

/**
 * @param {(jQuerySelector|jQuery|Element|string)} arg1
 * @param {Element=} context
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.closest = function(arg1, context) {};

/**
 * @param {Element} container
 * @param {Element} contained
 * @return {boolean}
 */
jQuery.contains = function(container, contained) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.contents = function() {};

/** @type {Element|Document} */
jQuery.prototype.context;

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|function(number,*))=} arg2
 * @return {(string|!jQuery)}
 */
jQuery.prototype.css = function(arg1, arg2) {};

/** @type {Object<string, *>} */
jQuery.cssHooks;

/**
 * @param {Element} elem
 * @param {string=} key
 * @param {*=} value
 * @return {*}
 */
jQuery.data = function(elem, key, value) {};

/**
 * @param {(string|Object<string, *>)=} arg1
 * @param {*=} value
 * @return {*}
 */
jQuery.prototype.data = function(arg1, value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.dblclick = function(arg1, handler) {};

/**
 * @constructor
 * @implements {jQuery.Promise}
 * @param {function()=} opt_fn
 * @see http://api.jquery.com/category/deferred-object/
 */
jQuery.deferred = function(opt_fn) {};

/**
 * @constructor
 * @extends {jQuery.deferred}
 * @param {function()=} opt_fn
 * @return {!jQuery.Deferred}
 */
jQuery.Deferred = function(opt_fn) {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.always
    = function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} doneCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.done = function(doneCallbacks, doneCallbacks2) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @param {jQueryCallback=} failCallbacks2
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.fail = function(failCallbacks, failCallbacks2) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notify = function(var_args) {};

/**
 * @param {Object} context
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.notifyWith = function(context, var_args) {};

/**
 * @deprecated Please use deferred.then() instead.
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @param {jQueryCallback} progressCallbacks
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.progress = function(progressCallbacks) {};

/**
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.deferred.prototype.promise = function(target) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.reject = function(var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.rejectWith = function(context, args) {};

/**
 * @param {...*} var_args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolve = function(var_args) {};

/**
 * @param {Object} context
 * @param {Array<*>=} args
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.resolveWith = function(context, args) {};

/** @return {string} */
jQuery.deferred.prototype.state = function() {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.deferred}
 */
jQuery.deferred.prototype.then
    = function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {number} duration
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.delay = function(duration, queueName) {};

/**
 * @param {string} selector
 * @param {(string|Object<string,*>)} arg2
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg3
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.delegate = function(selector, arg2, arg3, handler) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 */
jQuery.dequeue = function(elem, queueName) {};

/**
 * @param {string=} queueName
 * @return {!jQuery}
 */
jQuery.prototype.dequeue = function(queueName) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 */
jQuery.prototype.detach = function(selector) {};

/**
 * @param {Object} collection
 * @param {function((number|string),?)} callback
 * @return {Object}
 */
jQuery.each = function(collection, callback) {};

/**
 * @param {function(number,Element)} fnc
 * @return {!jQuery}
 */
jQuery.prototype.each = function(fnc) {};


/** @return {!jQuery} */
jQuery.prototype.empty = function() {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.end = function() {};

/**
 * @param {number} arg1
 * @return {!jQuery}
 */
jQuery.prototype.eq = function(arg1) {};

/** @param {string} message */
jQuery.error = function(message) {};

/**
 * @deprecated Please use .on( "error", handler ) instead.
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.error = function(arg1, handler) {};

/** @const */
jQuery.event = {};

/** @type {Array<string>} */
jQuery.event.props;

/** @type {Object<string, Object>} */
jQuery.event.special;

/**
 * @constructor
 * @param {string} eventType
 * @param {Object=} properties
 * @return {!jQuery.Event}
 */
jQuery.Event = function(eventType, properties) {};

/** @type {boolean} */
jQuery.Event.prototype.altKey;

/** @type {boolean} */
jQuery.Event.prototype.bubbles;

/** @type {number} */
jQuery.Event.prototype.button;

/** @type {boolean} */
jQuery.Event.prototype.cancelable;

/** @type {string} */
jQuery.Event.prototype.charChode;

/** @type {number} */
jQuery.Event.prototype.clientX;

/** @type {number} */
jQuery.Event.prototype.clientY;

/** @type {boolean} */
jQuery.Event.prototype.ctrlKey;

/** @type {Element} */
jQuery.Event.prototype.currentTarget;

/** @type {Object<string, *>} */
jQuery.Event.prototype.data;

/** @type {Element} */
jQuery.Event.prototype.delegateTarget;

/** @type {number} */
jQuery.Event.prototype.detail;

/** @type {number} */
jQuery.Event.prototype.eventPhase;

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isDefaultPrevented = function() {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isImmediatePropagationStopped = function() {};

/**
 * @return {boolean}
 * @nosideeffects
 */
jQuery.Event.prototype.isPropagationStopped = function() {};

/** @type {boolean} */
jQuery.Event.prototype.metaKey;

/** @type {string} */
jQuery.Event.prototype.namespace;

/** @type {number} */
jQuery.Event.prototype.offsetX;

/** @type {number} */
jQuery.Event.prototype.offsetY;

/** @type {Event} */
jQuery.Event.prototype.originalEvent;

/** @type {Element} */
jQuery.Event.prototype.originalTarget;

/** @type {number} */
jQuery.Event.prototype.pageX;

/** @type {number} */
jQuery.Event.prototype.pageY;

/** @return {undefined} */
jQuery.Event.prototype.preventDefault = function() {};

/** @type {Object<string, *>} */
jQuery.Event.prototype.props;

/** @type {Element} */
jQuery.Event.prototype.relatedTarget;

/** @type {*} */
jQuery.Event.prototype.result;

/** @type {number} */
jQuery.Event.prototype.screenX;

/** @type {number} */
jQuery.Event.prototype.screenY;

/** @type {boolean} */
jQuery.Event.prototype.shiftKey;

/** @return {undefined} */
jQuery.Event.prototype.stopImmediatePropagation = function() {};

/** @return {undefined} */
jQuery.Event.prototype.stopPropagation = function() {};

/** @type {Element} */
jQuery.Event.prototype.target;

/** @type {number} */
jQuery.Event.prototype.timeStamp;

/** @type {string} */
jQuery.Event.prototype.type;

/** @type {Window} */
jQuery.Event.prototype.view;

/** @type {number} */
jQuery.Event.prototype.which;

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.extend = function(arg1, var_args) {};

/**
 * @param {(Object|boolean)} arg1
 * @param {...*} var_args
 * @return {Object}
 */
jQuery.prototype.extend = function(arg1, var_args) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeIn = function(duration, arg2, callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeOut = function(duration, arg2, callback) {};

/**
 * @param {(string|number)} duration
 * @param {number} opacity
 * @param {(function()|string)=} arg3
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeTo = function(duration, opacity, arg3, callback) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(string|function())=} easing
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.fadeToggle = function(duration, easing, callback) {};

/**
 * @param {(jQuerySelector|function(number,Element)|Element|jQuery)} arg1
 * @return {!jQuery}
 * @see http://api.jquery.com/filter/
 */
jQuery.prototype.filter = function(arg1) {};

/**
 * @param {(jQuerySelector|jQuery|Element)} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.find = function(arg1) {};

/** @return {!jQuery} */
jQuery.prototype.first = function() {};

/** @see http://docs.jquery.com/Plugins/Authoring */
jQuery.fn = jQuery.prototype;

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focus = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusin = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.focusout = function(arg1, handler) {};

/** @const */
jQuery.fx = {};

/** @type {number} */
jQuery.fx.interval;

/** @type {boolean} */
jQuery.fx.off;

/**
 * @param {string} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.get = function(url, data, success, dataType) {};

/**
 * @param {number=} index
 * @return {(Element|Array<Element>)}
 * @nosideeffects
 */
jQuery.prototype.get = function(index) {};

/**
 * @param {string} url
 * @param {(Object<string,*>|
 *     function(Object<string,*>,string,jQuery.jqXHR))=} data
 * @param {function(Object<string,*>,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 * @see http://api.jquery.com/jquery.getjson/#jQuery-getJSON-url-data-success
 */
jQuery.getJSON = function(url, data, success) {};

/**
 * @param {string} url
 * @param {function(Node,string,jQuery.jqXHR)=} success
 * @return {!jQuery.jqXHR}
 */
jQuery.getScript = function(url, success) {};

/** @param {string} code */
jQuery.globalEval = function(code) {};

/**
 * @template T
 * @param {!Array<T>} arr
 * @param {function(*,number)} fnc
 * @param {boolean=} invert
 * @return {!Array<T>}
 */
jQuery.grep = function(arr, fnc, invert) {};

/**
 * @param {(string|Element)} arg1
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.has = function(arg1) {};

/**
 * @param {string} className
 * @return {boolean}
 * @nosideeffects
 */
jQuery.prototype.hasClass = function(className) {};

/**
 * @param {!Element} elem
 * @return {boolean}
 * @nosideeffects
 */
jQuery.hasData = function(elem) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|!jQuery)}
 */
jQuery.prototype.height = function(arg1) {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.hide = function(duration, arg2, callback) {};

/** @param {boolean} hold */
jQuery.holdReady = function(hold) {};

/**
 * @param {function(!jQuery.Event)} arg1
 * @param {function(!jQuery.Event)=} handlerOut
 * @return {!jQuery}
 */
jQuery.prototype.hover = function(arg1, handlerOut) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.html = function(arg1) {};

/**
 * @param {*} value
 * @param {Array<*>} arr
 * @param {number=} fromIndex
 * @return {number}
 * @nosideeffects
 */
jQuery.inArray = function(value, arr, fromIndex) {};

/**
 * @param {(jQuerySelector|Element|jQuery)=} arg1
 * @return {number}
 */
jQuery.prototype.index = function(arg1) {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.innerHeight = function() {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.innerWidth = function() {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.insertAfter = function(target) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.insertBefore = function(target) {};

/**
 * @param {(jQuerySelector|function(number)|jQuery|Element)} arg1
 * @return {boolean}
 */
jQuery.prototype.is = function(arg1) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isArray = function(obj) {};

/**
 * @param {Object} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isEmptyObject = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isFunction = function(obj) {};

/**
 * @param {*} value
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isNumeric = function(value) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isPlainObject = function(obj) {};

/**
 * @param {*} obj
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isWindow = function(obj) {};

/**
 * @param {Element} node
 * @return {boolean}
 * @nosideeffects
 */
jQuery.isXMLDoc = function(node) {};

/** @type {string} */
jQuery.prototype.jquery;

/**
 * @constructor
 * @extends {XMLHttpRequest}
 * @implements {jQuery.Promise}
 * @private
 * @see http://api.jquery.com/jQuery.ajax/#jqXHR
 */
jQuery.jqXHR = function () {};

/**
 * @override
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.always =
    function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.complete = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.done = function(doneCallbacks) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.error = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} failCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.fail = function(failCallbacks) {};

/**
 * @deprecated
 * @override
 */
jQuery.jqXHR.prototype.onreadystatechange = function (callback) {};

/**
 * @override
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @deprecated
 * @param {function()} callback
 * @return {!jQuery.jqXHR}
*/
jQuery.jqXHR.prototype.success = function (callback) {};

/**
 * @override
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.jqXHR}
 */
jQuery.jqXHR.prototype.then =
    function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keydown = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keypress = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.keyup = function(arg1, handler) {};

/** @return {!jQuery} */
jQuery.prototype.last = function() {};

/** @type {number} */
jQuery.prototype.length;

/**
 * @deprecated Please avoid the document loading Event invocation of
 *     .load() and use .on( "load", handler ) instead. (The AJAX
 *     module invocation signature is OK.)
 * @param {(function(!jQuery.Event)|Object<string, *>|string)} arg1
 * @param {(function(!jQuery.Event)|Object<string,*>|string)=} arg2
 * @param {function(string,string,XMLHttpRequest)=} complete
 * @return {!jQuery}
 */
jQuery.prototype.load = function(arg1, arg2, complete) {};

/**
 * @param {*} obj
 * @return {Array<*>}
 */
jQuery.makeArray = function(obj) {};

/**
 * @param {(Array<*>|Object<string, *>)} arg1
 * @param {(function(*,number)|function(*,(string|number)))} callback
 * @return {Array<*>}
 */
jQuery.map = function(arg1, callback) {};

/**
 * @param {function(number,Element)} callback
 * @return {!jQuery}
 */
jQuery.prototype.map = function(callback) {};

/**
 * @param {Array<*>} first
 * @param {Array<*>} second
 * @return {Array<*>}
 */
jQuery.merge = function(first, second) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousedown = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseenter = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseleave = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mousemove = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseout = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseover = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.mouseup = function(arg1, handler) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.next = function(selector) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextAll = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.nextUntil = function(arg1, filter) {};

/**
 * @param {boolean=} removeAll
 * @return {Object}
 */
jQuery.noConflict = function(removeAll) {};

/**
 * @return {function()}
 * @nosideeffects
 */
jQuery.noop = function() {};

/**
 * @param {(jQuerySelector|Array<Element>|function(number)|jQuery)} arg1
 * @return {!jQuery}
 */
jQuery.prototype.not = function(arg1) {};

/**
 * @return {number}
 * @nosideeffects
 */
jQuery.now = function() {};

/**
 * @param {(string|Object<string,*>)=} arg1
 * @param {(string|function(!jQuery.Event))=} selector
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.off = function(arg1, selector, handler) {};

/**
 * @param {({left:number,top:number}|
 *     function(number,{top:number,left:number}))=} arg1
 * @return {({left:number,top:number}|!jQuery)}
 */
jQuery.prototype.offset = function(arg1) {};

/**
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.offsetParent = function() {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {*=} selector
 * @param {*=} data
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.on = function(arg1, selector, data, handler) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {*=} arg2
 * @param {*=} arg3
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.one = function(arg1, arg2, arg3, handler) {};

/**
 * @param {boolean=} includeMargin
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.outerHeight = function(includeMargin) {};

/**
 * @param {boolean=} includeMargin
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.outerWidth = function(includeMargin) {};

/**
 * @param {(Object<string, *>|Array<Object<string, *>>)} obj
 * @param {boolean=} traditional
 * @return {string}
 */
jQuery.param = function(obj, traditional) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parent = function(selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parents = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.parentsUntil = function(arg1, filter) {};

/**
 * @param {string} data
 * @param {(Element|boolean)=} context
 * @param {boolean=} keepScripts
 * @return {Array<Element>}
 */
jQuery.parseHTML = function(data, context, keepScripts) {};

/**
 * @param {string} json
 * @return {string|number|Object<string, *>|Array<?>|boolean}
 */
jQuery.parseJSON = function(json) {};

/**
 * @param {string} data
 * @return {Document}
 */
jQuery.parseXML = function(data) {};

/**
 * @return {{left:number,top:number}}
 * @nosideeffects
 */
jQuery.prototype.position = function() {};

/**
 * @param {string} url
 * @param {(Object<string,*>|string|
 *     function(string,string,jQuery.jqXHR))=} data
 * @param {(function(string,string,jQuery.jqXHR)|string|null)=} success
 * @param {string=} dataType
 * @return {!jQuery.jqXHR}
 */
jQuery.post = function(url, data, success, dataType) {};
/**
 * @param {(string|Element|jQuery|function(number,string))} arg1
 * @param {(string|Element|jQuery)=} content
 * @return {!jQuery}
 */
jQuery.prototype.prepend = function(arg1, content) {};

/**
 * @param {(jQuerySelector|Element|jQuery)} target
 * @return {!jQuery}
 */
jQuery.prototype.prependTo = function(target) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prev = function(selector) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevAll = function(selector) {};

/**
 * @param {(jQuerySelector|Element)=} arg1
 * @param {jQuerySelector=} filter
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.prevUntil = function(arg1, filter) {};

/**
 * @param {(string|Object)=} type
 * @param {Object=} target
 * @return {!jQuery.Promise}
 */
jQuery.prototype.promise = function(type, target) {};

/**
 * @interface
 * @private
 * @see http://api.jquery.com/Types/#Promise
 */
jQuery.Promise = function () {};

/**
 * @param {jQueryCallback} alwaysCallbacks
 * @param {jQueryCallback=} alwaysCallbacks2
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.always =
    function(alwaysCallbacks, alwaysCallbacks2) {};

/**
 * @param {jQueryCallback} doneCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.done = function(doneCallbacks) {};

/**
 * @param {jQueryCallback} failCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.fail = function(failCallbacks) {};

/**
 * @param {function()=} doneFilter
 * @param {function()=} failFilter
 * @param {function()=} progressFilter
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.pipe =
    function(doneFilter, failFilter, progressFilter) {};

/**
 * @param {jQueryCallback} doneCallbacks
 * @param {jQueryCallback=} failCallbacks
 * @param {jQueryCallback=} progressCallbacks
 * @return {!jQuery.Promise}
 */
jQuery.Promise.prototype.then =
    function(doneCallbacks, failCallbacks, progressCallbacks) {};

/**
 * @param {(string|Object<string,*>)} arg1
 * @param {(string|number|boolean|function(number,String))=} arg2
 * @return {(string|boolean|!jQuery)}
 */
jQuery.prototype.prop = function(arg1, arg2) {};

/**
 * @param {...*} var_args
 * @return {function()}
 */
jQuery.proxy = function(var_args) {};

/**
 * @param {Array<Element>} elements
 * @param {string=} name
 * @param {Array<*>=} args
 * @return {!jQuery}
 */
jQuery.prototype.pushStack = function(elements, name, args) {};

/**
 * @param {(string|Array<function()>|function(function()))=} queueName
 * @param {(Array<function()>|function(function()))=} arg2
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.prototype.queue = function(queueName, arg2) {};

/**
 * @param {Element} elem
 * @param {string=} queueName
 * @param {(Array<function()>|function())=} arg3
 * @return {(Array<Element>|!jQuery)}
 */
jQuery.queue = function(elem, queueName, arg3) {};

/**
 * @param {function()} handler
 * @return {!jQuery}
 */
jQuery.prototype.ready = function(handler) {};

/**
 * @param {string=} selector
 * @return {!jQuery}
 */
jQuery.prototype.remove = function(selector) {};

/**
 * @param {string} attributeName
 * @return {!jQuery}
 */
jQuery.prototype.removeAttr = function(attributeName) {};

/**
 * @param {(string|function(number,string))=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeClass = function(arg1) {};

/**
 * @param {(string|Array<string>)=} arg1
 * @return {!jQuery}
 */
jQuery.prototype.removeData = function(arg1) {};

/**
 * @param {Element} elem
 * @param {string=} name
 * @return {!jQuery}
 */
jQuery.removeData = function(elem, name) {};

/**
 * @param {string} propertyName
 * @return {!jQuery}
 */
jQuery.prototype.removeProp = function(propertyName) {};

/**
 * @param {jQuerySelector} target
 * @return {!jQuery}
 */
jQuery.prototype.replaceAll = function(target) {};

/**
 * @param {(string|Element|jQuery|function())} arg1
 * @return {!jQuery}
 */
jQuery.prototype.replaceWith = function(arg1) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.resize = function(arg1, handler) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.scroll = function(arg1, handler) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollLeft = function(value) {};

/**
 * @param {number=} value
 * @return {(number|!jQuery)}
 */
jQuery.prototype.scrollTop = function(value) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.select = function(arg1, handler) {};

/**
 * @return {string}
 * @nosideeffects
 */
jQuery.prototype.serialize = function() {};

/**
 * @return {Array<Object<string, *>>}
 * @nosideeffects
 */
jQuery.prototype.serializeArray = function() {};

/**
 * @param {(string|number|function())=} duration
 * @param {(function()|string)=} arg2
 * @param {function()=} callback
 * @return {!jQuery}
 */
jQuery.prototype.show = function(duration, arg2, callback) {};

/**
 * @param {jQuerySelector=} selector
 * @return {!jQuery}
 * @nosideeffects
 */
jQuery.prototype.siblings = function(selector) {};

/**
 * @deprecated Please use the .length property instead.
 * @return {number}
 * @nosideeffects
 */
jQuery.prototype.size = function() {};

/**
 * @param {number} start
 * @param {number=} end
 * @return {!jQuery}
 */
jQuery.prototype.slice = function(start, end) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideDown =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideToggle =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(Object<string,*>|string|number)=} optionsOrDuration
 * @param {(function()|string)=} completeOrEasing
 * @param {function()=} complete
 * @return {!jQuery}
 */
jQuery.prototype.slideUp =
    function(optionsOrDuration, completeOrEasing, complete) {};

/**
 * @param {(boolean|string)=} arg1
 * @param {boolean=} arg2
 * @param {boolean=} jumpToEnd
 * @return {!jQuery}
 */
jQuery.prototype.stop = function(arg1, arg2, jumpToEnd) {};

/**
 * @param {(function(!jQuery.Event)|Object<string, *>)=} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.submit = function(arg1, handler) {};

/** @type {Object<string, *>}
 * @deprecated Please try to use feature detection instead.
 */
jQuery.support;

/**
 * @deprecated Please try to use feature detection instead.
 * @type {boolean}
 */
jQuery.support.boxModel;

/** @type {boolean} */
jQuery.support.changeBubbles;

/** @type {boolean} */
jQuery.support.cors;

/** @type {boolean} */
jQuery.support.cssFloat;

/** @type {boolean} */
jQuery.support.hrefNormalized;

/** @type {boolean} */
jQuery.support.htmlSerialize;

/** @type {boolean} */
jQuery.support.leadingWhitespace;

/** @type {boolean} */
jQuery.support.noCloneEvent;

/** @type {boolean} */
jQuery.support.opacity;

/** @type {boolean} */
jQuery.support.style;

/** @type {boolean} */
jQuery.support.submitBubbles;

/** @type {boolean} */
jQuery.support.tbody;

/**
 * @param {(string|number|boolean|function(number,string))=} arg1
 * @return {(string|!jQuery)}
 */
jQuery.prototype.text = function(arg1) {};

/**
 * @return {Array<Element>}
 * @nosideeffects
 */
jQuery.prototype.toArray = function() {};

/**
 * Refers to the method from the Effects category. There used to be a toggle
 * method on the Events category which was removed starting version 1.9.
 * @param {(number|string|Object<string,*>|boolean)=} arg1
 * @param {(function()|string)=} arg2
 * @param {function()=} arg3
 * @return {!jQuery}
 */
jQuery.prototype.toggle = function(arg1, arg2, arg3) {};

/**
 * @param {(string|boolean|function(number,string,boolean))=} arg1
 * @param {boolean=} flag
 * @return {!jQuery}
 */
jQuery.prototype.toggleClass = function(arg1, flag) {};

/**
 * @param {(string|jQuery.Event)} arg1
 * @param {...*} var_args
 * @return {!jQuery}
 */
jQuery.prototype.trigger = function(arg1, var_args) {};

/**
 * @param {string|jQuery.Event} eventType
 * @param {Array<*>=} extraParameters
 * @return {*}
 */
jQuery.prototype.triggerHandler = function(eventType, extraParameters) {};

/**
 * @param {string} str
 * @return {string}
 * @nosideeffects
 */
jQuery.trim = function(str) {};

/**
 * @param {*} obj
 * @return {string}
 * @nosideeffects
 */
jQuery.type = function(obj) {};

/**
 * @param {(string|function(!jQuery.Event)|jQuery.Event)=} arg1
 * @param {(function(!jQuery.Event)|boolean)=} arg2
 * @return {!jQuery}
 */
jQuery.prototype.unbind = function(arg1, arg2) {};

/**
 * @param {string=} arg1
 * @param {(string|Object<string,*>)=} arg2
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.undelegate = function(arg1, arg2, handler) {};

/**
 * @param {Array<Element>} arr
 * @return {Array<Element>}
 */
jQuery.unique = function(arr) {};

/**
 * @deprecated Please use .on( "unload", handler ) instead.
 * @param {(function(!jQuery.Event)|Object<string, *>)} arg1
 * @param {function(!jQuery.Event)=} handler
 * @return {!jQuery}
 */
jQuery.prototype.unload = function(arg1, handler) {};

/** @return {!jQuery} */
jQuery.prototype.unwrap = function() {};

/**
 * @param {(string|Array<string>|function(number,*))=} arg1
 * @return {(string|number|Array<string>|!jQuery)}
 */
jQuery.prototype.val = function(arg1) {};

/**
 * Note: The official documentation (https://api.jquery.com/jQuery.when/) says
 * jQuery.when accepts deferreds, but it actually accepts any type, e.g.:
 *
 * jQuery.when(jQuery.ready, jQuery.ajax(''), jQuery('#my-element'), 1)
 *
 * If an argument is not an "observable" (a promise-like object) it is wrapped
 * into a promise.
 * @param {*} deferred
 * @param {...*} deferreds
 * @return {!jQuery.Promise}
 */
jQuery.when = function(deferred, deferreds) {};

/**
 * @param {(string|number|function(number,number))=} arg1
 * @return {(number|!jQuery)}
 */
jQuery.prototype.width = function(arg1) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrap = function(arg1) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery)} wrappingElement
 * @return {!jQuery}
 */
jQuery.prototype.wrapAll = function(wrappingElement) {};

/**
 * @param {(string|jQuerySelector|Element|jQuery|function(number))} arg1
 * @return {!jQuery}
 */
jQuery.prototype.wrapInner = function(arg1) {};
var u = {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends Error
 */
u.Exception = function(message, innerException) {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends u.Exception
 */
u.UnimplementedException = function(message, innerException) {};

u.array = {};

/**
 * @param {Arguments|Array} args
 * @returns {Array}
 */
u.array.fromArguments = function(args) {};

/**
 * Creates an array of length n filled with value
 * @param {number} n
 * @param {*} value
 * @returns {Array}
 */
u.array.fill = function(n, value) {};

/**
 * Generates an array of consecutive numbers starting from start, or 0 if it's not defined
 * @param {number} n
 * @param {number} [start]
 * @returns {Array.<number>}
 */
u.array.range = function(n, start) {};

/**
 * Returns a new array where all elements are unique
 * Complexity is suboptimal: O(n^2); for strings and numbers,
 * it can be done faster, using a map
 * @param {Array} arr
 * @returns {Array}
 */
u.array.unique = function(arr) {};

/**
 * @param {Array} arr
 * @param {function(*, number):boolean} predicate
 * @param {*} [thisArg]
 * @returns {number}
 */
u.array.indexOf = function(arr, predicate, thisArg) {};

/**
 * @param {number} [lat]
 * @param {number} [lng]
 * @param {number} [zoom]
 * @param {number} [range]
 * @constructor
 */
u.Geolocation = function(lat, lng, zoom, range) {};

/**
 * @param {u.Geolocation|{lat: number, lng: number, zoom: number}} other
 */
u.Geolocation.prototype.equals = function(other) {};

u.math = {};

/**
 * @param {number} x
 * @param {number} precision
 * @returns {number}
 */
u.math.floorPrecision = function(x, precision) {};

/**
 * Lightweight linear scale function for use outside the DOM (as opposed to d3.scale.linear
 * @param {Array.<number>} domain An array with exactly two arguments: lower and upper bound of the range
 * @param {Array.<number>} range An array with exactly two arguments: lower and upper bound of the range
 * @returns {function(number): number}
 */
u.math.scaleLinear = function(domain, range) {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends u.Exception
 */
u.AbstractMethodException = function(message, innerException) {};

u.string = {};

/**
 * @param {string} text
 * @returns {string}
 */
u.string.capitalizeFirstLetter = function (text) {};

/**
 * @param {function(T)} callback
 * @param {Object} [thisArg]
 * @constructor
 * @template T
 */
u.EventListener = function(callback, thisArg) {};

/**
 * @param {T} [args]
 */
u.EventListener.prototype.fire = function(args) {};

/**
 * @type {number}
 * @name u.EventListener#id
 */
u.EventListener.prototype.id;

/**
 * @param {{synchronous: (boolean|undefined), timeout: (function(Function, number, ...)|undefined)}} [options]
 * @constructor
 * @template T
 */
u.Event = function(options) {};

/**
 * @type {function(Function, number, ...)}
 */
u.Event.TIMEOUT;

/**
 * @type {boolean}
 * @name u.Event#synchronous
 */
u.Event.prototype.synchronous;

/**
 * @type {boolean}
 * @name u.Event#firing
 */
u.Event.prototype.firing;

/**
 * Gets the number of listeners register for the event
 * @type {number}
 * @name u.Event#count
 */
u.Event.prototype.count;

/**
 * @param {u.EventListener.<T>|function(T)} listener
 * @param {Object} [thisArg]
 * @returns {u.EventListener.<T>}
 */
u.Event.prototype.addListener = function(listener, thisArg) {};

/**
 * @param {u.EventListener.<T>} listener
 */
u.Event.prototype.removeListener = function(listener) {};

/**
 * @param {T} [args]
 */
u.Event.prototype.fire = function(args) {};

u.reflection = {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends u.Exception
 */
u.reflection.ReflectionException = function(message, innerException) {};

/**
 * Evaluates the given string into a constructor for a type
 * @param {string} typeName
 * @param {Object} [context]
 * @returns {function(new: T)}
 * @template T
 */
u.reflection.evaluateFullyQualifiedTypeName = function(typeName, context) {};

/**
 * Applies the given constructor to the given parameters and creates
 * a new instance of the class it defines
 * @param {function(new: T)} ctor
 * @param {Array|Arguments} params
 * @returns {T}
 * @template T
 */
u.reflection.applyConstructor = function(ctor, params) {};

/**
 * Wraps given type around the given object, so the object's prototype matches the one of the type
 * @param {Object} o
 * @param {function(new: T)} type
 * @returns {T}
 * @template T
 */
u.reflection.wrap = function(o, type) {};

u.async = {};

/**
 * @param {Array.<function(): Promise>} jobs
 * @param {boolean} [inOrder] If true, the jobs are executed in order, otherwise, in parallel
 * @returns {Promise}
 */
u.async.all = function(jobs, inOrder) {};

/**
 * @param {number} n
 * @param {function(number, (number|undefined)): Promise} iteration
 * @param {boolean} [inOrder]
 * @returns {Promise}
 */
u.async.for = function(n, iteration, inOrder) {};

/**
 * @param {function(number): Promise} iteration
 * @returns {Promise}
 */
u.async.do = function(iteration) {};

/**
 * @param {Array.<T>} items
 * @param {function(T, number): Promise} iteration
 * @param {boolean} [inOrder]
 * @returns {Promise}
 * @template T
 */
u.async.each = function(items, iteration, inOrder) {};

/**
 * @constructor
 * @template T
 */
u.async.Deferred = function() {};

/**
 * @param {T} [value]
 */
u.async.Deferred.prototype.resolve = function(value) {};

/**
 * @param {*} [reason]
 */
u.async.Deferred.prototype.reject = function(reason) {};

/**
 * @param {function((T|undefined))} [onFulfilled]
 * @param {function(*)} [onRejected]
 * @returns {Promise}
 */
u.async.Deferred.prototype.then = function(onFulfilled, onRejected) {};

/**
 * @param {function(*)} onRejected
 * @returns {Promise}
 */
u.async.Deferred.prototype.catch = function(onRejected) {};

u.log = {};

/**
 * @param {...} args
 */
u.log.info = function(args) {};

/**
 * @param {...} args
 */
u.log.warn = function(args) {};

/**
 * @param {...} args
 */
u.log.error = function(args) {};

/**
 * @param {Array|Object.<number|string, *>} obj
 * @param {function((number|string), *)} callback
 * @returns {Array|Object}
 */
u.each = function(obj, callback) {};

/**
 * @param {Array.<T>|Object.<number|string, T>} obj
 * @param {function(T, (number|string|undefined)): V} callback
 * @param {Object} [thisArg]
 * @returns {Array.<V>}
 * @template T, V
 */
u.map = function(obj, callback, thisArg) {};

/**
 * Makes a shallow copy of the given object or array
 * @param {Object|Array} obj
 * @returns {Object|Array}
 */
u.copy = function(obj) {};

/**
 * Extends the properties of dst with those of the other arguments of the function;
 * values corresponding to common keys are overriden.
 * @param {Object} dst
 * @param {...Object} src
 * @returns {Object}
 */
u.extend = function(dst, src) {};

/**
 * @param {number} size
 * @returns {string}
 */
u.generatePseudoGUID = function(size) {};

/**
 * Lightweight version of ajax GET request with minimal error handling
 * @param {string} uri
 * @returns {Promise}
 */
u.httpGet = function(uri) {};

/**
 * @param {{uri: (string|undefined), content: (string|undefined)}} opts
 * @returns {Promise} Promise.<Object.<string, string>>
 */
u.parseLessConsts = function(opts) {};

/**
 * Forces browser to reflow element that was previously hidden (display: none), so that transitions like
 * fade or transform can be applied to it
 * @param {HTMLElement} element
 * @returns {number}
 */
u.reflowForTransition = function(element) {};

/**
 * @param {number} milliseconds Must be positive
 * @constructor
 */
u.TimeSpan = function(milliseconds) {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.days = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.hours = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.minutes = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.seconds = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.milliseconds = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.totalDays = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.totalHours = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.totalMinutes = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.totalSeconds = function() {};

/**
 * @returns {number}
 */
u.TimeSpan.prototype.totalMilliseconds = function() {};

/**
 * @override
 * @returns {string}
 */
u.TimeSpan.prototype.toString = function() {};

/**
 * @param {number} x Offset
 * @param {number} y Offset
 * @param {number} w Width
 * @param {number} h Height
 * @param {number} minQuadrantRatio
 * @param {number} maxQuadrantCapacity
 * @constructor
 */
u.QuadTree = function(x, y, w, h, minQuadrantRatio, maxQuadrantCapacity) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {*} [value]
 */
u.QuadTree.prototype.insert = function(x, y, w, h, value) {};

/**
 * @param {number} x
 * @param {number} y
 * @returns {Array.<{x: number, y: number, w: number, h: number, value: *}>}
 */
u.QuadTree.prototype.collisions = function(x, y) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @returns {Array.<{x: number, y: number, w: number, h: number, value: *}>}
 */
u.QuadTree.prototype.overlaps = function(x, y, w, h) {};

/**
 * @returns {Array.<{x: number, y: number, w: number, h: number, items: Array}>}
 */
u.QuadTree.prototype.leaves = function() {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} size
 * @param {u.QuadTree.Node} [parent]
 * @constructor
 */
u.QuadTree.Node = function(x, y, size, parent) {};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {*} [value]
 * @constructor
 */
u.QuadTree.Item = function(x, y, w, h, value) {};
