/**
 * Created by apple on 4/9/14.
 */

(function()
{
	this.CounterView = function()
	{
		this._counterModel = null;
	};

	CounterView.prototype = new AbstractView();
	CounterView.prototype.constructor = CounterView;

	CounterView.prototype.render = function(delta)
	{
		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			if(this._counterModel !== null && typeof(this._counterModel) !== "undefined")
			{
				this._context.save();
				this._context.setTransform(1,0,0,1,0,0);
				this._context.fillStyle = "#ffffff";
				this._context.textAlign = "left";
				this._context.font = "normal bold 16px sans-serif";
				this._context.textBaseline = "bottom";
				this._context.fillText("X"+this._counterModel.getCounter(), this._counterModel.getX(), this._counterModel.getY());
				this._context.restore();
			}
		}
	};

	CounterView.prototype.setCounterModel = function(value)
	{
		this._counterModel = value;
	};

})();

