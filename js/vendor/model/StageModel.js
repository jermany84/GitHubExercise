/**
 * Created by apple on 3/18/14.
 */

var StageModelEvent = {
	UPDATED_CANVAS : "StageModelUpdatedCanvas"
};

(function()
{
    this.StageModel = function()
    {
        this._canvas = null;
    };

    StageModel.prototype = new AbstractModel();
    StageModel.prototype.constructor = StageModel;

    StageModel.prototype.getCanvas = function()
    {
        return this._canvas;
    };

	StageModel.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this.sendNotification(StageModelEvent.UPDATED_CANVAS, value, this);
	};

    StageModel.prototype.getWidth = function()
    {
        return this._canvas.width;
    };

    StageModel.prototype.getHeight = function()
    {
        return this._canvas.height;
    };

})();


