class Target extends THREE.Mesh

	_geometry: null
	_material: null

	constructor: ->
		@_geometry = new THREE.SphereGeometry 10
		@_material = new THREE.MeshLambertMaterial color: 0x2200ff

		THREE.Mesh.call @, @_geometry, @_material