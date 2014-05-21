/**
 * Created by apple on 4/9/14.
 */

(function()
{
	this.EntityHealthUIView = function()
	{
		this._count = 0;
		this._max = 0;
		this._healthUIModel = null;
		this._sprites = [];
	};

	EntityHealthUIView.prototype = new AbstractView();
	EntityHealthUIView.prototype.constructor = EntityHealthUIView;

	EntityHealthUIView.prototype.render = function(delta)
	{
		if((this._context !== null && typeof(this._context) !== "undefined"))
		{
			if(this._healthUIModel !== null &&
				typeof(this._healthUIModel) !== "undefined")
			{
				this._context.save();

				this._context.setTransform(1,0,0,1,0,0);
				this._context.translate(20, 32);
				this._context.fillStyle = "#d82800";
				this._context.font = "normal bold 30px sans-serif";
				this._context.textBaseline = "bottom";
				this._context.fillText("– LIFE –", 12+this._healthUIModel.getX(), this._healthUIModel.getY(), 96);
				this._context.textAlign = "center";
				this._context.restore();

				this._sprites = [];
				var remainder = this._max - this._count;

				this._context.save();
				this._context.translate(this._healthUIModel.getX(), 30+this._healthUIModel.getY());

				for(var i = 0; i < this._count; i++)
				{
					this._sprites.push(new Sprite(SpriteSheetUrl.CAST, [160, 704], [32, 32], 0, [0], "horizontal", true));
				}
				for(i = 0; i < remainder; i++)
				{
					this._sprites.push(new Sprite(SpriteSheetUrl.CAST, [192, 704], [32, 32], 0, [0], "horizontal", true));
				}
				for(i = 0; i < this._sprites.length; i++)
				{
					if(i !== 0)
					{
						this._context.translate(18, 0);
						if(i % 8 === 0)
						{
							this._context.setTransform(1,0,0,1,0,0);
							this._context.translate(this._healthUIModel.getX(), this._healthUIModel.getY());
							this._context.translate(0, 48);
						}
					}
					this._sprites[i].update(delta);
					this._sprites[i].render(this._context);
				}
				this._context.restore();
			}
		}
	};

	EntityHealthUIView.prototype.setCount = function(value)
	{
		this._count = value;
	};

	EntityHealthUIView.prototype.setMax = function(value)
	{
		this._max = value;
	};

	EntityHealthUIView.prototype.setHealthUIModel = function(value)
	{
		this._healthUIModel = value;
	};

})();

