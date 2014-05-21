/**
 * Created by synthetic_84 on 5/1/14.
 */

/**
 * Created by apple on 3/19/14.
 */

var SoundType = {
	ARROW : "LOZ_Arrow",
	BOMB_BLOW : "LOZ_Bomb_Blow",
	BOMB_DROP : "LOZ_Bomb_Drop",
	BOOMERANG : "LOZ_Boomerang",
	CANDLE : "LOZ_Candle",
	DIE : "LOZ_Die",
	FANFARE : "LOZ_Fanfare",
	GET_HEART : "LOZ_Get_Heart",
	GET_ITEM : "LOZ_Get_Item",
	GET_RUPPEE : "LOZ_Get_Rupee",
	HIT : "LOZ_Hit",
	HURT : "LOZ_Hurt",
	KEY : "LOZ_Key",
	KILL : "LOZ_Kill",
	LOW_HEALTH : "LOZ_LowHealth",
	MAGICAL_ROD : "LOZ_MagicalRod",
	SHIELD : "LOZ_Shield",
	STAIRS : "LOZ_Stairs",
	SWORD_COMBINED : "LOZ_Sword_Combined",
	SWORD_SHOOT : "LOZ_Sword_Shoot",
	SWORD : "LOZ_Sword",
	TEXT : "LOZ_Text",
	UNLOCK : "LOZ_Unlock",
	OVERWORLD_MUSIC : "overworld",
	DUNGEON_MUSIC : "dungeon",
	GANNON_MUSIC : "ganon"
};

(function ()
{
	this.SoundModel = function()
	{
	};

	SoundModel.prototype = new AbstractModel();
	SoundModel.prototype.constructor = SoundModel;

	SoundModel.prototype.playSound = function(id)
	{
		var musicElement = document.getElementById(id);
		if(musicElement !== null && typeof(musicElement) !== "undefined")
		{
			//musicElement.play();
		}
	};

	SoundModel.prototype.stopSound = function(id)
	{
		var musicElement = document.getElementById(id);
		if(musicElement !== null && typeof(musicElement) !== "undefined")
		{
			//musicElement.stop();
		}
	};

})();