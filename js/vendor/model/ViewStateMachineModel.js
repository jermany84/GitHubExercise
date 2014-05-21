/**
 * Created by apple on 4/11/14.
 */

var ViewStateMachineModelEvent = {
    UPDATED_STATE : "ViewStateMachineModelUpdatedState"
};

var ViewStateMachineModelStates = {
	NONE : 0,
	START : 1,
	GAME : 2,
	GAME_OVER : 3
};

(function()
{
	this.ViewStateMachineModel = function()
	{
		this._state = ViewStateMachineModelStates.NONE;
	};

	ViewStateMachineModel.prototype = new AbstractModel();
	ViewStateMachineModel.prototype.constructor = ViewStateMachineModel;

	ViewStateMachineModel.prototype.getState = function()
	{
		return this._state;
	};

	ViewStateMachineModel.prototype.setState = function(value)
	{
		this._state = value;
		this.sendNotification(ViewStateMachineModelEvent.UPDATED_STATE, value, this);
	};

})();

