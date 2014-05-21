/** * Created by apple on 4/11/14. */(function(){	this.PickupTileMapController = function(viewComponent)	{		this._viewComponent = viewComponent;	};	PickupTileMapController.prototype = new TileMapController(new AbstractView());	PickupTileMapController.prototype.constructor = PickupTileMapController;	PickupTileMapController.prototype.setCanvas = function(value)	{		this._canvas = value;		this._context = this._canvas.getContext("2d");		this._viewComponent.setCanvas(value);		for(var i = 0; i < this._entityViews.length; i++)		{			this._entityViews[i].setCanvas(value);		}	};	PickupTileMapController.prototype.update = function(delta)	{		if(this._isPaused === true)		{			delta = 0;		} else {			this.updateModels(delta);		}		for(var i = 0; i < this._entityViews.length; i++)		{			this._entityViews[i].render(delta);		}	};	PickupTileMapController.prototype.updateModels = function(delta)	{		var i, j = 0;		var o1x, o1y, o1w, o1h = 0;		var o2x, o2y, o2w, o2h = 0;		var entities = this._tileMapModel.getEntities();		var collectorEntities = this._tileMapModel.getCollectorEntities();		var collectorCollision = false;		var collidingEntities = this._tileMapModel.getCollidingEntities();		var wallsCollision = false;		for(i = 0; i < this._entityViews.length; i++)		{			if(this._entityViews[i].getTileModel().getIsCollected() === true)			{				this._entityViews[i].setTileModel(null);				this._entityViews[i] = null;				this._entityViews.splice(i, 1);				break;			}		}		for(i = 0; i < entities.length; i++)		{			entities[i].update(delta);			if(entities[i].getIsCollected() === true)			{				entities[i].setAABB(null);				entities[i] = null;				entities.splice(i, 1);				break;			}			entities[i].translate(entities[i].getXVelocity(), entities[i].getYVelocity());			o1x = Math.floor(entities[i].getAABB().getX());			o1y = Math.floor(entities[i].getAABB().getY());			o1w = Math.floor(entities[i].getAABB().getWidth());			o1h = Math.floor(entities[i].getAABB().getHeight());			for(j = 0; j < collectorEntities.length; j++)			{				if(collectorEntities[j].getIsSpawning() === false &&					collectorEntities[j].getIsHurting() === false &&					collectorEntities[j].getIsDying() === false)				{					if(collectorEntities[j] === null || typeof(collectorEntities[j]) === "undefined")					{						continue;					}					if(collectorEntities[j].getAABB() === null || typeof(collectorEntities[j].getAABB()) === "undefined")					{						continue;					}					o2x = Math.floor(collectorEntities[j].getAABB().getX());					o2y = Math.floor(collectorEntities[j].getAABB().getY());					o2w = Math.floor(collectorEntities[j].getAABB().getWidth());					o2h = Math.floor(collectorEntities[j].getAABB().getHeight());					collectorCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);					if(collectorCollision === true)					{						if(entities[i].getIsCollectable() === true)						{							if(entities[i].getIsCollecting() === false)							{								entities[i].setCollectorEntity(collectorEntities[j]);								entities[i].setIsCollecting(true);							}						}						else						{							var dx = o1x - o2x;							var dy = o1y - o2y;							if(Math.abs(dx) > Math.abs(dy))							{								if(o1x >= o2x)								{									collectorEntities[j].setXVelocity(-0.5);									collectorEntities[j].setX((collectorEntities[j].getX() + (collectorEntities[j].getXAcceleration() * delta)));									if(entities[i].getIsMovable() === true)									{										entities[i].setXVelocity(0.5);									}								}								else								if(o1x < o2x)								{									collectorEntities[j].setXVelocity(0.5);									collectorEntities[j].setX((collectorEntities[j].getX() - (collectorEntities[j].getXAcceleration() * delta)));									if(entities[i].getIsMovable() === true)									{										entities[i].setXVelocity(-0.5);									}								}							}							else							{								if(o1y >= o2y)								{									collectorEntities[j].setYVelocity(-0.5);									collectorEntities[j].setY((collectorEntities[j].getY() + (collectorEntities[j].getYAcceleration() * delta)));									if(entities[i].getIsMovable() === true)									{										entities[i].setYVelocity(0.5);									}								}								else								if(o1y < o2y)								{									collectorEntities[j].setYVelocity(0.5);									collectorEntities[j].setY((collectorEntities[j].getY() - (collectorEntities[j].getYAcceleration() * delta)));									if(entities[i].getIsMovable() === true)									{										entities[i].setYVelocity(-0.5);									}								}							}						}					}				}			}			for(j = 0; j < collidingEntities.length; j++)			{				o2x = Math.floor(collidingEntities[j].getAABB().getX());				o2y = Math.floor(collidingEntities[j].getAABB().getY());				o2w = Math.floor(collidingEntities[j].getAABB().getWidth());				o2h = Math.floor(collidingEntities[j].getAABB().getHeight());				wallsCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);				if(wallsCollision === true)				{					if(o1x >= o2x)					{						entities[i].setXVelocity(0);						entities[i].setX((entities[i].getX() + (entities[i].getXAcceleration() * delta)) + 1);					}					if(o1x < o2x)					{						entities[i].setXVelocity(0);						entities[i].setX((entities[i].getX() - (entities[i].getXAcceleration() * delta)));					}					if(o1y >= o2y)					{						entities[i].setYVelocity(0);						entities[i].setY((entities[i].getY() + (entities[i].getYAcceleration() * delta)) + 1);					}					if(o1y < o2y)					{						entities[i].setYVelocity(0);						entities[i].setY((entities[i].getY() - (entities[i].getYAcceleration() * delta)));					}				}			}			entities[i].setXVelocity(entities[i].getXVelocity() * entities[i].getXFriction());			entities[i].setYVelocity(entities[i].getYVelocity() * entities[i].getYFriction());		}	};	PickupTileMapController.prototype.setTileMapModel = function(value)	{		this._tileMapModel = value;		var entities = this._tileMapModel.getEntities();		var view;		this._entityViews = [];		for(var i = 0; i < entities.length; i++)		{			view = new PickupTileView(this._tileViewFactory);			view.setTileModel(entities[i]);			this._entityViews.push(view);		}	};	PickupTileMapController.prototype.receiveNotification = function(notification)	{		switch(notification.getType())		{			case GameModelEvent.UPDATED_IS_PAUSED :				this._isPaused = notification.getData();				break;		}	};})();