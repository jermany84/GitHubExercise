/**
 * Created by apple on 3/25/14.
 */

var TileMapModelEvent = {
	UPDATED_COLLIDING_ENTITIES : "TileMapModelEventUpdatedCollidingEntities",
	UPDATED_WALKABLE_TILEMAP : "TileMapModelEventUpdatedWalkableTilemap",
	UPDATED_DESTRUCTABLE_ENTITIES : "TileMapModelEventUpdatedDestructableEntities"
};

(function()
{
    this.TileMapModel = function()
    {
        this._mapChunk = [];
        this._entities = [];
        this._collidingEntities = [];
        this._destructableEntities = [];
        this._walkableTileMap = [];
    };

    TileMapModel.prototype = new AbstractModel();
    TileMapModel.prototype.constructor = TileMapModel;

    TileMapModel.prototype.setMapProperties = function(fullMap, mapDataModel, mapChunkIndex)
    {
        this._mapChunk = mapDataModel.getMapChunk(fullMap, mapChunkIndex);
    };

    TileMapModel.prototype.getMapChunk = function()
    {
        return this._mapChunk;
    };

    TileMapModel.prototype.getEntities = function()
    {
        return this._entities;
    };

    TileMapModel.prototype.getCollidingEntities = function()
    {
        return this._collidingEntities;
    };

    TileMapModel.prototype.setCollidingEntities = function(value)
    {
        this._collidingEntities = value;
	    this.sendNotification(TileMapModelEvent.UPDATED_COLLIDING_ENTITIES, value, this);
    };

    TileMapModel.prototype.getWalkableTileMap = function()
    {
        return this._walkableTileMap;
    };

    TileMapModel.prototype.setWalkableTileMap = function(value)
    {
        this._walkableTileMap = value;
	    var flippped90degreeMap = [];
	    for(var i = 0; i < this._walkableTileMap[0].length; i++)
	    {
		    flippped90degreeMap[i] = [];
		    for(var j = 0; j < this._walkableTileMap.length; j++)
		    {
			    flippped90degreeMap[i][j] = this._walkableTileMap[j][i];
		    }
	    }
	    for(i = 0; i < this._entities.length; i++)
	    {
		    this._entities[i].setGrid(flippped90degreeMap, [0]);
	    }
	    this.sendNotification(TileMapModelEvent.UPDATED_WALKABLE_TILEMAP, value, this);
    };

    TileMapModel.prototype.getDestructableEntities = function()
    {
        return this._destructableEntities;
    };

    TileMapModel.prototype.setDestructableEntities = function(value)
    {
        this._destructableEntities = value;
	    this.sendNotification(TileMapModelEvent.UPDATED_DESTRUCTABLE_ENTITIES, value, this);
    };

})();