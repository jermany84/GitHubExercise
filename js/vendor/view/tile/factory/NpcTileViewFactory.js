/**
 * Created by apple on 3/28/14.
 */

(function()
{
    this.NpcTileViewFactory = function()
    {
    };

    NpcTileViewFactory.prototype.create = function(type, frame)
    {
        var sprite = null;
        switch(type)
        {
            case NpcTileModelType.OLDMAN :
                switch(frame)
                {
                    case NpcTileModelFrame.IDLE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 0], [32, 32], 0, [0], "vertical", true);
                        break;
                    case NpcTileModelFrame.HURT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [512, 0], [32, 32], 0, [0]);
                        break;
                    case NpcTileModelFrame.SPAWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 0, 0, 0, 0, 0, 1, 2, 3], "vertical");
                        break;
                }
                break;
            case NpcTileModelType.KID :
                switch(frame)
                {
                    case NpcTileModelFrame.IDLE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 32], [32, 32], 0, [0], "vertical", true);
                        break;
                    case NpcTileModelFrame.HURT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [512, 32], [32, 32], 0, [0]);
                        break;
                    case NpcTileModelFrame.SPAWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 0, 0, 0, 0, 0, 1, 2, 3], "vertical");
                        break;
                }
                break;
            case NpcTileModelType.OLDWOMAN :
                switch(frame)
                {
                    case NpcTileModelFrame.IDLE :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [512, 0], [32, 32], 0, [0], "vertical", true);
                        break;
                    case NpcTileModelFrame.HURT :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [512, 0], [32, 32], 0, [0]);
                        break;
                    case NpcTileModelFrame.SPAWN :
                        sprite = new Sprite(SpriteSheetUrl.CAST, [480, 64], [32, 32], 5, [0, 0, 0, 0, 0, 0, 1, 2, 3], "vertical");
                        break;
                }
                break;
        }
        return sprite;
    };

})();

