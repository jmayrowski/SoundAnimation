var camera, scene;
var currentStyle, exampleStyle;
var lastUpdate = 0;

// Add styles here
function accessStyle(choice) {
	switch (choice) {
		case 0:
			currentStyle = exampleStyle;
			break;
		default:
			// Do nothing.
			break;
	}
};

// -------------------------------------------------
// ------------ Start of ExampleStyle --------------
// -------------------------------------------------
function ExampleStyle() {
	exampleScene = new THREE.Scene();
	
	exampleCamera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	exampleCamera.position.x = 20;
	exampleCamera.position.y = 0;
	exampleCamera.position.z = 20;
	
	ambientLight = new THREE.AmbientLight(0x444444);
	exampleScene.add(ambientLight);

	// if there were any directional lights
	// THREE.MeshPhongMaterial({color: 0xffffff, shading: THREE.FlatShading})
	cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
	exampleScene.add(cube);
}

ExampleStyle.prototype.update = function(deltaTime) {
	cube.rotation.x -= 2 * deltaTime * 0.001;
	cube.rotation.y -= 1 * deltaTime * 0.001;
	cube.rotation.z -= 3 * deltaTime * 0.001;
}

ExampleStyle.prototype.draw = function() {
	renderer.render(exampleScene, exampleCamera);
}

ExampleStyle.prototype.destroy = function() {
	// Is destroy needed?
}
// -------------------------------------------------
// ------------ End of ExampleStyle --------------
// -------------------------------------------------

function init(){
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	// ----- Start of Styles -----
	exampleStyle = new ExampleStyle();
	// ----- End of Styles -----
	
	accessStyle(0);

	//window.addEventListener('resize', onWindowResize, false);
}

var update = function() {
	var time = performance.now();
	var elapsed = time - lastUpdate;
	
	currentStyle.update(elapsed);
	currentStyle.draw();
	
	lastUpdate = time;
	requestAnimationFrame(update);
};
		
init();
update();