/**
 * Created by apple on 4/28/14.
 */

(function()
{
	this.NodeModel = function()
	{
		this.setId(getUniqueId());
		this._data = null;
		this._nextNode = null;
	};

	NodeModel.prototype = new AbstractModel();
	NodeModel.prototype.constructor = NodeModel;

	NodeModel.prototype.getData = function()
	{
		return this._data;
	};

	NodeModel.prototype.setData = function(value)
	{
		this._data = value;
	};

	NodeModel.prototype.getNextNode = function()
	{
		return this._nextNode;
	};

	NodeModel.prototype.setNextNode = function(value)
	{
		this._nextNode = value;
	};

})();

