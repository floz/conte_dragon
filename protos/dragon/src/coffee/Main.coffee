
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

    dragon = new Dragon()
    console.log dragon
    scene.add dragon

    do animate

animate = ->
    dragon.rotation.x = 10

    renderer.render scene, camera

    requestAnimationFrame animate

do init
