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
        '<div class="list-group list">' +
          '<a ng-repeat="item in ngbItems | filter:ngbFilter" href="#" class="list-group-item" ng-class="{\'active\': ngbMultiselectList.isSelected(item)}" ng-click="ngbMultiselectList.select(item)" >{{ item.label }}</a>' +
        '</div>',
      'scope': {
        'ngbItems': '=',
        'ngbFilter': '=',
        'ngbSelection': '=',
        'ngbLoadMore': '&',
        'ngbSelectAll': '&'
      }
    };
  }
});


goog.provide('ngb');

goog.require('ngb.d.MultiselectList');

ngb.main = angular.module('ngb', ['ngu']);

ngb.main.directive('ngbMultiselectList', ['$timeout', function() {
  return ngu.Directive.createNew('ngbMultiselectList', /** @type {function(new: ngu.Directive)} */ (ngb.d.MultiselectList), arguments, {restrict: 'A'});
}]);
