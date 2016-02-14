var ngb = {
  d: {},
  s: {}
};

/**
 * @param {angular.Scope} $scope
 * @param {angular.$compile} $compile
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.PatientModal = function ($scope, $compile) {};

ngb.d.PatientModal.options = {};

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.PatientModal.prototype.link = function ($scope, $element, $attrs) {};

/**
 * @param {function(new: ngu.ProviderService)} serviceCtor
 * @param {Array.<string>} [serviceArgs]
 * @constructor
 * @extends {ngu.Provider}
 */
ngb.s.ModalProvider = function(serviceCtor, serviceArgs) {};

/**
 * @param {ngu.Provider} provider
 * @param $uibModal
 * @param {angular.$q} $q
 * @param {angular.$templateCache} $templateCache
 * @constructor
 * @extends {ngu.ProviderService}
 */
ngb.s.Modal = function(provider, $uibModal, $q, $templateCache) {};

/**
 * @param {{animation: (boolean|undefined), appendTo: (jQuery|undefined), backdrop: (boolean|string|undefined),
 *   backdropClass: (string|undefined), bindToController: (boolean|undefined),
 *   controller: (Function|string|Array|undefined), controllerAs: (string|undefined), keyboard: (boolean|undefined),
 *   openedClass: (string|undefined), resolve: (Object|undefined), $scope: (angular.Scope|undefined), size: (string|undefined),
 *   template: (string|undefined), templateUrl: (string|undefined), windowClass: (string|undefined),
 *   windowTemplateUrl: (string|undefined), windowTopClass: (string|undefined),
 *   bodyTemplateUrl: string, title: (string|undefined), loaderClass: (string|undefined), fixed: (boolean|undefined),
 *   useFooterInputText: (boolean|undefined), sendMessage: (Function|undefined),
 *   headerTemplateUrl: (string|undefined), footerTemplateUrl: (string|undefined)
 * }} [modalOptions]
 * @returns {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}}
 */
ngb.s.Modal.prototype.open = function(modalOptions) {};

/**
 * @param {angular.Scope} $scope
 * @param {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: Function, dismiss: Function}} $uibModalInstance
 * @param {angular.$q.Deferred} $ngbAnimation
 * @param {string} bodyTemplateUrl
 * @param {{headerTemplateUrl: string, footerTemplateUrl: string, title: string, loaderClass: string, sendMessage: (Function|undefined)}} options
 * @constructor
 * @extends {ngu.Controller}
 */
ngb.s.ModalController = function($scope, $uibModalInstance, $ngbAnimation, bodyTemplateUrl, options) {};

/**
 * @type {{result: angular.$q.Promise, opened: angular.$q.Promise, closed: angular.$q.Promise, rendered: angular.$q.Promise, close: function(*), dismiss: function(*)}}
 * @name ngb.s.ModalController#$modalInstance
 */
ngb.s.ModalController.prototype.$modalInstance;

/**
 * @type {angular.$q.Deferred}
 * @name ngb.s.ModalController#$ngbAnimation
 */
ngb.s.ModalController.prototype.$ngbAnimation;

/**
 * @type {string}
 * @name ngb.s.ModalController#bodyTemplateUrl
 */
ngb.s.ModalController.prototype.bodyTemplateUrl;

/**
 * @type {Object.<string, Function>}
 * @name ngb.s.ModalController#footerButtons
 */
ngb.s.ModalController.prototype.footerButtons;

/**
 */
ngb.s.ModalController.prototype.close = function() {};

/**
 * @param {angular.Scope} $scope
 * @param {angular.$timeout} $timeout
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.MultiselectList = function ($scope, $timeout) {};

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.MultiselectList.prototype.link = function ($scope, $element, $attrs) {};

/**
 * @param {{label:string, index:number}} item
 * @returns {boolean}
 */
ngb.d.MultiselectList.prototype.isSelected = function(item) {};

/**
 * @param {{label:string, index:number}} item
 */
ngb.d.MultiselectList.prototype.select = function(item) {};

/**
 */
ngb.d.MultiselectList.prototype.clearSelection = function() {};


/**
 * @param {angular.Scope} $scope
 * @param $rootScope {angular.$rootScope}
 * @constructor
 * @extends {ngu.Directive}
 */
ngb.d.HasSidebar = function ($scope, $rootScope) {};

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @override
 */
ngb.d.HasSidebar.prototype.link = function ($scope, $element, $attrs) {};
