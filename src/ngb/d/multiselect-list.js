/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 1:39 PM
 */

goog.provide('ngb.d.MultiselectList');

goog.require('ngu.Directive');

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
          '<div class="">' +
            '<input type="text" class="form-control" placeholder="Search" ng-model="ngbFilter">' +
            '<button class="btn btn-default" ng-click="ngbSelectAll()">Select all</button>' +
            '<button class="btn btn-default" ng-click="ngbMultiselectList.handler.clearSelection()">Clear selection</button>' +
          '</div>' +
        '</form>' +
        '<div class="list-group">' +
          '<a ng-repeat="item in ngbItems | filter:ngbFilter" href="#" class="list-group-item" ng-class="{\'active\': ngbMultiselectList.handler.isSelected(item)}" ng-click="ngbMultiselectList.handler.select(item)" >{{ item.label }}</a>' +
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
