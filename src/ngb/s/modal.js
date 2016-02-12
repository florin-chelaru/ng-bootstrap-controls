/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/10/2016
 * Time: 11:01 AM
 */

goog.provide('ngb.s.ModalProvider');
goog.provide('ngb.s.Modal');
goog.provide('ngb.s.ModalController');

goog.require('ngb.d.PatientModal');

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
  this['options'] = {
    'useDefault': false
  };
};

goog.inherits(ngb.s.ModalProvider, ngu.Provider);

/**
 * @param {ngu.Provider} provider
 * @param $uibModal
 * @param {angular.$q} $q
 * @param {angular.$templateCache} $templateCache
 * @constructor
 * @extends {ngu.ProviderService}
 */
ngb.s.Modal = function(provider, $uibModal, $q, $templateCache) {
  ngu.ProviderService.apply(this, arguments);

  /**
   * @private
   */
  this._$uibModal = $uibModal;

  /**
   * @type {angular.$q}
   * @private
   */
  this._$q = $q;

  /**
   * @type {angular.$templateCache}
   * @private
   */
  this._$templateCache = $templateCache;

  $templateCache.put('ngb/template/modal/window.html',
    '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal" ' +
          'uib-modal-animation-class="fade" ' +
          'modal-in-class="in" ' +
          'ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}">' +
      '<div class="modal-dialog {{size ? \'modal-\' + size : \'\'}}" ' +
            'ngu-transition-end="$parent.$ngbAnimation.resolve()">' +
        '<div class="modal-content" uib-modal-transclude></div>' +
      '</div>' +
    '</div>');

  $templateCache.put('ngb/template/modal/content.html', '<div class="ngb-patient-modal"></div>');
};

goog.inherits(ngb.s.Modal, ngu.ProviderService);

/**
 * @param {{animation: (boolean|undefined), appendTo: (angular.element|undefined), backdrop: (boolean|string|undefined),
 *   backdropClass: (string|undefined), bindToController: (boolean|undefined),
 *   controller: (Function|string|Array|undefined), controllerAs: (string|undefined), keyboard: (boolean|undefined),
 *   openedClass: (string|undefined), resolve: (Object|undefined), $scope: angular.Scope, size: (string|undefined),
 *   template: (string|undefined), templateUrl: (string|undefined), windowClass: (string|undefined),
 *   windowTemplateUrl: (string|undefined), windowTopClass: (string|undefined),
 *   contentTemplateUrl: string
 * }} [modalOptions]
 * @returns {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}}
 */
ngb.s.Modal.prototype.open = function(modalOptions) {
  var $q = this._$q;

  modalOptions = modalOptions || {};

  if (modalOptions['useDefault']) {
    return this._$uibModal.open(modalOptions);
  }

  var animation = !!modalOptions['animation'];
  modalOptions['templateUrl'] = 'ngb/template/modal/content.html';
  delete modalOptions['template']; // this is only used when in default mode
  modalOptions['windowTemplateUrl'] = 'ngb/template/modal/window.html';
  modalOptions['controller'] = modalOptions['controller'] || 'ngb.s.ModalController';
  modalOptions['resolve'] = u.extend({}, {
    '$ngbAnimation': function() { return $q.defer(); },
    'contentTemplateUrl': function() { return modalOptions['contentTemplateUrl']; }
  }, modalOptions['resolve'] || {});

  return this._$uibModal.open(modalOptions);
};

/**
 * @param {angular.Scope} $scope
 * @param {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}} $uibModalInstance
 * @param {angular.$q.Deferred} $ngbAnimation
 * @param {string} contentTemplateUrl
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.s.ModalController = function($scope, $uibModalInstance, $ngbAnimation, contentTemplateUrl) {
  ngu.Controller.apply(this, arguments);

  /**
   * @type {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}}
   * @private
   */
  this._$modalInstance = $uibModalInstance;

  /**
   * @type {angular.$q.Deferred}
   * @private
   */
  this._$ngbAnimation = $ngbAnimation;

  /**
   * @type {string}
   * @private
   */
  this._contentTemplateUrl = contentTemplateUrl;

  $scope['$ngbAnimation'] = $ngbAnimation;
  $scope['contentTemplateUrl'] = contentTemplateUrl;
  $scope['title'] = this['title'] || 'Modal title';
  $scope['loaderClass'] = this['loaderClass'] || '';
  $scope['close'] = this['close'] || function() { $uibModalInstance.dismiss('close'); };
  $scope['footerButtons'] = this['footerButtons'] || {
      'Ok': function() { $uibModalInstance.close(); },
      'Cancel': function() { $uibModalInstance.dismiss('cancel'); }
    };
};

goog.inherits(ngb.s.ModalController, ngu.Controller);

/**
 * @type {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: function(*), dismiss: function(*)}}
 * @name ngb.s.ModalController#$modalInstance
 */
ngb.s.ModalController.prototype.$modalInstance;

/**
 * @type {angular.$q.Deferred}
 * @name ngb.s.ModalController#$ngbAnimation
 */
ngb.s.ModalController.prototype.$ngbAnimation;

/**
 * @type {string}
 * @name ngb.s.ModalController#contentTemplateUrl
 */
ngb.s.ModalController.prototype.contentTemplateUrl;

Object.defineProperties(ngb.s.ModalController.prototype, {
  '$modalInstance': {
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      return this._$modalInstance;
    })
  },
  '$ngbAnimation': {
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      return this._$ngbAnimation;
    })
  },
  'contentTemplateUrl': {
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      return this._contentTemplateUrl;
    })
  }
});
