/**
 * Created by apple on 3/18/14.
 */

(function(factory)
{
    this.TileView = function(factory)
    {
        this._factory = factory;
        this._sprite = null;
        this._tileModel = null;
        this._projectiles = [];
	    this._aabbView = new AxisAlignedBoundingBoxView();
    };

    TileView.prototype = new AbstractView();
    TileView.prototype.constructor = TileView;

	TileView.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._aabbView.setCanvas(this._canvas);
	};

    TileView.prototype.render = function(delta)
    {
	    if(this._context === null || typeof(this._context) === "undefined")
	    {
		    return;
	    }
	    if(this._tileModel === null || typeof(this._tileModel) === "undefined")
	    {
		    return;
	    }
	    if(delta !== 0)
	    {
		    if(this._factory !== null && this._factory !== "undefined")
		    {
			    if(this._tileModel.getLastFrame() !== this._tileModel.getFrame())
			    {
				    this._sprite = this._factory.create(this._tileModel.getType(), this._tileModel.getFrame());
				    this._tileModel.setLastFrame(this._tileModel.getFrame());
			    }
		    }
	    }
	    if(this._aabbView !== null && typeof(this._aabbView) !== "undefined")
	    {
		    this._aabbView.render(delta);
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
	        this._sprite.update(delta);
        }

	    this._sprite.render(this._context);
        this._context.restore();

	    this._tileModel.setXOffset(0);
	    this._tileModel.setYOffset(0);
    };

	TileView.prototype.forceRender = function(delta)
	{
		if(this._context === null || typeof(this._context) === "undefined")
		{
			return;
		}
		if(this._tileModel === null || typeof(this._tileModel) === "undefined")
		{
			return;
		}
		if(this._factory !== null && this._factory !== "undefined")
		{
			this._sprite = this._factory.create(this._tileModel.getType(), this._tileModel.getFrame());
		}

		this._tileModel.setLastFrame(this._tileModel.getFrame());

		if(this._aabbView !== null && typeof(this._aabbView) !== "undefined")
		{
			this._aabbView.render(delta);
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
			this._sprite.update(delta);
		}

		this._sprite.render(this._context);
		this._context.restore();

		this._tileModel.setXOffset(0);
		this._tileModel.setYOffset(0);
	};

    TileView.prototype.setTileModel = function(value)
    {
	    if(value !== null && typeof(value) !== "undefined")
	    {
		    this._aabbView.setAABBModel(value.getAABB());
	    } else {
		    this._tileModel.setAABB(null);
	    }
	    this._tileModel = value;
    };

	TileView.prototype.getTileModel = function()
	{
		return this._tileModel;
	};

	TileView.prototype.setAABBView = function(value)
	{
		this._aabbView = value;
	};

})();