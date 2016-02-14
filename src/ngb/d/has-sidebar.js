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
    top = $body.scrollTop();
    var width = $body.width();
    var hasScrollbar = $body.get(0).scrollHeight > $body.height() + parseFloat($body.css('padding-top')) + parseFloat($body.css('padding-bottom')); // 108 = 64 navbar + 44 footer
    $body.css('overflow-y', hasScrollbar ? 'scroll' : 'hidden'); // scroll disables the scrollbar for body, but keeps it
    $body.css('position', 'fixed');
    $body.css('top', -top);
    $body.css('width', width);

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
    $body.css('overflow-y', '');
    $body.css('position', '');
    $body.css('top', '');
    $body.css('width', '');
    $body.scrollTop(top);
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
