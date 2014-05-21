/**
 * Created by apple on 4/29/14.
 */

(function()
{
	this.DestinationModel = function(x, y, safeX, safeY, mapKey, mapChunkIndex, roomId, linkId)
	{
		this.setId(getUniqueId());
		this._x = x || 0;
		this._y = y || 0;
		this._safeX = safeX || 0;
		this._safeY = safeY || 0;
		this._mapKey = mapKey || MapKey.NONE;
		this._mapChunkIndex = mapChunkIndex || 0;
		this._roomId = roomId || 0;
	};

	DestinationModel.prototype = new AbstractModel();
	DestinationModel.prototype.constructor = DestinationModel;

	DestinationModel.prototype.getId = function()
	{
		return this._id;
	};

	DestinationModel.prototype.setId = function(value)
	{
		this._id = value;
	};

	DestinationModel.prototype.getX = function()
	{
		return this._x;
	};

	DestinationModel.prototype.setX = function(value)
	{
		this._x = value;
	};

	DestinationModel.prototype.getY = function()
	{
		return this._y;
	};

	DestinationModel.prototype.setY = function(value)
	{
		this._y = value;
	};

	DestinationModel.prototype.getSafeX = function()
	{
		return this._safeX;
	};

	DestinationModel.prototype.setSafeX = function(value)
	{
		this._safeX = value;
	};

	DestinationModel.prototype.getSafeY = function()
	{
		return this._safeY;
	};

	DestinationModel.prototype.setSafeY = function(value)
	{
		this._safeY = value;
	};

	DestinationModel.prototype.getMapKey = function()
	{
		return this._mapKey;
	};

	DestinationModel.prototype.setMapKey = function(value)
	{
		this._mapKey = value;
	};

	DestinationModel.prototype.getMapChunkIndex = function()
	{
		return this._mapChunkIndex;
	};

	DestinationModel.prototype.setMapChunkIndex = function(value)
	{
		this._mapChunkIndex = value;
	};

	DestinationModel.prototype.getRoomId = function()
	{
		return this._roomId;
	};

	DestinationModel.prototype.setRoomId = function(value)
	{
		this._roomId = value;
	};

})();

