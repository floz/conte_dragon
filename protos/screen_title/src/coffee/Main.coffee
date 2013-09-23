
class Main

    _raindrops: null
    _lightBubbles: null
    _dropSplashs: null

    constructor: ->
        @_raindrops = new Raindrops()
        @_raindrops.start()

        # @_dropSplashs = new DropSplashs()
        # @_dropSplashs.start()

        $window = $( window )
        $window.focus @_onFocusGain
        $window.blur @_onFocusLost

    _onFocusGain: =>
    	@_raindrops.start()

    _onFocusLost: =>
    	@_raindrops.stop()


new Main()