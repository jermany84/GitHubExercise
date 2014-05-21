/**
 * Created by apple on 4/14/14.
 */

(function()
{
	this.DropsController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();

		this._isPaused = false;
		this._dropsModel = null;
		this._tileViewFactory = null;
		this._entityViews = [];
		this._counter = 0;
	};

	DropsController.prototype = new AbstractController(new AbstractView());
	DropsController.prototype.constructor = DropsController;

	DropsController.prototype.setCanvas = function(value)
	{
		if(value === null && typeof(value) === "undefined")
		{
			return;
		}

		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._viewComponent.setCanvas(value);

		for(var i = 0; i < this._entityViews.length; i++)
		{
			this._entityViews[i].setCanvas(value);
		}
	};

	DropsController.prototype.update = function(delta)
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

	DropsController.prototype.updateModels = function(delta)
	{
		if(this._dropsModel === null || typeof(this._dropsModel) === "undefined")
		{
			return;
		}

		var i, j = 0;
		var o1x, o1y, o1w, o1h = 0;
		var o2x, o2y, o2w, o2h = 0;
		var entities = this._dropsModel.getEntities();
		var collectorCollision = false;
		var collectorEntities = this._dropsModel.getCollectorEntities();

		for(i = 0; i < this._entityViews.length; i++)
		{
			if(this._entityViews[i].getTileModel().getIsCollected() === true ||
				this._entityViews[i].getTileModel().getHasDisappeared() === true)
			{
				this._entityViews[i].setTileModel(null);
				this._entityViews[i] = null;
				this._entityViews.splice(i, 1);
				break;
			}
		}
		for(i = 0; i < entities.length; i++)
		{
			if(entities[i] === null || typeof(entities[i]) === "undefined")
			{
				continue;
			}

			entities[i].update(delta);

			if(entities[i].getIsCollected() === true ||
				entities[i].getHasDisappeared() === true)
			{
				entities[i].setAABB(null);
				entities[i] = null;
				entities.splice(i, 1);
				break;
			}
			if(entities[i].getDisappearCounter() === 0 && entities[i].getIsDisappearing() === false)
			{
				entities[i].setIsDisappearing(true);
			}
			if(entities[i].getDisappearCounter() !== -1 &&
				entities[i].getHasDisappeared() === false &&
				entities[i].getIsDisappearing() === false &&
				entities[i].getDisappearCounter() > 0)
			{
				if(this._counter % 5 === 0)
				{
					entities[i].setDisappearCounter((entities[i].getDisappearCounter()-1));
				}
			}

			entities[i].translate(entities[i].getXVelocity(), entities[i].getYVelocity());

			if(entities[i].getAABB() === null || typeof(entities[i].getAABB()) === "undefined")
			{
				continue;
			}

			o1x = Math.floor(entities[i].getAABB().getX());
			o1y = Math.floor(entities[i].getAABB().getY());
			o1w = Math.floor(entities[i].getAABB().getWidth());
			o1h = Math.floor(entities[i].getAABB().getHeight());

			for(j = 0; j < collectorEntities.length; j++)
			{
				if(collectorEntities[j].getIsSpawning() === false &&
					collectorEntities[j].getIsHurting() === false &&
					collectorEntities[j].getIsDying() === false)
				{
					o2x = Math.floor(collectorEntities[j].getAABB().getX());
					o2y = Math.floor(collectorEntities[j].getAABB().getY());
					o2w = Math.floor(collectorEntities[j].getAABB().getWidth());
					o2h = Math.floor(collectorEntities[j].getAABB().getHeight());

					collectorCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);

					if(entities[i].getIsCollecting() === false && collectorCollision === true)
					{
						entities[i].setCollectorEntity(collectorEntities[j]);
						entities[i].setIsDisappearing(false);
						entities[i].setIsCollecting(true);
					}
				}
			}
			entities[i].setXVelocity(entities[i].getXVelocity() * entities[i].getXFriction());
			entities[i].setYVelocity(entities[i].getYVelocity() * entities[i].getYFriction());
		}
		this._counter++;
	};

	DropsController.prototype.setDropsModel = function(value)
	{
		this._dropsModel = value;
		this._dropsModel.addObserver(this);
	};

	DropsController.prototype.receiveNotification = function(notification)
	{
		var view = null;

		switch(notification.getType())
		{
			case GameModelEvent.UPDATED_IS_PAUSED :
				this._isPaused = notification.getData();
				break;
			case DropsModelEvent.UPDATED_ENTITIES :
				var models = notification.getData();
				this._entityViews = [];
				for(var i = 0; i < models; i++)
				{
					view = new PickupTileView(this._tileViewFactory);
					view.setTileModel(models[i]);
					this._entityViews.push(view);
				}
				break;
			case DropsModelEvent.ADDED_ENTITY :
				view = new PickupTileView(this._tileViewFactory);
				view.setTileModel(notification.getData());
				this._entityViews.push(view);
				break;
		}
		if(this._canvas !== null && typeof(this._canvas) !== "undefined")
		{
			this.setCanvas(this._canvas);
		}
	};

	DropsController.prototype._collides = function(x, y, r, b, x2, y2, r2, b2)
	{
		return !(r <= x2 || x > r2 || b <= y2 || y > b2);
	};

	DropsController.prototype._boxCollides = function(pos, size, pos2, size2)
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

	DropsController.prototype.setTileViewFactory = function(value)
	{
		this._tileViewFactory = value;
	};

})();