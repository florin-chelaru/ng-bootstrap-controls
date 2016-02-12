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
    'useDefault': false,
    'animation': true
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
    '<div modal-render="{{$isRendered}}" tabindex="-1" role="dialog" class="modal ngb-modal" ' +
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
 * @param {{animation: (boolean|undefined), appendTo: (jQuery|undefined), backdrop: (boolean|string|undefined),
 *   backdropClass: (string|undefined), bindToController: (boolean|undefined),
 *   controller: (Function|string|Array|undefined), controllerAs: (string|undefined), keyboard: (boolean|undefined),
 *   openedClass: (string|undefined), resolve: (Object|undefined), $scope: angular.Scope, size: (string|undefined),
 *   template: (string|undefined), templateUrl: (string|undefined), windowClass: (string|undefined),
 *   windowTemplateUrl: (string|undefined), windowTopClass: (string|undefined),
 *   contentTemplateUrl: string, title: (string|undefined), loaderClass: (string|undefined)
 * }} [modalOptions]
 * @returns {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}}
 */
ngb.s.Modal.prototype.open = function(modalOptions) {
  var $q = this._$q;

  var options = modalOptions || {};

  if (options['useDefault'] || (options['useDefault'] !== false && this['provider']['options']['useDefault'])) {
    return this._$uibModal['open'](options);
  }

  var animation = ('animation' in options) ? !!options['animation'] : !!this['provider']['options']['animation'];
  options['templateUrl'] = 'ngb/template/modal/content.html';
  delete options['template']; // this is only used when in default mode
  options['windowTemplateUrl'] = 'ngb/template/modal/window.html';
  options['controller'] = options['controller'] || 'ngb.s.ModalController';

  var $ngbAnimation = $q.defer();
  if (!animation) { $ngbAnimation.resolve(); }
  options['resolve'] = u.extend({}, {
    '$ngbAnimation': function() { return $ngbAnimation; },
    'contentTemplateUrl': function() { return options['contentTemplateUrl']; },
    'title': function() { return options['title'] || 'Modal title'; },
    'loaderClass': function() { return options['loaderClass'] || 'timer-loader'; }
  }, options['resolve'] || {});

  return this._$uibModal['open'](options);
};

/**
 * @param {angular.Scope} $scope
 * @param {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}} $uibModalInstance
 * @param {angular.$q.Deferred} $ngbAnimation
 * @param {string} contentTemplateUrl
 * @param {string} title
 * @param {string} loaderClass
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.s.ModalController = function($scope, $uibModalInstance, $ngbAnimation, contentTemplateUrl, title, loaderClass) {
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
  $scope['title'] = title;
  $scope['loaderClass'] = loaderClass;

  var self = this;
  $scope['close'] = function() { self.close(); };
  $scope['footerButtons'] = this['footerButtons'];
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

/**
 * @type {Object.<string, Function>}
 * @name ngb.s.ModalController#footerButtons
 */
ngb.s.ModalController.prototype.footerButtons;

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
  },
  'footerButtons': {
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      var $modalInstance = this._$modalInstance;
      return {
        'Ok': function() { $modalInstance['close'](); },
        'Cancel': function() { $modalInstance['dismiss']('cancel'); }
      };
    })
  }
});

/**
 */
ngb.s.ModalController.prototype.close = function() {
  this._$modalInstance['dismiss']('close');
};
