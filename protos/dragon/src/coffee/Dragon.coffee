class Dragon extends THREE.Mesh

    _geometry: null
    _texture: null

    _pointsByY: null

    constructor: ->
        @_geometry = new THREE.CylinderGeometry 30, 30, 80, 10, 3, true
        @_texture = new THREE.MeshBasicMaterial wireframe: true, color: 0xff00ff
        
        THREE.Mesh.call @, @_geometry, @_texture

        @_sortPointsByVertices()

            
    _sortPointsByVertices: ->
        @_pointsByY = {}

        i = 0
        for vertices in @_geometry.vertices
            py = vertices.y
            @_pointsByY[ py ] = [] if not @_pointsByY[ py ]
            @_pointsByY[ py ].push vertices

            i++

        return
