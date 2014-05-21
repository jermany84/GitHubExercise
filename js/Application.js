

var SpriteSheetUrl = {
	CAST : "img/cast-sprites.png",
	TERRAIN : "img/terrain-sprites.png"
};

var entityIdGenerator = 0;
var mobileTestDiv = null;

/**
 * Use console.log if applicable
 * @param value
 */

function trace(origin, message)
{
	if(message === null || typeof(message) === "undefined")
	{
		throw new Error("Origin is required in trace statement");
	}
	mobileTestDiv.innerHTML = message;
	try {
		console.log(typeof(origin) + " - " + message);
	} catch(error) {
		trace(this, "Your browser does not support console.log()");
	}
}

/**
 * Gets Unique Id
 * @returns {number}
 */

function getUniqueId()
{
	entityIdGenerator++;
	return entityIdGenerator;
}

/**
 * First running method
 */

function main()
{
	mobileTestDiv = document.getElementById("mobile-debugger");
    resources.load([SpriteSheetUrl.CAST, SpriteSheetUrl.TERRAIN]);
    resources.onReady(this.initializeApplicationFacade);
}

/**
 * Is canvas supported
 */

function isCanvasSupported()
{
	return Modernizr.canvas;
}

/**
 * Run application facade, everything should be loaded
 */

function initializeApplicationFacade()
{
	if(isCanvasSupported() === true)
	{
		var canvas = document.getElementById("canvas_game");
		ApplicationFacade(canvas);
	} else {
		trace(this, "Your browser does not support canvas");
		document.getElementById("mainContent").innerHTML = "Your browser does not support canvas";
	}
}