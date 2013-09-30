var Rain = Rain || ( function Rain() {

	var _cntRain = null
	,	_canvas = null
	,	_ctx = null;

	function _init() {
		_cntRain = document.getElementById( "cnt-rain" );
		_createCanvas();
		_cntRain.appendChild( _canvas );

		new RainDrop();
	}

	function _createCanvas() {
		_canvas = document.createElement( "canvas" );
		_canvas.style.width = 100 + "%";
		_canvas.style.height = 100 + "%";
		_ctx = _canvas.getContext( "2d" );
	}

	$( document ).ready( _init );

})();

var RainDrop = ( function RainDrop() {

	// RainDrop.prototype.x = 0.0;
	// RainDrop.prototype.y = 0.0;
	// RainDrop.prototype.w = 0.0;
	// RainDrop.prototype.h = 0.0;
	this.x = 0.0;
	this.y = 0.0;
	this.w = 0.0;
	this.h = 0.0;

	var	_hMax = 0.0
	,	_speed = 2.0
	,	_speedMax = 0.0;

	function RainDrop() {
		_hMax = rainData.h + Math.random() * rainData.hInterval;
		_speedMax = rainData.speed + Math.random() * rainData.speedInterval;
	}
	RainDrop.prototype.constructor = RainDrop;
	
	RainDrop.prototype.update = function update() {
		this.h += ( _hMax - this.h ) * .03;
		_speed += ( _speedMax - _speed ) * .1;

		this.y += _speed
	}

	return RainDrop;

})();

var rainData = {
		speed: 8.0
	,	speedInterval: 14.0
	, 	h: 50.0
	,	hInterval: 200.0
}