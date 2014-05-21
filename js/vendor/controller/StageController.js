/**
 * Created by apple on 3/18/14.
 */

(function()
{
    this.StageController = function(viewComponent)
    {
	    this._viewComponent = viewComponent;
	    this._viewComponent.init();

	    this._viewStateModel = new ViewStateMachineModel();
	    this._gameModel = new GameModel();
	    this._soundModel = new SoundModel();

	    this._startController = new StartController(new StartView());
	    this._startController.setViewStateModel(this._viewStateModel);
	    this._startController.setSoundModel(this._soundModel);

	    this._gameController = new GameController(new GameView());
	    this._gameController.setSoundModel(this._soundModel);
	    this._gameController.setViewStateModel(this._viewStateModel);
	    this._gameController.setGameModel(this._gameModel);

	    this._gameOverController = new GameOverController(new GameOverView());
	    this._gameOverController.setSoundModel(this._soundModel);
	    this._gameOverController.setViewStateModel(this._viewStateModel);

	    this._viewStateModel.addObserver(this._gameController);
	    this._viewStateModel.setState(ViewStateMachineModelStates.START);

	    document.body.addEventListener('touchmove', function(e)
	    {
		    e.preventDefault();
	    }, false);
    };

    StageController.prototype = new AbstractController(new AbstractView());
    StageController.prototype.constructor = StageController;

    StageController.prototype.setCanvas = function(value)
    {
        this._canvas = value;
        this._context = this._canvas.getContext("2d");
        this._viewComponent.setCanvas(value);
	    this._startController.setCanvas(value);
        this._gameController.setCanvas(value);
	    this._gameOverController.setCanvas(value);
    };

    StageController.prototype.update = function(delta)
    {
	    if(this._canvas !== null && this._context !== null)
	    {
		    if(this._viewStateModel !== null && typeof(this._viewStateModel) !== "undefined")
		    {
			    if(this._viewStateModel !== ViewStateMachineModelStates.NONE)
			    {
				    this._viewComponent.render(delta);

				    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
				    switch(this._viewStateModel.getState())
				    {
					    case ViewStateMachineModelStates.START :
						    this._startController.update(delta);
						    break;
					    case ViewStateMachineModelStates.GAME :
						    this._gameController.update(delta);
						    break;
					    case ViewStateMachineModelStates.GAME_OVER :
						    this._gameOverController.update(delta);
						    break;
				    }
			    }
		    }
	    }
    };

})();