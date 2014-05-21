/**
 * Created by apple on 3/31/14.
 */

(function()
{
    this.EnemyTileMapModel = function()
    {
	    this.setId(getUniqueId());
    };

    EnemyTileMapModel.prototype = new EntityTileMapModel();
    EnemyTileMapModel.prototype.constructor = EnemyTileMapModel;

    EnemyTileMapModel.prototype.setMapProperties = function(fullMap, mapDataModel, mapChunkIndex)
    {
        this._mapDataModel = mapDataModel;
        this._mapChunk = mapDataModel.getMapChunk(fullMap, mapChunkIndex);
        this._entities = [];
        this._opposingEntities = [];
        this._collidingEntities = [];
        this._destructableEntities = [];
        var model = null;
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
                model = new EnemyTileModel();
                model.setType(this._mapChunk[i]);
	            model.translate((xcounter * 32), (ycounter * 32));

	            if(modelCounter % 2 === 0)
                {
	                model.setIsSeeker(true);
                } else {
		            model.setIsSeeker(false);
	            }

	            this._entities.push(model);
                modelCounter++;
            }
            xcounter++;
        }
    };

})();