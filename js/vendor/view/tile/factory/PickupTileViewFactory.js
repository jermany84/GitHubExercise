/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.PickupTileViewFactory = function()
	{
	};

	PickupTileViewFactory.prototype = new AbstractView();
	PickupTileViewFactory.prototype.constructor = PickupTileViewFactory;

	PickupTileViewFactory.prototype.create = function(type, frame)
	{
		var sprite = null;
		switch(type)
		{
			// Button Action 2 Pickups
			case PickupTileModelType.SWORD :
				sprite = new Sprite(SpriteSheetUrl.CAST, [224, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.LONG_SWORD :
				sprite = new Sprite(SpriteSheetUrl.CAST, [256, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.MASTER_SWORD :
				sprite = new Sprite(SpriteSheetUrl.CAST, [288, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			// General Pickups
			case PickupTileModelType.COIN_1 :
				sprite = new Sprite(SpriteSheetUrl.CAST, [64, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.COIN_5 :
				sprite = new Sprite(SpriteSheetUrl.CAST, [96, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BOMB :
				sprite = new Sprite(SpriteSheetUrl.CAST, [64, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.HEART :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 704], [32, 32], 0, [0, 1], "horizontal", false);
				break;
			case PickupTileModelType.HALF_HEART :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 704], [32, 32], 0, [0], "horizontal", false);
				break;
			case PickupTileModelType.HEART_CONTAINER :
				sprite = new Sprite(SpriteSheetUrl.CAST, [64, 640], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.KEY :
				sprite = new Sprite(SpriteSheetUrl.CAST, [96, 640], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.CLOCK :
				sprite = new Sprite(SpriteSheetUrl.CAST, [160, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.FAIRY :
				sprite = new Sprite(SpriteSheetUrl.CAST, [224, 608], [32, 32], 5, [0, 1], "vertical", false);
				break;
			// // Button Action 1 Pickups
			case PickupTileModelType.BOOMERANG :
				sprite = new Sprite(SpriteSheetUrl.CAST, [0, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.SILVER_BOOMERANG :
				sprite = new Sprite(SpriteSheetUrl.CAST, [32, 704], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BOW :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BOW_ARROW :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.CANDLE :
				sprite = new Sprite(SpriteSheetUrl.CAST, [0, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.WHISTLE :
				sprite = new Sprite(SpriteSheetUrl.CAST, [160, 672], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.MEAT :
				sprite = new Sprite(SpriteSheetUrl.CAST, [32, 640], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.RED_POTION :
				sprite = new Sprite(SpriteSheetUrl.CAST, [160, 640], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BLUE_POTION :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 640], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.WAND :
				sprite = new Sprite(SpriteSheetUrl.CAST, [32, 672], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.NOTE :
				sprite = new Sprite(SpriteSheetUrl.CAST, [96, 672], [32, 32], 0, [0], "horizontal", true);
				break;
			// Auto Action Pickups
			case PickupTileModelType.RAFT :
				sprite = new Sprite(SpriteSheetUrl.CAST, [256, 576], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BOOK :
				sprite = new Sprite(SpriteSheetUrl.CAST, [96, 608], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.RED_RING :
				sprite = new Sprite(SpriteSheetUrl.CAST, [224, 576], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BLUE_RING :
				sprite = new Sprite(SpriteSheetUrl.CAST, [192, 576], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.LADDER :
				sprite = new Sprite(SpriteSheetUrl.CAST, [352, 576], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.MASTER_KEY :
				sprite = new Sprite(SpriteSheetUrl.CAST, [0, 672], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.BRACELET :
				sprite = new Sprite(SpriteSheetUrl.CAST, [128, 672], [32, 32], 0, [0], "horizontal", true);
				break;
			case PickupTileModelType.POT :
				sprite = new Sprite(SpriteSheetUrl.CAST, [32, 576], [32, 32], 0, [0], "horizontal", true);
				break;
		}
		return sprite;
	};

})();

