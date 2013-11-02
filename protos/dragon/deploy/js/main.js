var Axis,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Axis = (function(_super) {
  __extends(Axis, _super);

  function Axis(length) {
    THREE.Object3D.call(this);
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xff0000, false));
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xff0000, true));
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00ff00, false));
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00ff00, true));
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000ff, false));
    this.add(this._buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000ff, true));
  }

  Axis.prototype._buildAxis = function(src, dst, colorHex, dashed) {
    var axis, geom, mat;
    geom = new THREE.Geometry();
    if (dashed) {
      mat = new THREE.LineDashedMaterial({
        lineWidth: 3,
        color: colorHex,
        dashSize: 3,
        gapSize: 3
      });
    } else {
      mat = new THREE.LineBasicMaterial({
        lineWidth: 3,
        color: colorHex
      });
    }
    geom.vertices.push(src);
    geom.vertices.push(dst);
    geom.computeLineDistances();
    return axis = new THREE.Line(geom, mat, THREE.LinePieces);
  };

  return Axis;

})(THREE.Object3D);

var Ball,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ball = (function(_super) {
  __extends(Ball, _super);

  Ball.prototype._geometry = null;

  Ball.prototype._texture = null;

  Ball.prototype._lastPos = null;

  Ball.prototype._count = 0;

  function Ball() {
    this._geometry = new THREE.CubeGeometry(50, 50, 50, 1, 1, 1);
    this._texture = new THREE.MeshLambertMaterial({
      color: 0xff00ff
    });
    THREE.Mesh.call(this, this._geometry, this._texture);
    this._lastPos = this.position.clone();
  }

  Ball.prototype.update = function() {
    var dx, dy, dz, mx, my, q, qLast, rx, ry, rz;
    if (!this.position) {
      return;
    }
    qLast = this.position.clone();
    mx = -(stage.size.width * .5 - stage.mouse.x);
    my = stage.size.height * .5 - stage.mouse.y;
    dx = mx - this.position.x;
    dy = my - this.position.y;
    dz = -dy;
    rx = Math.atan2(dz, dy);
    ry = Math.atan2(dx, dz);
    rz = Math.atan2(dy, dx) - Math.PI * .5;
    if (dy < 0) {
      rx += Math.PI;
    }
    this.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), rx);
    q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rz);
    this.quaternion.multiply(q);
    q = new THREE.Quaternion();
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), ry);
    this.quaternion.multiply(q);
    console.log(this.quaternion);
    return this._lastPos.copy(this.position);
  };

  return Ball;

})(THREE.Mesh);

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
    this._geometry = new THREE.CylinderGeometry(30, 30, 30, 6, 1, false);
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
    var data, dx, dy, dz, idx, val, vertice, _i, _j, _len, _len1, _ref, _ref1;
    dx = stage.size.width * .5 - stage.mouse.x;
    dx = this._constrain(dx, 200);
    dy = stage.size.height * .5 - stage.mouse.y;
    dy = this._constrain(dy, 200);
    dz = -dy;
    dy *= .75;
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

var angleTarget, animate, camera, controls, dragon, h, init, orientedPlane, renderer, scene, target, w;

renderer = null;

camera = null;

controls = null;

scene = null;

dragon = null;

target = null;

orientedPlane = null;

angleTarget = 0;

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
  camera.position.x = 200;
  camera.position.y = 200;
  camera.position.z = 500;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1;
  controls.zoomSpeed = .2;
  controls.panSpeed = .8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = .3;
  scene = new THREE.Scene();
  ambient = new THREE.AmbientLight(0x101010);
  scene.add(ambient);
  directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 2).normalize();
  scene.add(directionalLight);
  pointLight = new THREE.PointLight(0xffffff);
  scene.add(pointLight);
  scene.add(new Axis(1000));
  target = new Target();
  scene.add(target);
  orientedPlane = new OrientedPlane(target);
  scene.add(orientedPlane);
  return animate();
};

animate = function() {
  orientedPlane.update();
  controls.update();
  target.position.x = 200 * Math.cos(angleTarget);
  target.position.y = 200 * Math.sin(angleTarget);
  angleTarget += .01;
  renderer.render(scene, camera);
  return requestAnimationFrame(animate);
};

$(document).ready(function() {
  return init();
});

var OrientedPlane,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

OrientedPlane = (function(_super) {
  __extends(OrientedPlane, _super);

  OrientedPlane.prototype._geometry = null;

  OrientedPlane.prototype._materials = null;

  OrientedPlane.prototype._mesh = null;

  function OrientedPlane() {
    THREE.Object3D.call(this);
    this._geometry = new THREE.PlaneGeometry(100, 100, 2, 2);
    this._materials = [
      new THREE.MeshLambertMaterial({
        color: 0xff00ff,
        shading: THREE.FlatShading
      }), new THREE.MeshLambertMaterial({
        color: 0xffff00,
        shading: THREE.FlatShading,
        wireframe: true
      })
    ];
    this._mesh = THREE.SceneUtils.createMultiMaterialObject(this._geometry, this._materials);
    this.add(this._mesh);
  }

  OrientedPlane.prototype.update = function() {};

  return OrientedPlane;

})(THREE.Object3D);

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
      this.mouse = {
        x: 0,
        y: 0
      };
      this.size = {
        width: 0,
        height: 0
      };
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

var Target,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Target = (function(_super) {
  __extends(Target, _super);

  Target.prototype._geometry = null;

  Target.prototype._material = null;

  function Target() {
    this._geometry = new THREE.SphereGeometry(10);
    this._material = new THREE.MeshLambertMaterial({
      color: 0x2200ff
    });
    THREE.Mesh.call(this, this._geometry, this._material);
  }

  return Target;

})(THREE.Mesh);
