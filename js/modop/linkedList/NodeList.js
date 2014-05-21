/**
 * Created by apple on 4/29/14.
 */

(function()
{
	this.NodeList = function(linkListDataItems)
	{
		this._startNode = null;
		this._endNode = null;

		if(linkListDataItems !== null &&
			typeof(linkListDataItems) !== "undefined")
		{
			for(var i = 0; i < linkListDataItems.length; i++)
			{
				this.add(linkListDataItems);
			}
		}
	};

	NodeList.prototype = new AbstractModel();
	NodeList.prototype.constructor = NodeList;

	NodeList.prototype.createNode = function()
	{
		return new NodeModel();
	};

	NodeList.prototype.add = function(data)
	{
		if(this._startNode === null)
		{
			this._startNode = this.createNode();
			this._endNode = this._startNode;
		}
		else
		{
			this._endNode.setNextNode(this.createNode());
			this._endNode = this._endNode.getNextNode();
		}
		this._endNode.setData(data);
	};

	NodeList.prototype.insertAsFirst = function(data)
	{
		var node = this.createNode();
		node.setNextNode(this._startNode);
		this._startNode = node;
		node.setData(data);
	};

	NodeList.prototype.insertAfter = function(n, data)
	{
		var current = this._startNode;

		while(current !== null)
		{
			if(current.getData() === n)
			{
				var node = this.createNode();
				node.setData(data);
				node.setNextNode(current.getNextNode());
				if(current === this._endNode)
				{
					this._endNode = node;
				}
				current.setNextNode(node);
				return;
			}
			current = current.getNextNode();
		}
	};

	NodeList.prototype.getNodeAtIndex = function(index)
	{
		var current = this._startNode;
		while(current !== null)
		{
			if(index === 0)
			{
				return current;
			}
			index--;
			current = current.getNextNode();
		}
		return null;
	};

	NodeList.prototype.each = function(method)
	{
		var current = this._startNode;

		while(current !== null)
		{
			method(current);
			current = current.getNextNode();
		}
	};

	NodeList.prototype.delete = function(data)
	{
		var current = this._startNode;
		var previous = this._startNode;

		while(current !== null)
		{
			if(data === current.getData())
			{
				if(current === this._startNode)
				{
					this._startNode = current.getNextNode();
					return;
				}
				if(current === this._endNode)
				{
					this._endNode = previous;
				}
				previous.setNextNode(current.getNextNode());
				return;
			}
			previous = current;
			current = current.getNextNode();
		}
	};

	NodeList.prototype.getStartNode = function()
	{
		return this._startNode;
	};

	NodeList.prototype.setStartNode = function(value)
	{
		this._endNode = value;
	};

	NodeList.prototype.getEndNode = function()
	{
		return this._endNode;
	};

	NodeList.prototype.setEndNode = function(value)
	{
		this._endNode = value;
	};

})();

