/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 3/26/2016
 * Time: 3:52 PM
 */

goog.provide('ngb.d.GoogleMapsSearchbox');

goog.require('ngu.Directive');

/**
 * @param {angular.Scope} $scope
 * @param {angular.$timeout} $timeout
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.GoogleMapsSearchbox = function ($scope, $timeout) {
  ngu.Directive.apply(this, arguments);

  /**
   * @type {angular.$timeout}
   * @private
   */
  this._$timeout = $timeout;
};

goog.inherits(ngb.d.GoogleMapsSearchbox, ngu.Directive);

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.GoogleMapsSearchbox.prototype.link = function ($scope, $element, $attrs) {
  var self = this;
  var input = $element[0];
  var searchBox = new google.maps.places.SearchBox(input);

  searchBox.addListener('places_changed', function() {
    $element.triggerHandler('input');
    if ($scope['ngbPlacesChanged']) {
      $scope['ngbPlacesChanged']({'searchBox': searchBox});
    }
  });
};

ngb.d.GoogleMapsSearchbox['options'] = {
  'scope': {
    'ngbPlacesChanged': '&'
  }
};
