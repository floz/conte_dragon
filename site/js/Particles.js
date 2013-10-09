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
		_ctx.canvas.getContext( "2d" );
	}

	function _start() {
		_particles = [];

		_createParticles();
		_update();
	}

	function _createParticles() {

	}

	function _update() {

	}

	$( document ).ready( _init );

})();

var Particle = ( function Particle() {

	Particle.prototype.x = 0.0;
	Particle.prototype.y = 0.0;
	Particle.prototype.w = 0.0;
	Particle.prototype.h = 0.0;
	Particle.prototype.alpha = 0.0;

	Particle.prototype.speed = 0.0;
	Particle.prototype.orientation = 0.0;

	Particle.prototype.isBlurry = false;

	Particle.prototype._cos = 0.0;
	Particle.prototype._sin = 0.0;
	Particle.prototype._lifeTime = 200;

	function Particle( zoneW, zoneH ) {
		var isCentered = Math.random() < .8;
		if ( isCentered ) {
			this.x = zoneW * .5 + Math.random() * 500 - 250;
			this.y = 460 + Math.random() * 500 - 250;

			this.speed = 2 + Math.random() * 8;
		} else {
			this.x = Math.random() * zoneW;
			this.y = Math.random() * zoneH;

			this.speed = 2 + Math.random() * 4;

			this.isBlurry = false;
		}

		this.orientation = Math.random() * Math.PI * 2;
	}
	Particle.prototype.constructor = Particle;

	Particle.prototype.update = function update() {
		this.x += this.speed * _cos;
		this.y += this.speed * _sin;

		if( this._lifeTime > 0 ) {
			this.alpha = ( 1 - this.alpha ) * .02;
		} else {
			this.alpha = ( 0 - this.alpha ) * .01;
		}
		this._lifeTime -= 1;
	}

	return Particle;

})();