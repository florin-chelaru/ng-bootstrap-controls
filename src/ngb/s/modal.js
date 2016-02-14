/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/10/2016
 * Time: 11:01 AM
 */

goog.provide('ngb.s.ModalProvider');
goog.provide('ngb.s.Modal');
goog.provide('ngb.s.ModalController');

goog.require('ngu.Provider');
goog.require('ngu.ProviderService');
goog.require('ngu.Controller');

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
   * @type {number}
   * @private
   */
  this._openInstances = 0;

  /**
   * @type {{scrollTop: number, $doc: jQuery}|null}
   * @private
   */
  this._bodyStateBeforeModal = null;

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

  $templateCache.put('ngb/template/modal/header.html',
    '<button type="button" class="close" ng-click="close()" aria-hidden="true">×</button>' +
    '<h4 class="modal-title">{{ title }}</h4>');

  $templateCache.put('ngb/template/modal/footer-buttons.html',
    '<button ng-repeat="(btnLabel, btnFunc) in footerButtons" ' +
    'type="button" class="btn" ng-class="$index == 0 ? \'btn-primary\' : \'btn-default\'" ' +
    'ng-click="btnFunc()">{{ btnLabel }}</button>');

  $templateCache.put('ngb/template/modal/footer-input-text.html',
    '<form role="form" class="input-group">' +
      '<textarea class="form-control ngb-modal-input-text" ng-keyup="adjustHeight($event)" ng-model="$parent.inputText" placeholder="Write an answer..."></textarea>' +
      '<span class="btn btn-primary input-group-addon" ng-click="sendMessage()"><span class="fa fa-chevron-right"></span></span>' +
      // The one below doesn't stretch the button to the height of the text area:
      /*'<span class="input-group-btn" >' +
        '<button class="btn btn-primary" ng-click="sendMessage()"><span class="fa fa-chevron-right"></span></button>' +
      '</span>' +*/
    '</form>'
  );
};

goog.inherits(ngb.s.Modal, ngu.ProviderService);

/**
 * @param {{animation: (boolean|undefined), appendTo: (jQuery|undefined), backdrop: (boolean|string|undefined),
 *   backdropClass: (string|undefined), bindToController: (boolean|undefined),
 *   controller: (Function|string|Array|undefined), controllerAs: (string|undefined), keyboard: (boolean|undefined),
 *   openedClass: (string|undefined), resolve: (Object|undefined), $scope: (angular.Scope|undefined), size: (string|undefined),
 *   template: (string|undefined), templateUrl: (string|undefined), windowClass: (string|undefined),
 *   windowTemplateUrl: (string|undefined), windowTopClass: (string|undefined),
 *   bodyTemplateUrl: string, title: (string|undefined), loaderClass: (string|undefined), fixed: (boolean|undefined),
 *   useFooterInputText: (boolean|undefined), sendMessage: (Function|undefined),
 *   headerTemplateUrl: (string|undefined), footerTemplateUrl: (string|undefined)
 * }} [modalOptions]
 * @returns {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}}
 */
ngb.s.Modal.prototype.open = function(modalOptions) {
  this._disableBodyScroll();
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

  if (options['fixed']) {
    options['windowTopClass'] = (options['windowTopClass'] || '') + ' ngb-modal-fixed';
  }

  var $ngbAnimation = $q.defer();
  if (!animation) { $ngbAnimation.resolve(); }
  options['resolve'] = u.extend({}, {
    '$ngbAnimation': function() { return $ngbAnimation; },
    'bodyTemplateUrl': function() { return options['bodyTemplateUrl']; },
    'options': function() {
      return {
        'headerTemplateUrl': options['headerTemplateUrl'] || 'ngb/template/modal/header.html',
        'footerTemplateUrl': options['footerTemplateUrl'] ||
        (options['useFooterInputText'] ? 'ngb/template/modal/footer-input-text.html' : 'ngb/template/modal/footer-buttons.html'),
        'title': options['title'] || 'Modal title',
        'loaderClass': options['loaderClass'] || 'timer-loader',
        'sendMessage': options['sendMessage'],
        'fixed': !!options['fixed']
      };
    }
  }, options['resolve'] || {});

  var $modalInstance = this._$uibModal['open'](options);

  var self = this;
  $modalInstance.closed.then(function() {
    self._reEnableBodyScroll();
  });

  return $modalInstance;
};

ngb.s.Modal.prototype._disableBodyScroll = function() {
  ++this._openInstances;
  if (this._openInstances > 1) { return; }
  this._bodyStateBeforeModal = ngu.disableBodyScroll();
};

ngb.s.Modal.prototype._reEnableBodyScroll = function() {
  --this._openInstances;
  if (this._openInstances > 0) { return; }
  ngu.reEnableBodyScroll(/** @type {{scrollTop: number, $doc: jQuery}} */ (this._bodyStateBeforeModal));
  this._bodyStateBeforeModal = null;
};

/**
 * @param {angular.Scope} $scope
 * @param {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}} $uibModalInstance
 * @param {angular.$q.Deferred} $ngbAnimation
 * @param {string} bodyTemplateUrl
 * @param {{headerTemplateUrl: string, footerTemplateUrl: string, title: string, loaderClass: string, sendMessage: (Function|undefined), fixed: boolean}} options
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.s.ModalController = function($scope, $uibModalInstance, $ngbAnimation, bodyTemplateUrl, options) {
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
  this._bodyTemplateUrl = bodyTemplateUrl;

  $scope['$ngbAnimation'] = $ngbAnimation;
  $scope['bodyTemplateUrl'] = bodyTemplateUrl;
  $scope['title'] = options['title'];
  $scope['loaderClass'] = options['loaderClass'];
  $scope['headerTemplateUrl'] = options['headerTemplateUrl'];
  $scope['footerTemplateUrl'] = options['footerTemplateUrl'];
  $scope['fixed'] = options['fixed'];

  var self = this;
  $scope['close'] = function() { self.close(); };
  $scope['footerButtons'] = this['footerButtons'];

  var initialHeight;
  var textBox;
  $scope['adjustHeight'] = function($event) {
    var t = $event.target;
    var $t = $(t);
    if (initialHeight == undefined) {
      initialHeight = $t.outerHeight();
      textBox = t;
    }
    t.style.height = (parseFloat($t.css('border-top-width')) + parseFloat($t.css('border-bottom-width')) + t.scrollHeight) + 'px';
  };
  $scope['inputText'] = '';
  $scope['sendMessage'] = function() {
    if (options['sendMessage']) {
      var message = $scope['inputText'];
      $scope['inputText'] = '';
      if (textBox) {
        textBox.style.height = initialHeight + 'px';
        textBox.value = '';
      }
      options['sendMessage'](message);
    }
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
 * @name ngb.s.ModalController#bodyTemplateUrl
 */
ngb.s.ModalController.prototype.bodyTemplateUrl;

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
  'bodyTemplateUrl': {
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      return this._bodyTemplateUrl;
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
