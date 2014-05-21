/**
 * Created by apple on 4/28/14.
 */

var RoomType = {
	STANDARD : 0,
	BOSS : 1
};

var RoomWeatherType = {
	DAY : 1,
	NIGHT : 2,
	DAY_RAIN : 3,
	NIGHT_RAIN : 4,
	DARK : 5
};

var RoomEntranceTransition = {
	POP : 0,
	VERTICAL_WHIPE : 1,
	HORIZONTAL_WHIPE : 2,
	CENTER_WHIPE : 3,
	MOSAIC : 4
};

var RoomExitTransition = {
	POP : 0,
	VERTICAL_WHIPE : 1,
	HORIZONTAL_WHIPE : 2,
	CENTER_WHIPE : 3,
	MOSAIC : 4
};

var MusicType = {
	NONE : "",
	OVERWORLD : "overworld"
};

var RoomEvent = {
	UPDATED_TYPE : "RoomEventUpdatedType",
	UPDATED_WEATHER : "RoomEventUpdatedWeather",
	UPDATED_ENTRANCE_TRANSITION : "RoomEventUpdatedEntranceTransition",
	UPDATED_EXIT_TRANSITION : "RoomEventUpdatedExitTransition",
	UPDATED_MUSIC : "RoomEventUpdatedMusic",
	UPDATED_DESTINATION_MODELS : "RoomEventUpdatedDestinationModels",
	UPDATED_ROOM_ID : "RoomEventUpdatedRoomId"
};

(function()
{
	this.RoomModel = function(type, music, weather, entranceTransition, exitTransition)
	{
		this.setId(getUniqueId());
		this._type = type || RoomType.STANDARD;
		this._music = music || MusicType.NONE;
		this._weather = weather || RoomWeatherType.DAY;
		this._entranceTransition = entranceTransition || RoomEntranceTransition.POP;
		this._exitTransition = exitTransition || RoomExitTransition.POP;
		this._destinationModels = [];
	};

	RoomModel.prototype = new AbstractModel();
	RoomModel.prototype.constructor = RoomModel;

	RoomModel.prototype.getType = function()
	{
		return this._type;
	};

	RoomModel.prototype.setType = function(value)
	{
		this._type = value;
		this.sendNotification(RoomEvent.UPDATED_TYPE, value, this);
	};

	RoomModel.prototype.getWeather = function()
	{
		return this._weather;
	};

	RoomModel.prototype.setWeather = function(value)
	{
		this._weather = value;
		this.sendNotification(RoomEvent.UPDATED_WEATHER, value, this);
	};

	RoomModel.prototype.getEntranceTransition = function()
	{
		return this._entranceTransition;
	};

	RoomModel.prototype.setEntranceTransition = function(value)
	{
		this._entranceTransition = value;
		this.sendNotification(RoomEvent.UPDATED_ENTRANCE_TRANSITION, value, this);
	};

	RoomModel.prototype.getExitTransition = function()
	{
		return this._exitTransition;
	};

	RoomModel.prototype.setExitTransition = function(value)
	{
		this._exitTransition = value;
		this.sendNotification(RoomEvent.UPDATED_EXIT_TRANSITION, value, this);
	};

	RoomModel.prototype.getMusic = function()
	{
		return this._music;
	};

	RoomModel.prototype.setMusic = function(value)
	{
		this._music = value;
		this.sendNotification(RoomEvent.UPDATED_MUSIC, value, this);
	};

	RoomModel.prototype.getDestinationModels = function()
	{
		return this._destinationModels;
	};

	RoomModel.prototype.setDestinationModels = function(value)
	{
		this._destinationModels = value;
		this.sendNotification(RoomEvent.UPDATED_DESTINATION_MODELS, value, this);
	};

})();

