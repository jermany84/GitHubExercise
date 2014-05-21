/**
 * Created by apple on 3/27/14.
 */

(function()
{
    this.EnemyTileViewFactory = function()
    {
    };

    EnemyTileViewFactory.prototype.create = function(type, frame)
    {
        var sprite = null;
        switch(type)
        {
            case EnemyTileModelType.RED_SPITTER :
                switch(frame)
                {
                    case EnemyTileModelFrame.IDLE_UP :
                    case EnemyTileModelFrame.WALK_UP :
                    case EnemyTileModelFrame.ATTACK_UP :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [64, 0], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case EnemyTileModelFrame.IDLE_RIGHT :
                    case EnemyTileModelFrame.WALK_RIGHT :
                    case EnemyTileModelFrame.ATTACK_RIGHT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [96, 0], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case EnemyTileModelFrame.IDLE_DOWN :
                    case EnemyTileModelFrame.WALK_DOWN :
                    case EnemyTileModelFrame.ATTACK_DOWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [0, 0], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case EnemyTileModelFrame.IDLE_LEFT :
                    case EnemyTileModelFrame.WALK_LEFT :
                    case EnemyTileModelFrame.ATTACK_LEFT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [32, 0], [32, 32], 5, [0, 1], "vertical");
                        break;
                    case EnemyTileModelFrame.SPAWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 0, 0, 0, 0, 0, 1, 2, 3], "vertical");
                        break;
                    case EnemyTileModelFrame.DIE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 1, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3], "vertical");
                        break;
                }
                break;
        }
        return sprite;
    };

})();