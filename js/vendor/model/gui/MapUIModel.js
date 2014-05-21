/**
 * Created by apple on 4/9/14.
 */

var MapUIType = {
	NONE : 0,
	OVERWORLD : 1,
	DUNGEON : 2
};

(function()
{
	this.MapUIModel = function()
	{
		this._uiType = MapUIType.NONE;
		this._heroMap = null;
		this._mapDataModel = null;
		this._heroPosition = 0;
		this._isVisible = false;
	};

	MapUIModel.prototype = new PhysicalModel();
	MapUIModel.prototype.constructor = MapUIModel;

	MapUIModel.prototype.getUIType = function()
	{
		return this._uiType;
	};

	MapUIModel.prototype.setUIType = function(value)
	{
		this._uiType = value;
	};

	MapUIModel.prototype.getHeroMap = function()
	{
		return this._heroMap;
	};

	MapUIModel.prototype.setHeroMap = function(value)
	{
		this._heroMap = value;
	};

	MapUIModel.prototype.getMapDataModel = function()
	{
		return this._mapDataModel;
	};

	MapUIModel.prototype.setMapDataModel = function(value)
	{
		this._mapDataModel = value;
	};

	MapUIModel.prototype.getHeroPosition = function()
	{
		return this._heroPosition;
	};

	MapUIModel.prototype.setHeroPosition = function(value)
	{
		this._heroPosition = value;
	};

	MapUIModel.prototype.getIsVisible = function()
	{
		return this._isVisible;
	};

	MapUIModel.prototype.setIsVisible = function(value)
	{
		this._isVisible = value;
	};

})();

