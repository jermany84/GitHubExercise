/**
 * Created by synthetic_84 on 3/26/14.
 */

(function()
{
    this.AbstractMediator = function()
    {
        this._observers = [];
    };

    AbstractMediator.prototype.addObservers = function(value)
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

    AbstractMediator.prototype.removeObservers = function(value)
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

    AbstractMediator.prototype.removeAllObservers = function()
    {
        this._observers = [];
    };

    AbstractMediator.prototype.sendNotification = function(type, data, originator)
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

    AbstractMediator.prototype.getObservers = function()
    {
        return this._observers;
    };

})();
