/**
 * Created by apple on 4/1/14.
 */

(function()
{
	this.EnemyTileMapController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();
	};

	EnemyTileMapController.prototype = new EntityTileMapController(new AbstractView());
	EnemyTileMapController.prototype.constructor = EnemyTileMapController;

	EnemyTileMapController.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._viewComponent.setCanvas(value);

		for(var i = 0; i < this._entityViews.length; i++)
		{
			this._entityViews[i].setCanvas(value);
		}
	};

	EnemyTileMapController.prototype.update = function(delta)
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

	EnemyTileMapController.prototype.updateModels = function(delta)
	{
		var i, j = 0;
		var o1x, o1y, o1w, o1h = 0;
		var o2x, o2y, o2w, o2h = 0;
		var wallsCollision = false;
		var antagonistCollision = false;
		var entities = this._tileMapModel.getEntities();
		var antagonistEntities = this._tileMapModel.getOpposingEntities();
		var collidingEntities = this._tileMapModel.getCollidingEntities();

		for(i = 0; i < this._entityViews.length; i++)
		{
			if(this._entityViews[i].getTileModel().getIsDead() === true)
			{
				this._entityViews[i].setTileModel(null);
				this._entityViews[i].setAABBView(null);
				this._entityViews[i] = null;
				this._entityViews.splice(i, 1);
				break;
			}
		}
		for(i = 0; i < entities.length; i++)
		{
			entities[i].update(delta);

			if(entities[i].getIsDead() === true)
			{
				this._playSound(SoundType.KILL);
				entities[i].setAABB(null);
				entities[i] = null;
				entities.splice(i, 1);
				break;
			}
			if(entities[i].getIsSpawning() === false &&
				entities[i].getIsHurting() === false &&
				entities[i].getIsDying() === false &&
				entities[i].getIsDead() === false)
			{
				switch(entities[i].getDirection())
				{
					case EntityTileModelDirection.UP :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
					case EntityTileModelDirection.RIGHT :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
					case EntityTileModelDirection.DOWN :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
					case EntityTileModelDirection.LEFT :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
				}

				o1w = Math.floor(entities[i].getAABB().getWidth());
				o1h = Math.floor(entities[i].getAABB().getHeight());

				var createNewPath = false;

				if(entities[i].getSeekingEntity() === null || typeof(entities[i].getSeekingEntity()) === 'undefined')
				{
					createNewPath = true;
				}
				if(entities[i].getCurrentPath() !== null && typeof(entities[i].getCurrentPath()) !== "undefined")
				{
					if(entities[i].getCurrentPath().length === 0)
					{
						createNewPath = true;
					}
				}
				else
				{
					createNewPath = true;
				}
				if(antagonistEntities.length > 0)
				{
					createNewPath = true;
				}
				if(createNewPath === true)
				{
					var integer = Math.floor((Math.random() + 1) * antagonistEntities.length - 1);
					if(integer >= 0)
					{
						// randomly stalk any of the antagonist
						// var stalked = antagonistEntities[integer];

						var stalked = antagonistEntities[0];
						entities[i].setSeekingEntity(stalked);
					}
				}
				if(entities[i].getSeekingEntity() !== null && typeof(entities[i].getSeekingEntity()) !== 'undefined')
				{
					if(entities[i].getCurrentPath() !== null && typeof(entities[i].getCurrentPath()) !== "undefined")
					{
						if(entities[i].getCurrentPath().length > 0)
						{
							if(entities[i].getCurrentPath().length > 0)
							{
								entities[i].getCurrentPath().splice(0, 1);

								// Move entity towards stalkee
								entities[i].setX(entities[i].getCurrentPath()[0].x * 32);
								entities[i].setY(entities[i].getCurrentPath()[0].y * 32);

								/*var distance = MOMath.getDistance(entities[i].getX(), entities[i].getY(), entities[i].getCurrentPath()[0].x * 32, entities[i].getCurrentPath()[0].y * 32);

								if(distance < 1)
								{
									entities[i].getCurrentPath().splice(0, 1);
								}

								var zenoX = MOMath.zenosParadox(entities[i].getX(), entities[i].getCurrentPath()[0].x * 32, 0.75);
								var zenoY = MOMath.zenosParadox(entities[i].getY(), entities[i].getCurrentPath()[0].y * 32, 0.75);

								entities[i].setX(entities[i].getX() + zenoX);
								entities[i].setY(entities[i].getY() + zenoY);*/

								//entities[i].translateVelocity();
								//entities[i].getCurrentPath().splice(0, 1);
							}
						}
					}
				}
				for(j = 0; j < antagonistEntities.length; j++)
				{
					if(antagonistEntities[j].getIsSpawning() === false &&
						antagonistEntities[j].getIsHurting() === false &&
						antagonistEntities[j].getIsDying() === false)
					{
						if(antagonistEntities[j] === null || typeof(antagonistEntities[j]) === "undefined")
						{
							continue;
						}
						if(antagonistEntities[j].getAABB() === null || typeof(antagonistEntities[j].getAABB()) === "undefined")
						{
							continue;
						}

						o2x = Math.floor(antagonistEntities[j].getAABB().getX());
						o2y = Math.floor(antagonistEntities[j].getAABB().getY());
						o2w = Math.floor(antagonistEntities[j].getAABB().getWidth());
						o2h = Math.floor(antagonistEntities[j].getAABB().getHeight());

						antagonistCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);

						if(antagonistCollision === true)
						{
							if(o1x >= o2x)
							{
								antagonistEntities[j].translateVelocity(-entities[i].getForceX(), 0);
							}
							if(o1x < o2x)
							{
								antagonistEntities[j].translateVelocity(entities[i].getForceX(), 0);
							}
							if(o1y >= o2y)
							{
								antagonistEntities[j].translateVelocity(0, -entities[i].getForceY());
							}
							if(o1y < o2y)
							{
								antagonistEntities[j].translateVelocity(0, entities[i].getForceY());
							}

							antagonistEntities[j].setAttackerEntity(entities[i]);
							antagonistEntities[j].setHealth((antagonistEntities[j].getHealth() - entities[i].getStrength()));
							this._playSound(SoundType.HURT);

							if(antagonistEntities[j].getIsDead() === true)
							{
								antagonistEntities.splice(j, 1);
								continue;
							}
							else
							if(antagonistEntities[j].getIsDying() === true)
							{
								this._playSound(SoundType.DIE);
							}
							else
							{
								antagonistEntities[j].setIsHurting(true);

							}
						}
					}
				}
			}

			entities[i].translate(entities[i].getXVelocity(), entities[i].getYVelocity());

			if(Math.abs(Math.round(entities[i].getXVelocity())) === 0 && Math.abs(Math.round((entities[i].getYVelocity()))) === 0)
			{
				entities[i].setIsIdle(true);
			}
			if(entities[i].getX() < 0)
			{
				entities[i].setX(0);
			}
			if(entities[i].getY() < 0)
			{
				entities[i].setY(0);
			}
			if(entities[i].getX() > this._canvas.width - entities[i].getWidth())
			{
				entities[i].setX(this._canvas.width - entities[i].getWidth());
			}
			if(entities[i].getY() > this._canvas.height - entities[i].getHeight())
			{
				entities[i].setY(this._canvas.height - entities[i].getHeight());
			}

			o1x = Math.floor(entities[i].getAABB().getX());
			o1y = Math.floor(entities[i].getAABB().getY());
			o1w = Math.floor(entities[i].getAABB().getWidth());
			o1h = Math.floor(entities[i].getAABB().getHeight());

			for(j = 0; j < collidingEntities.length; j++)
			{
				o2x = Math.floor(collidingEntities[j].getAABB().getX());
				o2y = Math.floor(collidingEntities[j].getAABB().getY());
				o2w = Math.floor(collidingEntities[j].getAABB().getWidth());
				o2h = Math.floor(collidingEntities[j].getAABB().getHeight());

				wallsCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);

				if(wallsCollision === true)
				{
					if(o1x >= o2x)
					{
						entities[i].setXVelocity(0);
						entities[i].setX((entities[i].getX() + (entities[i].getXAcceleration() * delta)));
					}
					if(o1x < o2x)
					{
						entities[i].setXVelocity(0);
						entities[i].setX((entities[i].getX() - (entities[i].getXAcceleration() * delta)));
					}
					if(o1y >= o2y)
					{
						entities[i].setYVelocity(0);
						entities[i].setY((entities[i].getY() + (entities[i].getYAcceleration() * delta)));
					}
					if(o1y < o2y)
					{
						entities[i].setYVelocity(0);
						entities[i].setY((entities[i].getY() - (entities[i].getYAcceleration() * delta)));
					}
				}
				if(collidingEntities[j].getIsDestroyed() === true)
				{
					collidingEntities.splice(j, 1);
					continue;
				}
			}
			entities[i].setXVelocity(entities[i].getXVelocity() * entities[i].getXFriction());
			entities[i].setYVelocity(entities[i].getYVelocity() * entities[i].getYFriction());
		}
	};

	EnemyTileMapController.prototype.setTileMapModel = function(value)
	{
		this._tileMapModel = value;
		var entities = this._tileMapModel.getEntities();
		var view;
		this._entityViews = [];

		for(var i = 0; i < entities.length; i++)
		{
			view = new EnemyTileView(this._tileViewFactory);
			view.setTileModel(entities[i]);
			this._entityViews.push(view);
		}
	};

})();