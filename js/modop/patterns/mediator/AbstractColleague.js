/**
 * Created by synthetic_84 on 3/26/14.
 */

(function()
{
    this.AbstractColleague = function(mediator)
    {
        this._mediator = mediator;
    };

    AbstractColleague.prototype.sendNotification = function(type, data)
    {
        this._mediator.sendNotification(new Notification(type, data, this), this);
    };

    AbstractColleague.prototype.receiveNotification = function(notification)
    {
    };

    AbstractColleague.prototype.getMediator =  function()
    {
        return this._mediator;
    };

    AbstractColleague.prototype.setMediator =  function(value)
    {
        this._mediator = value;
    };

})();