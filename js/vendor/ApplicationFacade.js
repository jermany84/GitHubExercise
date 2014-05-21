/**
 * Created by apple on 3/18/14.
 */

(function()
{
	this.ApplicationFacade = function(canvas)
	{
		this._lastTime = 0;
		this._now = 0;

		this._stageModel = new StageModel();
		this._stageModel.setCanvas(canvas);

		this._stageView = new StageView();
		this._stageView.setCanvas(canvas);

		this._stageController = new StageController(this._stageView);
		this._stageController.setCanvas(canvas);

		window.addEventListener('resize', this._resizeCanvas, false);

		document.addEventListener("contextmenu", function(e)
		{
			e.preventDefault();
		}, false);

		this.requestAnimFrame(ApplicationFacade.prototype.update.bind(this));
	};

	ApplicationFacade.prototype.update = function(newDelta)
	{
		this._now = Date.now();
		this._delta = ((this._now - this._lastTime) * 0.001);
		this._lastTime = this._now;

		if(this._stageController !== null)
		{
			this._stageController.update(this._delta);
		}

		this.requestAnimFrame(ApplicationFacade.prototype.update.bind(this));
	};

	ApplicationFacade.prototype._resizeCanvas = function()
	{
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;
	}

})();


/**
 * Standard method to handle animation loop
 * @returns {Function}
 */

window.requestAnimFrame = (function()
{
	return  window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback )
		{
			window.setTimeout(callback, 1000 / 60);
		};
})();
