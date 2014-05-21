/**
 * Created by apple on 3/18/14.
 */

var TileModelEvent = {
	UPDATED_TYPE : "TileModelEventUpdatedType",
	UPDATED_FRAME : "TileModelEventUpdatedFrame",
	UPDATED_LAST_FAME : "TileModelEventUpdatedLastFrame",
	UPDATED_X_OFFSET : "TileModelEventUpdatedXOffset",
	UPDATED_Y_OFFSET : "TileModelEventUpdatedYOffset",
	UPDATED_PROJECTILES : "TileModelEventUpdatedProjectiles"
};

(function()
{
    this.TileModel = function()
    {
        this._type = 0;
	    this._width = 32;
	    this._height = 32;
        this._frame = 1;
        this._weight = 100000;
        this._strength = 1;
        this._projectiles = [];
	    this._lastFrame = 0;
	    this._xOffset = 0;
	    this._yOffset = 0;
    };

    TileModel.prototype = new PhysicalModel();
    TileModel.prototype.constructor = TileModel;

	TileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();
	};

    TileModel.prototype.getType = function()
    {
        return this._type;
    };

    TileModel.prototype.setType = function(value)
    {
        this._type = value;
	    this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
	    this._aabb.setFillStyle("#00ff00");
	    //this._aabb.setIsVisible(true);
	    this.setFrame(19);
	    this.sendNotification(TileModelEvent.UPDATED_TYPE, value, this);
    };

    TileModel.prototype.getFrame = function()
    {
        return this._frame;
    };

    TileModel.prototype.setFrame = function(value)
    {
        this._frame = value;
	    this.sendNotification(TileModelEvent.UPDATED_FRAME, value, this);
    };

    TileModel.prototype.getProjectiles = function()
    {
        return this._projectiles;
    };

    TileModel.prototype.setProjectiles = function(value)
    {
        this._projectiles = value;
	    this.sendNotification(TileModelEvent.UPDATED_PROJECTILES, value, this);
    };

    TileModel.prototype.getWidth = function()
    {
        return this._width;
    };

    TileModel.prototype.setWidth = function(value)
    {
        this._width = value;
	    this.sendNotification(TileModelEvent.UPDATED_WIDTH, value, this);
    };

    TileModel.prototype.getHeight = function()
    {
        return this._height;
    };

    TileModel.prototype.setHeight = function(value)
    {
	    if(value === this._height)
	    {
		    return;
	    }
        this._height = value;
	    this.sendNotification(TileModelEvent.UPDATED_HEIGHT, value, this);
    };

    TileModel.prototype.getStrength = function()
    {
        return this._strength;
    };

    TileModel.prototype.setStrength = function(value)
    {
        this._strength = value;
	    this.sendNotification(TileModelEvent.UPDATED_STRENGTH, value, this);
    };

	TileModel.prototype.getLastFrame = function()
	{
		return this._lastFrame;
	};

	TileModel.prototype.setLastFrame = function(value)
	{
		this._lastFrame = value;
		this.sendNotification(TileModelEvent.UPDATED_LAST_FAME, value, this);
	};

	TileModel.prototype.getXOffset = function()
	{
		return this._xOffset;
	};

	TileModel.prototype.setXOffset = function(value)
	{
		this._xOffset = value;
		this.sendNotification(TileModelEvent.UPDATED_X_OFFSET, value, this);
	};

	TileModel.prototype.getYOffset = function()
	{
		return this._yOffset;
	};

	TileModel.prototype.setYOffset = function(value)
	{
		this._yOffset = value;
		this.sendNotification(TileModelEvent.UPDATED_Y_OFFSET, value, this);
	};

})();