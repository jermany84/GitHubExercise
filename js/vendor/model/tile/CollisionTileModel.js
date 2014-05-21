/**
 * Created by apple on 3/20/14.
 */

var CollisionTileModelEvent = {
	UPDATED_DESTROYED : "CollisionTileModelEventUpdatedDestroyed",
	UPDATED_DESTRUCTABLE : "CollisionTileModelEventUpdatedDestructable",
	UPDATED_IS_LOCKED : "CollisionTileModelEventUpdatedIsLocked",
	UPDATED_IS_LOCKABLE : "CollisionTileModelEventUpdatedIsLockable"
};

var CollisionTileModelType = {
	//  __
	// |_|
	BLOCK : 1,
	// |\
	// |_\
	SLOPE_1 : 5,
	//  /|
	// /_|
	SLOPE_2 : 6,
	// ___
	// \ |
	//  \|
	SLOPE_3 : 7,
	//  ___
	// |  /
	// |/
	SLOPE_4 : 8,
	DESTRUCTABLE_BLOCK : 2,
	DOOR_MAP_GATEWAY : 3,
	STAIRS_MAP_GATEWAY : 4,
	SIMPLE_LOCK_DOOR : 9
};

var Destination = {
	SWORD_RESIDENCE : 21,
	LONG_SWORD_RESIDENCE : 22,
	MASTER_SWORD_RESIDENCE : 23,
	RECIPE_RESIDENCE : 24,
	THIEF1_RESIDENCE : 25,
	GAMEBLE1_RESIDENCE : 26,
	DUNGEON1 : 27,
	DUNGEON2 : 28,
	DUNGEON3 : 29,
	DUNGEON4 : 30,
	DUNGEON5 : 31,
	DUNGEON6 : 32,
	DUNGEON7 : 33,
	DUNGEON8 : 34
};

(function ()
{
    this.CollisionTileModel = function ()
    {
        this._weight = 1000000;
        this._isDestroyed = false;
        this._isDestructable = false;
	    this._isLocked = false;
	    this._isLockable = false;
    };

    CollisionTileModel.prototype = new TileModel();
    CollisionTileModel.prototype.constructor = CollisionTileModel;

	CollisionTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();
	};

    CollisionTileModel.prototype.setType = function(value)
    {
        this._type = value;
        switch(this._type)
        {
            default :
	        case CollisionTileModelType.BLOCK :
		        this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
		        this.setProjectiles([]);
		        break;
	        case CollisionTileModelType.DESTRUCTABLE_BLOCK :
		        this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
		        this.setProjectiles([]);
		        this.setIsDestructable(true);
		        this.setIsDestroyed(false);
		        break;
	        case CollisionTileModelType.SIMPLE_LOCK_DOOR :
	            this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
                this.setProjectiles([]);
		        this.setIsLockable(true);
		        this.setIsLocked(true);
                break;
        }
	    this._aabb.setFillStyle("#cccccc");
	    //this._aabb.setIsVisible(true);
		this.sendNotification(TileModelEvent.UPDATED_TYPE, value, this);
    };

    CollisionTileModel.prototype.getIsDestroyed = function()
    {
        return this._isDestroyed;
    };

    CollisionTileModel.prototype.setIsDestroyed = function(value)
    {
        this._isDestroyed = value;
	    this.sendNotification(CollisionTileModelEvent.UPDATED_DESTROYED, this._collectorEntities, this);
    };

    CollisionTileModel.prototype.getIsDestructable = function()
    {
        return this._isDestructable;
    };

    CollisionTileModel.prototype.setIsDestructable = function(value)
    {
        this._isDestructable = value;
	    this.sendNotification(CollisionTileModelEvent.UPDATED_DESTRUCTABLE, this._collectorEntities, this);
    };

	CollisionTileModel.prototype.getIsLocked = function()
	{
		return this._isLocked;
	};

	CollisionTileModel.prototype.setIsLocked = function(value)
	{
		this._isLocked = value;
		this.sendNotification(CollisionTileModelEvent.UPDATED_IS_LOCKED, this._collectorEntities, this);
	};

	CollisionTileModel.prototype.getIsLockable = function()
	{
		return this._isLockable;
	};

	CollisionTileModel.prototype.setIsLockable = function(value)
	{
		this._isLockable = value;
		this.sendNotification(CollisionTileModelEvent.UPDATED_IS_LOCKABLE, this._collectorEntities, this);
	};

})();

