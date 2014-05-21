/**
 * Created by apple on 3/19/14.
 */

(function ()
{
    this.HeroTileViewFactory = function ()
    {
    };

    HeroTileViewFactory.prototype.create = function(type, frame)
    {
        var sprite = null;
        switch(type)
        {
            case HeroTileModelType.GREEN_LINK :
	        case HeroTileModelType.BLUE_LINK :
	        case HeroTileModelType.RED_LINK :
                switch(frame)
                {
                    case HeroTileModelFrame.IDLE_UP :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [64, 256], [32, 32], 0, [0], "vertical", true);
                        break;
                    case HeroTileModelFrame.IDLE_RIGHT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [96, 256], [32, 32], 0, [0], "vertical", true);
                        break;
                    case HeroTileModelFrame.IDLE_DOWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [0, 256], [32, 32], 0, [0], "vertical", true);
                        break;
                    case HeroTileModelFrame.IDLE_LEFT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [32, 256], [32, 32], 0, [0], "vertical", true);
                        break;
                    case HeroTileModelFrame.WALK_UP :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [64, 256], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case HeroTileModelFrame.WALK_RIGHT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [96, 256], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case HeroTileModelFrame.WALK_DOWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [0, 256], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case HeroTileModelFrame.WALK_LEFT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [32, 256], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case HeroTileModelFrame.ATTACK_UP :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [96, 416], [32, 32], 0, [0], "vertical");
                        break;
                    case HeroTileModelFrame.ATTACK_RIGHT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [32, 448], [32, 32], 0, [0], "vertical");
                        break;
                    case HeroTileModelFrame.ATTACK_DOWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [0, 384], [32, 32], 0, [0], "vertical");
                        break;
                    case HeroTileModelFrame.ATTACK_LEFT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [64, 352], [32, 32], 0, [0], "vertical");
                        break;
	                case HeroTileModelFrame.ATTACK_2_UP :
		                sprite = new Sprite(SpriteSheetUrl.CAST, [96, 384], [32, 64], 5, [0, 1], "vertical");
		                break;
	                case HeroTileModelFrame.ATTACK_2_RIGHT :
		                sprite = new Sprite(SpriteSheetUrl.CAST, [32, 448], [64, 32], 5, [0, 1], "vertical");
		                break;
	                case HeroTileModelFrame.ATTACK_2_DOWN :
		                sprite = new Sprite(SpriteSheetUrl.CAST, [0, 384], [32, 64], 5, [0, 1], "vertical");
		                break;
	                case HeroTileModelFrame.ATTACK_2_LEFT :
		                sprite = new Sprite(SpriteSheetUrl.CAST, [32, 352], [64, 32], 5, [0, 1], "vertical");
		                break;
                    case HeroTileModelFrame.HURT_UP :
                        break;
                    case HeroTileModelFrame.HURT_RIGHT :
                        break;
                    case HeroTileModelFrame.HURT_DOWN :
                        break;
                    case HeroTileModelFrame.HURT_LEFT :
                        break;
                    case HeroTileModelFrame.FRAME_RECEIVE_TRIFORCE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [160, 512], [32, 64], 0, [0], "horizontal", true);
                        break;
                    case HeroTileModelFrame.FRAME_RECEIVE_ITEM :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [128, 512], [32, 32], 0, [0], "horizontal", true);
                        break;
                    case HeroTileModelFrame.SPAWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 0, 0, 0, 0, 0, 1, 2, 3], "vertical");
                        break;
                    case HeroTileModelFrame.DIE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [0, 256], [32, 32], 6, [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 2, 2, 2, 2, 2, 2], "horizontal", true);
                        break;
                }
                break;
        }
        return sprite;
    };

})();