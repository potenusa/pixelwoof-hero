import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';

const scene = new THREE.Scene()

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
// camera.position.z = 2

// const renderer = new THREE.WebGLRenderer()
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

const  renderer = new THREE.WebGLRenderer({canvas: document.querySelector("canvas")});

scene.background = new THREE.Color(0xC1EEFF);

let clock;
clock = new THREE.Clock();

// Camera

const  camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
camera.position.z = 5;

// Objects

let knots = 5;
const geometry = new THREE.TorusKnotGeometry( 1.5, .5, 50, 10, 1, knots );

// Material

const material = new THREE.MeshToonMaterial( {color: 0xf0f757} );

// Mesh

// const mesh = new THREE.Mesh( geometry, material);
const mesh = new THREE.Mesh( geometry, material);
mesh.position.y = 1.5
scene.add( mesh );

// Lights

const light = new THREE.PointLight(0xFF6F6F, 3, 0);
light.position.set(200, 100, 300);
scene.add(light);


// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // uniforms.iResolution.value.set(canvas.width, canvas.height, 1);

    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // set render target sizes here
}


// Other

const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
resizeObserver.observe(renderer.domElement, {box: 'content-box'});

function animate(time) {

    time *= 0.001;  // convert to seconds

    requestAnimationFrame( animate );

    let meshScale = Math.PI
    mesh.scale.set(meshScale, meshScale, meshScale)
    // mesh.scale.set(1, 1, 1)

    // Floating
    const time2 = clock.getElapsedTime();
    mesh.position.y = Math.cos( time2 ) * 0.1;

    const currentTimeline = window.pageYOffset / 3000
    const byScroll = currentTimeline * Math.PI
    mesh.rotation.set(0, byScroll, byScroll)
    mesh.scale.set(meshScale - byScroll, meshScale - byScroll, meshScale - byScroll)


    renderer.render( scene, camera );
};

animate();