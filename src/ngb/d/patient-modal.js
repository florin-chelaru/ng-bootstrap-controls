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

ngb.d.PatientModal.options = {
  'template':
    '<div class="ngb-modal-overlay">' +
      '<div class="ngb-loader" ng-class="loaderClass || \'\'"></div>' +
    '</div>' +
    '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
      '<h4 class="modal-title">{{ title }}</h4>' +
    '</div>' +
    '<div class="modal-body">' +
    '</div>' +
    '<div class="modal-footer">' +
      '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
      '<button type="button" class="btn btn-primary">Save changes</button>' +
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

  $body.removeClass('ngb-modal-open');

  var $compile = this._$compile;

  $scope.$on('modal.closing', function() {
    $body.removeClass('ngb-modal-open-blur');
  });

  /*var $body = $('body');
  var $overlay = $(
    '<div class="ngb-modal-overlay">' +
      '<div class="ngb-loader ' + ($scope.loaderClass || '') + '"></div>' +
    '</div>');
  $overlay.appendTo($body);*/

  $scope.contentLoaded = function() {
    var $overlay = $element.find('.ngb-modal-overlay');
    $overlay.one('transitionend', function() {
      $overlay.css('display', 'none');
    });
    $overlay.css('opacity', '0');
    $body.addClass('ngb-modal-open');
  };

  $scope.animationEnd.promise.then(function() {
    $body.addClass('ngb-modal-open-blur');

    var ngContent = angular.element('<div ng-include="\'../res/html/_login.html\'" onload="contentLoaded()"></div>');
    var $content = $compile(ngContent)($scope);

    var $modalBody = $element.find('.modal-body');
    $modalBody.append($content);
  });
};


