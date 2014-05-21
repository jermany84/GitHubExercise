/**
 * Created by apple on 3/25/14.
 */

(function()
{
    this.EntityTileMapController = function(viewComponent)
    {
        this._viewComponent = viewComponent;
	    this._viewComponent.init();
    };

    EntityTileMapController.prototype = new TileMapController(new AbstractView());
    EntityTileMapController.prototype.constructor = EntityTileMapController;

})();