/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 12:47 PM
 */

goog.provide('ngb.test');

goog.require('ngb.test.MainController');

ngb.test.App = angular.module('ngb.test.App', ['ngb']);

ngb.test.App.controller('ngb.test.MainController', ['$scope', '$ngbModal', '$templateCache', function() {
  return u.reflection.applyConstructor(ngb.test.MainController, arguments);
}]);

ngb.test.App.controller('ngb.test.MyModalController', ['$scope', '$uibModalInstance', '$ngbAnimation', 'bodyTemplateUrl', 'options', function() {
  return u.reflection.applyConstructor(/** @type {function(new: ngu.Controller)} */ (ngb.test.MyModalController), arguments);
}]);

