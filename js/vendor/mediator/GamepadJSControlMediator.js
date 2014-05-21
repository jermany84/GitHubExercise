/**
 * Created by apple on 3/26/14.
 */

(function()
{
    this.GamepadJSControlMediator = function(controlModel)
    {
        this._observers = [];
        this._controlModel = controlModel;

        this._controlModel.bind(Gamepad.Event.CONNECTED, function(device){});
        this._controlModel.bind(Gamepad.Event.DISCONNECTED, function(device){});
        this._controlModel.bind(Gamepad.Event.UNSUPPORTED, function(device){});
        this._controlModel.bind(Gamepad.Event.AXIS_CHANGED, function(e){});
        this._controlModel.bind(Gamepad.Event.TICK, function(gamepads){});

        this._controlModel.bind(Gamepad.Event.BUTTON_DOWN, function(e)
        {
            switch(e.control)
            {
                case "FACE_1" :
                    this._controlModel.setButton1Flag(true);
                    break;
                case "FACE_2" :
                    this._controlModel.setButton2Flag(true);
                    break;
                case "DPAD_UP" :
                    this._controlModel.setUpFlag(true);
                    break;
                case "DPAD_RIGHT" :
                    this._controlModel.setRightFlag(true);
                    break;
                case "DPAD_DOWN" :
                    this._controlModel.setDownFlag(true);
                    break;
                case "DPAD_LEFT" :
                    this._controlModel.setLeftFlag(true);
                    break;
            }
        });

        this._controlModel.bind(Gamepad.Event.BUTTON_UP, function(e)
        {
            switch(e.control)
            {
                case "FACE_1" :
                    this._controlModel.setButton1Flag(false);
                    break;
                case "FACE_2" :
                    this._controlModel.setButton2Flag(false);
                    break;
                case "DPAD_UP" :
                    this._controlModel.setUpFlag(false);
                    break;
                case "DPAD_RIGHT" :
                    this._controlModel.setRightFlag(false);
                    break;
                case "DPAD_DOWN" :
                    this._controlModel.setDownFlag(false);
                    break;
                case "DPAD_LEFT" :
                    this._controlModel.setLeftFlag(false);
                    break;
            }
        });

        this.getControlModel = function()
        {
            return this._controlModel;
        };

        if(this._controlModel.init() === false)
        {
	        trace(this, "Your browser does not support gamepads, get the latest Google Chrome or Firefox");
        }
    };

	GamepadJSControlMediator.prototype = new AbstractMediator();
	GamepadJSControlMediator.prototype.constructor = GamepadJSControlMediator;

})();