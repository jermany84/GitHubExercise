/**
 * Created by apple on 3/31/14.
 */

(function()
{
    this.EntityTileView = function(factory)
    {
        this._factory = factory;
    };

    EntityTileView.prototype = new TileView(null);
    EntityTileView.prototype.constructor = EntityTileView;

})();

