
var camera, scene, light, renderer;
var exportButton, floatingDiv;
var mouseX = 0, mouseY = 0;

function exportToObj ()
{
  var exporter = new THREE.OBJExporter ();
  var result = exporter.parse (scene);
  floatingDiv.style.display = 'block';
  floatingDiv.innerHTML = result.split ('\n').join ('<br />');
}


function init() {

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set (0, 0, 400);

  scene = new THREE.Scene();

  light = new THREE.DirectionalLight( 0xffffff );
  scene.add( light );

  var material = new THREE.MeshLambertMaterial ( { color : 0x00cc00 } );
  var geometry = new THREE.BoxGeometry( 100, 100, 100 );
  scene.add( new THREE.Mesh( geometry, material ) );

  window.addEventListener( 'click', onWindowClick, false );
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseover', onDocumentMouseMove, false );

  floatingDiv = document.createElement ('div');
  floatingDiv.className = 'floating';
  document.body.appendChild (floatingDiv);
}

function onWindowClick(event) {

  var needToClose = true;
  var target = event.target;
  while (target !== null) {
    if (target === floatingDiv || target == exportButton) {
      needToClose = false;
      break;
    }
    target = target.parentElement;
  }

  if (needToClose) {
    floatingDiv.style.display = 'none';
  }

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;

}

function animate() {

  requestAnimationFrame( animate );

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( -mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );

  light.position.set( camera.position.x, camera.position.y, camera.position.z ).normalize ();
  renderer.render( scene, camera );

}

init();
animate();

