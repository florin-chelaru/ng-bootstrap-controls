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
 * @param $q
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.HasSidebar = function ($scope, $rootScope, $q) {
  ngu.Directive.apply(this, arguments);

  // All this hacking needs to be done in order to prevent background scrolling on iOS,
  // or scrolling to top when opening the sidebar:
  var $body = $('body');

  /**
   * @type {Object.<string, {in:boolean, $container:jQuery, $backdrop:jQuery}>}
   */
  var sidebarMap = {};

  /** @type {{scrollTop: number, $doc: jQuery}|null} */
  var bodyState = null;

  /**
   * @type {string|null}
   */
  var currentSidebar = null;

  var showSidebar = function(e, sidebarClass) {
    return $q(function(resolve, reject) {
      if (currentSidebar != null) {
        if (currentSidebar == sidebarClass) { resolve(); return; }

        hideSidebar(e, currentSidebar).then(function() {
          showSidebar(e, sidebarClass);
        });
        return;
      }

      sidebarClass = sidebarClass || '';
      currentSidebar = sidebarClass;
      var sidebar = sidebarMap[sidebarClass];
      if (sidebar && sidebar['in']) { resolve(); return; }
      if (!sidebar) {
        sidebar = {
          'in': true,
          '$container': $('.ngb-sidebar-container' + sidebarClass),
          '$backdrop': $('.ngb-sidebar-backdrop' + sidebarClass)
        };
        sidebarMap[sidebarClass] = sidebar;
      }
      sidebar['in'] = true;
      var $container = sidebar['$container'];
      var $backdrop = sidebar['$backdrop'];

      var containerAdded = false;
      var backdropAdded = false;

      $container.one('transitionend', function() {
        containerAdded = true;
        if (backdropAdded) { resolve(); }
      });

      $backdrop.one('transitionend', function() {
        backdropAdded = true;
        if (containerAdded) { resolve(); }
      });

      $container.css('display', 'block');
      u.reflowForTransition($container[0]);

      $backdrop.css('display', 'block');
      u.reflowForTransition($backdrop[0]);

      $body.addClass('ngb-sidebar-in');

      if (!bodyState) {
        bodyState = ngu.disableBodyScroll(true);
      }
    });
  };

  var hideSidebar = function(e, sidebarClass) {
    return $q(function(resolve, reject) {
      sidebarClass = sidebarClass || '';
      var sidebar = sidebarMap[sidebarClass];
      if (!sidebar || !sidebar['in']) { resolve(); return; }

      sidebar['in'] = false;
      var $container = sidebar['$container'];
      var $backdrop = sidebar['$backdrop'];
      currentSidebar = null;

      var containerRemoved = false;
      var backdropRemoved = false;

      $container.one('transitionend', function() {
        $container.css('display', '');
        containerRemoved = true;
        if (backdropRemoved) { resolve(); }
      });
      $backdrop.one('transitionend', function() {
        $backdrop.css('display', '');
        backdropRemoved = true;
        if (containerRemoved) { resolve(); }
      });

      $body.removeClass('ngb-sidebar-in');

      ngu.reEnableBodyScroll(/** @type {{scrollTop: number, $doc: jQuery}} */ (bodyState));
      bodyState = null;
    });
  };

  $rootScope.$on('sidebarOn', showSidebar);

  $rootScope.$on('sidebarOff', hideSidebar);

  $rootScope.$on('sidebarToggle', function(e, sidebarClass) {
    var sidebar = sidebarMap[sidebarClass];
    if (sidebar && sidebar['in']) {
      hideSidebar(e, sidebarClass);
    } else {
      showSidebar(e, sidebarClass);
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
