var Particles = Particles || ( function Particles() {

	var _w = null
	,	_h = null

	,	_particles = null

	,	_timeout = -1
	,	_raf = -1

	,	_started = false;

	function _init() {
		_w = ResizeManager.getWidth();
		_h = ResizeManager.getHeight();

		_start();

		Effects.register( _onUpdate )
		FocusManager.register( _onFocus, _onBlur );
		ResizeManager.register( _onResize );
	}

	function _start() {
		_particles = [];
		_createParticles();
	}

	function _createParticles() {
		var particle = null
		,	i = 0
		,	n = Math.floor( Math.random() * 3 + 1 );
		for( ; i < n; i++ ) {
			particle = new Particle( _w, _h, true );
			_particles.push( particle );
		}

		i = 0;
		n = Math.floor( Math.random() * 3 + 1 );
		for( ; i < n; i++ ) {
			particle = new Particle( _w, _h, false );
			_particles.push( particle );
		}

		_startTimer();
	}

	function _onFocus() {
		if ( _started ) {
			return;
		}
		_startTimer();
	}

	function _startTimer() {
		_started = true;
		_timeout = setTimeout( _createParticles, 500 + Math.random() * 2000 );
	}

	function _onBlur() {
		_started = false;
		_stopTimer();
	}

	function _stopTimer() {
		clearTimeout( _timeout );
	}

	function _onUpdate( ctx ) {
		// return;
		var particle = null
		,	i = _particles.length;
		while( --i > -1 ) {
			particle = _particles[ i ];
			particle.update();

			ctx.fillStyle = particle.fillColor;
			// ctx.shadowColor = "rgba( 0, 0, 0, .5 )";
			// ctx.shadowBlur = 20;
			ctx.lineWidth = 1;
			ctx.strokeStyle = "rgba( 255, 255, 255, " + particle.alpha * .015 + " )"

			ctx.beginPath();
			ctx.arc( particle.x, particle.y, particle.rad, 0, 2 * Math.PI, false );
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.arc( particle.x, particle.y, particle.rad - .5, 0, 2 * Math.PI, false );
			ctx.closePath();
			ctx.stroke();

			if( particle.isDead ) {
				_particles.splice( i, 1 );
			}
		}
	}

	function _onResize( w, h ) {
		_w = w;
		_h = h;
	}

	$( document ).ready( _init );

})();

var Particle = ( function Particle() {

	Particle.prototype.x = 0.0;
	Particle.prototype.y = 0.0;
	Particle.prototype.rad = 0.0;
	Particle.prototype.alpha = 0.0;
	Particle.prototype.fillColor = null;

	Particle.prototype.speed = 0.0;
	Particle.prototype.orientation = 0.0;

	Particle.prototype.isBlurry = false;

	Particle.prototype._color = null;
	Particle.prototype._cos = 0.0;
	Particle.prototype._sin = 0.0;
	Particle.prototype._lifeTime = 200;
	Particle.prototype._realAlpha = 1.0;

	Particle.prototype.isDead = false;

	function Particle( zoneW, zoneH, isCentered ) {
		if ( isCentered ) {
			this.x = zoneW * .5 + Math.random() * 450 - 225;
			this.y = 500 + Math.random() * 150 - 75;
			this.rad = 10 + Math.random() * 15;

			this.speed = .05 + Math.random() * .15;
		} else {
			this.x = Math.random() * zoneW;
			this.y = Math.random() * zoneH;

			this.speed = .025 + Math.random() * .05;

			this.rad = 40 + Math.random() * 200;
			this._realAlpha = .1 + Math.random() * .25;

			this.isBlurry = true;
		}

		this._color = ParticleColors[ Math.random() * ParticleColors.length >> 0 ];

		this.orientation = Math.random() * Math.PI * 2;
		this._cos = Math.cos( this.orientation );
		this._sin = Math.sin( this.orientation );
	}
	Particle.prototype.constructor = Particle;

	Particle.prototype.update = function update() {
		this.x += this.speed * this._cos;
		this.y += this.speed * this._sin;

		if( this._lifeTime > 0 ) {
			this.alpha += ( 1 - this.alpha ) * ( .05 * Math.random() );
		} else {
			this.alpha += ( -0.05 - this.alpha ) * ( .025 * Math.random() );
			if( this.alpha <= 0 ) {
				this.isDead = true;
			}
		}
		this.fillColor = "rgba( " + this._color.r + ", " + this._color.g + ", " + this._color.b + ", " + this._color.a * this.alpha * this._realAlpha + ");";
		this._lifeTime -= 1;
	}

	return Particle;

})();

var ParticleColors = [ 
	{ r: 38, g: 237, b: 255, a: .05 }
,	{ r: 255, g: 75, b: 113, a: .07 }
,	{ r: 38, g: 175, b: 255, a: .05 }
];
