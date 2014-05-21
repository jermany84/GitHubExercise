/**
 * Created by synthetic_84 on 3/26/14.
 */

var ResponseModalControllerEvent = {
	NAME : "ResponseModalControllerEvent",
	CLICKED : "Clicked"
};

(function()
{
    this.ResponseModalController = function(viewComponent, stageModel, responseModalModel)
    {
        this.RETURN_KEY = 13;
	    //
        this._responseBtns = [];

        this._viewComponent = viewComponent;
        this._stageModel = stageModel;
        this._responseModalModel = responseModalModel;
        this._viewComponent.init();
    };

    ResponseModalController.prototype = new ModalController();
    ResponseModalController.prototype.constructor = ResponseModalController;

    ResponseModalController.prototype._handleViewEvents = function(e)
    {
    };

    ResponseModalController.prototype._handleModelEvents = function(e)
    {
    };

    ResponseModalController.prototype.updateView = function(value)
    {
        this._viewComponent.updateView(value);
    };

    ResponseModalController.prototype.show = function()
    {
        this._viewComponent.show();
        this._modalModel.active = true;
    };

    ResponseModalController.prototype.hide = function()
    {
        this._viewComponent.hide();
        this._modalModel.active = false;
    };

    ResponseModalController.prototype.getResponseBtns = function()
    {
        return this._responseBtns;
    };

})();