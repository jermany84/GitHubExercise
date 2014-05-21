/**
 * Created by apple on 3/27/14.
 */

(function()
{
	this.HeroTileMapController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();

		this._mapDataManagerModel = null;
		this._gamepadControlPlayerModel = null;
		this._playerKeyControlModel = null;
	};

	HeroTileMapController.prototype = new EntityTileMapController(new AbstractView());
	HeroTileMapController.prototype.constructor = HeroTileMapController;

	HeroTileMapController.prototype.update = function(delta)
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

	HeroTileMapController.prototype.updateModels = function(delta)
	{
		if(this._mapDataModel === null)
		{
			return;
		}

		var i, j = 0;
		var o1x, o1y, o1w, o1h = 0;
		var o2x, o2y, o2w, o2h = 0;
		var antagonistCollision = false;
		var boundaryCollision = false;
		var entities = this._tileMapModel.getEntities();
		var antagonistEntities = this._tileMapModel.getOpposingEntities();
		var collidingEntities = this._tileMapModel.getCollidingEntities();

		for(i = 0; i < entities.length; i++)
		{
			entities[i].update(delta);

			if(entities[i].getIsDead() === true)
			{
				entities[i].setAABB(null);
				break;
			}
			if(entities[i].getActiveDoorwayModel() === true)
			{
				var zenoParadoxDoorwayY = MOMath.zenosParadox(
					entities[i].getY(),
					entities[i].getActiveDoorwayModel().getY(),
				    0.75
				);

				entities[i].setY(entities[i].getY() + zenoParadoxDoorwayY);
				entities[i].setXVelocity(0);
				entities[i].setYVelocity(0);
			}
			if(entities[i].getActiveStairsModel() === true)
			{
				var zenoParadoxStairsX = MOMath.zenosParadox(
					entities[i].getX(),
					entities[i].getActiveDoorwayModel().getX(),
					0.75
				);

				var zenoParadoxStairsY = MOMath.zenosParadox(
					entities[i].getY(),
					entities[i].getActiveDoorwayModel().getY(),
					0.75
				);

				entities[i].setX(entities[i].getX() + zenoParadoxStairsX);
				entities[i].setY(entities[i].getY() + zenoParadoxStairsY);
				entities[i].setXVelocity(0);
				entities[i].setYVelocity(0);
			}
			if(this._playerKeyControlModel !== null && typeof(this._playerKeyControlModel) !== "undefined")
			{
				if(this._playerKeyControlModel.getButton1Flag() === true)
				{
					if(entities[i].getButton1ActionList()[entities[i].getButton1ActionListIndex()] > 0 &&
						entities[i].getIsWalkingInDoorway() === false &&
						entities[i].getIsWalkingInStairs() === false &&
						entities[i].getIsSpawning() === false &&
						entities[i].getIsDying() === false &&
						entities[i].getIsDead() === false)
					{
						entities[i].setIsAttack1(true);
					}
				}
				else
				if(this._playerKeyControlModel.getButton2Flag() === true)
				{
					if(entities[i].getButton2ActionList()[entities[i].getButton2ActionListIndex()] > 0 &&
						entities[i].getIsWalkingInDoorway() === false &&
						entities[i].getIsWalkingInStairs() === false &&
						entities[i].getIsSpawning() === false &&
						entities[i].getIsDying() === false &&
						entities[i].getIsDead() === false)
					{
						entities[i].setIsAttack2(true);

						if(entities[i].getHealth() === entities[i].getHealthCap())
						{
							//this._playSound(SoundType.SWORD_COMBINED);
							this._playSound(SoundType.SWORD);
						} else {
							this._playSound(SoundType.SWORD);
						}
					}
				}
				else
				{
					if(entities[i].getIsWalkingInDoorway() === false &&
						entities[i].getIsWalkingInStairs() === false &&
						entities[i].getIsSpawning() === false &&
						entities[i].getIsDying() === false &&
						entities[i].getIsDead() === false)
					{
						if(this._playerKeyControlModel.getUpFlag() === true)
						{
							entities[i].translateVelocity(0, -(entities[i].getYAcceleration() * delta));
							entities[i].setDirection(EntityTileModelDirection.UP);
							entities[i].setIsIdle(false);
						}
						if(this._playerKeyControlModel.getRightFlag() === true)
						{
							entities[i].translateVelocity((entities[i].getXAcceleration() * delta), 0);
							entities[i].setDirection(EntityTileModelDirection.RIGHT);
							entities[i].setIsIdle(false);
						}
						if(this._playerKeyControlModel.getDownFlag() === true)
						{
							entities[i].translateVelocity(0, (entities[i].getYAcceleration() * delta));
							entities[i].setDirection(EntityTileModelDirection.DOWN);
							entities[i].setIsIdle(false);
						}
						if(this._playerKeyControlModel.getLeftFlag() === true)
						{
							entities[i].translateVelocity(-(entities[i].getXAcceleration() * delta), 0);
							entities[i].setDirection(EntityTileModelDirection.LEFT);
							entities[i].setIsIdle(false);
						}
					}
				}
				if(entities[i].getX() <= 0)
				{
					var goMapLeft = this._mapDataManagerModel.goMapLeft();

					if(goMapLeft === true)
					{
						entities[i].setX(this._canvas.width - entities[i].getWidth() - 1);
					} else {
						entities[i].setXVelocity(0);
						entities[i].setX(1);
					}
					return;
				}
				if(entities[i].getY() <= 0)
				{
					var goMapUp = this._mapDataManagerModel.goMapUp();

					if(goMapUp === true)
					{
						entities[i].setY(this._canvas.height - entities[i].getHeight() - 118);
					} else {
						entities[i].setYVelocity(0);
						entities[i].setY(1);
					}
					return;
				}
				if(entities[i].getX() >= this._canvas.width - entities[i].getWidth())
				{
					var goMapRight = this._mapDataManagerModel.goMapRight();

					if(goMapRight === true)
					{
						entities[i].setX(1);
					} else {
						entities[i].setXVelocity(0);
						entities[i].setX(this._canvas.width - entities[i].getWidth() - 1);
					}
					return;
				}
				if(entities[i].getY() >= (this._canvas.height - entities[i].getHeight()) - 115)
				{
					var goMapDown = this._mapDataManagerModel.goMapDown();

					if(goMapDown === true)
					{
						entities[i].setY(1);
					} else {
						entities[i].setYVelocity(0);
						entities[i].setY(this._canvas.height - entities[i].getHeight() - 116);
					}
					return;
				}
			}

			entities[i].translate(entities[i].getXVelocity(), entities[i].getYVelocity());

			if(Math.abs(Math.round(entities[i].getXVelocity())) === 0 && Math.abs(Math.round((entities[i].getYVelocity()))) === 0)
			{
				entities[i].setIsIdle(true);
			}
			if(entities[i].getIsAttack1() === true)
			{
				switch(entities[i].getButton1ActionList()[entities[i].getButton1ActionListIndex()])
				{
					case PickupTileModelType.BOOMERANG:
						this._playSound(SoundType.BOOMERANG);
						trace(this, "boomerang");
						break;
					case PickupTileModelType.SILVER_BOOMERANG:
						this._playSound(SoundType.BOOMERANG);
						trace(this, "silver boomerang");
						break;
					case PickupTileModelType.BOMB:
						this._playSound(SoundType.BOMB_DROP);
						trace(this, "bomb");
						break;
					case PickupTileModelType.BOW_ARROW:
						this._playSound(SoundType.ARROW);
						trace(this, "bow arrow");
						break;
					case PickupTileModelType.CANDLE:
						this._playSound(SoundType.CANDLE);
						trace(this, "candle");
						break;
					case PickupTileModelType.WHISTLE:
						trace(this, "whistle");
						break;
					case PickupTileModelType.RED_POTION:
						trace(this, "red potion");
						break;
					case PickupTileModelType.BLUE_POTION:
						trace(this, "blue potion");
						break;
					case PickupTileModelType.WAND:
						this._playSound(SoundType.MAGICAL_ROD);
						trace(this, "wand");
						break;
				}
			}
			if(entities[i].getIsAttack2() === true)
			{
				switch(entities[i].getDirection())
				{
					case EntityTileModelDirection.UP :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY() - 16);
						break;
					case EntityTileModelDirection.RIGHT :
						o1x = Math.floor(entities[i].getAABB().getX() + 16);
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
					case EntityTileModelDirection.DOWN :
						o1x = Math.floor(entities[i].getAABB().getX());
						o1y = Math.floor(entities[i].getAABB().getY() + 16);
						break;
					case EntityTileModelDirection.LEFT :
						o1x = Math.floor(entities[i].getAABB().getX() - 16);
						o1y = Math.floor(entities[i].getAABB().getY());
						break;
				}

				o1w = Math.floor(entities[i].getAABB().getWidth());
				o1h = Math.floor(entities[i].getAABB().getHeight());

				for(j = 0; j < antagonistEntities.length; j++)
				{
					if(antagonistEntities[j].getIsSpawning() === false &&
						antagonistEntities[j].getIsHurting() === false &&
						antagonistEntities[j].getIsDead() === false &&
						antagonistEntities[j].getIsDying() === false)
					{
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
							this._playSound(SoundType.HIT);
						}
					}
				}
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

				boundaryCollision = this._boxCollides([o1x, o1y], [o1w, o1h], [o2x, o2y], [o2w, o2h]);

				var slopeAngle = 0;
				var slopeStart = [];
				var slopeEnd = [];
				var slope = 0;
				var entityTileX = (entities[i].getX()) % 32;
				var entityTileY = (entities[i].getY()) % 32;

				if(boundaryCollision === true)
				{
					switch(collidingEntities[j].getType())
					{
						default:
						case CollisionTileModelType.BLOCK :
						case CollisionTileModelType.DESTRUCTABLE_BLOCK :
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
							break;
						case CollisionTileModelType.SIMPLE_LOCK_DOOR :
							if(collidingEntities[j].getIsLocked() === true)
							{
								if(entities[i].getKeys() === 0)
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
								else
								{
									entities[i].setKeys(entities[i].getKeys() - 1);
									collidingEntities[j].setIsLockable(false);
									collidingEntities[j].setIsLocked(false);

									for(var k = 0; k < this._entityViews.length; k++)
									{
										if(this._entityViews[k].getTileModel() === entities[i])
										{
											this._entityViews[k].getTileModel().setType(63);
											break;
										}
									}
									collidingEntities[j].setType(CollisionTileModelType.DOOR_MAP_GATEWAY);
									break;
								}
							}
							break;
						case CollisionTileModelType.DOOR_MAP_GATEWAY :
							if(o1y < (o2y+5))
							{
								if(entities[i].getIsWalkingInDoorway() === false)
								{
									entities[i].setActiveDoorwayModel(collidingEntities[i]);
									entities[i].setIsWalkingInDoorway(true);
									this._playSound(SoundType.STAIRS);
								}
							}
							break;
						case CollisionTileModelType.STAIRS_MAP_GATEWAY :
							if(entities[i].getIsWalkingInStairs() === false)
							{
								entities[i].setActiveStairsModel(collidingEntities[i]);
								entities[i].setIsWalkingInStairs(true);
								this._playSound(SoundType.STAIRS);
							}
							break;
						case CollisionTileModelType.SLOPE_1 :
							slopeAngle = 45;
							break;
						case CollisionTileModelType.SLOPE_2 :
							slopeAngle = 135;
							break;
						case CollisionTileModelType.SLOPE_3 :
							slopeAngle = 225;
							break;
						case CollisionTileModelType.SLOPE_4 :
							slopeAngle = 315;
							break;
					}
				}
			}
			entities[i].setXVelocity(entities[i].getXVelocity() * entities[i].getXFriction());
			entities[i].setYVelocity(entities[i].getYVelocity() * entities[i].getYFriction());
		}
	};

	HeroTileMapController.prototype.setTileMapModel = function(value)
	{
		this._tileMapModel = value;
		var entities = this._tileMapModel.getEntities();
		var view;
		this._entityViews = [];

		for(var i = 0; i < entities.length; i++)
		{
			view = new HeroTileView(this._tileViewFactory);
			view.setTileModel(entities[i]);
			this._entityViews.push(view);
		}
	};

	HeroTileMapController.prototype.setGamepadControlPlayerModel = function(value)
	{
		this._gamepadControlPlayerModel = value;
	};

	HeroTileMapController.prototype.setPlayerKeyControlModel = function(value)
	{
		this._playerKeyControlModel = value;
	};

	HeroTileMapController.prototype.setMapDataManagerModel = function(value)
	{
		this._mapDataManagerModel = value;
	};

	HeroTileMapController.prototype.forceUpdate = function(delta)
	{
		for(var i = 0; i < this._entityViews.length; i++)
		{
			this._entityViews[i].setCanvas(this._canvas);
			this._entityViews[i].forceRender(delta);
		}
	};

	HeroTileMapController.prototype.receiveNotification = function(notification)
	{
		var target = notification.getTarget();

		switch(notification.getType())
		{
			case PickupTileModelEvent.UPDATED_IS_COLLECTED:
				var collectorEntity = target.getCollectorEntity();

				if(collectorEntity === null || typeof(collectorEntity) === "undefined")
				{
					return;
				}
				if(collectorEntity !== this._tileMapModel.getEntities()[0])
				{
					return;
				}
				if(notification.getData() === false)
				{
					return;
				}
				var hadButton1Items = collectorEntity.hasButton1ActionItems();
				switch(target.getType())
				{
					// Auto Action Pickups
					case PickupTileModelType.RAFT :
						collectorEntity.getAutoActionList()[0] = PickupTileModelType.RAFT;
						break;
					case PickupTileModelType.BOOK :
						collectorEntity.getAutoActionList()[1] = PickupTileModelType.BOOK;
						break;
					case PickupTileModelType.RED_RING :
						collectorEntity.getAutoActionList()[2] = PickupTileModelType.RED_RING;
						break;
					case PickupTileModelType.BLUE_RING :
						collectorEntity.getAutoActionList()[3] = PickupTileModelType.BLUE_RING;
						break;
					case PickupTileModelType.LADDER :
						collectorEntity.getAutoActionList()[4] = PickupTileModelType.LADDER;
						break;
					case PickupTileModelType.MASTER_KEY :
						collectorEntity.getAutoActionList()[5] = PickupTileModelType.MASTER_KEY;
						break;
					case PickupTileModelType.BRACELET :
						collectorEntity.getAutoActionList()[6] = PickupTileModelType.BRACELET;
						break;
					// Button Action 1 Pickups
					case PickupTileModelType.BOOMERANG :
						collectorEntity.getButton1ActionList()[0] = PickupTileModelType.BOOMERANG;
						break;
					case PickupTileModelType.SILVER_BOOMERANG :
						collectorEntity.getButton1ActionList()[0] = PickupTileModelType.SILVER_BOOMERANG;
						break;
					case PickupTileModelType.BOW_ARROW :
						collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW_ARROW;
						break;
					case PickupTileModelType.BOW :
						collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW;
						break;
					case PickupTileModelType.CANDLE :
						collectorEntity.getButton1ActionList()[3] = PickupTileModelType.CANDLE;
						break;
					case PickupTileModelType.WHISTLE :
						collectorEntity.getButton1ActionList()[4] = PickupTileModelType.WHISTLE;
						break;
					case PickupTileModelType.MEAT :
						collectorEntity.getButton1ActionList()[5] = PickupTileModelType.MEAT;
						break;
					case PickupTileModelType.RED_POTION :
						collectorEntity.getButton1ActionList()[6] = PickupTileModelType.RED_POTION;
						break;
					case PickupTileModelType.BLUE_POTION :
						collectorEntity.getButton1ActionList()[6] = PickupTileModelType.BLUE_POTION;
						break;
					case PickupTileModelType.WAND :
						collectorEntity.getButton1ActionList()[7] = PickupTileModelType.WAND;
						break;
					case PickupTileModelType.NOTE :
						collectorEntity.getButton1ActionList()[6] = PickupTileModelType.NOTE;
						break;
					// Button Action 2 Pickups
					case PickupTileModelType.SWORD :
						collectorEntity.getButton2ActionList()[0] = PickupTileModelType.SWORD;
						collectorEntity.setAttack2Type(PickupTileModelType.SWORD);
						break;
					case PickupTileModelType.LONG_SWORD :
						collectorEntity.getButton2ActionList()[1] = PickupTileModelType.LONG_SWORD;
						collectorEntity.setAttack2Type(PickupTileModelType.LONG_SWORD);
						break;
					case PickupTileModelType.MASTER_SWORD :
						collectorEntity.getButton2ActionList()[2] = PickupTileModelType.MASTER_SWORD;
						collectorEntity.setAttack2Type(PickupTileModelType.MASTER_SWORD);
						break;
					// General Pickups
					case PickupTileModelType.COIN_1 :
						collectorEntity.setGold(collectorEntity.getGold() + 1);
						if(collectorEntity.getGoldCounterModel().getCounter() > 0)
						{
							if(collectorEntity.getButton1ActionList()[2] === PickupTileModelType.BOW)
							{
								collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW_ARROW;
							}
						}
						break;
					case PickupTileModelType.COIN_5 :
						collectorEntity.setGold(collectorEntity.getGold() + 5);
						if(collectorEntity.getGoldCounterModel().getCounter() > 0)
						{
							if(collectorEntity.getButton1ActionList()[2] === PickupTileModelType.BOW)
							{
								collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW_ARROW;
							}
						}
						break;
					case PickupTileModelType.HALF_HEART :
						collectorEntity.setHealth(collectorEntity.getHealth() + 1);
						break;
					case PickupTileModelType.HEART :
						collectorEntity.setHealth(collectorEntity.getHealth() + 1);
						break;
					case PickupTileModelType.HEART_CONTAINER :
						collectorEntity.setHealthCap(collectorEntity.getHealthCap() + 1);
						collectorEntity.setHealth(collectorEntity.getHealthCap());
						break;
					case PickupTileModelType.FAIRY :
						collectorEntity.setHealth(collectorEntity.getHealth() + 5);
						break;
					case PickupTileModelType.BOMB :
						collectorEntity.setBombs(collectorEntity.getBombs() + 1);
						collectorEntity.getButton1ActionList()[1] = PickupTileModelType.BOMB;
						break;
					case PickupTileModelType.KEY :
						collectorEntity.setKeys(collectorEntity.getKeys() + 1);
						break;
					case PickupTileModelType.CLOCK :
						break;
					case PickupTileModelType.TRIFORCE_SHARD_1 :
						collectorEntity.getTriforcePieces()[0] = PickupTileModelType.TRIFORCE_SHARD_1;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_2 :
						collectorEntity.getTriforcePieces()[1] = PickupTileModelType.TRIFORCE_SHARD_2;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_3 :
						collectorEntity.getTriforcePieces()[2] = PickupTileModelType.TRIFORCE_SHARD_3;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_4 :
						collectorEntity.getTriforcePieces()[3] = PickupTileModelType.TRIFORCE_SHARD_4;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_5 :
						collectorEntity.getTriforcePieces()[4] = PickupTileModelType.TRIFORCE_SHARD_5;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_6 :
						collectorEntity.getTriforcePieces()[5] = PickupTileModelEvent.TRIFORCE_SHARD_6;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_7 :
						collectorEntity.getTriforcePieces()[6] = PickupTileModelType.TRIFORCE_SHARD_7;
						break;
					case PickupTileModelType.TRIFORCE_SHARD_8 :
						collectorEntity.getTriforcePieces()[7] = PickupTileModelType.TRIFORCE_SHARD_8;
						break;
				}
				break;
		}
	};

})();