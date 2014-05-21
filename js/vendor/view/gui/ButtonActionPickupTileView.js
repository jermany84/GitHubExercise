/**
 * Created by apple on 4/9/14.
 */

(function()
{
	this.ButtonActionPickupTileView = function(factory)
	{
		this._factory = factory;
		this._tileModel = null;
		this._sprite = null;
	};

	ButtonActionPickupTileView.prototype = new AbstractView();
	ButtonActionPickupTileView.prototype.constructor = ButtonActionPickupTileView;

	ButtonActionPickupTileView.prototype.render = function(delta)
	{
		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			if(this._tileModel !== null && typeof(this._tileModel) !== "undefined")
			{
				if(this._factory !== null && typeof(this._factory) !== "undefined")
				{
					this._sprite = this._factory.create(this._tileModel.getType());
					this._tileModel.setLastFrame(this._tileModel.getFrame());
				}
				if(this._sprite !== null &&
					typeof(this._sprite) !== "undefined" &&
					this._context !== null &&
					typeof(this._context) !== "undefined")
				{
					if((this._tileModel !== null && typeof(this._tileModel) !== "undefined"))
					{
						this._context.save();
						this._context.setTransform(1,0,0,1,0,0);
						this._context.translate((this._tileModel.getX() + this._tileModel.getXOffset()), (this._tileModel.getY() + this._tileModel.getYOffset()));
						this._sprite.update(delta);
						this._sprite.render(this._context);
						this._context.restore();
					}
				}
			}

		}
	};

	ButtonActionPickupTileView.prototype.getTileModel = function()
	{
		return this._tileModel;
	};

	ButtonActionPickupTileView.prototype.setTileModel = function(value)
	{
		this._tileModel = value;
	};

})();

