/**
 * Created by apple on 3/28/14.
 */

var NpcTileModelType = {
	NONE : 0,
	OLDMAN : 1,
	KID : 2,
	OLDWOMAN : 3
};

var NpcTileModelFrame = {
	IDLE : 1,
	HURT : 2,
	SPAWN : 3
};

(function()
{
    this.NpcTileModel = function()
    {
	    this._xAcceleration = 0;
	    this._yAcceleration = 0;
	    this._weight = 180;
	    this._strength = 1;
	    this._health = 1;
	    this._healthCap = 1;
	    this._dropsLuck = 0;
	    this._attackerEntity = null;
	    this._animationAttack1Counter = 0;
	    this._animationAttack2Counter = 0;
	    this._animationHurtCounter = 0;
	    this._animationSpawnCounter = 0;
    };

    NpcTileModel.prototype = new EntityTileModel();
    NpcTileModel.prototype.constructor = NpcTileModel;

	NpcTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();

		switch(this._type)
		{
			case NpcTileModelType.OLDMAN :
			case NpcTileModelType.KID :
			case NpcTileModelType.OLDWOMAN :
				if(this._isSpawning === true)
				{
					this.setFrame(NpcTileModelFrame.SPAWN);
					this._animationSpawnCounter++;
					if(this._animationSpawnCounter === this._animationSpawnCounterCap)
					{
						this._animationSpawnCounter = 0;
						this.setIsSpawning(false);
					}
				}
				else
				if(this._isAttack1 === true)
				{
					switch(this._direction)
					{
						case EntityTileModelDirection.UP :
						case EntityTileModelDirection.RIGHT :
						case EntityTileModelDirection.DOWN :
						case EntityTileModelDirection.LEFT :
							this.setFrame(NpcTileModelFrame.IDLE);
							break;
					}
					this._animationAttack1Counter++;
					if(this._animationAttack1Counter === 8)
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
						case EntityTileModelDirection.RIGHT :
						case EntityTileModelDirection.DOWN :
						case EntityTileModelDirection.LEFT :
							this.setFrame(NpcTileModelFrame.IDLE);
							break;
					}
					this._animationAttack2Counter++;
					if(this._animationAttack2Counter === 8)
					{
						this._animationAttack2Counter = 0;
						this.setIsAttack2(false);
					}
				}
				else
				{
					switch(this._direction)
					{
						case EntityTileModelDirection.UP :
						case EntityTileModelDirection.RIGHT :
						case EntityTileModelDirection.DOWN :
						case EntityTileModelDirection.LEFT :
							this.setFrame(NpcTileModelFrame.IDLE);
							break;
					}
				}
				break;
		}
	};

    NpcTileModel.prototype.setType = function(value)
    {
        this._type = value;
        if(this)
        {
            switch(this._type)
            {
                case NpcTileModelType.OLDMAN :
	                this.setFrame(4);
	                this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
                    this.setProjectiles([1, 1, 1, 1, 1]);
                    break;
	            case NpcTileModelType.KID :
	            case NpcTileModelType.OLDWOMAN :
		            this.setFrame(4);
		            this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
		            this.setProjectiles([]);
		            break;
                default :
	                this._aabb = new AxisAlignedBoundingBoxModel(this, 28, 28);
                    this.setProjectiles([]);
                    break;
            }
	        this._aabb.setFillStyle("#ccccff");
	        //this._aabb.setIsVisible(true);
	        this.sendNotification(TileModelEvent.UPDATED_TYPE, value, this);
        }
    };

})();

