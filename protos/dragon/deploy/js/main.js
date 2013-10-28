var Dragon,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dragon = (function(_super) {
  __extends(Dragon, _super);

  Dragon.prototype._geometry = null;

  Dragon.prototype._texture = null;

  Dragon.prototype._pointsByY = null;

  Dragon.prototype._indexes = null;

  function Dragon() {
    this._geometry = new THREE.CylinderGeometry(30, 30, 80, 6, 8, false);
    this._texture = new THREE.MeshLambertMaterial({
      color: 0xff00ff
    });
    THREE.Mesh.call(this, this._geometry, this._texture);
    this._sortPointsByVertices();
  }

  Dragon.prototype._sortPointsByVertices = function() {
    var i, py, vertice, _i, _len, _ref;
    this._pointsByY = {};
    this._indexes = [];
    i = 0;
    _ref = this._geometry.vertices;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertice = _ref[_i];
      py = vertice.y;
      if (!this._pointsByY[py]) {
        this._pointsByY[py] = [];
        this._indexes.push(py);
      }
      this._pointsByY[py].push({
        v: vertice,
        ox: vertice.x,
        oy: vertice.y,
        oz: vertice.z
      });
      i++;
    }
  };

  Dragon.prototype.update = function() {
    return this._updateVertices();
  };

  Dragon.prototype._updateVertices = function() {
    var data, dx, dy, idx, val, vertice, _i, _j, _len, _len1, _ref, _ref1;
    dx = stage.size.width * .5 - stage.mouse.x;
    dx = this._constrain(dx, 200);
    dy = stage.size.height * .5 - stage.mouse.y;
    dy = this._constrain(dy, 200);
    val = .9;
    _ref = this._indexes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      idx = _ref[_i];
      _ref1 = this._pointsByY[idx];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        data = _ref1[_j];
        vertice = data.v;
        vertice.x += ((data.ox - dx) - vertice.x) * val;
        vertice.y += ((data.oy - dy) - vertice.y) * val;
        vertice.z += ((data.oz - dy) - vertice.z) * val;
      }
      val *= .6;
    }
    this._geometry.verticesNeedUpdate = true;
  };

  Dragon.prototype._constrain = function(number, between) {
    if (isNaN(number)) {
      return 0;
    }
    if (number < 0) {
      if (number < -between) {
        number = -between;
      }
    } else if (number > 0) {
      if (number > between) {
        number = between;
      }
    }
    return number;
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
  var ambient, container, directionalLight, pointLight;
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
  ambient = new THREE.AmbientLight(0x101010);
  scene.add(ambient);
  directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 2).normalize();
  scene.add(directionalLight);
  pointLight = new THREE.PointLight(0xffffff);
  scene.add(pointLight);
  dragon = new Dragon();
  console.log(dragon);
  scene.add(dragon);
  return animate();
};

animate = function() {
  dragon.rotation.x = 45;
  dragon.update();
  renderer.render(scene, camera);
  return requestAnimationFrame(animate);
};

$(document).ready(function() {
  return init();
});

var StageSingleton, stage,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

StageSingleton = (function() {
  var StageInstance, instance;

  function StageSingleton() {}

  StageInstance = (function() {
    StageInstance.prototype.mouse = null;

    StageInstance.prototype.size = null;

    StageInstance.prototype._$window = null;

    function StageInstance() {
      this._onResize = __bind(this._onResize, this);
      this._onMouseMove = __bind(this._onMouseMove, this);
      this.mouse = {};
      this.size = {};
      this._$window = $(window);
      $(document).on("mousemove", this._onMouseMove);
      this._$window.on("resize", this._onResize);
      this._onResize();
    }

    StageInstance.prototype._onMouseMove = function(e) {
      this.mouse.x = e.clientX;
      return this.mouse.y = e.clientY;
    };

    StageInstance.prototype._onResize = function(e) {
      this.size.width = this._$window.width();
      return this.size.height = this._$window.height();
    };

    return StageInstance;

  })();

  instance = null;

  StageSingleton.get = function() {
    return instance != null ? instance : instance = new StageInstance();
  };

  return StageSingleton;

}).call(this);

stage = StageSingleton.get();
