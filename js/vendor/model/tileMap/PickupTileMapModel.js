/**
 * Created by apple on 3/31/14.
 */

var PickupTileMapModelEvent = {
	UPDATED_COLLECTORS_ENTITIES : "PickupTileMapModelEventUpdatedCollectorsEntities"
};

(function()
{
	this.PickupTileMapModel = function()
	{
		this.setId(getUniqueId());
		this._collectorEntities = [];
	};

	PickupTileMapModel.prototype = new TileMapModel();
	PickupTileMapModel.prototype.constructor = PickupTileMapModel;

	PickupTileMapModel.prototype.setMapProperties = function(fullMap, mapDataModel, mapChunkIndex)
	{
		this._mapDataModel = mapDataModel;
		this._mapChunk = mapDataModel.getMapChunk(fullMap, mapChunkIndex);
		this._entities = [];
		this._collectorEntities = [];
		var model;
		var xcounter = 0;
		var ycounter = 0;
		var modelCounter = 1;

		if(this._mapChunk === null || typeof(this._mapChunk) === "undefined")
		{
			return;
		}
		for(var i = 0; i < this._mapChunk.length; i++)
		{
			if(i % mapDataModel.getMapChunkWidth() === 0)
			{
				xcounter = 0;
				if(i !== 0)
				{
					ycounter++;
				}
			}
			if(this._mapChunk[i] > 0)
			{
				model = new PickupTileModel();
				model.setType(this._mapChunk[i]);
				model.translate((xcounter * 32), (ycounter * 32));
				this._entities.push(model);
				modelCounter++;
			}
			xcounter++;
		}
	};

	PickupTileMapModel.prototype.getCollectorEntities = function()
	{
		return this._collectorEntities;
	};

	PickupTileMapModel.prototype.setCollectorEntities = function(value)
	{
		this._collectorEntities = value;
		this.sendNotification(PickupTileMapModelEvent.UPDATED_COLLECTORS_ENTITIES, value, this);
	};

})();