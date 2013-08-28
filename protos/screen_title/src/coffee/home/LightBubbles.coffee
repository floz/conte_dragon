class LightBubbles

	_cnt: null
	_bubbles: null

	constructor: ->
		@_cnt = document.getElementById "lightbubbles"
		@_bubbles = []
		@_createBubbles "blue", -50
		@_createBubbles "red", 50

	_createBubbles: ( color, y ) ->
		count = Math.floor 6 + Math.random() * 6
		for i in [0...count]
			bubble = new LightBubble( color, y )
			@_cnt.appendChild bubble.body



class LightBubble

	body: null

	constructor: ( color, y ) ->
		@body = document.createElement "div"
		@body.className = "lightbubble lightbubble--" + color
		@body.style.left = window.innerWidth * .5 + Math.random() * 700 - 350 + "px"
		@body.style.top = 475 + y + Math.random() * 60 - 30 + "px"
		@body.style.width = 20 + Math.random() * 60 + "px"
		@body.style.height = @body.style.width