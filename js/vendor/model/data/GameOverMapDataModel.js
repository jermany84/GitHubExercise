/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.GameOverMapDataModel = function()
	{
	};

	GameOverMapDataModel.prototype = new MapDataModel();
	GameOverMapDataModel.prototype.constructor = GameOverMapDataModel;

	GameOverMapDataModel.prototype.getGraphicData = function()
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

	GameOverMapDataModel.prototype.getMapChunksWide = function()
	{
		return 1;
	};

	GameOverMapDataModel.prototype.getMapChunksHigh = function()
	{
		return 1;
	};

	GameOverMapDataModel.prototype.getMapChunkWidth = function()
	{
		return 16;
	};

	GameOverMapDataModel.prototype.getMapChunkHeight = function()
	{
		return 11;
	};

	GameOverMapDataModel.prototype.getMapChunksAs2DArray = function(mapChunk)
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

