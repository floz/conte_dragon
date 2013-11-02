
renderer = null
camera = null
controls = null
scene = null
dragon = null
target = null
orientedPlane = null

angleTarget = 0

w = window.innerWidth
h = window.innerHeight

init = ->
    renderer = new THREE.WebGLRenderer alpha: false
    renderer.setClearColor 0x222222, 1
    renderer.setSize w, h

    container = document.getElementById 'container'
    container.appendChild renderer.domElement

    camera = new THREE.PerspectiveCamera 45, w / h, 1, 10000
    camera.position.x = 200
    camera.position.y = 200
    camera.position.z = 500
    camera.lookAt new THREE.Vector3 0, 0, 0

    controls = new THREE.TrackballControls camera
    controls.rotateSpeed = 1
    controls.zoomSpeed = .2
    controls.panSpeed = .8
    controls.noZoom = false
    controls.noPan = false
    controls.staticMoving = true
    controls.dynamicDampingFactor = .3

    scene = new THREE.Scene()

    ambient = new THREE.AmbientLight( 0x101010 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xffffff )
    directionalLight.position.set( 1, 1, 2 ).normalize()
    scene.add directionalLight

    pointLight = new THREE.PointLight( 0xffffff )
    scene.add( pointLight );

    scene.add new Axis( 1000 )

    target = new Target()
    scene.add target

    orientedPlane = new OrientedPlane( target )
    scene.add orientedPlane

    # dragon = new Dragon()
    # scene.add dragon

    animate()

animate = ->
    # dragon.rotation.x = 45
    # dragon.update()
    orientedPlane.update()

    controls.update()

    target.position.x = 200 * Math.cos( angleTarget )
    target.position.y = 200 * Math.sin( angleTarget )
    angleTarget += .01

    renderer.render scene, camera

    requestAnimationFrame animate

$( document ).ready ->
    init()
