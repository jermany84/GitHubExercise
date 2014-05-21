/**
 * Created by synthetic_84 on 3/20/14.
 */

var GraphicTileModelType = {
	TAN_GROUND : 1,
	BROWN_MOUNTAIN : 2,
	BROWN_MOUNTAIN_SLOPE_1 : 3,
	BROWN_MOUNTAIN_SLOPE_2 : 4,
	BROWN_MOUNTAIN_SLOPE_3 : 5,
	BROWN_MOUNTAIN_SLOPE_4 : 6,
	BROWN_MOUNTAIN_SLOPE_5 : 7,
	BROWN_MOUNTAIN_ROCK : 8,
	BROWN_MOUNTAIN_LADDER : 9,
	BROWN_PLANKS : 10,
	BROWN_STAIRS : 11,
	BROWN_SAND : 12,
	TAN_SAND : 13,
	BROWN_SINGLE_TREE : 14,
	TREE_1_1 : 15,
	TREE_1_2 : 16,
	TREE_1_3 : 17,
	TREE_1_4 : 18,
	TREE_1_5 : 19,
	TEMPLE_1_1 : 20,
	TEMPLE_1_2 : 21,
	TEMPLE_1_3 : 22,
	TEMPLE_1_4 : 23,
	TEMPLE_1_5 : 24,
	TEMPLE_1_6 : 25,
	TEMPLE_1_7 : 26,
	TEMPLE_1_8 : 27,
	TEMPLE_1_9 : 28,
	TEMPLE_1_10 : 29,
	TEMPLE_1_11 : 30,
	SOLDIER_STATUE_1 : 31,
	WHITE_MOUNTAIN : 32,
	WHITE_MOUNTAIN_SLOPE_1 : 33,
	WHITE_MOUNTAIN_SLOPE_2 : 34,
	WHITE_MOUNTAIN_SLOPE_3 : 35,
	WHITE_MOUNTAIN_SLOPE_4 : 36,
	WHITE_MOUNTAIN_SLOPE_5 : 37,
	WHITE_MOUNTAIN_LADDER : 38,
	WHITE_STAIRS : 39,
	WHITE_GRAVE_STONE : 40,
	WHITE_SINGLE_TREE : 41,
	GREY_GROUND : 42,
	TEMPLE_3_1 : 43,
	TEMPLE_3_2 : 44,
	TEMPLE_3_3 : 45,
	TEMPLE_3_4 : 46,
	TEMPLE_3_5 : 47,
	TEMPLE_3_6 : 48,
	SOLDIER_STATUE_3 : 49,
	GREEN_MOUNTAIN_SLOPE_1 : 50,
	GREEN_MOUNTAIN_SLOPE_2 : 51,
	GREEN_MOUNTAIN_SLOPE_3 : 52,
	GREEN_MOUNTAIN_SLOPE_4 : 53,
	GREEN_MOUNTAIN_SLOPE_5 : 54,
	GREEN_MOUNTAIN_ROCK : 55,
	GREEN_MOUNTAIN_LADDER : 56,
	GREEN_STAIRS : 57,
	GREEN_PLANKS : 58,
	GREEN_SAND : 59,
	GREEN_SINGLE_TREE : 60,
	TREE_2_1 : 61,
	TREE_2_2 : 62,
	TREE_2_3 : 63,
	TREE_2_4 : 64,
	TREE_2_5 : 65,
	SOLDIER_STATUE_2 : 66,
	DOOR_WAY : 67,
	WATER_1 : 68,
	WATER_1_TOP_RIDGE : 69,
	WATER_1_RIGHT_RIDGE : 70,
	WATER_1_BOTTOM_RIDGE : 71,
	WATER_1_LEFT_RIDGE : 72,
	WATER_1_CORNER_1 : 73,
	WATER_1_CORNER_2 : 74,
	WATER_1_CORNER_3 : 75,
	WATER_1_CORNER_4 : 76,
	WATER_1_CORNER_5 : 77,
	WATER_1_WAVE_1 : 78,
	WATER_1_WAVE_2 : 79,
	WATER_2 : 80,
	WATER_2_TOP_RIDGE : 81,
	WATER_2_RIGHT_RIDGE : 82,
	WATER_2_BOTTOM_RIDGE : 83,
	WATER_2_LEFT_RIDGE : 84,
	WATER_2_CORNER_1 : 85,
	WATER_2_CORNER_2 : 86,
	WATER_2_CORNER_3 : 87,
	WATER_2_CORNER_4 : 88,
	WATER_2_CORNER_5 : 89,
	WATER_2_CORNER_6 : 90,
	WATER_3 : 91,
	BLUE_SAND : 92,
	BLUE_STAIRS : 93,
	LIGHT_BLUE_STAIRS : 94
};

(function ()
{
    this.GraphicTileModel = function ()
    {
	    this._width = 32;
	    this._height = 32;
    };

    GraphicTileModel.prototype = new TileModel();
    GraphicTileModel.prototype.constructor = GraphicTileModel;

	GraphicTileModel.prototype.update = function(delta)
	{
		this._aabb.xCenterAlign();
		this._aabb.yCenterAlign();
	};

    GraphicTileModel.prototype.setType = function(value)
    {
        this._type = value;
        switch(this._type)
        {
            default :
	            this._aabb = new AxisAlignedBoundingBoxModel(this, 32, 32);
                this.setProjectiles([]);
                break;
        }
	    this._aabb.setFillStyle("#00ffff");
	    //this._aabb.setIsVisible(true);
	    this.sendNotification(TileModelEvent.UPDATED_TYPE, this._type, this);
    };

})();

