function toolsEvent(evt) 
{    
    switch (evt) {
      case '1': // Normal Material
        if(geometry == null)
        {
          console.log("Need to define a geometry first");
          break;
        }
        var material = new THREE.MeshNormalMaterial();  
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        addToSelect(mesh.id);
        break;
      case '2': // Eraser
        break;
      case '3': // Wireframe Material
        var material = new THREE.MeshBasicMaterial(
          {
            color:materialColor,
            wireframe:true
          });  
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        addToSelect(mesh.id);
        break;
      case '4': // Basic Material
        var material = new THREE.MeshBasicMaterial(
          {
            color:materialColor,
          });  
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        addToSelect(mesh.id);
        break;
      case '5': // Icosahedron Geometry
        geometry = new THREE.IcosahedronGeometry();
        break;  
      case '6': // Cone Geometry
        geometry = new THREE.ConeGeometry();
        break;
      case '7': // Cube Geometry
        geometry = new THREE.BoxGeometry();
      case '8': // Play Animation
        playAnim = true;
        break;
      case '9': // Pause Animation
        playAnim = false;
        break;
      case '10': // Mario Cube Texture
          var material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('imgs/mario_cube.jpeg')
          });
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
      case '11': // Reset Animation
        scene.traverse(function(node) 
            {
                if(node instanceof THREE.Mesh) 
                {
                    node.rotation.x = 0.0;
                    node.rotation.y = 0.0;
                }
            }); 
        break;
      case '12': // Cone Texture
        var material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('imgs/cone_texture.jpg')
        });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        addToSelect(mesh.id);
        break;
      case '13': // Wolf Model
      var loader = new THREE.ObjectLoader();

      loader.load(
        // resource URL
        "models/wolf_model.json",
      
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
          // Add the loaded object to the scene
          scene.add( obj );
          addToSelect(obj.id);
        },
      
        // onProgress callback
        function ( xhr ) {
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
      
        // onError callback
        function ( err ) {
          console.error( 'An error happened' );
        }
      );
        break;
        case '14':
          geometry = new THREE.CylinderGeometry();
          break;
        case '15':
          geometry = new THREE.DodecahedronGeometry();
          break;
        case '18':
          geometry = new THREE.OctahedronGeometry();
          break;
        case '19':
          geometry = new THREE.RingGeometry();
          break;
        case '20':
          geometry = new THREE.SphereGeometry();
          break;
        case '21':
          geometry = new THREE.TetrahedronGeometry();
          break;
        case '22':
          geometry = new THREE.TorusGeometry();
          break;
        case '23':
          geometry = new THREE.TorusKnotGeometry();
          break;
        case '24':
          var material = new THREE.MeshDepthMaterial();  
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
        case '25':
          var material = new THREE.MeshLambertMaterial({color:materialColor});  
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
        case '26':
          var material = new THREE.MeshPhongMaterial({color:materialColor});  
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
        case '27':
          var material = new THREE.MeshStandardMaterial({color:materialColor});  
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
        case '28':
          var material = new THREE.MeshToonMaterial({color:materialColor});  
          mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          addToSelect(mesh.id);
          break;
        case '29':
          cameraControls.autoRotate = true;
          break;
        case '30':
          cameraControls.autoRotate = false;
      default:
        console.log("Not implemented");
        break;
    }
}

function perspectiveProjection()
{
  camera = new THREE.PerspectiveCamera(60., canvas.width / canvas.height, 0.01, 10000.);
  camera.position.set(0., 0., 5.); 
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);   
  cameraControls.autoRotateSpeed = 10.0;
}

function orthographicProjection()
{
  camera = new THREE.OrthographicCamera(canvas.width / - 2, canvas.width / 2, canvas.height / 2, canvas.height / - 2, 0.01, 1000);
  camera.position.set(0., 0., 5.); 
  camera.updateProjectionMatrix();
  cameraControls = new THREE.OrbitControls(camera, renderer.domElement);   
  cameraControls.autoRotateSpeed = 10.0;
}

function colorPaletteEvent(event)
{
  //console.log(document.getElementById("color-palette").value);
  materialColor = document.getElementById("color-palette").value;
}

function initEventHandler(evt)
{
}

function addToSelect(id)
{
  var node = document.createElement("a");
  var textnode = document.createTextNode("Mesh " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "S-" + id;
  node.href="#";
  node.onclick=(function() { selectGeometry(id); });
  document.getElementById("SelectList").appendChild(node);
  addToErase(id);
}

function addToErase(id)
{
  var node = document.createElement("a");
  var textnode = document.createTextNode("Mesh " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "E-" + id;
  node.href="#";
  node.onclick=(function() { eraseGeometry(id); });
  document.getElementById("EraseList").appendChild(node);
}


function selectGeometry(id)
{
  // Aqui podemos manipular el objeto, poniendo una UI para que el usuario lo modifique
  console.log(scene.getObjectById(id, true));
}

function eraseGeometry(id) 
{
  const object = scene.getObjectById(id, true);
  if(object.geometry != null)
    object.geometry.dispose();
  if(object.material != null)
    object.material.dispose();
  scene.remove( object );  
  document.getElementById("S-"+id).remove();
  document.getElementById("E-"+id).remove();
}

function createGroup()
{
  var group = new THREE.Group();
  groupArray.push(group);
  var id = groupArray.length;
  var node = document.createElement("a");
  var textnode = document.createTextNode("Group " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "G-" + id;
  node.href="#";
  node.onclick=(function() { console.log(id) });
  document.getElementById("GroupList").appendChild(node);
}