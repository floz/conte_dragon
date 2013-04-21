$( document ).ready ->
    new Main()

class Main

    _main: null

    _camera = null
    _scene = null
    _renderer = null
    _stats = null

    _daeLoader = null
    _objLoader = null

    constructor: ->
        @_main = document.getElementById "main"

        @_camera = new THREE.PerspectiveCamera 45, window.innerWidth / window.innerHeight, 1, 2000
        @_camera.position.z = 100

        @_scene = new THREE.Scene()
        @_createGrid()

        @_scene.add new THREE.AmbientLight 0xcccccc

        @_renderer = new THREE.WebGLRenderer()
        @_renderer.setSize window.innerWidth, window.innerHeight
        @_main.appendChild @_renderer.domElement

        @_stats = new Stats()
        @_stats.domElement.style.position = "absolute"
        @_stats.domElement.style.top = 0
        @_main.appendChild @_stats.domElement

        @_animate()

        main.addEventListener "drop", @_dropHandler, false

    _createGrid: ->
        geometry = new THREE.Geometry()
        material = new THREE.LineBasicMaterial
            color: 0x303030

        size = 14
        x = -size
        for i in [ 0..size ]
            x += i
            geometry.vertices.push new THREE.Vector3( -size, -.04, x )
            geometry.vertices.push new THREE.Vector3( size, -.04, x )
            geometry.vertices.push new THREE.Vector3( x, -.04, -size )
            geometry.vertices.push new THREE.Vector3( x, -.04, size )

        line = new THREE.Line geometry, material, THREE.LinePieces
        @_scene.add line

    _animate: =>
        requestAnimationFrame @_animate
        @_render()
        @_stats.update()

    _render: ->
        timer = Date.now() * .0005

        @_camera.position.x = Math.sin( timer * 4 ) * 3009
        @_camera.position.y = Math.cos( timer * 5 ) * 4000
        @_camera.position.z = Math.cos( timer * 4 ) * 3009

        @_renderer.render @_scene, @_camera 

    _dropHandler: ( e ) =>
        console.log e.dataTransfer.files

