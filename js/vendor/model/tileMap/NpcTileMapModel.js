/**
 * Created by apple on 3/31/14.
 */

(function()
{
    this.NpcTileMapModel = function()
    {
	    this.setId(getUniqueId());
    };

    NpcTileMapModel.prototype = new EntityTileMapModel();
    NpcTileMapModel.prototype.constructor = NpcTileMapModel;

    NpcTileMapModel.prototype.setMapProperties = function(fullMap, mapDataModel, mapChunkIndex)
    {
        this._mapChunk = mapDataModel.getMapChunk(fullMap, mapChunkIndex);
        this._entities = [];
        this._currentPath = [];
        this._opposingEntities = [];
        this._collidingEntities = [];
        this._destructableEntities = [];
        var model;
        var xcounter = 0;
        var ycounter = 0;

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
                model = new NpcTileModel();
                model.setType(this._mapChunk[i]);
	            model.translate((xcounter * 32), (ycounter * 32));
	            this._entities.push(model);
            }
            xcounter++;
        }
    };

})();

