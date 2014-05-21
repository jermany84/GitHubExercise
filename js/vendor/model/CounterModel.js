/**
 * Created by apple on 4/9/14.
 */

var CounterModelEvent = {
	UPDATED_COUNTER : "CounterModelEventUpdatedCounter",
	UPDATED_COUNTER_MAX : "CounterModelEventUpdatedMax"
};

(function()
{
	this.CounterModel = function(count, max)
	{
		this.setId(getUniqueId());
		this._counter = count;
		this._max = max;
	};

	CounterModel.prototype = new PhysicalModel();
	CounterModel.prototype.constructor = CounterModel;

	CounterModel.prototype.getCounter = function()
	{
		return this._counter;
	};

	CounterModel.prototype.setCounter = function(value)
	{
		if(value < 0)
		{
			this._counter = 0;
		}
		else
		if(value > this._max)
		{
			this._counter = this._max;
		}
		else
		{
			this._counter = value;
		}
		this.sendNotification(CounterModelEvent.UPDATED_COUNTER, this._counter, this);
	};

	CounterModel.prototype.getMax = function()
	{
		return this._max;
	};

	CounterModel.prototype.setMax = function(value)
	{
		this._max = value;
		this.sendNotification(CounterModelEvent.UPDATED_COUNTER_MAX, value, this);
	};

})();

