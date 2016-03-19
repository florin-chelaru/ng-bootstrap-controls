/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 2/10/2016
 * Time: 11:01 AM
 */

goog.require('ngb.s.Modal');
goog.exportSymbol('ngb.s.ModalProvider', ngb.s.ModalProvider);
goog.exportSymbol('ngb.s.Modal', ngb.s.Modal);
goog.exportSymbol('ngb.s.ModalController', ngb.s.ModalController);

goog.exportProperty(ngb.s.Modal.prototype, 'open', ngb.s.Modal.prototype.open);

goog.exportProperty(ngb.s.ModalController.prototype, 'toggleInputTextEnabled', ngb.s.ModalController.prototype.toggleInputTextEnabled);
goog.exportProperty(ngb.s.ModalController.prototype, 'toggleInputButtonEnabled', ngb.s.ModalController.prototype.toggleInputButtonEnabled);

// Export for inheritance:

if (Object.getOwnPropertyDescriptor(ngb.s.ModalController.prototype, 'close') == undefined) {
  Object.defineProperty(ngb.s.ModalController.prototype, 'close', {
    configurable: true,
    enumerable: true,
    get: /** @type {function (this:ngb.s.ModalController)} */ (function () {
      return this.close;
    }),
    set: /** @type {function (this:ngb.s.ModalController)} */ (function (value) {
      this.close = value;
    })
  });
}
