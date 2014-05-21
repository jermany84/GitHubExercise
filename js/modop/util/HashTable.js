(function() 
{
	this.HashTable = function()
	{
		this._length = 0;
		this._items = new Array();

		for(var i = 0; i < arguments.length; i += 2) 
		{
			if(typeof(arguments[i + 1]) !== "undefined") 
			{
				this._items[arguments[i]] = arguments[i + 1];
				this._length++;
			}
		}
	};
	
	HashTable.prototype.getLength = function() 
	{
		return this._length;
	};
	
	HashTable.prototype.getItems = function()
	{
		return this._items;
	};

	HashTable.prototype.removeItem = function(key) 
	{
		var tmp_previous;
		if(typeof (this._items[key]) !== "undefined") 
		{
			this._length--;
			var tmp_previous = this._items[key];
			delete this._items[key];
		}
		return tmp_previous;
	};

	HashTable.prototype.getItem = function(key) 
	{
		return this._items[key];
	};

	HashTable.prototype.addItem = function(key, item)
	{
		var tmp_previous;
		if(typeof(item) !== "undefined")
		{
			if(typeof(this._items[key]) === "undefined") 
			{
				this._length++;
			} else {
				tmp_previous = this._items[key];
			}
			this._items[key] = item;
		}
		return tmp_previous;
	};

	HashTable.prototype.hasItem = function(key) 
	{
		return typeof(this._items[key]) !== "undefined";
	};

	HashTable.prototype.clear = function()
	{
		for(var item in this._items)
		{
			delete this._items[item];
		}
		this._length = 0;
	};

	HashTable.prototype.each = function(func)
	{
		for(var item in this._items)
		{
			func(this._items[item]);
		}
	};
	
})();
