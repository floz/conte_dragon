var FocusManager = FocusManager || ( function FocusManager() {

	var _focusIn = []
	,	_focusOut = [];

	function init() {
		$( window ).on( "focus", _onFocus )
				   .on( "blur", _onBlur );
	}

	function _onFocus() {
		var i = 0, n = _focusIn.length;
		for( ; i < n; i++ ) {
			_focusIn[ i ].call( this, null );
		}
	}

	function _onBlur() {
		var i = 0, n = _focusOut.length;
		for( ; i < n; i++ ) {
			_focusOut[ i ].call( this, null );
		}
	}

	function register( onFocusIn, onFocusOut ) {
		registerFocusIn( onFocusIn );
		registerFocusOut( onFocusOut );
	}

	function registerFocusIn( onFocusIn ) {
		_focusIn.push( onFocusIn );
	}

	function registerFocusOut( onFocusOut ) {
		_focusOut.push( onFocusOut );
	}

	$( document ).ready( init );

	return {
		register: register
	,	registerFocusIn: registerFocusIn
	,	registerFocusOut: registerFocusOut
	}

})();