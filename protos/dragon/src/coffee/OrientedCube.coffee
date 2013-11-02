class OrientedPlane extends THREE.Object3D

    _geometry: null
    _materials: null
    _mesh: null

    constructor: ->
        THREE.Object3D.call @

        @_geometry = new THREE.PlaneGeometry 100, 100, 2, 2
        @_materials = [ 
            new THREE.MeshLambertMaterial( { color: 0xff00ff, shading: THREE.FlatShading } )
        ,   new THREE.MeshLambertMaterial( { color: 0xffff00, shading: THREE.FlatShading, wireframe: true } )
        ]

        @_mesh = THREE.SceneUtils.createMultiMaterialObject @_geometry, @_materials
        @.add @_mesh


    update: ->
        