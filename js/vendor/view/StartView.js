/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.StartView = function()
	{
		this._mapDataModel = null;
	};

	StartView.prototype = new AbstractView();
	StartView.prototype.constructor = StartView;

	StartView.prototype.render = function(delta)
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
				this._context.textAlign = "center";
				this._context.font = "normal bold 18px sans-serif";
				this._context.textBaseline = "bottom";
				this._context.fillText("PRESS ESC TO START", this._mapDataModel.getCanvasWidth()/2, this._mapDataModel.getCanvasHeight()/2, 256);
				this._context.restore();
			}
		}
	};

	StartView.prototype.setMapDataModel = function(value)
	{
		this._mapDataModel = value;
	};

})();

