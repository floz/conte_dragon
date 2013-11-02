# http://stackoverflow.com/questions/1251828/calculate-rotations-to-look-at-a-3d-point
# http://stackoverflow.com/questions/10236557/getting-quaternion-to-rotate-between-two-vectors

class Dragon extends THREE.Mesh

    _geometry: null
    _texture: null

    _pointsByY: null
    _indexes: null

    constructor: ->
        @_geometry = new THREE.CylinderGeometry 30, 30, 30, 6, 1, false
        @_texture = new THREE.MeshLambertMaterial color: 0xff00ff
        
        THREE.Mesh.call @, @_geometry, @_texture

        @_sortPointsByVertices()
            
    _sortPointsByVertices: ->
        @_pointsByY = {}
        @_indexes = []

        i = 0
        for vertice in @_geometry.vertices
            py = vertice.y
            if not @_pointsByY[ py ]
                @_pointsByY[ py ] = []
                @_indexes.push py

            @_pointsByY[ py ].push 
                v: vertice
                ox: vertice.x
                oy: vertice.y
                oz: vertice.z

            i++

        return

    update: ->
        @_updateVertices()

    _updateVertices: ->
        dx = stage.size.width * .5 - stage.mouse.x
        dx = @_constrain dx, 200

        dy = stage.size.height *.5 - stage.mouse.y
        dy = @_constrain dy, 200

        dz = -dy

        dy *= .75

        val = .9
        for idx in @_indexes
            for data in @_pointsByY[ idx ]
                vertice = data.v
                vertice.x += ( ( data.ox - dx ) - vertice.x ) * val
                vertice.y += ( ( data.oy - dy ) - vertice.y ) * val
                vertice.z += ( ( data.oz - dy ) - vertice.z ) * val

            val *= .6

        @_geometry.verticesNeedUpdate = true

        return

    _constrain: ( number, between ) ->
        return 0 if isNaN number

        if number < 0
            number = -between if number < -between
        else if number > 0
            number = between if number > between

        number
