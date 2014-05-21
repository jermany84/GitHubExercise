/**
 * Created by apple on 3/27/14.
 */

var EnemyTileModelEvent = {
	UPDATED_DROPS_LUCK : "EnemyTileModelEventUpdatedDropsLuck"
};

var EnemyTileModelType = {
	RED_SPITTER : 1,
	BLUE_SPITTER : 2,
	HAND : 3,
	RED_SOLDIER1 : 4,
	BLUE_SOLDIER1 : 5,
	RED_MAGE : 6,
	BLUE_MAGE : 7,
	RED_SOLDIER2 : 8,
	GREEN_SOLDIER : 9,
	WINGED_DEMON : 10,
	GHOST : 11,
	RED_HEAVY_ARMORD_SOLDIER : 12,
	RED_ARMORD_SOLDIER : 13,
	BLUE_ARMORD_SOLDIER : 14,
	RED_SPIDER : 15,
	BLUE_SPIDER : 16,
	SKELETON : 17,
	BUNNY : 18,
	MUMMY : 19,
	GREY_BLOB : 20,
	GREEN_BLOB : 21,
	GREY_SMALL_BLOB : 22,
	GREEN_SMALL_BLOB : 23,
	BAT : 24,
	FLOWER : 25,
	DIGGER : 26,
	SEA_MONSTER : 27,
	FLAT_EYE : 28,
	DRAGON : 29,
	DRAGON_HEAD : 30,
	UNICORN : 31,
	BUZZER : 32,
	STEGA : 33,
	GANON : 34
};

var EnemyTileModelFrame = {
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
	HURT_UP : 13,
	HURT_RIGHT : 14,
	HURT_DOWN : 15,
	HURT_LEFT : 16,
	SPAWN : 17,
	DIE : 18
};

(function()
{
    this.EnemyTileModel = function()
    {
        this._xAcceleration = 20;
        this._yAcceleration = 20;
        this._weight = 180;
        this._strength = 1;
	    this._health = 1;
	    this._healthCap = 1;
	    this._dropsLuck = 0;
	    this._animationSpawnCounterCap = 100;
	    this._animationHurtCounterCap = 70;
	    this._animationDieCounterCap = 15;
	    this._animationAttack1CounterCap = 8;
	    this._animationAttack2CounterCap = 8;
    };

    EnemyTileModel.prototype = new EntityTileModel();
    EnemyTileModel.prototype.constructor = EnemyTileModel;

	EnemyTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();

		if(this._seekingEntity !== null && typeof(this._seekingEntity) !== "undefined")
		{
			this._easyStar.calculate();
		}

		switch(this._type)
		{
			case EnemyTileModelType.RED_SPITTER :
				if(this._isSpawning === true)
				{
					this.setFrame(EnemyTileModelFrame.SPAWN);
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
					this.setFrame(EnemyTileModelFrame.DIE);
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
							this.setFrame(EnemyTileModelFrame.ATTACK_UP);
							break;
						case EntityTileModelDirection.RIGHT :
							this.setFrame(EnemyTileModelFrame.ATTACK_RIGHT);
							break;
						case EntityTileModelDirection.DOWN :
							this.setFrame(EnemyTileModelFrame.ATTACK_DOWN);
							break;
						case EntityTileModelDirection.LEFT :
							this.setFrame(EnemyTileModelFrame.ATTACK_LEFT);
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
							this.setFrame(EnemyTileModelFrame.ATTACK_UP);
							break;
						case EntityTileModelDirection.RIGHT :
							this.setFrame(EnemyTileModelFrame.ATTACK_RIGHT);
							break;
						case EntityTileModelDirection.DOWN :
							this.setFrame(EnemyTileModelFrame.ATTACK_DOWN);
							break;
						case EntityTileModelDirection.LEFT :
							this.setFrame(EnemyTileModelFrame.ATTACK_LEFT);
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
								this.setFrame(EnemyTileModelFrame.IDLE_UP);
								break;
							case EntityTileModelDirection.RIGHT :
								this.setFrame(EnemyTileModelFrame.IDLE_RIGHT);
								break;
							case EntityTileModelDirection.DOWN :
								this.setFrame(EnemyTileModelFrame.IDLE_DOWN);
								break;
							case EntityTileModelDirection.LEFT :
								this.setFrame(EnemyTileModelFrame.IDLE_LEFT);
								break;
						}
					}
					else
					{
						switch(this._direction)
						{
							case EntityTileModelDirection.UP :
								this.setFrame(EnemyTileModelFrame.WALK_UP);
								break;
							case EntityTileModelDirection.RIGHT :
								this.setFrame(EnemyTileModelFrame.WALK_RIGHT);
								break;
							case EntityTileModelDirection.DOWN :
								this.setFrame(EnemyTileModelFrame.WALK_DOWN);
								break;
							case EntityTileModelDirection.LEFT :
								this.setFrame(EnemyTileModelFrame.WALK_LEFT);
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

    EnemyTileModel.prototype.setType = function(value)
    {
        this._type = value;
        switch(this._type)
        {
            case EnemyTileModelType.RED_SPITTER :
	            this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
                this.setProjectiles([1,1,1,1,1]);
	            this.setFrame(17);
                break;
            default :
	            this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
                this.setProjectiles([]);
                break;
        }
	    this._aabb.setFillStyle("#ff0000");
	    //this._aabb.setIsVisible(true);
	    this.sendNotification(TileModelEvent.UPDATED_TYPE, this._type, this);
    };

	EnemyTileModel.prototype.getDropsLuck = function()
	{
		return this._dropsLuck;
	};

	EnemyTileModel.prototype.setDropsLuck = function(value)
	{
		this._dropsLuck = value;
		this.sendNotification(EnemyTileModelEvent.UPDATED_DROPS_LUCK, value, this);
	};

})();

