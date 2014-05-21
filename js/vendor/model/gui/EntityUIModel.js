/**
 * Created by apple on 4/10/14.
 */

var EntityUIModelEvent = {
	UPDATED_TYPE : "EntityUIModelEventUpdatedType",
	UPDATED_ENTITY : "EntityUIModelEventUpdatedEntity",
	UPDATED_BUTTON_1_ACTION_MODEL : "EntityUIModelEventUpdatedButton1ActionModel",
	UPDATED_BUTTON_2_ACTION_MODEL : "EntityUIModelEventUpdatedButton2ActionModel",
	UPDATED_CURSOR_MODEL : "EntityUIModelEventUpdatedCursorModel",
	UPDATED_HEALTH_UI_MODEL : "EntityUIModelEventUpdatedHealthUIModel"
};

(function()
{
	this.EntityUIModel = function()
	{
		this._type = 0;
		this._yAcceleration = 1000;
		this._entityModel = null;
		this._button1ActionModel = new PickupTileModel();
		this._button2ActionModel = new PickupTileModel();
		this._cursorUIModel = new CursorUIModel();
		this._healthUIModel = new HealthUIModel();
	};

	EntityUIModel.prototype = new PhysicalModel();
	EntityUIModel.prototype.constructor = EntityUIModel;

	EntityUIModel.prototype.getType = function()
	{
		return this._type;
	};

	EntityUIModel.prototype.setType = function(value)
	{
		this._type = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_TYPE, value, this);
	};

	EntityUIModel.prototype.getEntityModel = function()
	{
		return this._entityModel;
	};

	EntityUIModel.prototype.setEntityModel = function(value)
	{
		this._entityModel = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_ENTITY, value, this);
	};

	EntityUIModel.prototype.getButton1ActionModel = function()
	{
		return this._button1ActionModel;
	};

	EntityUIModel.prototype.setButton1ActionModel = function(value)
	{
		this._button1ActionModel = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_BUTTON_1_ACTION_MODEL, value, this);
	};

	EntityUIModel.prototype.getButton2ActionModel = function()
	{
		return this._button2ActionModel;
	};

	EntityUIModel.prototype.setButton2ActionModel = function(value)
	{
		this._button2ActionModel = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_BUTTON_2_ACTION_MODEL, value, this);
	};

	EntityUIModel.prototype.getCursorModel = function()
	{
		return this._cursorUIModel;
	};

	EntityUIModel.prototype.setCursorModel = function(value)
	{
		this._cursorUIModel = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_CURSOR_MODEL, value, this);
	};

	EntityUIModel.prototype.getHealthUIModel = function()
	{
		return this._healthUIModel;
	};

	EntityUIModel.prototype.setHealthUIModel = function(value)
	{
		this._healthUIModel = value;
		this.sendNotification(EntityUIModelEvent.UPDATED_HEALTH_UI_MODEL, value, this);
	};

})();

