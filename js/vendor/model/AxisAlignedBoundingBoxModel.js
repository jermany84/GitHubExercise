/**
 * Created by apple on 5/2/14.
 */

var AxisAlignedBoundingBoxModelEvent = {
	UPDATED_X : "AxisAlignedBoundingBoxModelEventUpdatedX",
	UPDATED_Y : "AxisAlignedBoundingBoxModelEventUpdatedY",
	UPDATED_WIDTH : "AxisAlignedBoundingBoxModelEventUpdatedWidth",
	UPDATED_HEIGHT : "AxisAlignedBoundingBoxModelEventUpdatedHeight",
	UPDATED_SCALE_X : "AxisAlignedBoundingBoxModelEventUpdatedScaleX",
	UPDATED_SCALE_Y : "AxisAlignedBoundingBoxModelEventUpdatedScaleY",
	UPDATED_IS_VISIBLE : "AxisAlignedBoundingBoxModelEventUpdatedIsVisible"
};

(function()
{
	this.AxisAlignedBoundingBoxModel = function(parentModel, width, height)
	{
		this._parentModel = parentModel || null;
		this._x = 0;
		this._y = 0;
		this._width = width || 0;
		this._height = height || 0;
		this._scaleX = 1;
		this._scaleY = 1;
		this._isVisible = false;
		this._fillStyle = "#00ff00";
	};

	AxisAlignedBoundingBoxModel.prototype = new AbstractModel();
	AxisAlignedBoundingBoxModel.prototype.constructor = AxisAlignedBoundingBoxModel;

	AxisAlignedBoundingBoxModel.prototype.getParentModel = function()
	{
		return this._parentModel;
	};

	AxisAlignedBoundingBoxModel.prototype.setParentModel = function(value)
	{
		this._parentModel = value;
		this.xCenterAlign();
		this.yCenterAlign();
	};

	AxisAlignedBoundingBoxModel.prototype.xCenterAlign = function()
	{
		this._x = ((this._parentModel.getWidth() - this._width) * 0.5) + this._parentModel.getX();
	};

	AxisAlignedBoundingBoxModel.prototype.yCenterAlign = function()
	{
		this._y = ((this._parentModel.getHeight() - this._height) * 0.5) + this._parentModel.getY();
	};

	AxisAlignedBoundingBoxModel.prototype.leftAlign = function()
	{
		this._x = this._parentModel.getX();
	};

	AxisAlignedBoundingBoxModel.prototype.rightAlign = function()
	{
		this._x = this._parentModel.getX() - this._parentModel.getWidth();
	};

	AxisAlignedBoundingBoxModel.prototype.topAlign = function()
	{
		this._y = this._parentModel.getY();
	};

	AxisAlignedBoundingBoxModel.prototype.bottomAlign = function()
	{
		this._y = this._parentModel.getY() - this._parentModel.getHeight();
	};

	// Physics

	AxisAlignedBoundingBoxModel.prototype.getX = function()
	{
		return this._x;
	};

	AxisAlignedBoundingBoxModel.prototype.getY = function()
	{
		return this._y;
	};

	AxisAlignedBoundingBoxModel.prototype.getWidth = function()
	{
		return this._width;
	};

	AxisAlignedBoundingBoxModel.prototype.setWidth = function(value)
	{
		this._width = value;
		this.setScaleX(1);
		this.sendNotification(AxisAlignedBoundingBoxModelEvent.UPDATED_WIDTH, value, this);
	};

	AxisAlignedBoundingBoxModel.prototype.getHeight = function()
	{
		return this._height;
	};

	AxisAlignedBoundingBoxModel.prototype.setHeight = function(value)
	{
		this._height = value;
		this.setScaleY(1);
		this.sendNotification(AxisAlignedBoundingBoxModelEvent.UPDATED_HEIGHT, value, this);
	};

	AxisAlignedBoundingBoxModel.prototype.getScaleX = function()
	{
		return this._scaleX;
	};

	AxisAlignedBoundingBoxModel.prototype.setScaleX = function(value)
	{
		this._scaleX = value;
		this._width *= this._scaleX;
		this.sendNotification(AxisAlignedBoundingBoxModelEvent.UPDATED_SCALE_X, value, this);
	};

	AxisAlignedBoundingBoxModel.prototype.getScaleY = function()
	{
		return this._scaleY;
	};

	AxisAlignedBoundingBoxModel.prototype.setScaleY = function(value)
	{
		this._scaleY = value;
		this._height *= this._scaleY;
		this.sendNotification(AxisAlignedBoundingBoxModelEvent.UPDATED_SCALE_Y, value, this);
	};

	AxisAlignedBoundingBoxModel.prototype.getIsVisible = function()
	{
		return this._isVisible;
	};

	AxisAlignedBoundingBoxModel.prototype.setIsVisible = function(value)
	{
		this._isVisible = value;
		this.sendNotification(AxisAlignedBoundingBoxModelEvent.UPDATED_IS_VISIBLE, value, this);
	};

	AxisAlignedBoundingBoxModel.prototype.getFillStyle = function()
	{
		return this._fillStyle;
	};

	AxisAlignedBoundingBoxModel.prototype.setFillStyle = function(value)
	{
		this._fillStyle = value;
	};

})();

