/**
 * Created by apple on 3/31/14.
 */

(function()
{
    this.HeroTileMapModel = function()
    {
	    this.setId(getUniqueId());
	    this._heroesSetAlready = false;
    };

    HeroTileMapModel.prototype = new EntityTileMapModel();
    HeroTileMapModel.prototype.constructor = HeroTileMapModel;

    HeroTileMapModel.prototype.setMapProperties = function(fullMap, mapDataModel, mapChunkIndex)
    {
        this._mapChunk = mapDataModel.getMapChunk(fullMap, mapChunkIndex);
        this._currentPath = [];
        this._opposingEntities = [];
        this._collidingEntities = [];
        this._destructableEntities = [];
        var model = null;
        var xcounter = 0;
        var ycounter = 0;

	    if(this._mapChunk === null || typeof(this._mapChunk) === "undefined")
	    {
		    return;
	    }
        if(this._heroesSetAlready === false)
        {
            this._heroesSetAlready = true;
            this._entities = [];

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
                    model = new HeroTileModel();
                    model.setType(this._mapChunk[i]);
	                model.translate((xcounter * 32), (ycounter * 32));
	                this._entities.push(model);
                }
                xcounter++;
            }
        }
    };

})();

