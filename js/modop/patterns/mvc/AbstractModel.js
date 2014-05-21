
/**
 * Created by apple on 3/18/14.
 */

var AbstractModelEvent = {
	NAME : "AbstractModelEvent",
	UPDATED_ID : "UpdatedId"
};

(function()
{
    this.AbstractModel = function()
    {
	    this._id = 0;
	    this._observers = [];
    };

    AbstractModel.prototype.addObserver = function(value)
    {
	    var check = false;
	    for(var i = 0; i < this._observers.length; i++)
	    {
		    if(this._observers[i] === value)
		    {
			    check = true;
		    }
	    }
	    if(check === false)
	    {
		    this._observers.push(value);
	    }
    };

    AbstractModel.prototype.removeObserver = function(value)
    {
        for(var i = 0; i < this._observers.length; i++)
        {
            if(this._observers[i] === value)
            {
                this._observers.splice(i, 1);
                break;
            }
        }
    };

    AbstractModel.prototype.removeAllObservers = function()
    {
        this._observers = [];
    };

    AbstractModel.prototype.sendNotification = function(type, data, originator)
    {
        var notification = new Notification(type, data, originator);
        for(var i = 0; i < this._observers.length; i++)
        {
            if(this._observers[i] !== originator)
            {
                this._observers[i].receiveNotification(notification);
            }
        }
    };

    AbstractModel.prototype.getObservers = function()
    {
        return this._observers;
    };

	AbstractModel.prototype.getId = function()
	{
		return this._id;
	};

	AbstractModel.prototype.setId = function(value)
	{
		this._id = value;
		this.sendNotification(AbstractModelEvent.UPDATED_ID, value, this);
	};

})();