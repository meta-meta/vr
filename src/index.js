
var camera, scene, light, renderer;
var exportButton, floatingDiv;
var mouseX = 0, mouseY = 0;






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

  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseover', onDocumentMouseMove, false );
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

// Publish a simple message to the demo_tutorial channel
PUBNUB_demo.publish({
  channel: 'demo_tutorial',
  message: `var material = new THREE.MeshLambertMaterial ( { color : 0x00cc00 } );
  var geometry = new THREE.BoxGeometry( 100, 100, 100 );
  scene.add( new THREE.Mesh( geometry, material ) );`
});

PUBNUB_demo.subscribe({
  channel: 'demo_tutorial',
  message: msg => eval(`(function (THREE, scene) { ${msg} })(THREE, scene)`)
})

window.send = (message) => PUBNUB_demo.publish({
  channel: 'demo_tutorial',
  message
})