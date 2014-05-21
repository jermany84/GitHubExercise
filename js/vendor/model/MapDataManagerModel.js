/**
 * Created by apple on 4/28/14.
 */

var MapDataManagerModelEvent = {
	UPDATED_MAP_DATA_MODEL : "MapDataManagerModelEventUpdatedMapDataModel"
};

var MapKey = {
	NONE : "",
	OVERWORLD : "overworld",
	SWORD_RESIDENCE : "swordResidence",
	LONG_SWORD_RESIDENCE : "longSwordResidence",
	MASTER_SWORD_RESIDENCE : "masterSwordResidence",
	RECIPE_RESIDENCE : "recipeResidence",
	THIEF1_RESIDENCE : "thief1Residence",
	GAMEBLE1_RESIDENCE : "gamble1Residence",
	DUNGEON1 : "dungeon1",
	DUNGEON2 : "dungeon2",
	DUNGEON3 : "dungeon3",
	DUNGEON4 : "dungeon4",
	DUNGEON5 : "dungeon5",
	DUNGEON6 : "dungeon6",
	DUNGEON7 : "dungeon7",
	DUNGEON8 : "dungeon8"
};

(function()
{
	this.MapDataManagerModel = function()
	{
		this._maps = new HashTable();
		this._maps.addItem(MapKey.OVERWORLD, new OverworldMapDataModel());
		this._maps.addItem(MapKey.SWORD_RESIDENCE, new SwordRoomMapDataModel());
		this._maps.addItem(MapKey.LONG_SWORD_RESIDENCE, new LongSwordRoomMapDataModel());
		this._maps.addItem(MapKey.MASTER_SWORD_RESIDENCE, new MasterSwordRoomMapDataModel());
		/*
		this._maps.addItem(MapKey.MASTER_SWORD_RESIDENCE, new MasterSwordRoomMapDataModel());
		this._maps.addItem(MapKey.RECIPE_RESIDENCE, new RecipeRoomMapDataModel());
		this._maps.addItem(MapKey.THIEF1_RESIDENCE, new Thief1ResidenceMapDataModel());
		this._maps.addItem(MapKey.GAMEBLE1_RESIDENCE, new Gamble1ResidenceMapDataModel());
		this._maps.addItem(MapKey.DUNGEON1, new Dungeon1MapDataModel());
		this._maps.addItem(MapKey.DUNGEON2, new Dungeon2MapDataModel());
		this._maps.addItem(MapKey.DUNGEON3, new Dungeon3MapDataModel());
		this._maps.addItem(MapKey.DUNGEON4, new Dungeon4MapDataModel());
		this._maps.addItem(MapKey.DUNGEON5, new Dungeon5MapDataModel());
		this._maps.addItem(MapKey.DUNGEON6, new Dungeon6MapDataModel());
		this._maps.addItem(MapKey.DUNGEON7, new Dungeon7MapDataModel());
		this._maps.addItem(MapKey.DUNGEON8, new Dungeon8MapDataModel());
		*/

		this._destinations = [];

		this._destinations[0] = {
			in : new DestinationModel(96, 96, 96, 128, MapKey.OVERWORLD, 0, this._maps.getItem(MapKey.OVERWORLD).getRooms()[0].getId()),
			out : new DestinationModel(226, 288, 240, 288, MapKey.SWORD_RESIDENCE, 0, this._maps.getItem(MapKey.SWORD_RESIDENCE).getRooms()[0].getId())
		};

		this._destinations[1] = {
			in : new DestinationModel(224, 32, 224, 64, MapKey.OVERWORLD, 0, this._maps.getItem(MapKey.OVERWORLD).getRooms()[0].getId()),
			out : new DestinationModel(226, 288, 240, 288, MapKey.LONG_SWORD_RESIDENCE, 0, this._maps.getItem(MapKey.LONG_SWORD_RESIDENCE).getRooms()[0].getId())
		};

		this._destinations[2] = {
			in : new DestinationModel(64, 32, 64, 64, MapKey.OVERWORLD, 1, this._maps.getItem(MapKey.OVERWORLD).getRooms()[1].getId()),
			out : new DestinationModel(226, 288, 240, 288, MapKey.MASTER_SWORD_RESIDENCE, 0, this._maps.getItem(MapKey.MASTER_SWORD_RESIDENCE).getRooms()[0].getId())
		};

		//trace(this, "0. in id: " + this._destinations[0].in.getRoomId() + " - out id: " + this._destinations[0].out.getRoomId());
		//trace(this, "1. in id: " + this._destinations[1].in.getRoomId() + " - out id: " + this._destinations[1].out.getRoomId());
		//trace(this, "2. in id: " + this._destinations[2].in.getRoomId() + " - out id: " + this._destinations[2].out.getRoomId());

		this._mapDataModel = null;
		this._graphicTileMapModel = new GraphicTileMapModel();
		this._collisionTileMapModel = new CollisionTileMapModel();
		this._pickupTileMapModel = new PickupTileMapModel();
		this._npcTileMapModel = new NpcTileMapModel();
		this._enemyTileMapModel = new EnemyTileMapModel();
		this._heroTileMapModel = new HeroTileMapModel();
	};

	MapDataManagerModel.prototype = new AbstractModel();
	MapDataManagerModel.prototype.constructor = MapDataManagerModel;

	MapDataManagerModel.prototype.getMaps = function()
	{
		return this._maps;
	};

	MapDataManagerModel.prototype.getMapDataModel = function()
	{
		return this._mapDataModel;
	};

	MapDataManagerModel.prototype.setMapDataModel = function(value)
	{
		if(this._mapDataModel !== null && typeof(this._mapDataModel) !== "undefined")
		{
			this._mapDataModel.removeAllObservers();
		}
		if(value === null || typeof(value) === "undefined")
		{
			return;
		}
		this._mapDataModel = value;
		this._graphicsMap = this._mapDataModel.getGraphicData();
		this._collisionMap = this._mapDataModel.getCollisionData();
		this._pickupMap = this._mapDataModel.getPickupData();
		this._npcMap = this._mapDataModel.getNpcData();
		this._enemyMap = this._mapDataModel.getEnemyData();
		this._heroMap = this._mapDataModel.getHeroData();
		this.sendNotification(MapDataManagerModelEvent.UPDATED_MAP_DATA_MODEL, value, this);
	};

	MapDataManagerModel.prototype.updateMapChunkIndex = function(index)
	{
		this._graphicTileMapModel.setMapProperties(this._graphicsMap, this._mapDataModel, index);
		this._collisionTileMapModel.setMapProperties(this._collisionMap, this._mapDataModel, index);
		this._pickupTileMapModel.setMapProperties(this._pickupMap, this._mapDataModel, index);
		this._npcTileMapModel.setMapProperties(this._npcMap, this._mapDataModel, index);
		this._enemyTileMapModel.setMapProperties(this._enemyMap, this._mapDataModel, index);
		this._heroTileMapModel.setMapProperties(this._heroMap, this._mapDataModel, index);
	};

	MapDataManagerModel.prototype.getDestinationNodeList = function(destinationKey)
	{
		return this._destinations.getItem(destinationKey);
	};

	MapDataManagerModel.prototype.getMapChunkIndexBasedOnHeroPosition = function()
	{
		var map = this._mapDataModel.getHeroData();
		for(var i = 0; i < map.length; i++)
		{
			for(var j = 0; j < map[i].length; j++)
			{
				if(map[i][j] > 0)
				{
					return i;
				}
			}
		}
		return 0;
	};

	MapDataManagerModel.prototype.goMapUp = function()
	{
		if(this._mapDataModel.getMapChunkIndex() < this._mapDataModel.getMapChunksWide())
		{
			return false;
		}
		this._mapDataModel.setMapChunkIndex((this._mapDataModel.getMapChunkIndex() - this._mapDataModel.getMapChunksWide()));
		return true;
	};

	MapDataManagerModel.prototype.goMapRight = function()
	{
		if((this._mapDataModel.getMapChunkIndex() + 1) % this._mapDataModel.getMapChunksWide() === 0)
		{
			return false;
		}
		this._mapDataModel.setMapChunkIndex((this._mapDataModel.getMapChunkIndex() + 1));
		return true;
	};

	MapDataManagerModel.prototype.goMapDown = function()
	{
		var totalMapsSections = this._mapDataModel.getMapChunksWide() * this._mapDataModel.getMapChunksHigh();
		if(this._mapDataModel.getMapChunkIndex() > (totalMapsSections - this._mapDataModel.getMapChunksWide() - 1))
		{
			return false;
		}
		this._mapDataModel.setMapChunkIndex((this._mapDataModel.getMapChunkIndex() + this._mapDataModel.getMapChunksWide()));
		return true;
	};

	MapDataManagerModel.prototype.goMapLeft = function()
	{
		if(this._mapDataModel.getMapChunkIndex() % this._mapDataModel.getMapChunksWide() === 0)
		{
			return false;
		}
		this._mapDataModel.setMapChunkIndex((this._mapDataModel.getMapChunkIndex() - 1));
		return true;
	};

	MapDataManagerModel.prototype.goInDoorway = function(entity)
	{
		var destinationDistance = 0;
		var nextDestinationModelData = null;
		var currentRoom = this._mapDataModel.getRooms()[this._mapDataModel.getMapChunkIndex()];
		var currentRoomId = currentRoom.getId();

		for(var i = 0; i < this._destinations.length; i++)
		{
			if(currentRoomId === this._destinations[i].in.getRoomId())
			{
				destinationDistance = MOMath.getDistance(
					entity.getX(),
					entity.getY(),
					this._destinations[i].in.getX(),
					this._destinations[i].in.getY());

				if(destinationDistance < 64)
				{
					nextDestinationModelData = this._destinations[i].out;
					break;
				}
			}
			else
			if(currentRoomId === this._destinations[i].out.getRoomId())
			{
				destinationDistance = MOMath.getDistance(
					entity.getX(),
					entity.getY(),
					this._destinations[i].out.getX(),
					this._destinations[i].out.getY());

				if(destinationDistance < 64)
				{
					nextDestinationModelData = this._destinations[i].in;
					break;
				}
			}
		}
		if(nextDestinationModelData === null ||
			typeof(nextDestinationModelData) === "undefined")
		{
			throw new Error("********************************************\nMapDataManagerModel:\n- Destination is does not match _destinations record\n********************************************");
		}
		this.setMapDataModel(this._maps.getItem(nextDestinationModelData.getMapKey()));
		this._mapDataModel.setMapChunkIndex(nextDestinationModelData.getMapChunkIndex());
		entity.setX(nextDestinationModelData.getSafeX());
		entity.setY(nextDestinationModelData.getSafeY());
	};

	MapDataManagerModel.prototype.goInStairs = function(entity) {};

	MapDataManagerModel.prototype.getGraphicsMap = function()
	{
		return this._graphicsMap;
	};

	MapDataManagerModel.prototype.getCollisionMap = function()
	{
		return this._collisionMap;
	};

	MapDataManagerModel.prototype.getPickupsMap = function()
	{
		return this._pickupMap;
	};

	MapDataManagerModel.prototype.getNpcMap = function()
	{
		return this._npcMap;
	};

	MapDataManagerModel.prototype.getEnemyMap = function()
	{
		return this._enemyMap;
	};

	MapDataManagerModel.prototype.getHeroMap = function()
	{
		return this._heroMap;
	};

	MapDataManagerModel.prototype.getGraphicTileMapModel = function()
	{
		return this._graphicTileMapModel;
	};

	MapDataManagerModel.prototype.getCollisionTileMapModel = function()
	{
		return this._collisionTileMapModel;
	};

	MapDataManagerModel.prototype.getPickupTileMapModel = function()
	{
		return this._pickupTileMapModel;
	};

	MapDataManagerModel.prototype.getNpcTileMapModel = function()
	{
		return this._npcTileMapModel;
	};

	MapDataManagerModel.prototype.getEnemyTileMapModel = function()
	{
		return this._enemyTileMapModel;
	};

	MapDataManagerModel.prototype.getHeroTileMapModel = function()
	{
		return this._heroTileMapModel;
	};

})();

