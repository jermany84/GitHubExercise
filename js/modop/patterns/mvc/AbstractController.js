
/**
 * Created by apple on 3/18/14.
 */

(function()
{
    this.AbstractController = function(viewComponent)
    {
        this._viewComponent = null;
        this._canvas = null;
        this._context = null;
        this._viewComponent = viewComponent;
    };

	AbstractController.prototype.receiveNotification = function(notification)
    {
    };

    AbstractController.prototype.update = function(delta)
    {
        this._viewComponent.render(delta);
    };

    AbstractController.prototype.setCanvas = function(value)
    {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
        this._viewComponent.setCanvas(value);
    };

    AbstractController.prototype.show = function()
    {
        this._viewComponent.show();
    };

    AbstractController.prototype.hide = function()
    {
        this._viewComponent.hide();
    };

    AbstractController.prototype.getView = function()
    {
        return this._viewComponent;
    };

})();

