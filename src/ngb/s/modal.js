/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/10/2016
 * Time: 11:01 AM
 */

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
   * @type {{animation: boolean, backdrop: boolean, keyboard: boolean}}
   */
  this.options = {
    animation: true,
    backdrop: true,
    keyboard: true
  };
};

goog.inherits(ngb.s.ModalProvider, ngu.Provider);

/**
 * @param {ngu.Provider} provider
 * @param {angular.$injector} $injector
 * @param $rootScope
 * @param {angular.$q} $q
 * @param $templateRequest
 * @param {angular.$controller} $controller
 * @param {ngb.s.ModalStack} modalStack
 * @constructor
 * @extends {ngu.ProviderService}
 */
ngb.s.Modal = function(provider, $injector, $rootScope, $q, $templateRequest, $controller, modalStack) {
  ngu.ProviderService.apply(this, arguments);

  /**
   * @type {angular.$q}
   * @private
   */
  this._$q = $q;

  /**
   * @type {ngb.s.ModalStack}
   * @private
   */
  this._modalStack = modalStack;
};

goog.inherits(ngb.s.Modal, ngu.ProviderService);

/**
 * @param {{animation: (boolean|undefined), backdrop: (boolean|string|undefined), backdropClass: (string|undefined),
 *   bindToController: (boolean|undefined), controller: (Function|string|Array|undefined),
 *   controllerAs: (string|undefined), keyboard: (boolean|undefined), resolve: (Object|undefined),
 *   $scope: angular.Scope, size: (string|undefined), template: (string|undefined),
 *   templateUrl: (string|undefined), windowClass: (string|undefined), windowTemplateUrl: (string|undefined)
 * }} modalOptions
 * @returns {{result: *, opened: *, rendered: *, close: modalInstance.close, dismiss: modalInstance.dismiss}}
 */
ngb.s.Modal.prototype.open = function(modalOptions) {
  var self = this;

  var modalStack = this._modalStack;
  var modalProvider = this['provider'];

  var modalResultDeferred = $q.defer();
  var modalOpenedDeferred = $q.defer();
  var modalRenderDeferred = $q.defer();

  //prepare an instance of a modal to be injected into controllers and returned to a caller
  var modalInstance = {
    result: modalResultDeferred.promise,
    opened: modalOpenedDeferred.promise,
    rendered: modalRenderDeferred.promise,
    close: function (result) {
      return modalStack.close(modalInstance, result);
    },
    dismiss: function (reason) {
      return modalStack.dismiss(modalInstance, reason);
    }
  };

  //merge and clean up options
  modalOptions = u.extend({}, modalProvider.options, modalOptions);
  modalOptions['resolve'] = modalOptions['resolve'] || {};

  //verify options
  if (!modalOptions['template'] && !modalOptions['templateUrl']) {
    throw new Error('One of template or templateUrl options is required.');
  }

  var templateAndResolvePromise =
    $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions['resolve'])));


  templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

    var modalScope = (modalOptions['$scope'] || $rootScope).$new();
    modalScope.$close = modalInstance.close;
    modalScope.$dismiss = modalInstance.dismiss;

    var ctrlInstance, ctrlLocals = {};
    var resolveIter = 1;

    //controllers
    if (modalOptions['controller']) {
      ctrlLocals.$scope = modalScope;
      ctrlLocals.$modalInstance = modalInstance;
      angular.forEach(modalOptions['resolve'], function (value, key) {
        ctrlLocals[key] = tplAndVars[resolveIter++];
      });

      ctrlInstance = $controller(modalOptions['controller'], ctrlLocals);
      if (modalOptions['controllerAs']) {
        if (modalOptions['bindToController']) {
          angular.extend(ctrlInstance, modalScope);
        }

        modalScope[modalOptions['controllerAs']] = ctrlInstance;
      }
    }

    modalStack.open(modalInstance, {
      scope: modalScope,
      deferred: modalResultDeferred,
      renderDeferred: modalRenderDeferred,
      content: tplAndVars[0],
      animation: modalOptions['animation'],
      backdrop: modalOptions['backdrop'],
      keyboard: modalOptions['keyboard'],
      backdropClass: modalOptions['backdropClass'],
      windowClass: modalOptions['windowClass'],
      windowTemplateUrl: modalOptions['windowTemplateUrl'],
      size: modalOptions['size']
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
