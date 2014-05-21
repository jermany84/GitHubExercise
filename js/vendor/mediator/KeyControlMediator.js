/**
 * Created by apple on 3/26/14.
 */

(function()
{
    this.KeyControlMediator = function()
    {
        this._observers = [];
        this._controlModels = [];
	    this._isKeyDown = false;

        this._keyListener = function(e)
        {
            this._handleViewEvents(e);
        };

        window.addEventListener("keydown", function(e)
        {
            this._keyListener(e);
        }.bind(this), false);

        window.addEventListener("keyup", function(e)
        {
            this._keyListener(e);
        }.bind(this), false);
    };

    KeyControlMediator.prototype = new AbstractMediator();
    KeyControlMediator.prototype.constructor = KeyControlMediator;

    KeyControlMediator.prototype.getControlModels = function()
    {
        return this._controlModels;
    };

	KeyControlMediator.prototype.setControlModels = function(value)
	{
		this._controlModels = value;
	};

	KeyControlMediator.prototype._handleViewEvents = function(e)
    {
	    //trace(this, "e.keyCode " + e.keyCode);
	    for(var i = 0; i < this._controlModels.length; i++)
	    {
		    switch(e.type)
		    {
			    case "keydown":
				    switch(e.keyCode)
				    {
					    case this._controlModels[i].getButton1Key() :
						    this._controlModels[i].setButton1Flag(true);
						    break;
					    case this._controlModels[i].getButton2Key() :
						    this._controlModels[i].setButton2Flag(true);
						    break;
					    case this._controlModels[i].getLeftKey() :
						    this._controlModels[i].setLeftFlag(true);
						    break;
					    case this._controlModels[i].getUpKey() :
						    this._controlModels[i].setUpFlag(true);
						    break;
					    case this._controlModels[i].getRightKey() :
						    this._controlModels[i].setRightFlag(true);
						    break;
					    case this._controlModels[i].getDownKey() :
						    this._controlModels[i].setDownFlag(true);
						    break;
					    case this._controlModels[i].getButton3Key() :
						    this._controlModels[i].setButton3Flag(true);
						    break;
				    }
				    this._isKeyDown = true;
				    break;
			    case "keyup":
				    switch(e.keyCode)
				    {
					    case this._controlModels[i].getButton1Key() :
						    this._controlModels[i].setButton1Flag(false);
						    break;
					    case this._controlModels[i].getButton2Key() :
						    this._controlModels[i].setButton2Flag(false);
						    break;
					    case this._controlModels[i].getLeftKey() :
						    this._controlModels[i].setLeftFlag(false);
						    break;
					    case this._controlModels[i].getUpKey() :
						    this._controlModels[i].setUpFlag(false);
						    break;
					    case this._controlModels[i].getRightKey() :
						    this._controlModels[i].setRightFlag(false);
						    break;
					    case this._controlModels[i].getDownKey() :
						    this._controlModels[i].setDownFlag(false);
						    break;
					    case this._controlModels[i].getButton3Key() :
						    this._controlModels[i].setButton3Flag(false);
						    break;
				    }
				    this._isKeyDown = false;
				    break;
		    }
	    }
    };

	KeyControlMediator.prototype.getIsKeyDown = function()
	{
		return this._isKeyDown;
	};

})();