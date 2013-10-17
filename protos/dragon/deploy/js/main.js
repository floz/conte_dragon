var animate, camera, h, init, mesh, renderer, scene, w;

renderer = null;

camera = null;

scene = null;

mesh = null;

w = window.innerWidth;

h = window.innerHeight;

init = function() {
  var container, geometry, texture;
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
  geometry = new THREE.CylinderGeometry(30, 30, 80, 20, 1, true);
  texture = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff00ff
  });
  mesh = new THREE.Mesh(geometry, texture);
  scene.add(mesh);
  return animate();
};

animate = function() {
  mesh.rotation.x += .005;
  mesh.rotation.y += .01;
  renderer.render(scene, camera);
  return requestAnimationFrame(animate);
};

init();
