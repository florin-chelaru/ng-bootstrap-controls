/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 12:16 PM
 */

goog.provide('ngb');

goog.require('ngb.d.MultiselectList');
goog.require('ngb.d.PatientModal');

ngb.main = angular.module('ngb', ['ngu']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);

ngb.main.directive('ngbPatientModal', ['$compile', function() {
  return ngu.Directive.createNew('ngbPatientModal', /** @type {function(new: ngu.Directive)} */ (ngb.d.PatientModal), arguments, {restrict: 'C'});
}]);

ngb.main.run(["$templateCache", function($templateCache) {
  $templateCache.put("ngb/template/modal/window.html",
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\"\n" +
    "    uib-modal-animation-class=\"fade\"\n" +
    "    modal-in-class=\"in\"\n" +
    "    ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">\n" +
    "    <div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\" ngu-transition-end=\"$parent.animationEnd.resolve()\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n" +
    "</div>\n" +
    "");
}]);

/*ngb.main.provider('$ngbModal', function () {

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

ngb.main.provider('$ngbModal', function() {
  return new ngb.s.ModalProvider(/!** @type {function(new:ngu.ProviderService)} *!/ (ngb.s.Modal), ['$injector', '$rootScope', '$q', '$templateRequest', '$controller', '$modalStack']);
});*/

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


