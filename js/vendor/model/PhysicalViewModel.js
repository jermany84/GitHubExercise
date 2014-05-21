/**
 * Created by apple on 4/23/14.
 */

var PhysicalModelEvent = {
	UPDATED_X : "PhysicalModelEventUpdatedX",
	UPDATED_Y : "PhysicalModelEventUpdatedY",
	UPDATED_WIDTH : "PhysicalModelEventUpdatedWidth",
	UPDATED_HEIGHT : "PhysicalModelEventUpdatedHeight",
	UPDATED_WEIGHT : "PhysicalModelEventUpdatedWeight",
	UPDATED_STRENGTH : "PhysicalModelEventUpdatedStrength",
	UPDATED_X_ACCELERATION : "PhysicalModelEventUpdatedXAcceleration",
	UPDATED_Y_ACCELERATION : "PhysicalModelEventUpdatedYAcceleration",
	UPDATED_X_VELOCITY : "PhysicalModelEventUpdatedXVelocity",
	UPDATED_Y_VELOCITY : "PhysicalModelEventUpdatedYVelocity",
	UPDATED_X_FRICTION : "PhysicalModelEventUpdatedXFriction",
	UPDATED_Y_FRICTION : "PhysicalModelEventUpdatedYFriction",
	UPDATED_LOCK_X : "PhysicalModelEventUpdatedLockX",
	UPDATED_LOCK_Y : "PhysicalModelEventUpdatedLockY",
	UPDATED_AABB : "PhysicalModelEventUpdatedAABB"
};

(function()
{
	this.PhysicalModel = function()
	{
		this.setId(getUniqueId());
		this._x = 0;
		this._y = 0;
		this._width = 0;
		this._height = 0;
		this._xAcceleration = 0;
		this._yAcceleration = 0;
		this._xVelocity = 0;
		this._yVelocity = 0;
		this._xFriction = 0.73;
		this._yFriction = 0.73;
		this._weight = 0;
		this._scaleX = 1;
		this._scaleY = 1;
		this._lockXVelocity = false;
		this._lockYVelocity = false;
		this._aabb = new AxisAlignedBoundingBoxModel(this, 0, 0);
		this._easyStar = new EasyStar.js();
	};

	PhysicalModel.prototype = new AbstractModel();
	PhysicalModel.prototype.constructor = PhysicalModel;

	PhysicalModel.prototype.setGrid = function(value, acceptableTilesArray)
	{
		this._easyStar.setGrid(value);
		this._easyStar.setAcceptableTiles(acceptableTilesArray);
		this._easyStar.setIterationsPerCalculation(100);
	};

	PhysicalModel.prototype.getLockX = function()
	{
		return this._lockXVelocity;
	};

	PhysicalModel.prototype.setLockX = function(value)
	{
		this._lockXVelocity = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_LOCK_X, value, this);
	};

	PhysicalModel.prototype.getLockY = function()
	{
		return this._lockYVelocity;
	};

	PhysicalModel.prototype.setLockY = function(value)
	{
		this._lockYVelocity = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_LOCK_Y, value, this);
	};

	// Physics

	PhysicalModel.prototype.getX = function()
	{
		return this._x;
	};

	PhysicalModel.prototype.setX = function(value)
	{
		this._x = value;
		this._aabb.xCenterAlign();
		this.sendNotification(PhysicalModelEvent.UPDATED_X, value, this);
	};

	PhysicalModel.prototype.getY = function()
	{
		return this._y;
	};

	PhysicalModel.prototype.setY = function(value)
	{
		this._y = value;
		this._aabb.yCenterAlign(this._x, this._width);
		this.sendNotification(PhysicalModelEvent.UPDATED_Y, value, this);
	};

	PhysicalModel.prototype.getWidth = function()
	{
		return this._width;
	};

	PhysicalModel.prototype.setWidth = function(value)
	{
		this._width = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_WIDTH, value, this);
	};

	PhysicalModel.prototype.getHeight = function()
	{
		return this._height;
	};

	PhysicalModel.prototype.setHeight = function(value)
	{
		this._height = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_HEIGHT, value, this);
	};

	PhysicalModel.prototype.getWeight = function()
	{
		return this._weight;
	};

	PhysicalModel.prototype.setWeight = function(value)
	{
		this._weight = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_WEIGHT, value, this);
	};

	PhysicalModel.prototype.getMass = function()
	{
		return 0.45359237*this._weight;
	};

	PhysicalModel.prototype.translate = function(x, y)
	{
		this.setX(this.getX()+x);
		this.setY(this.getY()+y);
	};

	PhysicalModel.prototype.translateVelocity = function(xSpeed, ySpeed)
	{
		if(this._lockXVelocity !== true)
		{
			this._xVelocity += xSpeed;
		}
		if(this._lockYVelocity !== true)
		{
			this._yVelocity += ySpeed;
		}
	};

	PhysicalModel.prototype.getForceX = function()
	{
		return (this.getMass()*(Math.pow(this._xAcceleration, 2)) * 0.0001);
	};

	PhysicalModel.prototype.getForceY = function()
	{
		return (this.getMass()*(Math.pow(this._yAcceleration, 2)) * 0.0001);
	};

	PhysicalModel.prototype.getXAcceleration = function()
	{
		return this._xAcceleration;
	};

	PhysicalModel.prototype.setXAcceleration = function(value)
	{
		this._xAcceleration = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_X_ACCELERATION, value, this);
	};

	PhysicalModel.prototype.getYAcceleration = function()
	{
		return this._yAcceleration;
	};

	PhysicalModel.prototype.setYAcceleration = function(value)
	{
		this._yAcceleration = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_Y_ACCELERATION, value, this);
	};

	PhysicalModel.prototype.getXVelocity = function()
	{
		return this._xVelocity;
	};

	PhysicalModel.prototype.setXVelocity = function(value)
	{
		if(this._lockXVelocity === true)
		{
			return;
		}
		this._xVelocity = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_X_VELOCITY, value, this);
	};

	PhysicalModel.prototype.getYVelocity = function()
	{
		return this._yVelocity;
	};

	PhysicalModel.prototype.setYVelocity = function(value)
	{
		if(this._lockYVelocity === true)
		{
			return;
		}
		this._yVelocity = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_Y_VELOCITY, value, this);
	};

	PhysicalModel.prototype.getXFriction = function()
	{
		return this._xFriction;
	};

	PhysicalModel.prototype.setXFriction = function(value)
	{
		this._xFriction = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_X_FRICTION, value, this);
	};

	PhysicalModel.prototype.getYFriction = function()
	{
		return this._yFriction;
	};

	PhysicalModel.prototype.setYFriction = function(value)
	{
		this._yFriction = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_Y_FRICTION, value, this);
	};

	PhysicalModel.prototype.getScaleX = function()
	{
		return this._scaleX;
	};

	PhysicalModel.prototype.setScaleX = function(value)
	{
		this._scaleX = value;
		this._width *= this._scaleX;
		this.sendNotification(PhysicalModelEvent.UPDATED_SCALE_X, value, this);
	};

	PhysicalModel.prototype.getScaleY = function()
	{
		return this._scaleY;
	};

	PhysicalModel.prototype.setScaleY = function(value)
	{
		this._scaleY = value;
		this._height *= this._scaleY;
		this.sendNotification(PhysicalModelEvent.UPDATED_SCALE_Y, value, this);
	};

	PhysicalModel.prototype.getAABB = function()
	{
		return this._aabb;
	};

	PhysicalModel.prototype.setAABB = function(value)
	{
		this._aabb = value;
		this.sendNotification(PhysicalModelEvent.UPDATED_AABB, value, this);
	};

})();

