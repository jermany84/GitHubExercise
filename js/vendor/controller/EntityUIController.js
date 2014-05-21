/**
 * Created by apple on 4/10/14.
 */

(function()
{
	this.EntityUIController = function(viewComponent)
	{
		this._viewComponent = viewComponent;
		this._viewComponent.init();

		this._isPaused = false;
		this._entityUIModel = null;
		this._mapDataModel = null;

		this._keyControlMediator = new KeyControlMediator();
		this._keyControlMediator.setControlModels([new ControlModel(87, 68, 83, 65, 190, 191, 27)]);

		this._duplicateButton1ActionModel = null;

		this._pickupTileViewFactory = new PickupTileViewFactory();

		this._button1ActionView = new ButtonActionPickupTileView(this._pickupTileViewFactory);
		this._button1ActionViewDuplicate = new ButtonActionPickupTileView(this._pickupTileViewFactory);
		this._button2ActionView = new ButtonActionPickupTileView(this._pickupTileViewFactory);
		this._goldCounterView = new CounterView();
		this._keyCounterView = new CounterView();
		this._bombCounterView = new CounterView();
		this._healthUIView = new EntityHealthUIView();
	};

	EntityUIController.prototype = new AbstractController(new AbstractView());
	EntityUIController.prototype.constructor = EntityUIController;

	EntityUIController.prototype.setCanvas = function(value)
	{
		this._canvas = value;
		this._context = this._canvas.getContext("2d");
		this._viewComponent.setCanvas(value);
		this._healthUIView.setCanvas(value);
		this._button1ActionView.setCanvas(value);
		this._button1ActionViewDuplicate.setCanvas(value);
		this._button2ActionView.setCanvas(value);
		this._goldCounterView.setCanvas(value);
		this._keyCounterView.setCanvas(value);
		this._bombCounterView.setCanvas(value);
	};

	EntityUIController.prototype.update = function(delta)
	{
		if(this._entityUIModel === null || typeof(this._entityUIModel) === "undefined")
		{
			return;
		}

		var entity = this._entityUIModel.getEntityModel();

		if(entity === null)
		{
			return;
		}

		var i = 0;
		var button1ActionList = entity.getButton1ActionList();
		var button1ActionListIndex = entity.getButton1ActionListIndex();
		var autoActionList = entity.getAutoActionList();

		this._button1ActionView.setTileModel(entity.getButton1ActionModel());

		this._duplicateButton1ActionModel = new PickupTileModel();
		this._duplicateButton1ActionModel.setType(entity.getButton1ActionModel().getType());
		this._button1ActionViewDuplicate.setTileModel(this._duplicateButton1ActionModel);

		this._button2ActionView.setTileModel(entity.getButton2ActionModel());
		this._goldCounterView.setCounterModel(entity.getGoldCounterModel());
		this._keyCounterView.setCounterModel(entity.getKeyCounterModel());
		this._bombCounterView.setCounterModel(entity.getBombCounterModel());

		if(this._keyControlMediator !== null && typeof(this._keyControlMediator) !== "undefined")
		{
			if(this._isPaused === true)
			{
				var loopLength = 0;
				var nextIndex = 0;

				if(button1ActionList.length > 1)
				{
					if(this._keyControlMediator.getIsKeyDown() === false)
					{
						this._entityUIModel.getCursorModel().setMovable(true);
					}
					if(this._keyControlMediator.getControlModels()[0].getUpFlag() === true &&
						this._entityUIModel.getCursorModel().getMovable() === true)
					{
						nextIndex = (button1ActionListIndex - (button1ActionList.length / 2));
						if(nextIndex >= 0 && button1ActionList[nextIndex] > 0)
						{
							entity.setButton1ActionListIndex(nextIndex);
							this._playSound(SoundType.GET_RUPPEE);
						}
					}
					if(this._keyControlMediator.getControlModels()[0].getRightFlag() === true &&
						this._entityUIModel.getCursorModel().getMovable() === true)
					{
						nextIndex = (entity.getButton1ActionListIndex() + 1);
						for(i = nextIndex; i < button1ActionList.length; i++)
						{
							if(button1ActionList[i] > 0)
							{
								entity.setButton1ActionListIndex(i);
								this._playSound(SoundType.GET_RUPPEE);
								break;
							}
						}
					}
					if(this._keyControlMediator.getControlModels()[0].getDownFlag() === true &&
						this._entityUIModel.getCursorModel().getMovable() === true)
					{
						nextIndex = (button1ActionListIndex + (button1ActionList.length / 2));
						if(nextIndex <= button1ActionList.length - 1 && button1ActionList[nextIndex] > 0)
						{
							entity.setButton1ActionListIndex(nextIndex);
							this._playSound(SoundType.GET_RUPPEE);
						}
					}
					if(this._keyControlMediator.getControlModels()[0].getLeftFlag() === true &&
						this._entityUIModel.getCursorModel().getMovable() === true)
					{
						nextIndex = (entity.getButton1ActionListIndex() - 1);
						loopLength = (button1ActionList.length - (entity.getButton1ActionListIndex() + 1));
						for(i = nextIndex; i >= 0; i--)
						{
							if(button1ActionList[i] > 0)
							{
								entity.setButton1ActionListIndex(i);
								this._playSound(SoundType.GET_RUPPEE);
								break;
							}
						}
					}
					if(this._keyControlMediator.getIsKeyDown() === true)
					{
						this._entityUIModel.getCursorModel().setMovable(false);
					}
				}
			}
			entity.getGoldCounterModel().setX(200 + this._entityUIModel.getX());
			entity.getGoldCounterModel().setY(400 + this._entityUIModel.getY());

			entity.getKeyCounterModel().setX(200 + this._entityUIModel.getX());
			entity.getKeyCounterModel().setY(432 + this._entityUIModel.getY());

			entity.getBombCounterModel().setX(200 + this._entityUIModel.getX());
			entity.getBombCounterModel().setY(448 + this._entityUIModel.getY());
		}

		entity.getButton1ActionModel().setX(248 + this._entityUIModel.getX());
		entity.getButton1ActionModel().setY(402 + this._entityUIModel.getY());

		this._duplicateButton1ActionModel.setX(128 + this._entityUIModel.getX());
		this._duplicateButton1ActionModel.setY(90 + this._entityUIModel.getY());

		entity.getButton2ActionModel().setX(296 + this._entityUIModel.getX());
		entity.getButton2ActionModel().setY(402 + this._entityUIModel.getY());

		this._entityUIModel.getHealthUIModel().setX(336 + this._entityUIModel.getX());
		this._entityUIModel.getHealthUIModel().setY(375 + this._entityUIModel.getY());

		this._healthUIView.setCount(entity.getHealth());
		this._healthUIView.setMax(entity.getHealthCap());

		this._entityUIModel.translate(this._entityUIModel.getXVelocity(), this._entityUIModel.getYVelocity());

		if(this._isPaused === true)
		{
			if(this._entityUIModel.getY() < 0)
			{
				this._entityUIModel.translateVelocity(0, (this._entityUIModel.getYAcceleration() * delta));
			}
			if(this._entityUIModel.getY() > -16)
			{
				this._entityUIModel.setY(-16);
			}
		}
		else
		{
			if(this._entityUIModel.getY() > -this._mapDataModel.getCanvasHeight())
			{
				this._entityUIModel.translateVelocity(0, -(this._entityUIModel.getYAcceleration() * delta));
			}
			if(this._entityUIModel.getY() < -this._mapDataModel.getCanvasHeight() + 96)
			{
				this._entityUIModel.setY(-this._mapDataModel.getCanvasHeight() + 96);
			}
		}

		this._entityUIModel.setXVelocity(this._entityUIModel.getXVelocity() * this._entityUIModel.getXFriction());
		this._entityUIModel.setYVelocity(this._entityUIModel.getYVelocity() * this._entityUIModel.getYFriction());

		if(this._context !== null && typeof(this._context) !== "undefined")
		{
			this._viewComponent.render(delta);
			this._healthUIView.render(delta);
			this._button1ActionView.render(delta);
			this._button1ActionViewDuplicate.render(delta);
			this._button2ActionView.render(delta);
			this._goldCounterView.render(delta);
			this._keyCounterView.render(delta);
			this._bombCounterView.render(delta);

			var xcounter = 0;
			var ycounter = 0;
			var drawIndex = 0;

			for(i = 0; i < button1ActionList.length; i++)
			{
				drawIndex = i;
				if(i % 4 === 0)
				{
					xcounter = 0;
					if(i !== 0)
					{
						ycounter++;
					}
				}
				if(entity.getButton1ActionListIndex() === i)
				{
					switch(i)
					{
						case 0 :
							this._entityUIModel.getCursorModel().setX(256);
							this._entityUIModel.getCursorModel().setY(114 + this._entityUIModel.getY());
							break;
						case 1 :
							this._entityUIModel.getCursorModel().setX(305);
							this._entityUIModel.getCursorModel().setY(114 + this._entityUIModel.getY());
							break;
						case 2 :
							this._entityUIModel.getCursorModel().setX(355);
							this._entityUIModel.getCursorModel().setY(114 + this._entityUIModel.getY());
							break;
						case 3 :
							this._entityUIModel.getCursorModel().setX(400);
							this._entityUIModel.getCursorModel().setY(114 + this._entityUIModel.getY());
							break;
						case 4 :
							this._entityUIModel.getCursorModel().setX(256);
							this._entityUIModel.getCursorModel().setY(147 + this._entityUIModel.getY());
							break;
						case 5 :
							this._entityUIModel.getCursorModel().setX(305);
							this._entityUIModel.getCursorModel().setY(147 + this._entityUIModel.getY());
							break;
						case 6 :
							this._entityUIModel.getCursorModel().setX(355);
							this._entityUIModel.getCursorModel().setY(147 + this._entityUIModel.getY());
							break;
						case 7 :
							this._entityUIModel.getCursorModel().setX(400);
							this._entityUIModel.getCursorModel().setY(147 + this._entityUIModel.getY());
							break;
					}
				}
				if(button1ActionList[i] !== 0)
				{
					this._context.save();
					this._context.setTransform(1, 0, 0, 1, 0, 0);

					switch(button1ActionList[i])
					{
						case PickupTileModelType.BOOMERANG :
						case PickupTileModelType.SILVER_BOOMERANG :
							this._context.translate(256, 96 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.BOMB :
							this._context.translate(305, 96 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.BOW :
						case PickupTileModelType.BOW_ARROW :
							this._context.translate(355, 96 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.CANDLE :
							this._context.translate(400, 96 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.WHISTLE :
							this._context.translate(256, 130 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.MEAT :
							this._context.translate(305, 130 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.NOTE :
						case PickupTileModelType.RED_POTION :
						case PickupTileModelType.BLUE_POTION :
							this._context.translate(355, 130 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.WAND :
							this._context.translate(400, 130 + this._entityUIModel.getY());
							break;
					}

					var button1ActionSprite = this._pickupTileViewFactory.create(button1ActionList[drawIndex], 0);
					button1ActionSprite.update(delta);
					button1ActionSprite.render(this._context);
					this._context.restore();
				}
				xcounter++;
			}
			for(i = 0; i < autoActionList.length; i++)
			{
				drawIndex = i;

				if(autoActionList[i] !== 0)
				{
					this._context.save();
					this._context.setTransform(1, 0, 0, 1, 0, 0);

					switch(autoActionList[i])
					{
						case PickupTileModelType.RAFT :
							this._context.translate(256, 50 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.BOOK :
							this._context.translate(288, 50 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.RED_RING :
						case PickupTileModelType.BLUE_RING :
							this._context.translate(318, 50 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.LADDER :
							this._context.translate(352, 50 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.MASTER_KEY :
							this._context.translate(384, 50 + this._entityUIModel.getY());
							break;
						case PickupTileModelType.BRACELET :
							this._context.translate(410, 50 + this._entityUIModel.getY());
							break;
					}

					var autoActionSprite = this._pickupTileViewFactory.create(autoActionList[drawIndex], 0);
					autoActionSprite.update(delta);
					autoActionSprite.render(this._context);
					this._context.restore();
				}
			}
		}
	};

	EntityUIController.prototype.setEntityUIModel = function(value)
	{
		this._entityUIModel = value;
		this._viewComponent.setEntityUIModel(value);
		this._viewComponent.setCursorModel(this._entityUIModel.getCursorModel());
		this._healthUIView.setHealthUIModel(this._entityUIModel.getHealthUIModel());
	};

	EntityUIController.prototype.setMapDataModel = function(value)
	{
		this._mapDataModel = value;
	};

	EntityUIController.prototype.receiveNotification = function(notification)
	{
		var target = notification.getTarget();
		var entity = this._entityUIModel.getEntityModel();

		if(entity === null)
		{
			return;
		}

		switch(notification.getType())
		{
			case GameModelEvent.UPDATED_IS_PAUSED :
				this._isPaused = notification.getData();
				break;
			case EntityTileModelEvent.UPDATED_HEALTH :
				this._healthUIView.setMax(target.getHealthCap());
				this._healthUIView.setCount(target.getHealth());
				break;
		}
		if(this._mapDataModel !== null && typeof(this._mapDataModel) !== "undefined")
		{
			if(notification.getType() === MapDataModelEvent.UPDATED_MAP_CHUNK_INDEX)
			{
				this._entityUIModel.setType(MapUIType.OVERWORLD);
			}
		}
	};

	EntityUIController.prototype.setSoundModel = function(value)
	{
		this._soundModel = value;
	};

	EntityUIController.prototype._playSound = function(value)
	{
		if(this._soundModel !== null &&
			typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.playSound(value);
		}
	};

	EntityUIController.prototype._stopSound = function(value)
	{
		if(this._soundModel !== null && typeof(this._soundModel) !== "undefined")
		{
			this._soundModel.stopSound(value);
		}
	};

})();