var Rain = Rain || ( function Rain() {

	var _cntRain = null
	,	_canvas = null
	,	_ctx = null
	,	_w = -1
	,	_h = -1

	,	_drops = null

	,	_timeout = -1
	,	_raf = -1;

	function _init() {
		_cntRain = document.getElementById( "cnt-rain" );
		_createCanvas();
		_cntRain.appendChild( _canvas );

		_start();
	}

	function _createCanvas() {
		_w = window.innerWidth;
		_h = window.innerHeight;

		_canvas = document.createElement( "canvas" );
		_canvas.width = _w;
		_canvas.height = _h;
		_ctx = _canvas.getContext( "2d" );
	}

	function _start() {
		_drops = [];

		_createDrops();
		_update();
	}

	function _createDrops() {
		var drop = null
		,	i = 0
		,	n = Math.floor( Math.random() * 4 + 2 )
		for( ; i < n; i++ ) {
			drop = new RainDrop( _w, _h );
			_drops.push( drop );
		}

		_startTimer();
	}

	function _startTimer() {
		_timeout = setTimeout( _createDrops, 100 + Math.random() * 500 );
	}

	function _stopTimer() {
		clearTimeout( _timeout );
	}

	function _update() {
		_ctx.clearRect( 0, 0, _w, _h );

		var drop = null
		,	linear = null
		,	i = _drops.length;
		while( --i > -1 ) {
			drop = _drops[ i ];
			drop.update();

			linear = _ctx.createLinearGradient( 0, drop.y, 0, drop.y + drop.h );
			linear.addColorStop( 0, "rgba( 255, 255, 255, .025 )" );
			linear.addColorStop( .85, "rgba( 255, 255, 255, .5 )" );
			linear.addColorStop( 1, "rgba( 255, 255, 255, .015 )" );

			_ctx.fillStyle = linear;
			_ctx.fillRect( drop.x, drop.y, drop.w, drop.h );

			if( drop.y > _h + drop.h )
				_drops.splice( i, 1 );
		}

		_raf = requestAnimationFrame( _update );
	}

	$( document ).ready( _init );

})();

var RainDrop = ( function RainDrop() {

	RainDrop.prototype.x = 0.0;
	RainDrop.prototype.y = 0.0;
	RainDrop.prototype.w = 0.0;
	RainDrop.prototype.h = 0.0;

	RainDrop.prototype.hMax = 0.0;
	RainDrop.prototype.speed = 0.0;
	RainDrop.prototype.speedMax = 0.0;

	function RainDrop( zoneW, zoneH ) {
		this.x = Math.random() * zoneW;
		this.y = -100.0;

		this.w = 1.0 + Math.random() * 2.0;

		this.hMax = rainData.h + Math.random() * rainData.hInterval;
		this.speedMax = rainData.speed + Math.random() * rainData.speedInterval;
	}
	RainDrop.prototype.constructor = RainDrop;
	
	RainDrop.prototype.update = function update() {
		this.h += ( this.hMax - this.h ) * .03;
		this.speed += ( this.speedMax - this.speed ) * .1;

		this.y += this.speed;
	}

	return RainDrop;

})();

var rainData = {
		speed: 18.0
	,	speedInterval: 32.0
	, 	h: 50.0
	,	hInterval: 300.0
}