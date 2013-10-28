
renderer = null
camera = null
scene = null
dragon = null

w = window.innerWidth
h = window.innerHeight

init = ->
    renderer = new THREE.WebGLRenderer alpha: false
    renderer.setClearColor 0x222222, 1
    renderer.setSize w, h

    container = document.getElementById 'container'
    container.appendChild renderer.domElement

    camera = new THREE.PerspectiveCamera 45, w / h, 1, 10000
    camera.position.z = 400

    scene = new THREE.Scene()

    ambient = new THREE.AmbientLight( 0x101010 );
    scene.add( ambient );

    directionalLight = new THREE.DirectionalLight( 0xffffff )
    directionalLight.position.set( 1, 1, 2 ).normalize()
    scene.add directionalLight

    pointLight = new THREE.PointLight( 0xffffff )
    scene.add( pointLight );

    dragon = new Dragon()
    console.log dragon
    scene.add dragon

    animate()

animate = ->
    dragon.rotation.x = 45
    dragon.update()

    renderer.render scene, camera

    requestAnimationFrame animate

$( document ).ready ->
    init()
