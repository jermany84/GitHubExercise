/**
 * Created by apple on 4/14/14.
 */

var DropsModelEvent = {
	ADDED_ENTITY : "DropsModelEventAddedEntity",
	UPDATED_ENTITIES : "DropsModelEventUpdatedEntities",
	UPDATED_COLLECTORS_ENTITIES : "DropsModelEventUpdatedCollectorsEntities"
};

(function()
{
	this.DropsModel = function()
	{
		this.setId(getUniqueId());
		this._entities = [];
		this._collectorEntities = [];
	};

	DropsModel.prototype = new AbstractModel();
	DropsModel.prototype.constructor = DropsModel;

	DropsModel.prototype.addEntity = function(value)
	{
		this._entities.push(value);
		this.sendNotification(DropsModelEvent.ADDED_ENTITY, value, this);
	};

	DropsModel.prototype.getEntities = function()
	{
		return this._entities;
	};

	DropsModel.prototype.setEntities = function(value)
	{
		this._entities = value;
		this.sendNotification(DropsModelEvent.UPDATED_ENTITIES, value, this);
	};

	DropsModel.prototype.getCollectorEntities = function()
	{
		return this._collectorEntities;
	};

	DropsModel.prototype.setCollectorEntities = function(value)
	{
		this._collectorEntities = value;
		this.sendNotification(DropsModelEvent.UPDATED_COLLECTORS_ENTITIES, value, this);
	};

})();

