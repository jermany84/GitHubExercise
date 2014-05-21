/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.StartMapDataModel = function()
	{
	};

	StartMapDataModel.prototype = new MapDataModel();
	StartMapDataModel.prototype.constructor = StartMapDataModel;

	StartMapDataModel.prototype.getGraphicData = function()
	{
		return [
			[
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
			]
		];
	};

	StartMapDataModel.prototype.getMapChunksWide = function()
	{
		return 1;
	};

	StartMapDataModel.prototype.getMapChunksHigh = function()
	{
		return 1;
	};

	StartMapDataModel.prototype.getMapChunkWidth = function()
	{
		return 16;
	};

	StartMapDataModel.prototype.getMapChunkHeight = function()
	{
		return 11;
	};

	StartMapDataModel.prototype.getMapChunksAs2DArray = function(mapChunk)
	{
		var arr2d = [];
		var counter = 0;

		for(var i = 0; i < this.getMapChunkWidth(); i++)
		{
			arr2d[i] = [];
			for(var j = 0; j < this.getMapChunkHeight(); j++)
			{
				arr2d[i][j] = mapChunk[counter];
				counter++;
			}
		}
		return arr2d;
	};

})();

