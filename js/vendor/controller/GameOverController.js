
/**
 * Created by apple on 4/11/14.
 */

(function()
{
	this.GameOverController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();

		this._viewStateModel = null;

		this._mapDataModel = new GameOverMapDataModel();
		this._viewComponent.setMapDataModel(this._mapDataModel);

		this._keyControlMediator = new KeyControlMediator();
		this._keyControlMediator.setControlModels([new ControlModel(87, 68, 83, 65, 190, 191, 27)]);

		this._graphicTileMapModel = new GraphicTileMapModel();
		this._graphicTileMapModel.setMapProperties(this._mapDataModel.getGraphicData(), this._mapDataModel,  0);

		this._graphicTileMapController = new TileMapController(this._viewComponent);
		this._graphicTileMapController.setTileViewFactory(new GraphicTileViewFactory(new GraphicTileModel()));
		this._graphicTileMapController.setTileMapModel(this._graphicTileMapModel);
		this._graphicTileMapController.setMapDataModel(this._mapDataModel);

		window.addEventListener("touchend", function(e)
		{
			this._touchListener(e);
		}.bind(this), false);
	};

	GameOverController.prototype = new AbstractController(new AbstractView());
	GameOverController.prototype.constructor = GameOverController;

	GameOverController.prototype._touchListener = function(e)
	{
		switch(e.type)
		{
			case "touchend":
				this._viewStateModel.setState(ViewStateMachineModelStates.GAME);
				break;
		}
	};

	GameOverController.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._viewComponent.setCanvas(value);
		this._graphicTileMapController.setCanvas(value);
	};

	GameOverController.prototype.update = function(delta)
	{
		this._viewComponent.render(delta);
		this._graphicTileMapController.update(delta);

		if(this._viewStateModel !== null && typeof(this._viewStateModel) !== "undefined")
		{
			if(this._viewStateModel.getState() === ViewStateMachineModelStates.GAME_OVER)
			{
				if(this._keyControlMediator.getControlModels()[0].getButton3Flag() === true)
				{
					this._viewStateModel.setState(ViewStateMachineModelStates.GAME);
				}
			}
		}
	};

	StartController.prototype.receiveNotification = function(notification)
	{
		switch(notification.getType())
		{
			case ViewStateMachineModelEvent.UPDATED_STATE :
				if(notification.getData() === ViewStateMachineModelStates.GAME_OVER)
				{
					this._stopSound(SoundType.OVERWORLD_MUSIC);
				}
				break;
		}
	};

	GameOverController.prototype.setViewStateModel = function(value)
	{
		this._viewStateModel = value;
	};

	GameOverController.prototype.setSoundModel = function(value)
	{
		this._soundModel = value;
	};

	GameOverController.prototype._playSound = function(value)
	{
		if(this._soundModel !== null && typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.playSound(value);
		}
	};

	GameOverController.prototype._stopSound = function(value)
	{
		if(this._soundModel !== null && typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.stopSound(value);
		}
	};

})();