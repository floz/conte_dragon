var NormalMapEffect = ( function NormalMapEffect() {

	NormalMapEffect.prototype.ctx = null;
	NormalMapEffect.prototype.texture = null;
	NormalMapEffect.prototype.normalMap = null;

	var _w = 0, h = 0
	,	_dataNormal;

	function NormalMapEffect( ctx, texture, normalMap, w, h ) {
		this.ctx = ctx;
		this.texture = texture;
		this.normalMap = normalMap;

		_w = w;
		_h = h;

		_getDataNormal( normalMap );
	}
	NormalMapEffect.prototype.constructor = NormalMapEffect;

	function _getDataNormal( normalMap ) {
		normalMap.style.visibility = "hidden";
		document.body.appendChild( normalMap );

		var nw = normalMap.offsetWidth
		,	nh = normalMap.offsetHeight;

		document.body.removeChild( normalMap );

		var dx = ( _w - nw ) >> 1
		,	dy = ( _h - nh ) >> 1;

		console.log( dx, dy, _w, nw );
	}

	NormalMapEffect.prototype.config = function config( shiny, specularity ) {

	}

	NormalMapEffect.prototype.apply = function apply( lx, ly, lz ) {

	}

	return NormalMapEffect;

})();