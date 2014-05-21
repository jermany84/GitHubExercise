/**
 * Created by apple on 4/11/14.
 */

var PickupTileModelEvent = {
	UPDATED_IS_MOVABLE : "PickupTileModelEventUpdatedIsMovable",
	UPDATED_IS_COLLECTABLE : "PickupTileModelEventUpdatedIsCollectable",
	UPDATED_IS_COLLECTING : "PickupTileModelEventUpdatedIsCollecting",
	UPDATED_IS_COLLECTED : "PickupTileModelEventUpdatedIsCollected",
	UPDATED_COLLECTOR_ENTITY : "PickupTileModelEventUpdatedCollectorEntity",
	UPDATED_DISAPPEARING : "PickupTileModelEventUpdatedDisappearing",
	UPDATED_DISAPPEARED : "PickupTileModelEventUpdatedDisappeared",
	UPDATED_DISAPPEAR_COUNTER : "PickupTileModelEventUpdatedDisappearCounter",
	UPDATED_DISAPPEAR_COUNTER_DEFAULT : "DropsModelEventUpdatedDisappearCounterDefault"
};

var PickupTileModelType = {
	NONE : 0,
	BOOMERANG : 1,
	SILVER_BOOMERANG : 2,
	BOW : 3,
	BOW_ARROW : 4,
	CANDLE : 5,
	WHISTLE : 6,
	MEAT : 7,
	RED_POTION : 8,
	BLUE_POTION : 9,
	WAND : 10,
	NOTE : 11,
	COIN_1 : 12,
	COIN_5 : 13,
	BOMB : 14,
	KEY : 15,
	HALF_HEART : 16,
	HEART : 17,
	HEART_CONTAINER : 18,
	CLOCK : 19,
	FAIRY : 20,
	RAFT : 21,
	BOOK : 22,
	RED_RING : 23,
	BLUE_RING : 24,
	LADDER : 25,
	MASTER_KEY : 26,
	BRACELET : 27,
	SWORD : 28,
	LONG_SWORD : 29,
	MASTER_SWORD : 30,
	TRIFORCE_SHARD_1 : 31,
	TRIFORCE_SHARD_2 : 32,
	TRIFORCE_SHARD_3 : 33,
	TRIFORCE_SHARD_4 : 34,
	TRIFORCE_SHARD_5 : 35,
	TRIFORCE_SHARD_6 : 36,
	TRIFORCE_SHARD_7 : 37,
	TRIFORCE_SHARD_8 : 38,
	POT : 39
};

(function()
{
	this.PickupTileModel = function()
	{
		this._isMovable = false;
		this._isCollectable = true;
		this._isCollecting = false;
		this._isCollected = false;
		this._isCollectorEntity = null;
		this._isDisappearing = false;
		this._hasDisappeared = false;
		this._disappearCounter = -1;
		this._disappearCounterDefault = 100;
		this._animationCollectingCounter = 0;
		this._animationCollectingCounterCap = 15;
		this._animationDisappearingCounter = 0;
		this._animationDisappearingCounterCap = 100;
	};

	PickupTileModel.prototype = new TileModel();
	PickupTileModel.prototype.constructor = PickupTileModel;

	PickupTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();

		if(this._isCollecting === true)
		{
			this._animationCollectingCounter++;
			if(this._animationCollectingCounter === this._animationCollectingCounterCap)
			{
				this._animationCollectingCounter = 0;
				this.setIsCollecting(false);
				this.setIsCollected(true);
			}
		}
		if(this._isDisappearing === true)
		{
			this._animationDisappearingCounter++;
			if(this._animationDisappearingCounter === this._animationDisappearingCounterCap)
			{
				this._animationDisappearingCounter = 0;
				this.setIsDisappearing(false);
				this.setHasDisappeared(true);
			}
		}
	};

	PickupTileModel.prototype.getIsMovable = function()
	{
		return this._isMovable;
	};

	PickupTileModel.prototype.setIsMovable = function(value)
	{
		this._isMovable = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_IS_MOVABLE, value, this);
	};

	PickupTileModel.prototype.setType = function(value)
	{
		this._type = value;

		switch(value)
		{
			case PickupTileModelType.POT :
				this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
				this.setIsMovable(true);
				this.setIsCollectable(false);
				break;
			default:
				this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
				this.setIsMovable(false);
				this.setIsCollectable(true);
				break;
		}
		this._aabb.setFillStyle("#cccc00");
		//this._aabb.setIsVisible(true);
		this.sendNotification(TileModelEvent.UPDATED_TYPE, value, this);
	};

	PickupTileModel.prototype.getIsMovable = function()
	{
		return this._isMovable;
	};

	PickupTileModel.prototype.setIsMovable = function(value)
	{
		this._isMovable = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_IS_MOVABLE, value, this);
	};

	PickupTileModel.prototype.getIsCollectable = function()
	{
		return this._isCollectable;
	};

	PickupTileModel.prototype.setIsCollectable = function(value)
	{
		this._isCollectable = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_IS_COLLECTABLE, value, this);
	};

	PickupTileModel.prototype.getIsCollecting = function()
	{
		return this._isCollecting;
	};

	PickupTileModel.prototype.setIsCollecting = function(value)
	{
		this._isCollecting = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_IS_COLLECTING, value, this);
	};

	PickupTileModel.prototype.getIsCollected = function()
	{
		return this._isCollected;
	};

	PickupTileModel.prototype.setIsCollected = function(value)
	{
		this._isCollected = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_IS_COLLECTED, value, this);
	};

	PickupTileModel.prototype.getCollectorEntity = function()
	{
		return this._isCollectorEntity;
	};

	PickupTileModel.prototype.setCollectorEntity = function(value)
	{
		this._isCollectorEntity = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_COLLECTOR_ENTITY, value, this);
	};

	PickupTileModel.prototype.getIsDisappearing = function()
	{
		return this._isDisappearing;
	};

	PickupTileModel.prototype.setIsDisappearing = function(value)
	{
		this._isDisappearing = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_DISAPPEARING, value, this);
	};

	PickupTileModel.prototype.getHasDisappeared = function()
	{
		return this._hasDisappeared;
	};

	PickupTileModel.prototype.setHasDisappeared = function(value)
	{
		this._hasDisappeared = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_DISAPPEARED, this, this);
	};

	PickupTileModel.prototype.getDisappearCounter = function()
	{
		return this._disappearCounter;
	};

	PickupTileModel.prototype.setDisappearCounter = function(value)
	{
		this._disappearCounter = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_DISAPPEAR_COUNTER, value, this);
	};

	PickupTileModel.prototype.getAnimationDisappearingCounter = function()
	{
		return this._animationDisappearingCounter;
	};

	PickupTileModel.prototype.setAnimationDisappearingCounter = function(value)
	{
		this._animationDisappearingCounter = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_DISAPPEARING, value, this);
	};

	PickupTileModel.prototype.getAnimationCollectingCounterCap = function()
	{
		return this._animationCollectingCounterCap;
	};

	PickupTileModel.prototype.setAnimationCollectingCounterCap = function(value)
	{
		this._animationCollectingCounterCap = value;
	};

	PickupTileModel.prototype.getAnimationDisappearingCounterCap = function()
	{
		return this._animationDisappearingCounterCap;
	};

	PickupTileModel.prototype.setAnimationDisappearingCounterCap = function(value)
	{
		this._animationDisappearingCounterCap = value;
	};

	PickupTileModel.prototype.getDisappearCounterDefault = function()
	{
		return this._disappearCounterDefault;
	};

	PickupTileModel.prototype.setDisappearCounterDefault = function(value)
	{
		this._disappearCounterDefault = value;
		this.sendNotification(PickupTileModelEvent.UPDATED_DISAPPEAR_COUNTER_DEFAULT, value, this);
	};

})();

