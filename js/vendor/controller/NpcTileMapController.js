/**
 * Created by apple on 4/1/14.
 */

(function()
{
    this.NpcTileMapController = function(viewComponent)
    {
        this._viewComponent = viewComponent;
	    this._viewComponent.init();
    };

    NpcTileMapController.prototype = new TileMapController(new AbstractView());
    NpcTileMapController.prototype.constructor = NpcTileMapController;

    NpcTileMapController.prototype.setCanvas = function(value)
    {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
        this._viewComponent.setCanvas(value);

        for(var i = 0; i < this._entityViews.length; i++)
        {
            this._entityViews[i].setCanvas(value);
        }
    };

    NpcTileMapController.prototype.setTileMapModel = function(value)
    {
        this._tileMapModel = value;
        var entities = this._tileMapModel.getEntities();
        var view;
        this._entityViews = [];

        for(var i = 0; i < entities.length; i++)
        {
            view = new NpcTileView(this._tileViewFactory);
            view.setTileModel(entities[i]);
            this._entityViews.push(view);
        }
    };

})();