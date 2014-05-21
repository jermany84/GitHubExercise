/**
 * Created by apple on 4/15/14.
 */

(function()
{
	this.CursorUIModel = function()
	{
		this._isVisible = false;
		this._isMovable = true;
	};

	CursorUIModel.prototype = new PhysicalModel();
	CursorUIModel.prototype.constructor = CursorUIModel;

	CursorUIModel.prototype.getVisible = function()
	{
		return this._isVisible;
	};

	CursorUIModel.prototype.setVisible = function(value)
	{
		this._isVisible = value;
	};

	CursorUIModel.prototype.getMovable = function()
	{
		return this._isMovable;
	};

	CursorUIModel.prototype.setMovable = function(value)
	{
		this._isMovable = value;
	};

})();

