var Effects = Effects || ( function Effects() {

	var _w = 0
	,	_h = 0
	,	_cntEffects = null
	,	_canvas = null
	,	_ctx = null
	,	_toCall = []

	,	_raf = -1;

	function init() {
		_cntEffects = document.getElementById( "cnt-effects" );
		_createCanvas();
		_cntEffects.appendChild( _canvas );

		_update();

		ResizeManager.register( _onResize );
	}

	function _createCanvas() {
		_w = window.innerWidth;
		_h = window.innerHeight;

		_canvas = document.createElement( "canvas" );
		_canvas.width = _w;
		_canvas.height = _h;
		_ctx = _canvas.getContext( "2d" );
		_ctx.globalCompositionOperation = "lighter";
	}

	function register( f ) {
		_toCall.push( f );
	}

	function _update() {
		_ctx.clearRect( 0, 0, _w, _h );

		var i = 0, n = _toCall.length;
		for( ; i < n; i++ ) {
			_toCall[ i ].call( this, _ctx );
		}

		_raf = requestAnimationFrame( _update );
	}

	function _onResize( w, h ) {
		_w = w;
		_h = h;

		_canvas.width = _w;
		_canvas.height = _h;
	}

	$( document ).ready( init );

	return {
		register: register
	}

})();