/**
 * Created by apple on 4/30/14.
 */

var MOMath = {

	/**
	 * First set of coordinates follow second set of coordinates with easing
	 */
	zenosParadox : function(coordinate, destination, coefficient)
	{
		return (destination - coordinate) / coefficient;
	},

	/**
	 * First set of coordinates follow second set of coordinates with Elasticity
	 */
	hookesLaw : function(coordinate, destination, springConstant, damp, elasticity)
	{
		elasticity += -springConstant * (coordinate - destination);
		return elasticity *= damp;
	},

	/**
	 * Get Distance
	 */
	getDistance : function(x1, y1, x2, y2)
	{
		var dx = x2 - x1;
		var dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	}
};

