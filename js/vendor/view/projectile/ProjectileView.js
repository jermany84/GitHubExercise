/**
 * Created by apple on 4/1/14.
 */

(function()
{
    this.ProjectileView = function(factory)
    {
        this._factory = factory;
        this._sprite = null;
        this._tileModel = null;
    };

    ProjectileView.prototype = new AbstractView();
    ProjectileView.prototype.constructor = ProjectileView;

    ProjectileView.prototype.render = function(delta)
    {
	    if(this._tileModel === null || typeof(this._tileModel) === "undefined")
	    {
		    return;
	    }
        if(this._tileModel.getLastFrame() !== this._tileModel.getFrame())
        {
            this._sprite = this._factory.create(this._tileModel.getType(), this._tileModel.getFrame());
            this._tileModel.setLastFrame(this._tileModel.getFrame());
        }
        if((this._sprite !== null && typeof(this._sprite) !== "undefined") &&
	        (this._context !== null && typeof(this._context) !== "undefined"))
        {
            this._context.save();
            this._context.translate(this._tileModel.getX(), this._tileModel.getY());
            this._sprite.update(delta);
            this._sprite.render(this._context);
            this._context.restore();
        }
    };

    ProjectileView.prototype.setTileModel = function(value)
    {
	    this._tileModel = value;
    };

})();

