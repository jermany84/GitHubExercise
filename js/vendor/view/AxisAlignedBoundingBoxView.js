/**
 * Created by apple on 5/2/14.
 */

(function()
{
	this.AxisAlignedBoundingBoxView = function()
	{
		this._aabbModel = null;
	};

	AxisAlignedBoundingBoxView.prototype = new AbstractView();
	AxisAlignedBoundingBoxView.prototype.constructor = AxisAlignedBoundingBoxView;

	AxisAlignedBoundingBoxView.prototype.setAABBModel = function(value)
	{
		this._aabbModel = value;
	};

	AxisAlignedBoundingBoxView.prototype.render = function(delta)
	{
		if(this._context === null || typeof(this._context) === "undefined")
		{
			return;
		}
		if(this._aabbModel === null || typeof(this._aabbModel) === "undefined")
		{
			return;
		}
		if(this._aabbModel.getParentModel() === null || typeof(this._aabbModel.getParentModel()) === "undefined")
		{
			return;
		}
		if(this._aabbModel.getIsVisible() === false)
		{
			return;
		}
		this._context.save();
		this._context.setTransform(1,0,0, 1,0,0);
		this._context.translate(0, 112);
		this._context.globalAlpha = 0.5;
		this._context.fillStyle = this._aabbModel.getFillStyle();
		this._context.fillRect(this._aabbModel.getX(), this._aabbModel.getY(), this._aabbModel.getWidth(), this._aabbModel.getHeight());
		this._context.restore();
	};

})();

