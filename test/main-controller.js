/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/8/2016
 * Time: 1:04 PM
 */

goog.provide('ngb.test.MainController');

goog.require('ngu.Controller');

/**
 * @param {angular.Scope} $scope Angular scope
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.test.MainController = function ($scope) {
  ngu.Controller.apply(this, arguments);

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
   * @type {Array.<string>}
   * @private
   */
  this._countries = this._allCountries.slice(0, this._pageSize);

  /**
   * @type {number}
   * @private
   */
  this._pageIndex = 0;

  /**
   * @type {Object.<number, boolean>}
   * @private
   */
  this._selection = {};
};

goog.inherits(ngb.test.MainController, ngu.Controller);

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
