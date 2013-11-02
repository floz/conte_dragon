class Ball extends THREE.Mesh

    _geometry: null
    _texture: null

    _lastPos: null

    _count: 0

    constructor: ->
        @_geometry = new THREE.CubeGeometry 50, 50, 50, 1, 1, 1
        @_texture = new THREE.MeshLambertMaterial color: 0xff00ff

        THREE.Mesh.call @, @_geometry, @_texture

        @_lastPos = @.position.clone()

    update: ->
        return if not @.position

        qLast = @.position.clone()

        mx = -( stage.size.width *.5 - stage.mouse.x )
        my = stage.size.height *.5 - stage.mouse.y

        dx = mx - @.position.x
        dy = my - @.position.y
        dz = -dy
        # dy *= .75

        # @.position.x += dx * .1
        # @.position.y += dy * .1
        # @.position.z += dz * .1

        # rx = Math.atan2 dz, dy
        # ry = Math.atan2 dx * Math.cos( rx ), dz
        # if @.position.z >= 0
        #     ry = -ry
        # rz = Math.atan2 Math.cos( rx ), Math.sin( rx ) * Math.sin( ry )

        # @.quaternion.setFromAxisAngle new THREE.Vector3( 1, 0, 0 ), rx
        # q = new THREE.Quaternion()
        # q.setFromAxisAngle new THREE.Vector3( 0, 1, 0 ), ry
        # @.quaternion.multiply q
        # q = new THREE.Quaternion()
        # q.setFromAxisAngle new THREE.Vector3( 0, 0, 1 ), rz
        # @.quaternion.multiply q


        rx = Math.atan2 dz, dy
        ry = Math.atan2 dx, dz
        rz = Math.atan2( dy, dx ) - Math.PI * .5
        if dy < 0
            rx += Math.PI

        @.quaternion.setFromAxisAngle new THREE.Vector3( 1, 0, 0 ), rx
        q = new THREE.Quaternion()
        q.setFromAxisAngle new THREE.Vector3( 0, 0, 1 ), rz
        @.quaternion.multiply q
        q = new THREE.Quaternion()
        q.setFromAxisAngle new THREE.Vector3( 0, 1, 0 ), ry
        @.quaternion.multiply q

        console.log @.quaternion

        @_lastPos.copy @.position
