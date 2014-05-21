/**
 * Created by apple on 3/20/14.
 */

var HeroTileModelEvent = {
	UPDATED_DROPS_LUCK : "HeroTileModelEventUpdatedDropsLuck",
	UPDATED_ATTACK_1_TYPE : "HeroTileModelEventUpdatedAttack1Type",
	UPDATED_ATTACK_2_TYPE : "HeroTileModelEventUpdatedAttack2Type",
	UPDATED_AUTO_ACTION_LIST : "HeroTileModelEventUpdatedAutoActionList",
	UPDATED_BUTTON_1_ACTION_LIST : "HeroTileModelEventUpdatedButton1ActionList",
	UPDATED_BUTTON_1_ACTION_LIST_INDEX : "HeroTileModelEventUpdatedButton1ActionListIndex",
	UPDATED_BUTTON_2_ACTION_LIST : "HeroTileModelEventUpdatedButton2ActionList",
	UPDATED_BUTTON_2_ACTION_LIST_INDEX : "HeroTileModelEventUpdatedButton2ActionListIndex",
	UPDATED_MAP_COLLECTED : "HeroTileModelEventUpdatedIsMapCollected",
	UPDATED_COMPASS_COLLECTED : "HeroTileModelEventUpdatedIsCompassCollected",
	UPDATED_TRIFORCE_PIECES_COLLECTED : "HeroTileModelEventUpdatedTriforcePiecesCollected",
	UPDATED_GOLD_COUNTER_MODEL : "HeroTileModelEventUpdatedGoldCounterModel",
	UPDATED_KEY_COUNTER_MODEL : "HeroTileModelEventUpdatedKeyCounterModel",
	UPDATED_BOMB_COUNTER_MODEL : "HeroTileModelEventUpdatedBombCounterModel",
	UPDATED_GOLD : "HeroTileModelEventUpdatedGold",
	UPDATED_GOLD_CAP : "HeroTileModelEventUpdatedGoldCap",
	UPDATED_BOMBS : "HeroTileModelEventUpdatedBombs",
	UPDATED_BOMBS_CAP : "HeroTileModelEventUpdatedBombsCap",
	UPDATED_KEYS : "HeroTileModelEventUpdatedKeys",
	UPDATED_IS_WALKING_IN_DOOR_WAY : "HeroTileModelEventUpdatedIsWalkingInDoorway",
	UPDATED_IS_WALKING_IN_STAIRS : "HeroTileModelEventUpdatedIsWalkingInStairs",
	UPDATED_ACTIVE_DOORWAY_MODEL : "HeroTileModelEventUpdatedActiveDoorwayModel",
	UPDATED_PREVIOUS_DOORWAY_MODEL : "HeroTileModelEventUpdatedPreviousDoorwayModel",
	UPDATED_ACTIVE_STAIRS_MODEL : "HeroTileModelEventUpdatedActiveStairsModel",
	UPDATED_PREVIOUS_STAIRS_MODEL : "HeroTileModelEventUpdatedPreviousStairsModel"
};

var HeroTileModelType = {
	GREEN_LINK : 1,
	BLUE_LINK : 2,
	RED_LINK : 3
};

var HeroTileModelFrame = {
	IDLE_UP : 1,
	IDLE_RIGHT : 2,
	IDLE_DOWN : 3,
	IDLE_LEFT : 4,
	WALK_UP : 5,
	WALK_RIGHT : 6,
	WALK_DOWN : 7,
	WALK_LEFT : 8,
	ATTACK_UP : 9,
	ATTACK_RIGHT : 10,
	ATTACK_DOWN : 11,
	ATTACK_LEFT : 12,
	ATTACK_2_UP : 13,
	ATTACK_2_RIGHT : 14,
	ATTACK_2_DOWN : 15,
	ATTACK_2_LEFT : 16,
	HURT_UP : 17,
	HURT_RIGHT : 18,
	HURT_DOWN : 19,
	HURT_LEFT : 20,
	FRAME_RECEIVE_TRIFORCE : 21,
	FRAME_RECEIVE_ITEM : 22,
	SPAWN : 23,
	DIE : 24
};

var HeroTileModelAutoActionType = {
	NONE : 0,
	RAFT : 1,
	BOOK : 2,
	RED_RING : 3,
	BLUE_RING : 4,
	LADDER : 5,
	MASTER_KEY : 6,
	BRACELET : 7
};

(function()
{
    this.HeroTileModel = function ()
    {
        this._xAcceleration = 25;
        this._yAcceleration = 25;
        this._weight = 200;
	    this._health = 3;
	    this._healthCap = 3;
        this._strength = 1;
	    this._dropsLuck = 100;
	    this._isWalkingInDoorway = false;
	    this._animationDoorwayCounter = 0;
	    this._animationDoorwayCounterCap = 50;
	    this._isWalkingInStairs = false;
	    this._animationStairsCounter = 0;
	    this._animationStairsCounterCap = 50;
	    this._animationSpawnCounterCap = 1;
	    this._animationDieCounterCap = 160;
	    this._animationAttack1CounterCap = 8;
	    this._animationAttack2CounterCap = 8;
	    this._animationHurtCounterCap = 70;
	    this._attack1Type = 0;
	    this._attack2Type = 0;
	    this._autoActionList = [0,0,0,0,0,0];
	    this._button1ActionList = [0,0,0,0,0,0,0,0];
	    this._button1ActionListIndex = 0;
	    this._lastButton1ActionListIndex = 0;
	    this._button2ActionList = [0,0,0];
	    this._button2ActionListIndex = 0;
	    this._collectedMap = false;
	    this._collectedCompass = false;
	    this._triforcePieces = [0,0,0,0,0,0,0,0];
	    this._goldCounterModel = new CounterModel(0, 256);
	    this._keyCounterModel = new CounterModel(0, 999);
	    this._bombCounterModel = new CounterModel(0, 10);
	    this._button1ActionTileModel = new PickupTileModel();
	    this._button2ActionTileModel = new PickupTileModel();
	    this._activeDoorwayModel = null;
	    this._activeStairsModel = null;
    };

    HeroTileModel.prototype = new EntityTileModel();
    HeroTileModel.prototype.constructor = HeroTileModel;

	HeroTileModel.prototype.setType = function(value)
	{
		this._type = value;
		switch(this._type)
		{
			default :
				this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
				this.setFrame(19);
				break;
		}
		this._aabb.setFillStyle("#ffffff");
		//this._aabb.setIsVisible(true);
		this.sendNotification(TileModelEvent.UPDATED_TYPE, value, this);
	};

	HeroTileModel.prototype.getActiveDoorwayModel = function()
	{
		return this._activeDoorwayModel;
	};

	HeroTileModel.prototype.setActiveDoorwayModel = function(value)
	{
		this._activeDoorwayModel = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_ACTIVE_DOORWAY_MODEL, value, this);
	};

	HeroTileModel.prototype.getActiveStairsModel = function()
	{
		return this._activeStairsModel;
	};

	HeroTileModel.prototype.setActiveStairsModel = function(value)
	{
		this._activeStairsModel = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_ACTIVE_STAIRS_MODEL, value, this);
	};

	HeroTileModel.prototype.getGoldCounterModel = function()
	{
		return this._goldCounterModel;
	};

	HeroTileModel.prototype.setGoldCounterModel = function(value)
	{
		this._goldCounterModel = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_GOLD_COUNTER_MODEL, value, this);
	};

	HeroTileModel.prototype.getKeyCounterModel = function()
	{
		return this._keyCounterModel;
	};

	HeroTileModel.prototype.setKeyCounterModel = function(value)
	{
		this._keyCounterModel = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_KEY_COUNTER_MODEL, value, this);
	};

	HeroTileModel.prototype.getBombCounterModel = function()
	{
		return this._bombCounterModel;
	};

	HeroTileModel.prototype.setBombCounterModel = function(value)
	{
		this._bombCounterModel = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_BOMB_COUNTER_MODEL, value, this);
	};

	HeroTileModel.prototype.getGold = function()
	{
		return this._goldCounterModel.getCounter();
	};

	HeroTileModel.prototype.setGold = function(value)
	{
		this._goldCounterModel.setCounter(value);
		this.sendNotification(HeroTileModelEvent.UPDATED_GOLD, value, this);
	};

	HeroTileModel.prototype.getGoldCap = function()
	{
		return this._goldCounterModel.getMax();
	};

	HeroTileModel.prototype.setGoldCap = function(value)
	{
		this._goldCounterModel.setMax(value);
		this.sendNotification(HeroTileModelEvent.UPDATED_GOLD_CAP, value, this);
	};

	HeroTileModel.prototype.getKeys = function()
	{
		return this._keyCounterModel.getCounter();
	};

	HeroTileModel.prototype.setKeys = function(value)
	{
		this._keyCounterModel.setCounter(value);
		this.sendNotification(HeroTileModelEvent.UPDATED_KEYS, value, this);
	};

	HeroTileModel.prototype.getBombs = function()
	{
		return this._bombCounterModel.getCounter();
	};

	HeroTileModel.prototype.setBombs = function(value)
	{
		this._bombCounterModel.setCounter(value);
		this.sendNotification(HeroTileModelEvent.UPDATED_BOMBS, value, this);
	};

	HeroTileModel.prototype.getBombsCap = function()
	{
		return this._bombCounterModel.getMax();
	};

	HeroTileModel.prototype.setBombsCap = function(value)
	{
		this._bombCounterModel.setMax(value);
		this.sendNotification(HeroTileModelEvent.UPDATED_BOMBS_CAP, value, this);
	};

	HeroTileModel.prototype.update = function(delta)
	{
		if(this._aabb === null || typeof(this._aabb) === "undefined")
		{
			return;
		}

		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();

		switch(this._type)
		{
			case HeroTileModelType.GREEN_LINK :
			case HeroTileModelType.BLUE_LINK :
			case HeroTileModelType.RED_LINK :
				if(this._isWalkingInDoorway === true)
				{
					this._animationDoorwayCounter++;
					if(this._animationDoorwayCounter === this._animationDoorwayCounterCap)
					{
						this._animationDoorwayCounter = 0;
						this.setIsWalkingInDoorway(false);
					}
				}
				else
				if(this._isWalkingInStairs === true)
				{
					this._animationStairsCounter++;
					if(this._animationStairsCounter === this._animationStairsCounterCap)
					{
						this._animationStairsCounter = 0;
						this.setIsWalkingInStairs(false);
					}
				}
				else
				if(this._isSpawning === true)
				{
					this.setFrame(HeroTileModelFrame.SPAWN);
					this._animationSpawnCounter++;
					if(this._animationSpawnCounter === this._animationSpawnCounterCap)
					{
						this._animationSpawnCounter = 0;
						this.setIsSpawning(false);
					}
				}
				else
				if(this._isDying === true)
				{
					this.setFrame(HeroTileModelFrame.DIE);
					this._animationDieCounter++;
					if(this._animationDieCounter === this._animationDieCounterCap)
					{
						this._animationDieCounter = 0;
						this.setIsDying(false);
						this.setIsDead(true);
					}
				}
				else
				if(this._isAttack1 === true)
				{
					switch(this._direction)
					{
						case EntityTileModelDirection.UP :
							this.setFrame(HeroTileModelFrame.ATTACK_UP);
							break;
						case EntityTileModelDirection.RIGHT :
							this.setFrame(HeroTileModelFrame.ATTACK_RIGHT);
							break;
						case EntityTileModelDirection.DOWN :
							this.setFrame(HeroTileModelFrame.ATTACK_DOWN);
							break;
						case EntityTileModelDirection.LEFT :
							this.setFrame(HeroTileModelFrame.ATTACK_LEFT);
							break;
					}
					this._animationAttack1Counter++;
					if(this._animationAttack1Counter === this._animationAttack1CounterCap)
					{
						this._animationAttack1Counter = 0;
						this.setIsAttack1(false);
					}
				}
				else
				if(this._isAttack2 === true)
				{
					switch(this._direction)
					{
						case EntityTileModelDirection.UP :
							this.setYOffset(-32);
							this.setFrame(HeroTileModelFrame.ATTACK_2_UP);
							break;
						case EntityTileModelDirection.RIGHT :
							this.setXOffset(0);
							this.setFrame(HeroTileModelFrame.ATTACK_2_RIGHT);
							break;
						case EntityTileModelDirection.DOWN :
							this.setYOffset(0);
							this.setFrame(HeroTileModelFrame.ATTACK_2_DOWN);
							break;
						case EntityTileModelDirection.LEFT :
							this.setXOffset(-32);
							this.setFrame(HeroTileModelFrame.ATTACK_2_LEFT);
							break;
					}
					this._animationAttack2Counter++;
					if(this._animationAttack2Counter === this._animationAttack2CounterCap)
					{
						this._animationAttack2Counter = 0;
						this.setIsAttack2(false);
					}
				}
				else
				{
					if(this._isIdle === true)
					{
						switch(this._direction)
						{
							case EntityTileModelDirection.UP :
								this.setFrame(HeroTileModelFrame.IDLE_UP);
								break;
							case EntityTileModelDirection.RIGHT :
								this.setFrame(HeroTileModelFrame.IDLE_RIGHT);
								break;
							case EntityTileModelDirection.DOWN :
								this.setFrame(HeroTileModelFrame.IDLE_DOWN);
								break;
							case EntityTileModelDirection.LEFT :
								this.setFrame(HeroTileModelFrame.IDLE_LEFT);
								break;
						}
					}
					else
					{
						switch(this._direction)
						{
							case EntityTileModelDirection.UP :
								this.setFrame(HeroTileModelFrame.WALK_UP);
								break;
							case EntityTileModelDirection.RIGHT :
								this.setFrame(HeroTileModelFrame.WALK_RIGHT);
								break;
							case EntityTileModelDirection.DOWN :
								this.setFrame(HeroTileModelFrame.WALK_DOWN);
								break;
							case EntityTileModelDirection.LEFT :
								this.setFrame(HeroTileModelFrame.WALK_LEFT);
								break;
						}
					}
				}
				break;
		}
		if(this._isHurting === true)
		{
			this._animationHurtCounter++;
			if(this._animationHurtCounter === this._animationHurtCounterCap)
			{
				this._animationHurtCounter = 0;
				this.setIsHurting(false);
			}
		}
	};

	HeroTileModel.prototype.setHealth = function(value)
    {
        if(value <= this._health)
        {
            if(value <= 0)
            {
                this._health = 0;
                this.setIsDying(true);
            } else {
                this._health = value;
                this.setIsHurting(true);
            }
        } else {
            if(value > this._healthCap)
            {
                this._health = this._healthCap;
            } else {
                this._health = value;
                switch(this._health)
                {
                    case this._healthCap :
                        this.setProjectiles([1]);
                        break;
                    default :
                        this.setProjectiles([]);
                        break;
                }
            }
        }
	    this.sendNotification(HeroTileModelEvent.UPDATED_HEALTH, this._health, this);
    };

	HeroTileModel.prototype.getDropsLuck = function()
	{
		return this._dropsLuck;
	};

	HeroTileModel.prototype.setDropsLuck = function(value)
	{
		this._dropsLuck = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_DROPS_LUCK, value, this);
	};

	HeroTileModel.prototype.getAttack1Type = function()
	{
		return this._attack1Type;
	};

	HeroTileModel.prototype.setAttack1Type = function(value)
	{
		this._attack1Type = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_ATTACK_1_TYPE, value, this);
	};

	HeroTileModel.prototype.getAttack2Type = function()
	{
		return this._attack2Type;
	};

	HeroTileModel.prototype.setAttack2Type = function(value)
	{
		this._attack2Type = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_ATTACK_2_TYPE, value, this);
	};

	HeroTileModel.prototype.getAutoActionList = function()
	{
		return this._autoActionList;
	};

	HeroTileModel.prototype.setAutoActionList = function(value)
	{
		this._autoActionList = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_AUTO_ACTION_LIST, value, this);
	};

	HeroTileModel.prototype.getButton1ActionList = function()
	{
		return this._button1ActionList;
	};

	HeroTileModel.prototype.setButtonActionList = function(value)
	{
		this._button1ActionList = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_BUTTON_1_ACTION_LIST, value, this);
	};

	HeroTileModel.prototype.getButton1ActionListIndex = function()
	{
		return this._button1ActionListIndex;
	};

	HeroTileModel.prototype.setButton1ActionListIndex = function(value)
	{
		this._lastButton1ActionListIndex = this._button1ActionListIndex;
		this._button1ActionListIndex = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_BUTTON_1_ACTION_LIST_INDEX, value, this);
	};

	HeroTileModel.prototype.getButton2ActionList = function()
	{
		return this._button2ActionList;
	};

	HeroTileModel.prototype.setButton2ActionList = function(value)
	{
		this._button2ActionList = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_BUTTON_2_ACTION_LIST, value, this);
	};

	HeroTileModel.prototype.getButton2ActionListIndex = function()
	{
		return this._button2ActionListIndex;
	};

	HeroTileModel.prototype.setButton2ActionListIndex = function(value)
	{
		this._button2ActionListIndex = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_BUTTON_2_ACTION_LIST_INDEX, value, this);
	};

	HeroTileModel.prototype.getLastButton1ActionListIndex = function(value)
	{
		return this._lastButton1ActionListIndex;
	};

	HeroTileModel.prototype.getMapCollected = function()
	{
		return this._collectedMap;
	};

	HeroTileModel.prototype.setMapCollected = function(value)
	{
		this._collectedMap = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_MAP_COLLECTED, value, this);
	};

	HeroTileModel.prototype.getCompassCollected = function()
	{
		return this._collectedCompass;
	};

	HeroTileModel.prototype.setCompassCollected = function(value)
	{
		this._collectedCompass = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_COMPASS_COLLECTED, value, this);
	};

	HeroTileModel.prototype.getTriforcePieces = function()
	{
		return this._triforcePieces;
	};

	HeroTileModel.prototype.setTriforcePieces = function(value)
	{
		this._triforcePieces = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_TRIFORCE_PIECES_COLLECTED, value, this);
	};

	HeroTileModel.prototype.hasButton1ActionItems = function()
	{
		var anyItems = false;
		for(var i = 0; i < this._button1ActionList.length; i++)
		{
			if(this._button1ActionList[i] > 0)
			{
				anyItems = true;
				break;
			}
		}
		return anyItems;
	};

	HeroTileModel.prototype.hasButton2ActionItems = function()
	{
		var anyItems = false;
		for(var i = 0; i < this._button2ActionList.length; i++)
		{
			if(this._button2ActionList[i] > 0)
			{
				anyItems = true;
				break;
			}
		}
		return anyItems;
	};

	HeroTileModel.prototype.getButton1ActionModel = function()
	{
		this._button1ActionTileModel.setType(this._button1ActionList[this._button1ActionListIndex]);
		return this._button1ActionTileModel;
	};

	HeroTileModel.prototype.setButton1ActionModelPosition = function(xpos, ypos)
	{
		this._button1ActionTileModel.setX(xpos);
		this._button1ActionTileModel.setY(ypos);
	};

	HeroTileModel.prototype.getButton2ActionModel = function()
	{
		this._button2ActionTileModel.setType(this._button2ActionList[this._button2ActionListIndex]);
		return this._button2ActionTileModel;
	};

	HeroTileModel.prototype.setButton2ActionModelPosition = function(xpos, ypos)
	{
		this._button2ActionTileModel.setX(xpos);
		this._button2ActionTileModel.setY(ypos);
	};

	HeroTileModel.prototype.getIsWalkingInDoorway = function()
	{
		return this._isWalkingInDoorway;
	};

	HeroTileModel.prototype.setIsWalkingInDoorway = function(value)
	{
		this._isWalkingInDoorway = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_IS_WALKING_IN_DOOR_WAY, value, this);
	};

	HeroTileModel.prototype.getIsWalkingInStairs = function()
	{
		return this._isWalkingInStairs;
	};

	HeroTileModel.prototype.setIsWalkingInStairs = function(value)
	{
		this._isWalkingInStairs = value;
		this.sendNotification(HeroTileModelEvent.UPDATED_IS_WALKING_IN_STAIRS, value, this);
	};

	HeroTileModel.prototype.getAnimationDoorwayCounter = function()
	{
		return this._animationDoorwayCounter;
	};

	HeroTileModel.prototype.getAnimationDoorwayCounterCap = function()
	{
		return this._animationDoorwayCounterCap;
	};

	HeroTileModel.prototype.getAnimationDoorwayCounter = function()
	{
		return this._animationStairsCounter;
	};

	HeroTileModel.prototype.getAnimationDoorwayCounterCap = function()
	{
		return this._animationStairsCounterCap;
	};

})();