var Particles = Particles || ( function Particles() {

	var _cntParticles = null
	,	_canvas = null
	,	_ctx = null
	,	_w = null
	,	_h = null

	,	_particles = null

	,	_timeout = -1
	,	_raf = -1;

	function _init() {
		_cntParticles = document.getElementById( "cnt-particles" );
		_createCanvas();
		_cntParticles.appendChild( _canvas );

		_start();
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

	function _start() {
		_particles = [];

		_createParticles();
		_update();
	}

	function _createParticles() {
		var particle = null
		,	i = 0
		,	n = Math.floor( Math.random() * 4 + 2 );
		for( ; i < n; i++ ) {
			particle = new Particle( _w, _h );
			_particles.push( particle );
		}

		_startTimer();
	}

	function _startTimer() {
		_timeout = setTimeout( _createParticles, 500 + Math.random() * 2000 );
	}

	function _stopTimer() {
		clearTimeout( _timeout );
	}

	function _update() {
		_ctx.clearRect( 0, 0, _w, _h );

		var particle = null
		,	i = _particles.length;
		while( --i > -1 ) {
			particle = _particles[ i ];
			particle.update();

			_ctx.fillStyle = particle.fillColor;
			_ctx.shadowColor = "rgba( 0, 0, 0, .5 )";
			_ctx.shadowBlur = 20;
			_ctx.lineWidth = 1;
			_ctx.strokeStyle = "rgba( 255, 255, 255, " + particle.alpha * .025 + " )"

			_ctx.beginPath();
			_ctx.arc( particle.x, particle.y, particle.rad, 0, 2 * Math.PI, false );
			_ctx.closePath();
			_ctx.fill();

			// _ctx.beginPath();
			// _ctx.arc( particle.x, particle.y, particle.rad - .5, 0, 2 * Math.PI, false );
			// _ctx.closePath();
			// _ctx.stroke();

			if( particle.alpha <= 0 ) {
				_particles.splice( i, 1 );
			}
		}

		_raf = requestAnimationFrame( _update );
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

	function Particle( zoneW, zoneH ) {
		var isCentered = Math.random() < .8;
		if ( isCentered ) {
			this.x = zoneW * .5 + Math.random() * 500 - 250;
			this.y = 500 + Math.random() * 200 - 100;

			this.speed = .05 + Math.random() * .15;
		} else {
			this.x = Math.random() * zoneW;
			this.y = Math.random() * zoneH;

			this.speed = .025 + Math.random() * .05;

			this.isBlurry = true;
		}

		this.rad = 10 + Math.random() * 30;
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
			this.alpha += ( 1 - this.alpha ) * ( .02 * Math.random() );
		} else {
			this.alpha += ( 0 - this.alpha ) * ( .01 * Math.random() );
		}
		this.fillColor = "rgba( " + this._color.r + ", " + this._color.g + ", " + this._color.b + ", " + this._color.a * this.alpha + ");";
		this._lifeTime -= 1;
	}

	return Particle;

})();

var ParticleColors = [ 
	{ r: 38, g: 237, b: 255, a: .07 }
,	{ r: 255, g: 75, b: 113, a: .1 }	
];
