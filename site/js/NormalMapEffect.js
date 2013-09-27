var NormalMapEffect = ( function NormalMapEffect() {

	var _ctx = null, _texture = null, _normalMap = null
	,	_w = 0, h = 0
	,	_normals = null, _dataNormal = null, _dataTexture = null
	,	_shiny = 0.0, _specularity = 0.0;

	function NormalMapEffect( ctx, texture, normalMap, w, h ) {
		_ctx = ctx;
		_texture = texture;
		_normalMap = normalMap;

		_w = w;
		_h = h;

		_getDataNormal();
		_getDataTexture();
	}
	NormalMapEffect.prototype.constructor = NormalMapEffect;

	function _getDataNormal() {
		_normalMap.style.visibility = "hidden";
		document.body.appendChild( _normalMap );

		var nw = _normalMap.offsetWidth
		,	nh = _normalMap.offsetHeight;

		document.body.removeChild( _normalMap );

		var dx = ( _w - nw ) >> 1
		,	dy = ( _h - nh ) >> 1;

		_ctx.clearRect( 0, 0, _w, _h );
		_ctx.drawImage( _normalMap, 0, 0, nw, nh, dx, dy, nw, nh );
		_dataNormal = _ctx.getImageData( 0, 0, _w, _h ).data;

		_normals = [];

		var nx = 0, ny = 0, nz = 0
		,	magInv = 0
		,	i = 0, n = _w * _h * 4;
		for( ; i < n; i += 4 ) {
			nx = _dataNormal[ i ];
			ny = 255 - _dataNormal[ i + 1 ];
			nz = _dataNormal[ i + 2 ];

			magInv = 1.0 / Math.sqrt( nx * nx + ny * ny + nz * nz );
			nx *= magInv;
			ny *= magInv;
			nz *= magInv;

			_normals.push( nx );
			_normals.push( ny );
			_normals.push( nz );
		}
	}

	function _getDataTexture() {
		_ctx.clearRect( 0, 0, _w, _h );
		_ctx.drawImage( _texture, 0, 0, _w, _h );
		_dataTexture = _ctx.getImageData( 0, 0, _w, _h ).data;
	}

	NormalMapEffect.prototype.config = function config( shiny, specularity ) {
		_shiny = Math.max( 0.0, shiny );
		_specularity = Math.max( 0.0, specularity );
	}

	NormalMapEffect.prototype.apply = function apply( lx, ly, lz, shiny, specularity ) {
		shiny = _shiny || shiny;
		specularity = _specularity || specularity;

		var imgData = _ctx.getImageData( 0, 0, _w, _h )
		,	data = imgData.data;

		var x = 0, y = 0
		,	vx = 0.0, vy = 0.0, vz = 0.0
		,	dx = 0.0, dy = 0.0, dz = 0.0
		,	dot = 0.0, spec = 0.0, intensity = 0.0, magInv = 0.0
		,	idxNormals = 0, idxData = 0, idxChannel = 0;
		for( ; y < _h; y++ ) {
			for( x = 0; x < _w; x++ ) {
				vx = _normals[ idxNormals++ ];
				vy = _normals[ idxNormals++ ];
				vz = _normals[ idxNormals++ ];

				if( shiny > 0 || idxNormals & 1 == 0 ) {
					dx = lx - x;
					dy = ly - y;
					dz = lz;

					magInv = 1.0 / Math.sqrt( dx * dx + dy * dy + dz * dz );
					dx *= magInv;
					dy *= magInv;
					dz *= magInv;
				}

				dot = dx * vx + dy * vy + dz * vz;
				spec = Math.pow( dot, 20 ) * specularity;
				intensity = spec + 0.5;

				for( idxChannel = 0; idxChannel < 3; idxChannel++ ) {
					data[ idxData ] = Math.round( _clamp( _dataTexture[ idxData++ ] * intensity, 0, 255 ) );
				}
				idxData++;
			}
		}
		_ctx.putImageData( imgData, 0, 0 );
	}

	function _clamp( x, min, max ) {
		if ( x < min ) return min;
		if ( x  > max ) return max - 1;
		return x;
	}

	return NormalMapEffect;

})();