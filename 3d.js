var initialCamperaPos = {x: -65, y: 10, z: 0};

var AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();
var audio = document.querySelector(".audio-element");
var source = ctx.createMediaElementSource(audio);
var panner = ctx.createPanner();
panner.panningModel = 'HRTF';
panner.refDistance = 5;
panner.maxDistance = 500;
panner.setOrientation(1,0,0);
panner.setPosition(initialCamperaPos.x, initialCamperaPos.y, initialCamperaPos.z);
source.connect(panner);
panner.connect(ctx.destination);

var listener = ctx.listener;
listener.setPosition(0, 0, 0);

var container, camera, controls, scene, renderer, light, light2;
var clock = new THREE.Clock();

function render() {
    controls.update(clock.getDelta());
    renderer.render(scene, camera);
    var abs = camera.getWorldDirection();

    var pos = new THREE.Vector3();
    pos.setFromMatrixPosition(camera.matrixWorld);
    panner.setPosition(pos.x, pos.y, pos.z);
    listener.setOrientation(abs.x, abs.y, abs.z, abs.x-90, abs.y-90, abs.z-90);
}

function init() {
    container = document.getElementById('animation-container');

    camera = new THREE.PerspectiveCamera(
        50, // FOV
         window.innerWidth / window.innerHeight, // Aspect ratio
         1, // near
         10000 // far
    );
    camera.position.set(initialCamperaPos.x, initialCamperaPos.y, initialCamperaPos.z);

    scene = new THREE.Scene();

    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(10, 10, 10).normalize();
    scene.add(light);

    light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(-20, -10, -10).normalize();
    scene.add(light2);

    var geometry = new THREE.BoxBufferGeometry(5, 10, 5);
    var speaker = THREE.ImageUtils.loadTexture('lib/st.jpg');
    speaker.wrapS = speaker.wrapT = THREE.RepeatWrapping;
    speaker.repeat.set(1, 2);
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({map: speaker}));
    mesh.position.set(0, 10, 0);
    scene.add(mesh);
    
    var helper = new THREE.GridHelper( 500, 10, 0x444444, 0x444444 );
    helper.position.y = 0;
    scene.add(helper);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x9AAFC0, 1);

    container.innerHTML = "";
    container.appendChild( renderer.domElement );

    controls = new THREE.FirstPersonControls( camera, renderer.domElement );
    controls.movementSpeed = 30;
    controls.lookSpeed = 0.1;
    controls.noFly = true;
    controls.lookVertical = false;
};

function animate() {
    requestAnimationFrame(animate);
    render();
};

init();
animate();

