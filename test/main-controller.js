/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 1:04 PM
 */

goog.provide('ngb.test.MainController');

goog.require('ngu.Controller');

/**
 * @param {angular.Scope} $scope Angular scope
 * @param {ngb.s.Modal} $ngbModal
 * @param {angular.$templateCache} $templateCache
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.test.MainController = function ($scope, $ngbModal, $templateCache) {
  ngu.Controller.apply(this, arguments);

  /**
   * @type {ngb.s.Modal}
   * @private
   */
  this._$modal = $ngbModal;

  /**
   * @type {string}
   * @private
   */
  this._filter = '';

  /**
   * @type {Array.<string>}
   * @private
   */
  this._allCountries = ['Abkhazia', 'Afghanistan', 'Akrotiri and Dhekelia', 'Aland', 'Albania', 'Algeria', 'American Samoa', 'Andorra',
    'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Ascension Island', 'Australia',
    'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
    'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
    'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands',
    'Central Africa Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia',
    'Comoros', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote d\'lvoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor Ecuador', 'Egypt', 'El Salvador',
    'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland',
    'France', 'French Polynesia', 'Gabon', 'Cambia, The', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece',
    'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guemsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
    'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy',
    'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, N', 'Korea, S', 'Kosovo', 'Kuwait',
    'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Macao', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro',
    'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Nagorno-Karabakh', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
    'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island',
    'Northern Cyprus', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
    'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcaim Islands', 'Poland', 'Portugal', 'Puerto Rico',
    'Qatar', 'Romania', 'Russia', 'Rwanda', 'Sahrawi Arab Democratic Republic', 'Saint-Barthelemy', 'Saint Helena',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and Grenadines',
    'Samos', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
    'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'Somaliland', 'South Africa', 'South Ossetia',
    'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan',
    'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Transnistria', 'Trinidad and Tobago', 'Tristan da Cunha',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
    'Venezuela', 'Vietnam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Yemen', 'Zambia',
    'Zimbabwe'].map(function(country, i) { return {label:country, index: i}});

  /**
   * @type {number}
   * @private
   */
  this._pageSize = 5;

  /**
   * @type {Array.<{index:number, label:string}>}
   * @private
   */
  this._countries = this._allCountries.slice(0, this._pageSize);

  /**
   * @type {number}
   * @private
   */
  this._pageIndex = 0;

  /**
   * @type {Object.<number, {index: number, label: string}>}
   * @private
   */
  this._selection = {};

  /**
   * @type {string}
   * @private
   */
  this._title = 'Countries';

  $templateCache.put('ngb/test/modal/footer.html',
    '<textarea class="form-control" style="width: calc(100% - 40px); float: left; line-height: 1.2; max-height: 100px;" ng-keyup="adjustHeight($event)" />' +
    '<button class="btn btn-primary"><span class="fa fa-chevron-right"></span></button>'
  );
};

goog.inherits(ngb.test.MainController, ngu.Controller);

/**
 * @type {Array.<{index: number, label: string}>}
 * @name ngb.test.MainController#countries
 */
ngb.test.MainController.prototype.countries;

/**
 * @type {string}
 * @name ngb.test.MainController#filter
 */
ngb.test.MainController.prototype.filter;

/**
 * @type {Array.<number>}
 * @name ngb.test.MainController#selection
 */
ngb.test.MainController.prototype.selection;

/**
 * @type {string}
 * @name ngb.test.MainController#selectionStr
 */
ngb.test.MainController.prototype.selectionStr;

/**
 * @type {string>}
 * @name ngb.test.MainController#title
 */
ngb.test.MainController.prototype.title;

Object.defineProperties(ngb.test.MainController.prototype, {
  'countries': {
    get: /** @type {function (this:ngb.test.MainController)} */ (function() {
      return this._countries;
    })
  },
  'filter': {
    get: /** @type {function (this:ngb.test.MainController)} */ (function () {
      return this._filter;
    }),
    set: /** @type {function (this:ngb.test.MainController)} */ (function (value) {
      this._filter = value;
    })
  },
  'selection': {
    get: /** @type {function (this:ngb.test.MainController)} */ (function () {
      return this._selection;
    }),
    set: /** @type {function (this:ngb.test.MainController)} */ (function (value) {
      this._selection = value;
    })
  },
  'selectionStr': {
    get: /** @type {function (this:ngb.test.MainController)} */ (function () {
      return JSON.stringify(this._selection);
    })
  },
  'title': {
    get: /** @type {function (this:ngb.test.MainController)} */ (function () {
      return this._title;
    }),
    set: /** @type {function (this:ngb.test.MainController)} */ (function (value) {
      this._title = value;
    })
  }
});

/**
 * @returns {boolean}
 */
ngb.test.MainController.prototype.loadMore = function() {
  if (this._countries.length >= this._allCountries.length) {
    return false;
  }

  ++this._pageIndex;
  this._countries = this._allCountries.slice(0, this._pageIndex * this._pageSize);
  return true;
};

/**
 */
ngb.test.MainController.prototype.selectAll = function() {
  var self = this;
  this._allCountries.forEach(function(item) { self._selection[item.index] = item; });
};

ngb.test.MainController.prototype.showModal = function() {
  /*$('body').addClass('modal-open');
  $('.modal').css('display', 'block');
  $('.modal-backdrop').css('display', 'block');

  $('.modal')[0].offsetWidth;
  $('.modal-backdrop')[0].offsetWidth;

  $('.modal-backdrop').addClass('in');
  $('.modal').addClass('in');*/
  /*var $q = this._$q;
  var modalInstance = this._$modal.open({
    animation: true,
    //backdrop: 'static',
    //templateUrl: 'res/html/_large-content2.php',
    template: '<div class="ngb-patient-modal"></div>',
    /!*  '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
      '</div>' +
      '<div class="modal-body">' +
        '<p>One fine body…</p>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '<button type="button" class="btn btn-primary">Save changes</button>' +
      '</div>',*!/
    windowTemplateUrl: 'ngb/template/modal/window.html',
    controller: ['$scope', '$uibModalInstance', 'title', 'animationEnd', function($scope, $uibModalInstance, title, animationEnd) {
      $scope.title = title;
      $scope.animationEnd = animationEnd;
       $scope.loaderClass = 'timer-loader';
       $scope.contentUrl = '';
    }],
    size: 'sm',
    resolve: {
      title: function () { return 'My modal'; },
      animationEnd: function() { return $q.defer(); }
    }
  });
*/
  var modalInstance = this._$modal.open({
    'bodyTemplateUrl': 'html/_login.html',
    //'bodyTemplateUrl': 'html/_large-content2.php',
    'title': 'Some title',
    'loaderClass': 'timer-loader',
    'fixed': false,
    'useFooterInputText': true,
    'sendMessage': function(message) { alert(message); }
  });
  modalInstance.result.then(function (selectedItem) {
    //$scope.selected = selectedItem;
    //console.log('selectedItem:', selectedItem);
  }, function () {
    console.info('Modal dismissed at: ' + new Date());
  });


};

/**
 * @constructor
 * @extends {ngb.s.ModalController}
 */
ngb.test.MyModalController = function() {
  ngb.s.ModalController.apply(this, arguments);

  this.$scope.adjustHeight = function($event) {
    $event.target.style.height = (2 + $event.target.scrollHeight) + 'px';
    //o.style.height = (25+o.scrollHeight)+"px";
  }
};

goog.inherits(ngb.test.MyModalController, ngb.s.ModalController);
