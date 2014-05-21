/**
 * Created by apple on 3/26/14.
 */

(function()
{
    this.TileMapController = function(viewComponent)
    {
	    this._viewComponent = viewComponent;
	    this._viewComponent.init();

	    this._tileMapModel = null;
	    this._mapDataModel = null;
	    this._tileViewFactory = null;
	    this._entityViews = [];
	    this._isPaused = false;
	    this._soundModel = null;
    };

    TileMapController.prototype = new AbstractController(new AbstractView());
    TileMapController.prototype.constructor = TileMapController;

    TileMapController.prototype.setCanvas = function(value)
    {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
        this._viewComponent.setCanvas(value);

        for(var i = 0; i < this._entityViews.length; i++)
        {
            this._entityViews[i].setCanvas(value);
        }
    };

	TileMapController.prototype.update = function(delta)
	{
		if(this._isPaused === true)
		{
			delta = 0;
		} else {
			this.updateModels(delta);
		}
		for(var i = 0; i < this._entityViews.length; i++)
		{
			this._entityViews[i].render(delta);
		}
	};

	TileMapController.prototype.updateModels = function(delta)
	{
		var entities = this._tileMapModel.getEntities();

		for(var i = 0; i < entities.length; i++)
		{
			entities[i].update(delta);
			entities[i].setXVelocity(entities[i].getXVelocity() * entities[i].getXFriction());
			entities[i].setYVelocity(entities[i].getYVelocity() * entities[i].getYFriction());
		}
	};

    TileMapController.prototype._collides = function(x, y, r, b, x2, y2, r2, b2)
    {
        return !(r <= x2 || x > r2 || b <= y2 || y > b2);
    };

    TileMapController.prototype._boxCollides = function(pos, size, pos2, size2)
    {
        return this._collides(pos[0],
                              pos[1],
                              pos[0] + size[0],
                              pos[1] + size[1],
                              pos2[0],
                              pos2[1],
                              pos2[0] + size2[0],
                              pos2[1] + size2[1]);
    };

    TileMapController.prototype.setTileMapModel = function(value)
    {
        this._tileMapModel = value;
        var entities = this._tileMapModel.getEntities();
        var view = null;
        this._entityViews = [];

        for(var i = 0; i < entities.length; i++)
        {
            view = new TileView(this._tileViewFactory);
            view.setTileModel(entities[i]);
            this._entityViews.push(view);
        }
    };

    TileMapController.prototype.setTileViewFactory = function(value)
    {
        this._tileViewFactory = value;
    };

	TileMapController.prototype.getMapDataModel = function()
	{
		return this._mapDataModel;
	};

	TileMapController.prototype.setMapDataModel = function(value)
	{
		this._mapDataModel = value;
	};

	TileMapController.prototype.receiveNotification = function(notification)
	{
		switch(notification.getType())
		{
			case GameModelEvent.UPDATED_IS_PAUSED :
				this._isPaused = notification.getData();
				break;
		}
	};

	TileMapController.prototype.setSoundModel = function(value)
	{
		this._soundModel = value;
	};

	TileMapController.prototype._playSound = function(value)
	{
		if(this._soundModel !== null &&
			typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.playSound(value);
		}
	};

	TileMapController.prototype._stopSound = function(value)
	{
		if(this._soundModel !== null &&
			typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.stopSound(value);
		}
	};

})();