
/**
 * Created by apple on 3/18/14.
 */

(function ()
{
    this.AbstractView = function()
    {
        this._canvas = null;
        this._context = null;
    };

    AbstractView.prototype.init = function()
    {
    };

    AbstractView.prototype.show = function()
    {
    };

    AbstractView.prototype.hide = function()
    {
    };

    AbstractView.prototype.render = function(delta)
    {
    };

    AbstractView.prototype.destroy = function()
    {
    };

    AbstractView.prototype.setCanvas = function(value)
    {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
    };

})();

