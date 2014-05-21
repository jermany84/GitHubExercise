/**
 * Created by apple on 4/1/14.
 */

var ProjectileTileModelType = {
	SWORD : 1,
	FIREBALL1 : 2,
	FIREBALL2 : 3,
	LANTERN_FLAME : 4,
	MAGIC_1 : 5,
	MAGIC_2 : 6,
	MAGIC_3 : 7
};

(function()
{
    this.ProjectileTileModel = function()
    {
    };

    ProjectileTileModel.prototype = new TileModel();
    ProjectileTileModel.prototype.constructor = ProjectileTileModel;

})();

