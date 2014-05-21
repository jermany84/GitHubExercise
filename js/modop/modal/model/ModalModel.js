/**
 * Created by synthetic_84 on 3/26/14.
 */

var ModalModelEvent = {
	NAME : "ModalModelEvent",
	UPDATED_ACTIVE_STATUS : "UpdatedActiveStatus",
	UPDATED_ENABILITY : "UpdatedEnability"
};

(function ()
{
    this.ModalModel = function()
    {
	    this.setId(getUniqueId());
        this._active = false;
        this._enabled = true;
    };

    ModalModel.prototype = new AbstractModel();
    ModalModel.prototype.constructor = ModalModel;

    ModalModel.prototype.getActive = function()
    {
        return this._active;
    };

    ModalModel.prototype.setActive = function(value)
    {
        if(this._active === value)
        {
            return;
        }
        this._active = value;
    };

    ModalModel.prototype.getEnabled = function()
    {
        return this._enabled;
    };

    ModalModel.prototype.setEnabled = function(value)
    {
        if(this._enabled === value)
        {
            return;
        }
        this._enabled = value;
    };

})();