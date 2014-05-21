/**
 * Created by apple on 4/10/14.
 */

(function()
{
	this.EntityUIView = function()
	{
		this._entityUIModel = null;
		this._counter = 0;
		this._blinkAnimationCounter = 0;
		this._level = 1;
		this._cursorUIModel = null;
	};

	EntityUIView.prototype = new AbstractView();
	EntityUIView.prototype.constructor = EntityUIView;

	EntityUIView.prototype.render = function(delta)
	{
		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			if(this._entityUIModel !== null && typeof(this._entityUIModel) !== "undefined")
			{
				this._context.save();
				this._context.setTransform(1,0,0,1,0,0);
				this._context.fillStyle = "#000000";
				this._context.fillRect(this._entityUIModel.getX(), this._entityUIModel.getY(), this._entityUIModel.getWidth(), this._entityUIModel.getHeight());

				this._context.fillStyle = "#d82800";
				this._context.textAlign = "center";
				this._context.font = "normal bold 18px sans-serif";
				this._context.textBaseline = "bottom";
				this._context.fillText("INVENTORY", 140, 60+this._entityUIModel.getY(), 160);

				this._context.fillStyle = "#ffffff";
				this._context.fillText("USE B BUTTON", 140, 160+this._entityUIModel.getY(), 192);
				this._context.fillText("FOR THIS", 140, 178+this._entityUIModel.getY(), 192);

				this._context.fillStyle = "#d82800";
				this._context.fillText("TRIFORCE", 256, 336+this._entityUIModel.getY(), 128);

				this._context.setTransform(1,0,0,1,0,0);
				this._context.translate(112, 74+this._entityUIModel.getY());

				var buttonActionContainerSprite = new Sprite(SpriteSheetUrl.TERRAIN, [160, 928], [64, 64], 0, [0], "horizontal", true);
				buttonActionContainerSprite.update(delta);
				buttonActionContainerSprite.render(this._context);

				this._context.setTransform(1,0,0,1,0,0);
				this._context.translate(234, 82+this._entityUIModel.getY());
				var actionsContainerSprite = new Sprite(SpriteSheetUrl.TERRAIN, [224, 928], [224, 96], 0, [0], "horizontal", true);
				actionsContainerSprite.update(delta);
				actionsContainerSprite.render(this._context);

				this._context.setTransform(1,0,0,1,0,0);
				this._context.translate(160, 384+this._entityUIModel.getY());
				var itemCountersSprite =  new Sprite(SpriteSheetUrl.TERRAIN, [0, 928], [32, 64], 0, [0], "horizontal", true);
				itemCountersSprite.update(delta);
				itemCountersSprite.render(this._context);
				this._context.restore();

				this._context.setTransform(1,0,0,1,0,0);
				this._context.translate(224, 384+this._entityUIModel.getY());
				var buttonActionsSprite =  new Sprite(SpriteSheetUrl.TERRAIN, [32, 928], [128, 64], 0, [0], "horizontal", true);
				buttonActionsSprite.update(delta);
				buttonActionsSprite.render(this._context);

				if(this._cursorUIModel !== null && typeof(this._cursorUIModel) !== "undefined")
				{
					this._context.setTransform(1,0,0,1,0,0);
					this._context.translate(this._cursorUIModel.getX(), this._cursorUIModel.getY()+this._entityUIModel.getY());
					var cursorSprite = new Sprite(SpriteSheetUrl.TERRAIN, [192, 992], [32, 32], 0, [0], "horizontal", true);
					cursorSprite.update(delta);

					if(this._cursorUIModel.getVisible() === true)
					{
						if(Math.floor(this._counter) % 25 === 0)
						{
							if(this._blinkAnimationCounter === 1)
							{
								this._blinkAnimationCounter = 0;
							} else {
								this._blinkAnimationCounter = 1;
							}
						}
						if(this._blinkAnimationCounter === 1)
						{
							cursorSprite.render(this._context);
						}
						this._counter += 1;
					}
				}

				switch(this._entityUIModel.getType())
				{
					case MapUIType.NONE :
						break;
					case MapUIType.OVERWORLD :
						this._context.setTransform(1,0,0,1,0,0);
						this._context.strokeStyle = "#fcbcb0";
						this._context.fillStyle = "#fcbcb0";
						this._context.lineWidth = 2;
						this._context.beginPath();
						this._context.moveTo(256, 205+this._entityUIModel.getY());
						this._context.lineTo(352, 300+this._entityUIModel.getY());
						this._context.lineTo(160, 300+this._entityUIModel.getY());
						this._context.lineTo(256, 205+this._entityUIModel.getY());
						this._context.stroke();

						this._context.moveTo(256, 222+this._entityUIModel.getY());
						this._context.lineTo(320, 286+this._entityUIModel.getY());
						this._context.lineTo(190, 286+this._entityUIModel.getY());
						this._context.lineTo(256, 222+this._entityUIModel.getY());
						this._context.stroke();
						this._context.restore();
						break;
					case MapUIType.DUNGEON :
						this._context.setTransform(1,0,0,1,0,0);
						this._context.fillStyle = "#d88c2a";
						this._context.fillRect(196, 198+this._entityUIModel.getY(), 256, 160);

						this._context.fillStyle = "#d82800";
						this._context.textAlign = "center";
						this._context.font = "normal bold 18px sans-serif";
						this._context.textBaseline = "bottom";
						this._context.fillText("MAP", 108, 204+this._entityUIModel.getY(), 96);

						this._context.fillText("COMPASS", 108, 268+this._entityUIModel.getY(), 160);

						this._context.fillStyle = "#ffffff";
						this._context.fillText("LEVEL–"+this._level, 96, 384+this._entityUIModel.getY(), 160);
						this._context.restore();
						break;
				}
			}
		}
	};

	EntityUIView.prototype.setEntityUIModel = function(value)
	{
		this._entityUIModel = value;
	};

	EntityUIView.prototype.setCursorModel = function(value)
	{
		this._cursorUIModel = value;
	};

})();

