/**
 * Created by apple on 3/18/14.
 */

(function()
{
    this.MacroCommand = function()
    {
        this._subCommands = [];
    };

    MacroCommand.prototype.addSubCommand = function(commandClassRef)
    {
        this._subCommands.push(commandClassRef);
    };

    MacroCommand.prototype.execute = function()
    {
        while(this._subCommands.length > 0)
        {
            var commandClassRef = this._subCommands.shift();
            var commandInstance = new commandClassRef();
            commandInstance.execute();
        }
    };

})();