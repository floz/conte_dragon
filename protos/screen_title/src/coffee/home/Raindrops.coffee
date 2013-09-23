class Raindrops

	_canvas: null
	_ctx: null
	_drops: null

	_timeout: 0
	_rafId: 0

	constructor: ->
		@_canvas = document.getElementById "#raindrop"
		@_ctx = @_canvas.getContext "2d"
		
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
		@_startTimer()

	_update: => 
		i = @_drops.length
		while --i > -1
			drop = @_drops[ i ]
			drop.update()
			if drop.body.offsetTop > window.innerHeight
				@_drops.splice i, 1

		@_rafId = requestAnimationFrame @_update

class Raindrop

	x: 0.0
	y: 0.0
	w: 0.0
	h: 0.0

	_size: 0.0
	_heightMax: 0.0
	_speed: 2.0
	_speedMax: 0.0

	constructor: ->
		@_heightMax = 50.0 + Math.random() * 200.0
		@_speedMax = 8.0 + Math.random() * 14.0

	update: ->
		@h += ( @_heightMax - @h ) * .03
		@_speed += ( @_speedMax - @_speed ) * .1

		@y += @_speed

