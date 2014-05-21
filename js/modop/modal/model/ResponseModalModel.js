/**
 * Created by synthetic_84 on 3/26/14.
 */

(function ()
{
    this._responseCallbacks = [];

    this.ResponseModalModel = function(responseCallbacks)
    {
        this._responseCallbacks = responseCallbacks;
    };

    ResponseModalModel.prototype = new ModalModel();
    ResponseModalModel.prototype.constructor = ResponseModalModel;

    this.callCallbackByIndex = function(value)
    {
        this._responseCallbacks[value].call(null);
    };

    this.getResponseCallbacks = function()
    {
        return this._responseCallbacks;
    };

})();

