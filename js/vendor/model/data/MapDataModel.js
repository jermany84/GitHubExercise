/**
 * Created by apple on 3/28/14.
 */

var MapDataModelEvent = {
	UPDATED_TYPE : "MapDataModelEventUpdatedType",
	UPDATED_MAP_CHUNK_INDEX : "MapDataModelEventUpdatedMapChunkIndex"
};

var MapType = {
	NONE : 0,
	OVERWORLD : 1,
	DUNGEON : 2,
	RESIDENCE : 3,
	CAVE : 4
};

(function()
{
    this.MapDataModel = function()
    {
	    this.setId(getUniqueId());
	    this._type = 0;
        this._mapChunkIndex = 0;
	    this._rooms = [];
    };

    MapDataModel.prototype = new AbstractModel();
    MapDataModel.prototype.constructor = MapDataModel;

	MapDataModel.prototype.getType = function()
	{
		return this._type;
	};

	MapDataModel.prototype.setId = function(value)
	{
		this._type = value;
		this.sendNotification(MapDataModelEvent.UPDATED_TYPE, value, this);
	};

	MapDataModel.prototype.getCanvasWidth = function()
	{
		return 512;
	};

	MapDataModel.prototype.getCanvasHeight = function()
	{
		return 448;
	};

    MapDataModel.prototype.getTileWidth = function()
    {
        return 32;
    };

    MapDataModel.prototype.getTileHeight = function()
    {
        return 32;
    };

    MapDataModel.prototype.getMapChunk = function(fullMap, index)
    {
        return fullMap[index];
    };

    MapDataModel.prototype.getMapChunkWidth = function()
    {
        return 15;
    };

    MapDataModel.prototype.getMapChunkHeight = function()
    {
        return 11;
    };

    MapDataModel.prototype.getMapChunksWide = function()
    {
        return 1;
    };

    MapDataModel.prototype.getMapChunksHigh = function()
    {
        return 1;
    };

    MapDataModel.prototype.getMapChunkIndex = function()
    {
        return this._mapChunkIndex;
    };

    MapDataModel.prototype.setMapChunkIndex = function(value)
    {
        if(value < 0)
        {
            return;
        }
        if(value > (this.getMapChunksWide()) * this.getMapChunkHeight())
        {
            return;
        }
        this._mapChunkIndex = value;
        this.sendNotification(MapDataModelEvent.UPDATED_MAP_CHUNK_INDEX, value, this);
    };

	MapDataModel.prototype.getMapDestinationModels = function(value)
	{
	};

	MapDataModel.prototype.getRooms = function()
	{
		return this._rooms;
	};

	MapDataModel.prototype.setRooms = function(value)
	{
		this._rooms = value;
	};

})();

