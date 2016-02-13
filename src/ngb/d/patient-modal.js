/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/11/2016
 * Time: 9:44 AM
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

  $scope['headerLoaded'] = function() {
    var $modalHeader = $element.find('.modal-header');
    $scope.$watch(function() { return $modalHeader.outerHeight(); },
      function(value, oldValue) {
        $modalContent.css('padding-top', value);
      });
  };

  $scope['footerLoaded'] = function() {
    var $modalFooter = $element.find('.modal-footer');
    $scope.$watch(function() { return $modalFooter.outerHeight(); },
      function(value, oldValue) {
        $modalContent.css('padding-bottom', value);
      });
  };

  $scope['$ngbAnimation'].promise.then(function() {
    $body.addClass('ngb-modal-open-blur');

    var ngContent = angular.element('<div ng-include="bodyTemplateUrl" onload="bodyLoaded()"></div>');
    /** @type {!angular.JQLite|jQuery} */
    var $content = ($compile(ngContent)(/** @type {!angular.Scope} */($scope)));

    var $modalBody = $element.find('.modal-body');
    $modalBody.append(/** @type {jQuery} */($content));
  });
};


