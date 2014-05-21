/**
 * Created by synthetic_84 on 3/26/14.
 */

(function ()
{
    this.ModalView = function()
    {
        this._modalModel = null;
    };

    ModalView.prototype = new AbstractView();
    ModalView.prototype.constructor = ModalView;

    ModalView.prototype.init = function()
    {
    };

    ModalView.prototype.show = function()
    {
    };

    ModalView.prototype.hide = function()
    {
    };

    ModalView.prototype.render = function (delta)
    {
        this._context.save();
        this._context.translate(this._modalModel.getX(), this._modalModel.getY());
        this._sprite.update(delta);
        this._sprite.render(this._context);
        this._context.restore();
    };

    ModalView.prototype.updateModalModel = function(value)
    {
        this._modelModel = value;
    };

})();