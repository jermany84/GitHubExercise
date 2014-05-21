/**
 * Created by apple on 4/2/14.
 */

(function()
{
    this.HeroProjectileViewFactory = function()
    {
    };

    HeroProjectileViewFactory.prototype = new AbstractView();
    HeroProjectileViewFactory.prototype.constructor = HeroProjectileViewFactory;

    HeroProjectileViewFactory.prototype.create = function(type, frame)
    {
        var sprite = null;
        switch(type)
        {
            case ProjectileTileModelType.SWORD :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.FIREBALL1 :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.FIREBALL2 :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.LANTERN_FLAME :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.MAGIC_1 :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.MAGIC_2 :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
            case ProjectileTileModelType.MAGIC_3 :
                sprite = new Sprite(SpriteSheetUrl.CAST, [992, 992], [32, 32], 0, [0], "horizontal", true);
                break;
        }
        return sprite;
    };

})();

