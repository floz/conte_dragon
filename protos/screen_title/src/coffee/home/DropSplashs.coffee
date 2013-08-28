class DropSplashs

	@_POSITIONS: [ { x: 0, y: 0 }, { x: 0, y: 0 } ]

	_cnt: null
	_splashs: null
	_timeout: 0
	_rafId: 0

	constructor: ->
		@_cnt = document.getElementById "splash"
		@_splashs = []

	start: ->
		@_startTimer()
		@_update()

	_startTimer: ->
		@_timeout = setTimeout @_createSplash, 1000 + Math.random() * 2000

	_createSplash: =>
		splash = new DropSplash()
		@_splashs.push splash
		@_cnt.appendChild splash.body
		@_startTimer()

	_update: => 
		i = @_splashs.length
		while --i > -1
			splash = @_splashs[ i ]
			splash.update()
			if splash.isDead
				@_cnt.removeChild splash.body
				@_splashs.splice i, 1

		@_rafId = requestAnimationFrame @_update

	stop: ->
		@_stopTimer()

	_stopTimer: ->
		clearTimeout @_timeout

class DropSplash

	@_BASE_CLASS_NAME: "splash sprite "
	@_SPRITE_COUNT: 28

	body: null
	_currentSpriteCount: 0
	_separateCount: 0

	isDead: false

	constructor: ->
		@body = document.createElement "span"
		@_updateClass()

	update: ->
		@_currentSpriteCount++
		@_updateClass()

	_updateClass: ->
		count0 = "000"
		count0 += "0" if  @_currentSpriteCount < 10
		count0 += @_currentSpriteCount
		if @_currentSpriteCount > 27
			@isDead = true
			return

		@body.className = DropSplash._BASE_CLASS_NAME + "drop_splash--#{count0}"
		@_separateCount++
		if @_separateCount == 32
			@_separateCount = 0
			@_currentSpriteCount++
