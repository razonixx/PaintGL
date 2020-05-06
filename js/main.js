"use strict"
var canvas;
var renderer;
var scene;
var camera;
var light;
var mesh;
var sceneReady = false;
var playAnim = true;
var geometry = null;
var materialColor = "white";
var geometryCount = 0;

var cameraControls;
var orbitCamera = false;

function main()
{
    // RENDERER
    canvas = document.getElementById("canvas");
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black");                    

    // LIGHTS
    light = new THREE.AmbientLight();    

    // CAMERAS
    camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);  // CAMERA
    camera.position.set(0., 0., 5.);    
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);   

    // SCENE
    scene = new THREE.Scene();                                 
    scene.add(camera);
    scene.add(light);

    // EVENTS
    initEventHandler();

    // ACTION
    requestAnimationFrame(renderLoop);
}
       
function renderLoop() {
    //cameraControls.update();
    renderer.render(scene, camera);
    if(playAnim)
    {
        scene.traverse(function(node) 
        {
            if(node instanceof THREE.Mesh) 
            {
                node.rotation.x = node.rotation.x + 0.01;
                node.rotation.y = node.rotation.y + 0.01;            
            }
        });            
    }
    requestAnimationFrame(renderLoop);
}