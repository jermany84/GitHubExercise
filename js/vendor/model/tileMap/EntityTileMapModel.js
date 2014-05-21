/**
 * Created by apple on 3/31/14.
 */

var EntityTileMapModelEvent = {
	UPDATED_OPPOSING_ENTITY : "EntityTileMapModelEventUpdatedOpposingEntities"
};

(function()
{
    this.EntityTileMapModel = function()
    {
	    this.setId(getUniqueId());
        this._currentPath = [];
	    this._opposingEntities = [];
    };

    EntityTileMapModel.prototype = new TileMapModel();
    EntityTileMapModel.prototype.constructor = EntityTileMapModel;

	EntityTileMapModel.prototype.setOpposingEntities = function(value)
	{
		this._opposingEntities = value;

		for(var i = 0; i < this._entities.length; i++)
		{
			if(this._entities[i].getIsSeeker())
			{
				var seekingEntityIndex = Math.floor(Math.random() * this._opposingEntities.length);
				this._entities[i].setSeekingEntity(this._opposingEntities[seekingEntityIndex]);
			}
		}
	};

	EntityTileMapModel.prototype.getOpposingEntities = function()
	{
		return this._opposingEntities;
	};

	EntityTileMapModel.prototype.setOpposingEntities = function(value)
	{
		this._opposingEntities = value;
		this.sendNotification(EntityTileMapModelEvent.UPDATED_OPPOSING_ENTITY, value, this);
	};

})();

