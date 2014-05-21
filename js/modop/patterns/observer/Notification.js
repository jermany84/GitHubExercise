/**
 * Created by synthetic_84 on 3/26/14.
 */

(function(type, data)
{
    this.Notification = function(type, data, target)
    {
        this._type = type;
        this._data = data;
	    this._target = target;
    };

    Notification.prototype.getType = function()
    {
        return this._type;
    };

    Notification.prototype.getData = function()
    {
        return this._data;
    };

	Notification.prototype.getTarget = function()
	{
		return this._target;
	};

})();
