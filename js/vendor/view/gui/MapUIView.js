/**
 * Created by apple on 4/9/14.
 */

(function()
{
	this.MapUIView = function()
	{
		this._mapUIModel = null;
	};

	MapUIView.prototype = new AbstractView();
	MapUIView.prototype.constructor = MapUIView;

	MapUIView.prototype.render = function(delta)
	{
		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			if(this._mapUIModel !== null && typeof(this._mapUIModel) !== "undefined")
			{
				if(this._mapUIModel.getMapDataModel() !== null && typeof(this._mapUIModel.getMapDataModel()) !== "undefined")
				{
					var nodesTotal = this._mapUIModel.getMapDataModel().getMapChunksWide() * this._mapUIModel.getMapDataModel().getMapChunksHigh();
					var nodeWidth = this._mapUIModel.getWidth() / this._mapUIModel.getMapDataModel().getMapChunksWide();
					var nodeHeight = this._mapUIModel.getHeight() / this._mapUIModel.getMapDataModel().getMapChunksHigh();
					var xcounter = 0;
					var ycounter = 0;

					this._context.save();
					this._context.translate(this._mapUIModel.getX(), this._mapUIModel.getY());

					for(var i = 0; i < nodesTotal; i++)
					{
						if(i % this._mapUIModel.getMapDataModel().getMapChunksWide() === 0)
						{
							xcounter = 0;
							if(i !== 0)
							{
								ycounter++;
							}
						}
						if(i === this._mapUIModel.getHeroPosition())
						{
							this._context.fillStyle = "#80d010";
						}
						else
						{
							this._context.fillStyle = "#747474";
						}
						if(nodesTotal === 1)
						{
							this._context.globalAlpha = 0;
						}
						else
						{
							this._context.globalAlpha = 1;
						}
						this._context.fillRect(xcounter*nodeWidth, ycounter*nodeHeight, nodeWidth, nodeHeight);
						this._context.lineWidth = 1;
						this._context.strokeStyle = "#747474";

						this._context.strokeRect(xcounter*nodeWidth, ycounter*nodeHeight, nodeWidth, nodeHeight);

						xcounter++;
					}
					this._context.restore();
				}
			}
		}
	};

	MapUIView.prototype.setMapUIModel = function(value)
	{
		this._mapUIModel = value
	};

})();

