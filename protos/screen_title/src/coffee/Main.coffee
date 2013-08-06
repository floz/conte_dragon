$ ->
    new Main()

class Main

    _$main: null

    constructor: ->
        @_$main = $( "#main" )
        @_$main.html()