/**
 * Created by apple on 3/19/14.
 */

var DROP_CHANCE = 100;

(function()
{
	this.GameController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();
		
		this._gameModel = null;
		this._viewStateModel = null;
		this._soundModel = null;
		this._dropsModel = new DropsModel();

		this._mapDataManagerModel = new MapDataManagerModel();
		this._mapDataManagerModel.addObserver(this);

		this._mapUIModel = new MapUIModel();
		this._mapUIModel.setX(32);
		this._mapUIModel.setY(384);
		this._mapUIModel.setWidth(128);
		this._mapUIModel.setHeight(64);

		this._playerEntityUIModel = new EntityUIModel();
		this._playerEntityUIModel.setY(-448);
		this._playerEntityUIModel.setWidth(512);
		this._playerEntityUIModel.setHeight(464);

		this._keyControlMediator = new KeyControlMediator();
		this._keyControlMediator.setControlModels([new ControlModel(87, 68, 83, 65, 190, 191, 27)]);

		this._gamepadJSControlMediator = new GamepadJSControlMediator(new Gamepad());
		
		this._graphicTileMapController = new TileMapController(this._viewComponent);
		this._graphicTileMapController.setTileViewFactory(new GraphicTileViewFactory());
		
		this._collisionTileMapController = new TileMapController(this._viewComponent);
		this._collisionTileMapController.setTileViewFactory(new CollisionTileViewFactory());
		
		this._pickupTileMapController = new PickupTileMapController(this._viewComponent);
		this._pickupTileMapController.setTileViewFactory(new PickupTileViewFactory());

		this._dropsController = new DropsController(this._viewComponent);
		this._dropsController.setTileViewFactory(new PickupTileViewFactory());
		this._dropsController.setDropsModel(this._dropsModel);
		
		this._npcTileMapController = new NpcTileMapController(this._viewComponent);
		this._npcTileMapController.setTileViewFactory(new NpcTileViewFactory());
		
		this._enemyTileMapController = new EnemyTileMapController(this._viewComponent);
		this._enemyTileMapController.setTileViewFactory(new EnemyTileViewFactory());

		this._heroTileMapController = new HeroTileMapController(this._viewComponent);
		this._heroTileMapController.setTileViewFactory(new HeroTileViewFactory());
		this._heroTileMapController.setMapDataManagerModel(this._mapDataManagerModel);

		this._playerEntityUIController = new EntityUIController(new EntityUIView());
		this._playerEntityUIController.setEntityUIModel(this._playerEntityUIModel);

		this._mapUIView = new MapUIView();
		this._mapUIView.setMapUIModel(this._mapUIModel);
	};

	GameController.prototype = new AbstractController(new AbstractView());
	GameController.prototype.constructor = GameController;

	GameController.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._viewComponent.setCanvas(value);
		this._graphicTileMapController.setCanvas(value);
		this._collisionTileMapController.setCanvas(value);
		this._pickupTileMapController.setCanvas(value);
		this._dropsController.setCanvas(value);
		this._npcTileMapController.setCanvas(value);
		this._enemyTileMapController.setCanvas(value);
		this._heroTileMapController.setCanvas(value);
		this._playerEntityUIController.setCanvas(value);
		this._mapUIView.setCanvas(value);
	};

	GameController.prototype.update = function(delta)
	{
		if(this._gameModel !== null && typeof(this._gameModel) !== "undefined")
		{
			if(this._gameModel.getGameReady() === false)
			{
				return;
			}
			if(this._gameModel.getPauseBreakCheck() >= this._gameModel.getPauseBreakLengthDefault())
			{
				if(this._keyControlMediator.getControlModels()[0].getButton3Flag() === true)
				{
					this._gameModel.setPauseBreakCheck(0);
					if(this._gameModel.getIsPaused() === true)
					{
						this._gameModel.setIsPaused(false);
					}
					else
					{
						this._playSound(SoundType.KEY);
						this._gameModel.setIsPaused(true);
					}
				}
			}
			else
			{
				this._gameModel.setPauseBreakCheck(this._gameModel.getPauseBreakCheck() + 1);
			}
		}
		if(this._viewStateModel !== null && typeof(this._viewStateModel) !== "undefined")
		{
			if(this._viewStateModel.getState() === ViewStateMachineModelStates.GAME)
			{
				var heroes = this._mapDataManagerModel.getHeroTileMapModel().getEntities();
				var heroesAllDead = true;

				for(var i = 0; i < heroes.length; i++)
				{
					if(heroes[i].getIsDead() === false)
					{
						heroesAllDead = false;
					}
				}
				if(heroesAllDead === true)
				{
					this._viewStateModel.setState(ViewStateMachineModelStates.GAME_OVER);
				}
			}
		}

		this._graphicTileMapController.update(delta);
		this._collisionTileMapController.update(delta);
		this._pickupTileMapController.update(delta);
		this._dropsController.update(delta);
		this._npcTileMapController.update(delta);
		this._enemyTileMapController.update(delta);
		this._heroTileMapController.update(delta);
		this._playerEntityUIController.update(delta);
		this._mapUIModel.setY(384 + this._playerEntityUIModel.getY());
		this._mapUIView.render(delta);
	};

	GameController.prototype.receiveNotification = function(notification)
	{
		var target = notification.getTarget();
		var i = 0;

		switch(notification.getType())
		{
			case HeroTileModelEvent.UPDATED_IS_WALKING_IN_DOOR_WAY :
				if(notification.getData() === false)
				{
					this._mapDataManagerModel.goInDoorway(notification.getTarget());
				}
				break;
			case HeroTileModelEvent.UPDATED_IS_WALKING_IN_STAIRS :
				if(notification.getData() === false)
				{
					this._mapDataManagerModel.goInStairs(notification.getTarget());
					this._playSound(SoundType.STAIRS);
				}
				break;
			case MapDataManagerModelEvent.UPDATED_MAP_DATA_MODEL :
				this._updatedMapDataModel(notification.getData());
				break;
			case PickupTileModelEvent.UPDATED_IS_COLLECTED:
				this._pickupWasCollected(notification.getTarget(), notification.getData());
				break;
			case EntityTileModelEvent.UPDATED_IS_DEAD :
				if(notification.getData() === true)
				{
					this._entityIsDead(notification.getTarget(), notification.getTarget().getAttackerEntity());
				}
				break;
			case ViewStateMachineModelEvent.UPDATED_STATE :
				if(this._gameModel !== null && typeof(this._gameModel) !== "undefined")
				{
					this._gameModel.resetPauseBreak();
				}
				if(notification.getData() === ViewStateMachineModelStates.GAME)
				{
					this.resetGame();
				}
				break;
			case MapDataModelEvent.UPDATED_MAP_CHUNK_INDEX :
				this._updatedMapChunkIndex(notification.getData());
				break;
		}
	};

	GameController.prototype.resetGame = function()
	{
		this._gameModel.resetPauseBreak();

		this._mapDataManagerModel = new MapDataManagerModel();
		this._mapDataManagerModel.addObserver(this);
		this._heroTileMapController.setMapDataManagerModel(this._mapDataManagerModel);
		this._mapDataManagerModel.setMapDataModel(this._mapDataManagerModel.getMaps().getItem(MapKey.OVERWORLD));
		this._mapDataManagerModel.getMapDataModel().setMapChunkIndex(this._mapDataManagerModel.getMapChunkIndexBasedOnHeroPosition());
	};

	GameController.prototype._updatedMapDataModel = function(mapDataModel)
	{
		this._gameModel.setGameReady(false);

		mapDataModel.addObserver(this);
		mapDataModel.addObserver(this._playerEntityUIController);

		this._graphicTileMapController.setMapDataModel(mapDataModel);
		this._graphicTileMapController.setTileMapModel(this._mapDataManagerModel.getGraphicTileMapModel());

		this._collisionTileMapController.setMapDataModel(mapDataModel);
		this._collisionTileMapController.setTileMapModel(this._mapDataManagerModel.getCollisionTileMapModel());

		this._enemyTileMapController.setMapDataModel(mapDataModel);
		this._enemyTileMapController.setTileMapModel(this._mapDataManagerModel.getEnemyTileMapModel());

		this._pickupTileMapController.setMapDataModel(mapDataModel);
		this._pickupTileMapController.setTileMapModel(this._mapDataManagerModel.getPickupTileMapModel());

		this._heroTileMapController.setMapDataModel(mapDataModel);
		this._heroTileMapController.setTileMapModel(this._mapDataManagerModel.getHeroTileMapModel());

		this._npcTileMapController.setMapDataModel(mapDataModel);
		this._npcTileMapController.setTileMapModel(this._mapDataManagerModel.getNpcTileMapModel());

		this._mapUIModel.setMapDataModel(mapDataModel);
		this._mapUIModel.setHeroMap(this._mapDataManagerModel.getHeroMap());

		this._playerEntityUIController.setMapDataModel(mapDataModel);

		this._gameModel.resetPauseBreak();
		this._gameModel.setGameReady(true);
	};

	GameController.prototype._pickupWasCollected = function(target, bool)
	{
		var collectorEntity = target.getCollectorEntity();
		if(collectorEntity === null || typeof(collectorEntity) === "undefined")
		{
			return;
		}
		if(bool === false)
		{
			return;
		}
		var hadButton1Items = collectorEntity.hasButton1ActionItems();
		switch(target.getType())
		{
			// Auto Action Pickups
			case PickupTileModelType.RAFT :
				collectorEntity.getAutoActionList()[0] = PickupTileModelType.RAFT;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.BOOK :
				collectorEntity.getAutoActionList()[1] = PickupTileModelType.BOOK;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.RED_RING :
				collectorEntity.getAutoActionList()[2] = PickupTileModelType.RED_RING;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.BLUE_RING :
				collectorEntity.getAutoActionList()[3] = PickupTileModelType.BLUE_RING;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.LADDER :
				collectorEntity.getAutoActionList()[4] = PickupTileModelType.LADDER;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.MASTER_KEY :
				collectorEntity.getAutoActionList()[5] = PickupTileModelType.MASTER_KEY;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.BRACELET :
				collectorEntity.getAutoActionList()[6] = PickupTileModelType.BRACELET;
				this._playSound(SoundType.GET_ITEM);
				break;
			// Button Action 1 Pickups
			case PickupTileModelType.BOOMERANG :
				collectorEntity.getButton1ActionList()[0] = PickupTileModelType.BOOMERANG;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.SILVER_BOOMERANG :
				collectorEntity.getButton1ActionList()[0] = PickupTileModelType.SILVER_BOOMERANG;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.BOW_ARROW :
				collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW_ARROW;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.BOW :
				collectorEntity.getButton1ActionList()[2] = PickupTileModelType.BOW;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.CANDLE :
				collectorEntity.getButton1ActionList()[3] = PickupTileModelType.CANDLE;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.WHISTLE :
				collectorEntity.getButton1ActionList()[4] = PickupTileModelType.WHISTLE;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.MEAT :
				collectorEntity.getButton1ActionList()[5] = PickupTileModelType.MEAT;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.RED_POTION :
				collectorEntity.getButton1ActionList()[6] = PickupTileModelType.RED_POTION;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.BLUE_POTION :
				collectorEntity.getButton1ActionList()[6] = PickupTileModelType.BLUE_POTION;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.WAND :
				collectorEntity.getButton1ActionList()[7] = PickupTileModelType.WAND;
				this._playSound(SoundType.FANFARE);
				break;
			case PickupTileModelType.NOTE :
				collectorEntity.getButton1ActionList()[6] = PickupTileModelType.NOTE;
				this._playSound(SoundType.FANFARE);
				break;
			// Button Action 2 Pickups
			case PickupTileModelType.SWORD :
				collectorEntity.getButton2ActionList()[0] = PickupTileModelType.SWORD;
				this._playSound(SoundType.FANFARE);
				collectorEntity.setAttack2Type(PickupTileModelType.SWORD);
				break;
			case PickupTileModelType.LONG_SWORD :
				collectorEntity.getButton2ActionList()[1] = PickupTileModelType.LONG_SWORD;
				this._playSound(SoundType.FANFARE);
				collectorEntity.setAttack2Type(PickupTileModelType.LONG_SWORD);
				break;
			case PickupTileModelType.MASTER_SWORD :
				collectorEntity.getButton2ActionList()[2] = PickupTileModelType.MASTER_SWORD;
				this._playSound(SoundType.FANFARE);
				collectorEntity.setAttack2Type(PickupTileModelType.MASTER_SWORD);
				break;
			// General Pickups
			case PickupTileModelType.COIN_1 :
				collectorEntity.setGold(collectorEntity.getGold() + 1);
				this._playSound(SoundType.GET_RUPPEE);
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
				this._playSound(SoundType.GET_RUPPEE);
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
				this._playSound(SoundType.GET_HEART);
				break;
			case PickupTileModelType.HEART :
				collectorEntity.setHealth(collectorEntity.getHealth() + 1);
				this._playSound(SoundType.GET_HEART);
				break;
			case PickupTileModelType.HEART_CONTAINER :
				collectorEntity.setHealthCap(collectorEntity.getHealthCap() + 1);
				collectorEntity.setHealth(collectorEntity.getHealthCap());
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.FAIRY :
				collectorEntity.setHealth(collectorEntity.getHealth() + 5);
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.BOMB :
				collectorEntity.setBombs(collectorEntity.getBombs() + 1);
				collectorEntity.getButton1ActionList()[1] = PickupTileModelType.BOMB;
				this._playSound(SoundType.GET_HEART);
				break;
			case PickupTileModelType.KEY :
				collectorEntity.setKeys(collectorEntity.getKeys() + 1);
				this._playSound(SoundType.KEY);
				break;
			case PickupTileModelType.CLOCK :
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_1 :
				collectorEntity.getTriforcePieces()[0] = PickupTileModelType.TRIFORCE_SHARD_1;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_2 :
				collectorEntity.getTriforcePieces()[1] = PickupTileModelType.TRIFORCE_SHARD_2;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_3 :
				collectorEntity.getTriforcePieces()[2] = PickupTileModelType.TRIFORCE_SHARD_3;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_4 :
				collectorEntity.getTriforcePieces()[3] = PickupTileModelType.TRIFORCE_SHARD_4;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_5 :
				collectorEntity.getTriforcePieces()[4] = PickupTileModelType.TRIFORCE_SHARD_5;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_6 :
				collectorEntity.getTriforcePieces()[5] = PickupTileModelEvent.TRIFORCE_SHARD_6;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_7 :
				collectorEntity.getTriforcePieces()[6] = PickupTileModelType.TRIFORCE_SHARD_7;
				this._playSound(SoundType.GET_ITEM);
				break;
			case PickupTileModelType.TRIFORCE_SHARD_8 :
				collectorEntity.getTriforcePieces()[7] = PickupTileModelType.TRIFORCE_SHARD_8;
				this._playSound(SoundType.GET_ITEM);
				break;
		}
		if(collectorEntity.hasButton1ActionItems() === true)
		{
			this._playerEntityUIModel.getCursorModel().setVisible(true);
			for(i = 0; i < collectorEntity.getButton1ActionList().length; i++)
			{
				if(collectorEntity.getButton1ActionList()[i] > 0)
				{
					collectorEntity.setButton1ActionListIndex(i);
				}
			}
		}
		else
		{
			this._playerEntityUIModel.getCursorModel().setVisible(false);
		}
	};

	GameController.prototype._entityIsDead = function(entity, attackerEntity)
	{
		var dropSuccess = Math.floor((Math.random() * DROP_CHANCE)) + 1;
		if(dropSuccess < attackerEntity.getDropsLuck())
		{
			var pickupsAvailable = [
				PickupTileModelType.BOOK,
				PickupTileModelType.BOMB,
				PickupTileModelType.BOW,
				PickupTileModelType.BRACELET,
				PickupTileModelType.CANDLE,
				PickupTileModelType.LADDER,
				PickupTileModelType.SILVER_BOOMERANG,
				PickupTileModelType.TRIFORCE_SHARD_1,
				PickupTileModelType.KEY,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_1,
				PickupTileModelType.COIN_5,
				PickupTileModelType.COIN_5,
				PickupTileModelType.COIN_5,
				PickupTileModelType.COIN_5,
				PickupTileModelType.COIN_5,
				PickupTileModelType.COIN_5,
				PickupTileModelType.BOMB,
				PickupTileModelType.BOMB,
				PickupTileModelType.BOMB,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HALF_HEART,
				PickupTileModelType.HEART,
				PickupTileModelType.HEART,
				PickupTileModelType.HEART,
				PickupTileModelType.HEART,
				PickupTileModelType.CLOCK,
				PickupTileModelType.FAIRY
			];
			var dropTypeIndex = Math.floor(Math.random() * (pickupsAvailable.length - 1)) + 1;
			var model = new PickupTileModel();
			model.setType(pickupsAvailable[dropTypeIndex]);
			model.setDisappearCounter(model.getDisappearCounterDefault());
			model.translate(entity.getX(), entity.getY());
			model.addObserver(this);
			this._dropsModel.addEntity(model);
		}
	};

	GameController.prototype._updatedMapChunkIndex = function(index)
	{
		if(this._mapDataManagerModel != null && typeof(this._mapDataManagerModel) !== 'undefined')
		{
			var mapDataModel = this._mapDataManagerModel.getMapDataModel();

			if(this._gameModel.getMusic() !== mapDataModel.getRooms()[index].getMusic())
			{
				this._gameModel.setMusic(mapDataModel.getRooms()[index].getMusic());
				this._soundModel.playSound(mapDataModel.getRooms()[index].getMusic());
			}

			this._mapDataManagerModel.updateMapChunkIndex(index);
			this._mapUIModel.setHeroPosition(index);

			var collidingEntities = [];
			var protagonistsEntities = this._mapDataManagerModel.getHeroTileMapModel().getEntities();
			var antagonistsEntities = this._mapDataManagerModel.getEnemyTileMapModel().getEntities();
			var collisionEntities = this._mapDataManagerModel.getCollisionTileMapModel().getEntities();
			var npcEntities = this._mapDataManagerModel.getNpcTileMapModel().getEntities();
			var playableWalkableTileMap = mapDataModel.getMapChunksAs2DArray(this._mapDataManagerModel.getCollisionTileMapModel().getMapChunk());

			for(var i = 0; i < collisionEntities.length; i++)
			{
				collidingEntities.push(collisionEntities[i]);
			}
			for(i = 0; i < npcEntities.length; i++)
			{
				collidingEntities.push(npcEntities[i]);
			}
			if(this._heroTileMapController !== null)
			{
				this._mapDataManagerModel.getHeroTileMapModel().setWalkableTileMap(playableWalkableTileMap);
				this._mapDataManagerModel.getHeroTileMapModel().setCollidingEntities(collidingEntities);
				this._mapDataManagerModel.getHeroTileMapModel().setOpposingEntities(antagonistsEntities);

				this._heroTileMapController.setTileMapModel(this._mapDataManagerModel.getHeroTileMapModel());
				this._heroTileMapController.setMapDataModel(mapDataModel);
				this._heroTileMapController.setPlayerKeyControlModel(this._keyControlMediator.getControlModels()[0]);
				this._heroTileMapController.setGamepadControlPlayerModel(this._gamepadJSControlMediator.getControlModel());

				this._heroTileMapController.forceUpdate(1);

				this._playerEntityUIModel.setEntityModel(this._mapDataManagerModel.getHeroTileMapModel().getEntities()[0]);
			}
			if(this._graphicTileMapController !== null)
			{
				this._graphicTileMapController.setTileMapModel(this._mapDataManagerModel.getGraphicTileMapModel());
				this._graphicTileMapController.setMapDataModel(mapDataModel);
			}
			if(this._collisionTileMapController !== null)
			{
				this._collisionTileMapController.setTileMapModel(this._mapDataManagerModel.getCollisionTileMapModel());
				this._collisionTileMapController.setMapDataModel(mapDataModel);
			}
			if(this._pickupTileMapController !== null)
			{
				this._mapDataManagerModel.getPickupTileMapModel().setCollidingEntities(collidingEntities);
				this._mapDataManagerModel.getPickupTileMapModel().setCollectorEntities(protagonistsEntities);

				this._pickupTileMapController.setTileMapModel(this._mapDataManagerModel.getPickupTileMapModel());
				this._pickupTileMapController.setMapDataModel(mapDataModel);
			}
			if(this._dropsController !== null)
			{
				this._dropsModel.setEntities([]);
				this._dropsModel.setCollectorEntities(protagonistsEntities);
			}
			if(this._npcTileMapController !== null)
			{
				this._npcTileMapController.setTileMapModel(this._mapDataManagerModel.getNpcTileMapModel());
				this._npcTileMapController.setMapDataModel(mapDataModel);
			}
			if(this._enemyTileMapController !== null)
			{
				this._mapDataManagerModel.getEnemyTileMapModel().setWalkableTileMap(playableWalkableTileMap);
				this._mapDataManagerModel.getEnemyTileMapModel().setCollidingEntities(collidingEntities);
				this._mapDataManagerModel.getEnemyTileMapModel().setOpposingEntities(protagonistsEntities);

				this._enemyTileMapController.setTileMapModel(this._mapDataManagerModel.getEnemyTileMapModel());
				this._enemyTileMapController.setMapDataModel(mapDataModel);

				for(i = 0; i < antagonistsEntities.length; i++)
				{
					antagonistsEntities[i].addObserver(this);
				}
			}
			if(this._canvas !== null && typeof(this._canvas) !== "undefined")
			{
				this.setCanvas(this._canvas);
			}
		}
	};

	GameController.prototype.setViewStateModel = function(value)
	{
		this._viewStateModel = value;
	};

	GameController.prototype.setGameModel = function(value)
	{
		this._gameModel = value;
		this._gameModel.setGameReady(false);
		this._gameModel.addObserver(this._graphicTileMapController);
		this._gameModel.addObserver(this._collisionTileMapController);
		this._gameModel.addObserver(this._pickupTileMapController);
		this._gameModel.addObserver(this._dropsController);
		this._gameModel.addObserver(this._npcTileMapController);
		this._gameModel.addObserver(this._enemyTileMapController);
		this._gameModel.addObserver(this._heroTileMapController);
		this._gameModel.addObserver(this._playerEntityUIController);
	};

	GameController.prototype.setSoundModel = function(value)
	{
		this._soundModel = value;
		this._pickupTileMapController.setSoundModel(this._soundModel);
		this._enemyTileMapController.setSoundModel(this._soundModel);
		this._heroTileMapController.setSoundModel(this._soundModel);
		this._playerEntityUIController.setSoundModel(this._soundModel);
	};

	GameController.prototype._playSound = function(value)
	{
		if(this._soundModel !== null && typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.playSound(value);
		}
	};

	GameController.prototype._stopSound = function(value)
	{
		if(this._soundModel !== null && typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.stopSound(value);
		}
	};

})();