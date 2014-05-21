/**
 * Created by apple on 3/19/14.
 */

var ControlModelEvent = {
	UPDATED_UP_KEY : "ControlModelEventUpdatedUpKey",
	UPDATED_DOWN_KEY : "ControlModelEventUpdatedDownKey",
	UPDATED_LEFT_KEY : "ControlModelEventUpdatedLeftKey",
	UPDATED_RIGHT_KEY : "ControlModelEventUpdatedRightKey",
	UPDATED_BUTTON1_KEY : "ControlModelEventUpdatedButton1Key",
	UPDATED_BUTTON2_KEY : "ControlModelEventUpdatedButton2Key",
	UPDATED_BUTTON3_KEY : "ControlModelEventUpdatedButton3Key",
	UPDATED_UP_FLAG : "ControlModelEventUpdatedUpFlag",
	UPDATED_DOWN_FLAG : "ControlModelEventUpdatedDownFlag",
	UPDATED_LEFT_FLAG : "ControlModelEventUpdatedLeftFlag",
	UPDATED_RIGHT_FLAG : "ControlModelEventUpdatedRightFlag",
	UPDATED_BUTTON1_FLAG : "ControlModelEventUpdatedButton1Flag",
	UPDATED_BUTTON2_FLAG : "ControlModelEventUpdatedButton2Flag",
	UPDATED_BUTTON3_FLAG : "ControlModelEventUpdatedButton3Flag"
};

(function ()
{
    this.ControlModel = function (upKey, rightKey, downKey, leftKey, button1Key, button2Key, button3Key)
    {
	    this.setId(getUniqueId());
	    this._upKey = upKey;
	    this._rightKey = rightKey;
	    this._downKey = downKey;
	    this._leftKey = leftKey;
	    this._button1Key = button1Key;
	    this._button2Key = button2Key;
	    this._button3Key = button3Key;
        this._upFlag = false;
        this._rightFlag = false;
        this._downFlag = false;
        this._leftFlag = false;
        this._button1Flag = false;
        this._button2Flag = false;
	    this._button3Flag = false;
    };

    ControlModel.prototype = new AbstractModel();
    ControlModel.prototype.constructor = ControlModel;

	ControlModel.prototype.getUpKey = function()
	{
		return this._upKey;
	};

	ControlModel.prototype.setUpKey = function(value)
	{
		this._upKey = value;
		this.sendNotification(ControlModelEvent.UPDATED_UP_KEY, value, this);
	};

	ControlModel.prototype.getRightKey = function()
	{
		return this._rightKey;
	};

	ControlModel.prototype.setRightKey = function(value)
	{
		this._rightKey = value;
		this.sendNotification(ControlModelEvent.UPDATED_RIGHT_KEY, value, this);
	};

	ControlModel.prototype.getDownKey = function()
	{
		return this._downKey;
	};

	ControlModel.prototype.setDownKey = function(value)
	{
		this._downKey = value;
		this.sendNotification(ControlModelEvent.UPDATED_DOWN_KEY, value, this);
	};

	ControlModel.prototype.getLeftKey = function()
	{
		return this._leftKey;
	};

	ControlModel.prototype.setLeftKey = function(value)
	{
		this._leftKey = value;
		this.sendNotification(ControlModelEvent.UPDATED_LEFT_KEY, value, this);
	};

	ControlModel.prototype.getButton1Key = function()
	{
		return this._button1Key;
	};

	ControlModel.prototype.setButton1Key = function(value)
	{
		this._button1Key = value;
		this.sendNotification(ControlModelEvent.UPDATED_BUTTON1_KEY, value, this);
	};

	ControlModel.prototype.getButton2Key = function()
	{
		return this._button2Key;
	};

	ControlModel.prototype.setButton2Key = function(value)
	{
		this._button2Key = value;
		this.sendNotification(ControlModelEvent.UPDATED_BUTTON2_KEY, value, this);
	};

	ControlModel.prototype.getButton3Key = function()
	{
		return this._button3Key;
	};

	ControlModel.prototype.setButton3Key = function(value)
	{
		this._button3Key = value;
		this.sendNotification(ControlModelEvent.UPDATED_BUTTON3_KEY, value, this);
	};

    ControlModel.prototype.getUpFlag = function()
    {
        return this._upFlag;
    };

    ControlModel.prototype.setUpFlag = function(value)
    {
        this._upFlag = value;
	    this.sendNotification(ControlModelEvent.UPDATED_UP_FLAG, value, this);
    };

    ControlModel.prototype.getRightFlag = function()
    {
        return this._rightFlag;
    };

    ControlModel.prototype.setRightFlag = function(value)
    {
        this._rightFlag = value;
	    this.sendNotification(ControlModelEvent.UPDATED_RIGHT_FLAG, value, this);
    };

    ControlModel.prototype.getDownFlag = function()
    {
        return this._downFlag;
    };

    ControlModel.prototype.setDownFlag = function(value)
    {
        this._downFlag = value;
	    this.sendNotification(ControlModelEvent.UPDATED_DOWN_FLAG, value, this);
    };

    ControlModel.prototype.getLeftFlag = function()
    {
        return this._leftFlag;
    };

    ControlModel.prototype.setLeftFlag = function(value)
    {
        this._leftFlag = value;
	     this.sendNotification(ControlModelEvent.UPDATED_LEFT_FLAG, value, this);
    };

    ControlModel.prototype.getButton1Flag = function()
    {
        return this._button1Flag;
    };

    ControlModel.prototype.setButton1Flag = function(value)
    {
        this._button1Flag = value;
	    this.sendNotification(ControlModelEvent.UPDATED_BUTTON1_FLAG, value, this);
    };

    ControlModel.prototype.getButton2Flag = function()
    {
        return this._button2Flag;
    };

    ControlModel.prototype.setButton2Flag = function(value)
    {
        this._button2Flag = value;
	    this.sendNotification(ControlModelEvent.UPDATED_BUTTON2_FLAG, value, this);
    };

	ControlModel.prototype.getButton3Flag = function()
	{
		return this._button3Flag;
	};

	ControlModel.prototype.setButton3Flag = function(value)
	{
		this._button3Flag = value;
		this.sendNotification(ControlModelEvent.UPDATED_BUTTON3_FLAG, value, this);
	};

})();