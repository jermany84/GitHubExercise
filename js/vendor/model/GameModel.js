/**
 * Created by apple on 3/19/14.
 */

var GameModelEvent = {
	GAME_READY : "GameModelEventGameReady",
	UPDATED_PAUSE_BREAK_CHECK : "GameModelEventUpdatedPauseBreakCheck",
	UPDATED_IS_PAUSED : "GameModelEventUpdatedIsPaused",
	UPDATED_MUSIC : "GameModelEventUpdatedMusic"
};

(function()
{
    this.GameModel = function ()
    {
	    this.setId(getUniqueId());
	    this._gameReady = false;
	    this._isPaused = false;
	    this._pauseBreakCheck = 0;
	    this._pauseBreakLengthDefault = 25;
	    this._music = "";
    };

	GameModel.prototype = new AbstractModel();
	GameModel.prototype.constructor = GameModel;

	GameModel.prototype.getGameReady = function()
	{
		return this._gameReady;
	};

	GameModel.prototype.setGameReady = function(value)
	{
		this._gameReady = value;
		this.sendNotification(GameModelEvent.GAME_READY, value, this);
	};

	GameModel.prototype.getMusic = function()
	{
		return this._music;
	};

	GameModel.prototype.setMusic = function(value)
	{
		this._music = value;
		this.sendNotification(GameModelEvent.UPDATED_MUSIC, value, this);
	};

	GameModel.prototype.getIsPaused = function()
	{
		return this._isPaused;
	};

	GameModel.prototype.setIsPaused = function(value)
	{
		this._isPaused = value;
		this.sendNotification(GameModelEvent.UPDATED_IS_PAUSED, value, this);
	};

	GameModel.prototype.getPauseBreakCheck = function()
	{
		return this._pauseBreakCheck;
	};

	GameModel.prototype.setPauseBreakCheck = function(value)
	{
		this._pauseBreakCheck = value;
		this.sendNotification(GameModelEvent.UPDATED_PAUSE_BREAK_CHECK, value, this);
	};

	GameModel.prototype.getPauseBreakLengthDefault = function()
	{
		return this._pauseBreakLengthDefault;
	};

	GameModel.prototype.resetPauseBreak = function()
	{
		this.setPauseBreakCheck(0);
	};

})();

