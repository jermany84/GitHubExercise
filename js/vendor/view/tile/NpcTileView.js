/**
 * Created by apple on 4/1/14.
 */

(function()
{
    this.NpcTileView = function(factory)
    {
        this._factory = factory;
    };

    NpcTileView.prototype = new EntityTileView(null);
    NpcTileView.prototype.constructor = NpcTileView;

    NpcTileView.prototype.render = function (delta)
    {
	    if(this._context === null || typeof(this._context) === "undefined")
	    {
		    return;
	    }
	    if(this._tileModel === null || typeof(this._tileModel) === "undefined")
	    {
		    return;
	    }
	    if(this._tileModel.getLastFrame() !== this._tileModel.getFrame())
	    {
		    this._sprite = this._factory.create(this._tileModel.getType(),  this._tileModel.getFrame());
		    this._tileModel.setLastFrame(this._tileModel.getFrame());
	    }
	    if(this._sprite === null || typeof(this._sprite) === "undefined")
	    {
		    return;
	    }

        this._context.save();
        this._context.translate(0, 112);
        this._context.translate((this._tileModel.getX() + this._tileModel.getXOffset()), (this._tileModel.getY() + this._tileModel.getYOffset()));

	    if(delta !== 0)
        {
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

