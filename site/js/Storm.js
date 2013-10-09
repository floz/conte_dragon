var Storm = Storm || ( function Storm() {

	var _alpha = 0.0
	,	_idTimeout = -1
	,	_storm = null;

	function _init() {
		_storm = document.getElementById( "storm" );

		_start();
	}

	function _start() {
		_idTimeout = setTimeout( _flash, 4000 + Math.random() * 4000 );
	}

	function _flash() {
		_storm.style.display = "block";

		var delay = 0.0
		,	speed = 0.2;

		TweenLite.to( _storm, speed, {
			css: { autoAlpha: .8 + Math.random() * .2 },
			ease: Cubic.easeIn
		});

		delay += speed;
		speed = Math.random() * .15 + .1;

		TweenLite.to( _storm, speed, {
			delay: delay,
			css: { autoAlpha: Math.random() * .3 },
			ease: Cubic.easeOut
		});

		delay += speed;
		speed = Math.random() * .075 + .05;

		TweenLite.to( _storm, speed, {
			delay: delay,
			css: { autoAlpha: .7 + Math.random() * .3 },
			ease: Cubic.easeOut
		});

		delay += speed;
		speed = Math.random() * .05 + .025;

		TweenLite.to( _storm, speed, {
			delay: delay,
			css: { autoAlpha: 0 },
			ease: Cubic.easeOut,
			onComplete: _onStormEnd
		})
	}

	function _onStormEnd() {
		_storm.style.display = "none";

		_start();
	}

	// $( document ).ready( _init );

})();