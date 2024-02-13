import * as THREE from 'three';
import React from 'react';

const Test = () => {
//THIS IS SCENE/CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//THIS IS RENDERER
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//THIS IS GEOMETRY AND MATERIAL
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

//THIS IS ANIMATION FUNCTION
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    //THIS IS THE ANIMATION
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}
animate();
camera.position.z = 5;

    return (
        <div>
            <h1>Test</h1>
        </div>
    )
}

export default Test;