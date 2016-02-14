/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/5/2016
 * Time: 10:37 AM
 */

goog.provide('ngb.d.HasSidebar');

goog.require('ngu.Directive');

/**
 * @param {angular.Scope} $scope
 * @param $rootScope {angular.$rootScope}
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.HasSidebar = function ($scope, $rootScope) {
  ngu.Directive.apply(this, arguments);

  // All this hacking needs to be done in order to prevent background scrolling on iOS,
  // or scrolling to top when opening the sidebar:
  var $body = $('body');
  var sidebarIn = false;
  var top;
  var $sidebarContainer;
  var $sidebarBackdrop;

  /** @type {{scrollTop: number, $doc: jQuery}|null} */
  var bodyState = null;

  var showSidebar = function() {
    if (sidebarIn) { return; }
    if (!$sidebarContainer) {
      $sidebarContainer = $('.ngb-sidebar-container');
      $sidebarBackdrop = $('.ngb-sidebar-backdrop');
    }
    $sidebarContainer.css('display', 'block');
    u.reflowForTransition($sidebarContainer[0]);

    $sidebarBackdrop.css('display', 'block');
    u.reflowForTransition($sidebarBackdrop[0]);

    $body.addClass('ngb-sidebar-in');

    bodyState = ngu.disableBodyScroll(true);

    sidebarIn = true;
  };

  var hideSidebar = function() {
    if (!sidebarIn) { return; }
    if (!$sidebarContainer) {
      $sidebarContainer = $('.ngb-sidebar-container');
      $sidebarBackdrop = $('.ngb-sidebar-backdrop');
    }
    $sidebarContainer.one('transitionend', function() {
      $sidebarContainer.css('display', '');
    });
    $sidebarBackdrop.one('transitionend', function() {
      $sidebarBackdrop.css('display', '');
    });
    $body.removeClass('ngb-sidebar-in');

    ngu.reEnableBodyScroll(/** @type {{scrollTop: number, $doc: jQuery}} */ (bodyState));
    bodyState = null;

    sidebarIn = false;
  };

  $rootScope.$on('sidebarOn', showSidebar);

  $rootScope.$on('sidebarOff', hideSidebar);

  $rootScope.$on('sidebarToggle', function() {
    if (sidebarIn) {
      hideSidebar();
    } else {
      showSidebar();
    }
  });
};

goog.inherits(ngb.d.HasSidebar, ngu.Directive);

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.HasSidebar.prototype.link = function ($scope, $element, $attrs) {};
