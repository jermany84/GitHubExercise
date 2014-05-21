/**
 * Created by apple on 3/21/14.
 */

(function()
{
    this.GraphicTileViewFactory = function ()
    {
    };

    GraphicTileViewFactory.prototype.create = function(type, frame)
    {
        var sprite = null;
        switch(type)
        {
            case GraphicTileModelType.TAN_GROUND :
                sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 64], [32, 32], 0, [0], "horizontal", true);
                break;
            case GraphicTileModelType.BROWN_MOUNTAIN :
                sprite = new Sprite(SpriteSheetUrl.TERRAIN, [0, 0], [32, 32], 0, [0], "horizontal", true);
                break;
	        case GraphicTileModelType.WATER_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [32, 0], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.DOOR_WAY :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [64, 0], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_SLOPE_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [960, 0], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_SLOPE_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [992, 0], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_SLOPE_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [384, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_SLOPE_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [416, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_ROCK :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [448, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_CORNER_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [480, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_TOP_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [512, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_CORNER_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [544, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [576, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [608, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_10 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 96], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_LEFT_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [544, 128], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_RIGHT_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [576, 128], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.SOLDIER_STATUE_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [608, 128], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_9 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [640, 128], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_11 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 128], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_LADDER :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [800, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_MOUNTAIN_SLOPE_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [832, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_CORNER_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [864, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_BOTTOM_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [896, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_CORNER_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [928, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_WAVE_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [320, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_1_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [640, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_1_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_2_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [704, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_2_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [736, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_2_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [768, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_1_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [800, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_1_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [832, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_WAVE_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [864, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_2_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [896, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_2_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [928, 352], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [320, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_SINGLE_TREE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [352, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_SINGLE_TREE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [384, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_SLOPE_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [608, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREY_GROUND :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [640, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TAN_SAND :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_SAND :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [704, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_GRAVE_STONE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [736, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [768, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [800, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [832, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_SINGLE_TREE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [864, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_6 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [896, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.SOLDIER_STATUE_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [928, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_7 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [960, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_1_8 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [992, 384], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_1_CORNER_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [0, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_TOP_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [224, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [256, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [288, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_RIGHT_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [320, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_SLOPE_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [352, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_LADDER :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [384, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_SLOPE_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [512, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_SLOPE_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [544, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_SLOPE_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [576, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TREE_1_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [672, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [704, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_1 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [736, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_2 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [768, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [800, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_LEFT_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [832, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.SOLDIER_STATUE_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [864, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [896, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [928, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_PLANKS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [960, 416], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [0, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_BOTTOM_RIDGE :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [32, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [64, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_SLOPE_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [96, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_SLOPE_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [128, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_SLOPE_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [160, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_MOUNTAIN_SLOPE_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [192, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_SLOPE_5 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [224, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_LADDER :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [256, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.TEMPLE_3_6 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [288, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_MOUNTAIN_ROCK :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [352, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_PLANKS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [544, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_4 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [576, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BLUE_SAND :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [608, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_SAND :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [640, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_2_CORNER_6 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [736, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WATER_3 :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [768, 448], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BROWN_STAIRS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [256, 768], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.BLUE_STAIRS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [352, 800], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.LIGHT_BLUE_STAIRS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [224, 192], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.GREEN_STAIRS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [128, 608], [32, 32], 0, [0], "horizontal", true);
		        break;
	        case GraphicTileModelType.WHITE_STAIRS :
		        sprite = new Sprite(SpriteSheetUrl.TERRAIN, [480, 608], [32, 32], 0, [0], "horizontal", true);
		        break;
        }
        return sprite;
    };

})();