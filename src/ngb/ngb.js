/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 12:16 PM
 */

goog.provide('ngb');

goog.require('ngu');

goog.require('ngb.d.MultiselectList');

goog.require('ngb.d.PatientModal');
goog.require('ngb.s.Modal');
goog.require('ngb.d.HasSidebar');
goog.require('ngb.d.GoogleMapsSearchbox');

ngb.main = angular.module('ngb', ['ngu', 'ui.bootstrap', 'ngAnimate']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);

ngb.main.directive('ngbPatientModal', ['$compile', function() {
  return ngu.Directive.createNew('ngbPatientModal', /** @type {function(new: ngu.Directive)} */ (ngb.d.PatientModal), arguments, {restrict: 'C'});
}]);

ngb.main.directive('ngbHasSidebar', ['$rootScope', '$q', function() {
  return ngu.Directive.createNew('ngbHasSidebar', /** @type {function(new: ngu.Directive)} */ (ngb.d.HasSidebar), arguments);
}]);

ngb.main.directive('ngbGoogleMapsSearchbox', ['$timeout', function() {
  return ngu.Directive.createNew('ngbGoogleMapsSearchbox', /** @type {function(new: ngu.Directive)} */ (ngb.d.GoogleMapsSearchbox), arguments, {restrict: 'A'});
}]);


ngb.main.provider('$ngbModal', function() {
  return new ngb.s.ModalProvider(/** @type {function(new: ngu.ProviderService)} */ (ngb.s.Modal), ['$uibModal', '$q', '$templateCache']);
});

ngb.main.controller('ngb.s.ModalController', ['$scope', '$uibModalInstance', '$ngbAnimation', 'bodyTemplateUrl', 'options', function() {
  return u.reflection.applyConstructor(/** @type {function(new: ngu.Controller)} */ (ngb.s.ModalController), arguments);
}]);
