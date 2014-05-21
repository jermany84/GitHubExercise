/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.GameOverView = function()
	{
		this._mapDataModel = null;
	};

	GameOverView.prototype = new AbstractView();
	GameOverView.prototype.constructor = GameOverView;

	GameOverView.prototype.render = function(delta)
	{
		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			if(this._mapDataModel !== null && typeof(this._mapDataModel) !== "undefined")
			{
				this._context.save();
				this._context.setTransform(1,0,0,1,0,0);
				this._context.fillStyle = "#000000";
				this._context.fillRect(0, 0, this._mapDataModel.getCanvasWidth(), this._mapDataModel.getCanvasHeight());

				this._context.fillStyle = "#ffffff";
				this._context.font = "normal bold 18px sans-serif";
				this._context.textAlign = "center";
				this._context.textBaseline = "bottom";
				this._context.fillText("GAME OVER", this._mapDataModel.getCanvasWidth()/2, this._mapDataModel.getCanvasHeight()/2, 256);

				this._context.fillText("PRESS ESC TO PLAY AGAIN", this._mapDataModel.getCanvasWidth()/2, (this._mapDataModel.getCanvasHeight()/2) + 50, 256);
				this._context.restore();
			}
		}
	};

	GameOverView.prototype.setMapDataModel = function(value)
	{
		this._mapDataModel = value;
	};

})();

