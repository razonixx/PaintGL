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
var width = 1000;
var height = 500;
var aRatio = width / height;
var cameraX = 0.;
var cameraY = 0.;
var cameraZ = 5.;

var cameraControls;
var groupArray = [];

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
    camera.position.set(cameraX, cameraY, cameraZ);    
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);   
    cameraControls.autoRotateSpeed = 10.0;

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
    cameraControls.update();
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