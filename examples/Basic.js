import * as THREE from 'three'
import VRKeyboard from '../js/VRKeyboard.js'

var container;
var camera;

var scene, renderer;
var vrKeyboard;

function init(element)
{
    container= document.getElementById(element);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor( 0x333333, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    container.appendChild(renderer.domElement);

    camera.position.set(0, 0, 1500);
    camera.lookAt(new THREE.Vector3(0,0,0))

    window.addEventListener('resize', onWindowResize, false);

    vrKeyboard=new VRKeyboard(scene, camera, renderer)
    //vrKeyboard.enabled=false;
    vrKeyboard.rotation.x=0.1
    vrKeyboard.position.z=1

    vrKeyboard.addEventListener('keydown' , function(e){
        console.log(e.code)
        document.getElementById("msg").innerHTML="You  pressed  "+e.code+" key"
    })

    vrKeyboard.addEventListener('keyhold' , function(e){
        console.log(e.code)
        document.getElementById("msg").innerHTML="You pressed the "+e.code+" key for more than 1 second"
    })

    animate();
}

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate()
{
    requestAnimationFrame(animate);
    vrKeyboard.update()
    renderer.render(scene, camera);
}

window.init = init