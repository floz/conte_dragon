var ResizeManager = ResizeManager || ( function ResizeManager() {
	
	var _w = 0
	,	_h = 0
	,	_toCall = [];

	function init() {
		window.addEventListener( "resize", _onResize );
		_onResize();
	}	

	function _onResize() {
		_w = window.innerWidth;
		_h = window.innerHeight;
		console.log( _w, _h );

		var i = 0, n = _toCall.length;
		for( ; i < n; i++ ) {
			_toCall[ i ].call( this, _w, _h );
		}
	}

	function register( f ) {
		_toCall.push( f );
	}

	function _getWidth() { return _w; }
	function _getHeight() { return _h; }

	$( document ).ready( init );

	return { 
		getWidth: _getWidth
	,	getHeight: _getHeight
	,	register: register
	}

})();