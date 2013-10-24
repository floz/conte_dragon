var Dragon,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dragon = (function(_super) {
  __extends(Dragon, _super);

  Dragon.prototype._geometry = null;

  Dragon.prototype._texture = null;

  Dragon.prototype._pointsByY = null;

  function Dragon() {
    this._geometry = new THREE.CylinderGeometry(30, 30, 80, 10, 3, true);
    this._texture = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xff00ff
    });
    THREE.Mesh.call(this, this._geometry, this._texture);
    this._sortPointsByVertices();
  }

  Dragon.prototype._sortPointsByVertices = function() {
    var i, py, vertices, _i, _len, _ref;
    this._pointsByY = {};
    i = 0;
    _ref = this._geometry.vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertices = _ref[_i];
      py = vertices.y;
      if (!this._pointsByY[py]) {
        this._pointsByY[py] = [];
      }
      this._pointsByY[py].push(vertices);
      i++;
    }
  };

  return Dragon;

})(THREE.Mesh);

var animate, camera, dragon, h, init, renderer, scene, w;

renderer = null;

camera = null;

scene = null;

dragon = null;

w = window.innerWidth;

h = window.innerHeight;

init = function() {
  var container;
  renderer = new THREE.WebGLRenderer({
    alpha: false
  });
  renderer.setClearColor(0x222222, 1);
  renderer.setSize(w, h);
  container = document.getElementById('container');
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
  camera.position.z = 400;
  scene = new THREE.Scene();
  dragon = new Dragon();
  console.log(dragon);
  scene.add(dragon);
  return animate();
};

animate = function() {
  dragon.rotation.x = 10;
  renderer.render(scene, camera);
  return requestAnimationFrame(animate);
};

init();
