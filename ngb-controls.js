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


goog.provide('ngb.d.PatientModal');

/**
 * @param {angular.Scope} $scope
 * @param {angular.$compile} $compile
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.PatientModal = function ($scope, $compile) {
  ngu.Directive.apply(this, arguments);

  /**
   * @type {angular.$compile}
   * @private
   */
  this._$compile = $compile;
};

goog.inherits(ngb.d.PatientModal, ngu.Directive);

ngb.d.PatientModal['options'] = {
  'template':
    '<div class="ngb-modal-overlay">' +
      '<div class="ngb-loader" ng-class="loaderClass || \'\'"></div>' +
    '</div>' +
    '<div class="modal-header" ng-include="headerTemplateUrl" onload="headerLoaded()">' +
    '</div>' +
    '<div class="modal-body">' +
    '</div>' +
    '<div class="modal-footer" ng-include="footerTemplateUrl" onload="footerLoaded()">' +
    '</div>'
};

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.PatientModal.prototype.link = function ($scope, $element, $attrs) {
  var $body = $('body');
  var $modalContent = $element.parent();

  $body.removeClass('ngb-modal-open');

  var $compile = this._$compile;

  $scope.$on('modal.closing', function() {
    $body.removeClass('ngb-modal-open-blur');
  });

  $scope['bodyLoaded'] = function() {
    var $overlay = $element.find('.ngb-modal-overlay');
    $overlay.one('transitionend', function() {
      $overlay.css('display', 'none');
    });
    $overlay.css('opacity', '0');
    $body.addClass('ngb-modal-open');
  };

  if ($scope['fixed']) {
    $scope['headerLoaded'] = function () {
      var $modalHeader = $element.find('.modal-header');
      $scope.$watch(function () {
          return $modalHeader.outerHeight();
        },
        function (value, oldValue) {
          $modalContent.css('padding-top', value);
        });
    };

    $scope['footerLoaded'] = function () {
      var $modalFooter = $element.find('.modal-footer');
      $scope.$watch(function () {
          return $modalFooter.outerHeight();
        },
        function (value, oldValue) {
          $modalContent.css('padding-bottom', value);
        });
    };
  }

  $scope['$ngbAnimation'].promise.then(function() {
    $body.addClass('ngb-modal-open-blur');

    var ngContent = angular.element('<div ng-include="bodyTemplateUrl" onload="bodyLoaded()"></div>');
    /** @type {!angular.JQLite|jQuery} */
    var $content = ($compile(ngContent)(/** @type {!angular.Scope} */($scope)));

    var $modalBody = $element.find('.modal-body');
    $modalBody.append(/** @type {jQuery} */($content));
  });
};




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

  return this._$uibModal['open'](options);
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
  $scope['adjustHeight'] = function($event) {
    var t = $event.target;
    var $t = $(t);
    t.style.height = (parseFloat($t.css('border-top-width')) + parseFloat($t.css('border-bottom-width')) + t.scrollHeight) + 'px';
  };
  $scope['inputText'] = '';
  $scope['sendMessage'] = function() {
    if (options['sendMessage']) {
      var message = $scope['inputText'];
      $scope['inputText'] = '';
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


goog.provide('ngb');

goog.require('ngb.d.MultiselectList');

goog.require('ngb.d.PatientModal');
goog.require('ngb.s.Modal');

ngb.main = angular.module('ngb', ['ngu', 'ui.bootstrap', 'ngAnimate']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);

ngb.main.directive('ngbPatientModal', ['$compile', function() {
  return ngu.Directive.createNew('ngbPatientModal', /** @type {function(new: ngu.Directive)} */ (ngb.d.PatientModal), arguments, {restrict: 'C'});
}]);

ngb.main.provider('$ngbModal', function() {
  return new ngb.s.ModalProvider(/** @type {function(new: ngu.ProviderService)} */ (ngb.s.Modal), ['$uibModal', '$q', '$templateCache']);
});

ngb.main.controller('ngb.s.ModalController', ['$scope', '$uibModalInstance', '$ngbAnimation', 'bodyTemplateUrl', 'options', function() {
  return u.reflection.applyConstructor(/** @type {function(new: ngu.Controller)} */ (ngb.s.ModalController), arguments);
}]);
