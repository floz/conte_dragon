class Raindrops

	_cnt: null
	_drops: null
	_timeout: 0
	_rafId: 0

	constructor: ->
		@_cnt = document.getElementById "raindrop"
		@_drops = []

	start: ->
		@_startTimer()
		@_update()

	stop: ->
		@_stopTimer()
		cancelAnimationFrame @_rafId

	_startTimer: ->
		@_timeout = setTimeout @_createRaindrop, 100 + Math.random() * 500

	_stopTimer: ->
		clearTimeout @_timeout

	_createRaindrop: =>
		count = Math.floor Math.random() * 4 + 2
		for i in [0...count]
			drop = new Raindrop()
			@_drops.push drop
			@_cnt.appendChild drop.body
		@_startTimer()

	_update: => 
		i = @_drops.length
		while --i > -1
			drop = @_drops[ i ]
			drop.update()
			if drop.body.offsetTop > window.innerHeight
				@_cnt.removeChild drop.body
				@_drops.splice i, 1

		@_rafId = requestAnimationFrame @_update

class Raindrop

	body: null
	_size: 0.0
	_height: 0.0
	_heightMax: 0.0
	_speed: 2.0
	_speedMax: 0.0

	constructor: ->
		@body = document.createElement "div"
		@body.className = "raindrop"
		@body.style.left = Math.random() * window.innerWidth + "px"
		@body.style.opacity = .2 + Math.random() * .8

		@_heightMax = 50.0 + Math.random() * 200.0
		@_speedMax = 8.0 + Math.random() * 14.0

	update: ->
		py = @body.offsetTop
		py = 0 if py == ""

		@_height += ( @_heightMax - @_height ) * .03
		@_speed += ( @_speedMax - @_speed ) * .1

		@body.style.top = py + @_speed + "px"
		@body.style.height = @_height + "px"

