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
