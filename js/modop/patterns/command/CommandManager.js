/**
 * Created by apple on 3/18/14.
 */

(function(maxUndos)
{
    this.CommandManager = function()
    {
        this._undos = [];
        this._redos = [];
        this._maxUndos = maxUndos;
    };

    CommandManager.prototype.execute = function(command)
    {
        command.execute();
    };

    CommandManager.prototype.store = function(command)
    {
        if(this._undos.length === this._maxUndos)
        {
            this._undos.shift();
        }
        this._undos.push(command);
        this._redos = [];
    };

    CommandManager.prototype.isUndoAvailable = function()
    {
        return this._undos.length === 0 ? false : true;
    };

    CommandManager.prototype.undo = function()
    {
        if(this._undos.length === 0)
        {
            return;
        }
        var command = this._undos.pop();
        command.undo();
        this._redos.push(command);
    };

    CommandManager.prototype.isRedoAvailable = function ()
    {
        return _redos.length === 0 ? false : true;
    };

    CommandManager.prototype.redo = function()
    {
        if(this._redos.length === 0)
        {
            return;
        }
        var command = this._redos.pop();
        command.execute();
        this._undos.push(command);
    };

    CommandManager.prototype.clearUndosAndRedos = function()
    {
        this._undos = [];
        this._redos = [];
    };

})();