/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 12:16 PM
 */

goog.provide('ngb');

goog.require('ngb.d.MultiselectList');

ngb.main = angular.module('ngb', ['ngu']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);
