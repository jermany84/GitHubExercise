/**
 * Created by synthetic_84 on 3/26/14.
 */

var ModalControllerEvent = {
	NAME : "ModalControllerEvent",
	CLICKED_CLOSE : "ClickedClose"
};

(function()
{
    this.ModalController = function(viewComponent, stageModel, modalModel)
    {
	    this.ESCAPE_KEY = 27;
	    //
        this._stageModel = null;
        this._modalModel = null;
        this._viewComponent = viewComponent;
        this._stageModel = stageModel;
        this._modalModel = modalModel;

        this._viewComponent.init();
    };

    ModalController.prototype = new AbstractController();
    ModalController.prototype.constructor = ModalController;

    ModalController.prototype._handleViewEvents = function(e)
    {
    };

    ModalController.prototype._handleModelEvents = function(e)
    {
    };

    ModalController.prototype.show = function()
    {
        this._viewComponent.show();
        this._modalModel.active = true;
    };

    ModalController.prototype.hide = function()
    {
        this._viewComponent.hide();
        this._modalModel.active = false;
    };

    ModalController.prototype.updateView = function(value)
    {
        this._viewComponent.updateView(value);
    };

})();