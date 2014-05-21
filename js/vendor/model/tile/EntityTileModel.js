/**
 * Created by apple on 3/20/14.
 */

var EntityTileModelEvent = {
	UPDATED_DIRECTION :  "EntityTileModelEventUpdatedDirection",
	UPDATED_IDLE : "EntityTileModelEventUpdatedIdle",
	UPDATED_IS_ATTACK_1 : "EntityTileModelEventUpdatedIsAttack1",
	UPDATED_IS_ATTACK_2 : "EntityTileModelEventUpdatedIsAttack2",
	UPDATED_IS_HURTING : "EntityTileModelEventUpdatedIsHurting",
	UPDATED_IS_DYING : "EntityTileModelEventUpdatedIsDying",
	UPDATED_IS_SPAWNING : "EntityTileModelEventUpdatedIsSpawning",
	UPDATED_IS_DEAD : "EntityTileModelEventUpdatedIsDead",
	UPDATED_HEALTH : "EntityTileModelEventUpdatedHealth",
	UPDATED_HEALTH_CAP : "EntityTileModelEventUpdatedHealthCap",
	UPDATED_CURRENT_PATH : "EntityTileModelEventUpdatedCurrentPath",
	UPDATED_IS_SEEKER : "EntityTileModelEventUpdatedIsSeeker",
	UPDATED_SEEKING_ENTITY : "EntityTileModelEventUpdatedSeekingEntity",
	UPDATED_ANIMATION_ATTACK_1_COUNTER : "EntityTileModelEventUpdatedAnimationAttack1Counter",
	UPDATED_ANIMATION_ATTACK_2_COUNTER : "EntityTileModelEventUpdatedAnimationAttack2Counter",
	UPDATED_ANIMATION_HURT_COUNTER : "EntityTileModelEventUpdatedAnimationHurtCounter",
	UPDATED_ANIMATION_DIE_COUNTER : "EntityTileModelEventUpdatedAnimationDieCounter",
	UPDATED_ANIMATION_SPAWN_COUNTER : "EntityTileModelEventUpdatedAnimationSpawnCounter",
	UPDATED_ATTACKER_ENTITY : "EntityTileModelEventUpdatedAttackerEntity"
};

var EntityTileModelDirection = {
	UP : "up",
	RIGHT : "right",
	DOWN : "down",
	LEFT : "left"
};

(function ()
{
	this.EntityTileModel = function ()
	{
		this._direction = EntityTileModelDirection.DOWN;
		this._isIdle = true;
		this._isAttack1 = false;
		this._isAttack2 = false;
		this._isHurting = false;
		this._isSpawning = true;
		this._isDying = false;
		this._isDead = false;
		this._health = 1;
		this._healthCap = 1;
		this._currentPath = [];
		this._isSeeker = false;
		this._seekingEntity = null;
		this._attackerEntity = null;
		this._animationAttack1Counter = 0;
		this._animationAttack1CounterCap = 1;
		this._animationAttack2Counter = 0;
		this._animationAttack2CounterCap = 1;
		this._animationHurtCounter = 0;
		this._animationHurtCounterCap = 0;
		this._animationDieCounter = 0;
		this._animationDieCounterCap = 1;
		this._animationSpawnCounter = 0;
		this._animationSpawnCounterCap = 1;
		this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
		//this._aabb.setIsVisible(true);
	};

	EntityTileModel.prototype = new TileModel();
	EntityTileModel.prototype.constructor = EntityTileModel;

	EntityTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();

		if(this._seekingEntity !== null && typeof(this._seekingEntity) !== "undefined" &&
			this._currentPath !== null && typeof(this._currentPath) !== "undefined")
		{
			this._easyStar.calculate();
		}
	};

	EntityTileModel.prototype.getDirection = function()
	{
		return this._direction;
	};

	EntityTileModel.prototype.setDirection = function(value)
	{
		this._direction = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_DIRECTION, value, this);
	};

	EntityTileModel.prototype.getIsIdle = function()
	{
		return this._isIdle;
	};

	EntityTileModel.prototype.setIsIdle = function(value)
	{
		this._isIdle = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IDLE, value, this);
	};

	EntityTileModel.prototype.getIsAttack1 = function()
	{
		return this._isAttack1;
	};

	EntityTileModel.prototype.setIsAttack1 = function(value)
	{
		this._isAttack1 = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_ATTACK_1, value, this);
	};

	EntityTileModel.prototype.getIsAttack2 = function()
	{
		return this._isAttack2;
	};

	EntityTileModel.prototype.setIsAttack2 = function(value)
	{
		this._isAttack2 = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_ATTACK_2, value, this);
	};

	EntityTileModel.prototype.getIsHurting = function()
	{
		return this._isHurting;
	};

	EntityTileModel.prototype.setIsHurting = function(value)
	{
		this._isHurting = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_HURTING, value, this);
	};

	EntityTileModel.prototype.getIsDying = function()
	{
		return this._isDying;
	};

	EntityTileModel.prototype.setIsDying = function(value)
	{
		this._isDying = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_DYING, value, this);
	};

	EntityTileModel.prototype.getIsSpawning = function()
	{
		return this._isSpawning;
	};

	EntityTileModel.prototype.setIsSpawning = function(value)
	{
		this._isSpawning = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_SPAWNING, value, this);
	};

	EntityTileModel.prototype.getIsDead = function()
	{
		return this._isDead;
	};

	EntityTileModel.prototype.setIsDead = function(value)
	{
		this._isDead = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_DEAD, value, this);
	};

	EntityTileModel.prototype.getHealth = function()
	{
		return this._health;
	};

	EntityTileModel.prototype.setHealth = function(value)
	{
		if(value <= this._health)
		{
			if(value <= 0)
			{
				this._health = 0;
				this.setIsDying(true);
			} else {
				this._health = value;
				this.getIsHurting(true);
			}
		} else {
			if(value > this._healthCap)
			{
				this._health = this._healthCap;
			} else {
				this._health = value;
			}
		}
		this.sendNotification(EntityTileModelEvent.UPDATED_HEALTH, this._health, this);
	};

	EntityTileModel.prototype.getHealthCap = function()
	{
		return this._healthCap;
	};

	EntityTileModel.prototype.setHealthCap = function(value)
	{
		this._healthCap = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_HEALTH_CAP, value, this);
	};

	EntityTileModel.prototype.getCurrentPath = function()
	{
		return this._currentPath;
	};

	EntityTileModel.prototype.setCurrentPath = function(value)
	{
		this._currentPath = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_CURRENT_PATH, value, this);
	};

	EntityTileModel.prototype.getIsSeeker = function()
	{
		return this._isSeeker;
	};

	EntityTileModel.prototype.setIsSeeker = function(value)
	{
		this._isSeeker = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_IS_SEEKER, value, this);
	};

	EntityTileModel.prototype.getSeekingEntity = function()
	{
		return this._seekingEntity;
	};

	EntityTileModel.prototype.setSeekingEntity = function(value)
	{
		this._seekingEntity = value;

		if(this._seekingEntity !== null && typeof(this._seekingEntity) !== "undefined")
		{
			var startX = Math.floor(this.getX() / 32);
			var startY = Math.floor(this.getY() / 32);
			var endX = Math.floor(this._seekingEntity.getX() / 32);
			var endY = Math.floor(this._seekingEntity.getY() / 32);

			this._easyStar.findPath(startX, startY, endX, endY, function(path)
			{
				this.setCurrentPath(path);
			}.bind(this));
		}

		this.sendNotification(EntityTileModelEvent.UPDATED_SEEKING_ENTITY, value, this);
	};

	EntityTileModel.prototype.getAnimationAttack1Counter = function()
	{
		return this._animationAttack1Counter;
	};

	EntityTileModel.prototype.setAnimationAttack1Counter = function(value)
	{
		this._animationAttack1Counter = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ANIMATION_ATTACK_1_COUNTER, value, this);
	};

	EntityTileModel.prototype.getAnimationAttack2Counter = function()
	{
		return this._animationAttack2Counter;
	};

	EntityTileModel.prototype.setAnimationAttack2Counter = function(value)
	{
		this._animationAttack2Counter = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ANIMATION_ATTACK_2_COUNTER, value, this);
	};

	EntityTileModel.prototype.getAnimationHurtCounter = function()
	{
		return this._animationHurtCounter;
	};

	EntityTileModel.prototype.setAnimationHurtCounter = function(value)
	{
		this._animationHurtCounter = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ANIMATION_HURT_COUNTER, value, this);
	};

	EntityTileModel.prototype.getAnimationDieCounter = function()
	{
		return this._animationDieCounter;
	};

	EntityTileModel.prototype.setAnimationDieCounter = function(value)
	{
		this._animationDieCounter = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ANIMATION_DIE_COUNTER, value, this);
	};

	EntityTileModel.prototype.getAnimationSpawnCounter = function()
	{
		return this._animationSpawnCounter;
	};

	EntityTileModel.prototype.setAnimationSpawnCounter = function(value)
	{
		this._animationSpawnCounter = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ANIMATION_SPAWN_COUNTER, value, this);
	};

	EntityTileModel.prototype.getAttackerEntity = function()
	{
		return this._attackerEntity;
	};

	EntityTileModel.prototype.setAttackerEntity = function(value)
	{
		this._attackerEntity = value;
		this.sendNotification(EntityTileModelEvent.UPDATED_ATTACKER_ENTITY, value, this);
	};

	EntityTileModel.prototype.getAnimationAttack1CounterCap = function()
	{
		return this._animationAttack1CounterCap;
	};

	EntityTileModel.prototype.setAnimationAttack1CounterCap = function(value)
	{
		this._animationAttack1CounterCap = value;
	};

	EntityTileModel.prototype.getAnimationAttack2CounterCap = function()
	{
		return this._animationAttack1CounterCap;
	};

	EntityTileModel.prototype.setAnimationAttack1CounterCap = function(value)
	{
		this._animationAttack2CounterCap = value;
	};

	EntityTileModel.prototype.getAnimationHurtCounterCap = function()
	{
		return this._animationHurtCounterCap;
	};

	EntityTileModel.prototype.setAnimationHurtCounterCap = function(value)
	{
		this._animationHurtCounterCap = value;
	};

	EntityTileModel.prototype.getAnimationDieCounterCap = function()
	{
		return this._animationDieCounterCap;
	};

	EntityTileModel.prototype.setAnimationDieCounterCap = function(value)
	{
		this._animationDieCounterCap = value;
	};

	EntityTileModel.prototype.getAnimationSpawnCounterCap = function()
	{
		return this._animationSpawnCounterCap;
	};

	EntityTileModel.prototype.setAnimationSpawnCounterCap = function(value)
	{
		this._animationSpawnCounterCap = value;
	};

})();