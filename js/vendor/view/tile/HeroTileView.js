/**
 * Created by apple on 3/19/14.
 */

(function ()
{
    this.HeroTileView = function (factory)
    {
        this._factory = factory;
    };

    HeroTileView.prototype = new EntityTileView(null);
    HeroTileView.prototype.constructor = HeroTileView;

    HeroTileView.prototype.render = function (delta)
    {
	    if(this._context === null || typeof(this._context) === "undefined")
	    {
		    return;
	    }
	    if(this._tileModel === null || typeof(this._tileModel) === "undefined")
	    {
		    return;
	    }
	    if((this._tileModel.getLastFrame() !== this._tileModel.getFrame()) || this._tileModel.getFrame() === null)
        {
	        this._sprite = this._factory.create(this._tileModel.getType(),  this._tileModel.getFrame());
	        this._tileModel.setLastFrame(this._tileModel.getFrame());
        }
	    if(this._sprite === null || typeof(this._sprite) === "undefined")
	    {
		    return;
	    }

        this._context.save();
	    this._context.setTransform(1,0,0,1,0,0);
        this._context.translate(0, 112);
        this._context.translate((this._tileModel.getX() + this._tileModel.getXOffset()), (this._tileModel.getY() + this._tileModel.getYOffset()));

        if(delta !== 0)
        {
	        if(this._tileModel.getIsHurting() === true &&
		        this._tileModel.getIsDying() === false &&
		        this._tileModel.getIsDead() === false)
	        {
		        if(this._tileModel.getAnimationHurtCounter() % 4 === 0)
		        {
			        this._context.globalAlpha = 0.4;
		        } else {
			        this._context.globalAlpha = 0.6;
		        }
	        } else {
		        this._context.globalAlpha = 1;
	        }
	        this._sprite.update(delta);
        }

	    this._sprite.render(this._context);
        this._context.restore();

	    if(this._aabbView !== null && typeof(this._aabbView) !== "undefined")
	    {
		    this._aabbView.render(delta);
	    }

	    this._tileModel.setXOffset(0);
	    this._tileModel.setYOffset(0);
    };

	HeroTileView.prototype.forceRender = function(delta)
	{
		if(this._context === null || typeof(this._context) === "undefined")
		{
			return;
		}
		if(this._tileModel === null || typeof(this._tileModel) === "undefined")
		{
			return;
		}

		this._sprite = this._factory.create(this._tileModel.getType(),  this._tileModel.getFrame());
		this._tileModel.setLastFrame(this._tileModel.getFrame());

		if(this._sprite === null || typeof(this._sprite) === "undefined")
		{
			return;
		}

		this._context.save();
		this._context.setTransform(1,0,0,1,0,0);
		this._context.translate(0, 112);
		this._context.translate((this._tileModel.getX() + this._tileModel.getXOffset()), (this._tileModel.getY() + this._tileModel.getYOffset()));

		if(delta !== 0)
		{
			if(this._tileModel.getIsHurting() === true &&
				this._tileModel.getIsDying() === false &&
				this._tileModel.getIsDead() === false)
			{
				if(this._tileModel.getAnimationHurtCounter() % 4 === 0)
				{
					this._context.globalAlpha = 0.4;
				} else {
					this._context.globalAlpha = 0.6;
				}
			} else {
				this._context.globalAlpha = 1;
			}
			this._sprite.update(delta);
		}

		this._sprite.render(this._context);
		this._context.restore();

		if(this._aabbView !== null && typeof(this._aabbView) !== "undefined")
		{
			this._aabbView.render(delta);
		}

		this._tileModel.setXOffset(0);
		this._tileModel.setYOffset(0);
	};

})();