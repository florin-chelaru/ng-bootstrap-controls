/**
* @license ng-bootstrap-controls
* Copyright (c) 2016 Florin Chelaru
* License: MIT
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
* rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
* Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
* WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
* OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


goog.provide('ngb.d.MultiselectList');

/**
 * @param {angular.Scope} $scope
 * @param {angular.$timeout} $timeout
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.MultiselectList = function ($scope, $timeout) {
  ngu.Directive.apply(this, arguments);

  /**
   * @type {angular.$timeout}
   * @private
   */
  this._$timeout = $timeout;
};

goog.inherits(ngb.d.MultiselectList, ngu.Directive);

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.MultiselectList.prototype.link = function ($scope, $element, $attrs) {
  var self = this;

  var moreRemaining = true;
  var $list = $element.find('> .list-group');
  var iterate = function() {
    if ($list.get(0).scrollHeight <= $list.height() && moreRemaining) {
      moreRemaining = $scope['ngbLoadMore']();
      self._$timeout(iterate, 0);
    }
  };
  iterate();

  $list.scroll(function() {
    self._$timeout(function() {
      if (moreRemaining && $list.get(0).scrollHeight - $list.scrollTop() == $list.height()) {
        moreRemaining = $scope['ngbLoadMore']();
      }
    }, 0);
  });

  $scope.$watch('ngbFilter', function(value, oldVal) {
    iterate();
  });
};

/**
 * @param {{label:string, index:number}} item
 * @returns {boolean}
 */

ngb.d.MultiselectList.prototype.isSelected = function(item) { return this.$scope['ngbSelection'][item.index]; };

/**
 * @param {{label:string, index:number}} item
 */
ngb.d.MultiselectList.prototype.select = function(item) {
  if (item.index in this.$scope['ngbSelection']) {
    delete this.$scope['ngbSelection'][item.index];
  } else {
    this.$scope['ngbSelection'][item.index] = item;
  }
};

/**
 */
ngb.d.MultiselectList.prototype.clearSelection = function() {
  this.$scope['ngbSelection'] = {};
};

Object.defineProperty(ngb.d.MultiselectList, 'options', {
  get: function() {
    var self = this;
    return {
      'template':
        '<div class="nav navbar navbar-default" ng-if="ngbTitle">' +
          '<div class="navbar-header">' +
            '<div class="navbar-brand">{{ ngbTitle }}</div>' +
          '</div>' +
        '</div>' +
        '<form class="ngb-list-search" role="search">' +
          '<div class="input-group">' +
            '<input type="text" class="form-control" placeholder="Search" ng-model="ngbFilter">' +
            '<div class="input-group-btn">' +
              '<button type="button" class="btn btn-default" aria-label="Select all" ng-click="ngbSelectAll()">' +
                '<span class="fa fa-check-square"></span>' +
              '</button>' +
              '<button type="button" class="btn btn-default" aria-label="Clear selection" ng-click="ngbMultiselectList.clearSelection()">' +
                '<span class="fa fa-square-o"></span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</form>' +
        '<div class="list-group list" ng-class="{\'ngb-has-title\': !!ngbTitle}">' +
          '<a ng-repeat="item in ngbItems | filter:ngbFilter" href="" class="list-group-item" ng-class="{\'active\': ngbMultiselectList.isSelected(item)}" ng-click="ngbMultiselectList.select(item)" >{{ item.label }}</a>' +
        '</div>',
      'scope': {
        'ngbTitle': '=',
        'ngbItems': '=',
        'ngbFilter': '=',
        'ngbSelection': '=',
        'ngbLoadMore': '&',
        'ngbSelectAll': '&'
      }
    };
  }
});


goog.provide('ngb.s.ModalProvider');
goog.provide('ngb.s.Modal');

/**
 * @param {function(new: ngu.ProviderService)} serviceCtor
 * @param {Array.<string>} [serviceArgs]
 * @constructor
 * @extends {ngu.Provider}
 */
ngb.s.ModalProvider = function(serviceCtor, serviceArgs) {
  ngu.Provider.apply(this, arguments);

  /**
   * @type {boolean}
   */
  //this.animation = true;

  /**
   * @type {boolean}
   */
  //this.backdrop = true;

  /**
   * @type {boolean}
   */
  this.keyboard = true;
};

goog.inherits(ngb.s.ModalProvider, ngu.Provider);

/**
 * @param {ngu.Provider} provider
 * @param {angular.$injector} $injector
 * @param $rootScope
 * @param {angular.$q} $q
 * @param $templateRequest
 * @param {angular.$controller} $controller
 * @param $modalStack
 * @constructor
 * @extends {ngu.ProviderService}
 */
ngb.s.Modal = function(provider, $injector, $rootScope, $q, $templateRequest, $controller, $modalStack) {

};


goog.provide('ngb');

goog.require('ngb.s.Modal');

goog.require('ngb.d.MultiselectList');

ngb.main = angular.module('ngb', ['ngu']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);

/*
ngb.main.provider('$ngbModal', function () {

  var $modalProvider = {
    options: {
      animation: true,
      backdrop: true, //can also be false or 'static'
      keyboard: true
    },

    // This gets a controller
    $get: ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$modalStack',
      function ($injector, $rootScope, $q, $templateRequest, $controller, $modalStack) {

        var $modal = {};

        function getTemplatePromise(options) {
          return options.template ? $q.when(options.template) :
            $templateRequest(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl);
        }

        function getResolvePromises(resolves) {
          var promisesArr = [];
          angular.forEach(resolves, function (value) {
            if (angular.isFunction(value) || angular.isArray(value)) {
              promisesArr.push($q.when($injector.invoke(value)));
            }
          });
          return promisesArr;
        }

        $modal.open = function (modalOptions) {

          var modalResultDeferred = $q.defer();
          var modalOpenedDeferred = $q.defer();
          var modalRenderDeferred = $q.defer();

          //prepare an instance of a modal to be injected into controllers and returned to a caller
          var modalInstance = {
            result: modalResultDeferred.promise,
            opened: modalOpenedDeferred.promise,
            rendered: modalRenderDeferred.promise,
            close: function (result) {
              return $modalStack.close(modalInstance, result);
            },
            dismiss: function (reason) {
              return $modalStack.dismiss(modalInstance, reason);
            }
          };

          //merge and clean up options
          modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
          modalOptions.resolve = modalOptions.resolve || {};

          //verify options
          if (!modalOptions.template && !modalOptions.templateUrl) {
            throw new Error('One of template or templateUrl options is required.');
          }

          var templateAndResolvePromise =
            $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


          templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

            var modalScope = (modalOptions.scope || $rootScope).$new();
            modalScope.$close = modalInstance.close;
            modalScope.$dismiss = modalInstance.dismiss;

            var ctrlInstance, ctrlLocals = {};
            var resolveIter = 1;

            //controllers
            if (modalOptions.controller) {
              ctrlLocals.$scope = modalScope;
              ctrlLocals.$modalInstance = modalInstance;
              angular.forEach(modalOptions.resolve, function (value, key) {
                ctrlLocals[key] = tplAndVars[resolveIter++];
              });

              ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
              if (modalOptions.controllerAs) {
                if (modalOptions.bindToController) {
                  angular.extend(ctrlInstance, modalScope);
                }

                modalScope[modalOptions.controllerAs] = ctrlInstance;
              }
            }

            $modalStack.open(modalInstance, {
              scope: modalScope,
              deferred: modalResultDeferred,
              renderDeferred: modalRenderDeferred,
              content: tplAndVars[0],
              animation: modalOptions.animation,
              backdrop: modalOptions.backdrop,
              keyboard: modalOptions.keyboard,
              backdropClass: modalOptions.backdropClass,
              windowClass: modalOptions.windowClass,
              windowTemplateUrl: modalOptions.windowTemplateUrl,
              size: modalOptions.size
            });

          }, function resolveError(reason) {
            modalResultDeferred.reject(reason);
          });

          templateAndResolvePromise.then(function () {
            modalOpenedDeferred.resolve(true);
          }, function (reason) {
            modalOpenedDeferred.reject(reason);
          });

          return modalInstance;
        };

        return $modal;
      }]
  };

  return $modalProvider;
});
*/

ngb.main.provider('$ngbModal', function() {
  return new ngb.s.ModalProvider(/** @type {function(new:ngu.ProviderService)} */ (ngb.s.Modal), ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$modalStack']);
});

/*
ngb.main.provider('$myName', function () {
  return new MyNameProvider(MyNameService, ['$rootScope', '$q']);
});

ngb.main.config(['$myNameProvider', function(provider) {
  provider.value = 30;
}]);

/!**
 * @param serviceCtor
 * @param {Array} [serviceArgs]
 * @constructor
 * @extends {ngu.Provider}
 *!/
function MyNameProvider(serviceCtor, serviceArgs) {
  ngu.Provider.apply(this, arguments);

  this.color = '#ffffff';
  this.value = 20;
}

goog.inherits(MyNameProvider, ngu.Provider);

function MyNameService(provider, $rootScope, $q) {
  this.provider = provider;
  this.$rootScope = $rootScope;
  this.$q = $q;
  if (provider.value != 20) {
    console.log('it worked');
  }
}*/


