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
          cameraControls.autoRoatate = true;
          orbitCamera = true;
          // No puedo hacer que rote
          break;
      default:
        console.log("Not implemented");
        break;
    }
}

function colorPaletteEvent(event)
{
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

function addToSelectGroup(id)
{
  var node = document.createElement("a");
  var textnode = document.createTextNode("Group " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "SG-" + id;
  node.href="#";
  node.onclick=(function() { selectGeometry(id); });
  document.getElementById("SelectList").appendChild(node);
  addToEraseGroup(id);
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

function addToEraseGroup(id)
{
  var node = document.createElement("a");
  var textnode = document.createTextNode("Group " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "EG-" + id;
  node.href="#";
  node.onclick=(function() { eraseGroup(id); });
  document.getElementById("EraseList").appendChild(node);
}

function selectGeometry(id)
{
  var transX = document.getElementById("trans-x");
  var transY = document.getElementById("trans-y");
  var transZ = document.getElementById("trans-z");

  var rotX = document.getElementById("rot-x");
  var rotY = document.getElementById("rot-y");
  var rotZ = document.getElementById("rot-z");

  var scaleX = document.getElementById("scale-x");
  var scaleY = document.getElementById("scale-y");
  var scaleZ = document.getElementById("scale-z");

  var geometryButton = document.getElementById("selectGeometryButton");
  var dropDownGeometry = document.getElementById("dropDownGeometry");
  var materialButton = document.getElementById("selectMaterialButton");
  var dropDownMaterial = document.getElementById("dropDownMaterial");

  var animationButtonDropDown = document.getElementById("animationButtonDropDown");
  var groupDropDown = document.getElementById("groupDrop");

  selectedGeometryId = id;
  var mesh = scene.getObjectById(id, true);
  if(mesh == undefined)
  {
    mesh = scene.getObjectByName("Group-"+id, true);
    dropDownGeometry.disabled=true;
    dropDownMaterial.disabled=true;
    animationButtonDropDown.disabled=true;
    groupDropDown.disabled=true;
  }
  else
  {
    geometryButton.innerHTML = mesh.geometry.type;
    materialButton.innerHTML = mesh.material.type;
    dropDownGeometry.disabled=false;
    dropDownMaterial.disabled=false;
    animationButtonDropDown.disabled=false;
    groupDropDown.disabled=false;
  }


  transX.value = mesh.position.x;
  transY.value = mesh.position.y;
  transZ.value = mesh.position.z;

  rotX.value = mesh.rotation.x;
  rotY.value = mesh.rotation.y;
  rotZ.value = mesh.rotation.z;


  transX.disabled=false;
  transY.disabled=false;
  transZ.disabled=false;
  rotX.disabled=false;
  rotY.disabled=false;
  rotZ.disabled=false;
  scaleX.disabled=false;
  scaleY.disabled=false;
  scaleZ.disabled=false;

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

function eraseGroup(id) 
{
  const object = scene.getObjectById(id, true);
  scene.remove( object );  
  document.getElementById("SG-"+id).remove();
  document.getElementById("EG-"+id).remove();
}

function createGroup()
{
  var group = new THREE.Group();
  groupArray.push(group);
  var id = groupArray.length;
  var node = document.createElement("p");
  var textnode = document.createTextNode("Group " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "Gr-" + id;
  //node.href="#";
  //node.onclick=(function() {addGroupToScene(group, id)});
  document.getElementById("GroupList").appendChild(node);
  addMeshButtonToGroupSelect();
  addGroupToScene(group, id);
}

function addGroupToScene(group, id)
{
  group.name = "Group-"+id;
  scene.add( group );
  addToSelectGroup(id);
}

function addMeshButtonToGroupSelect()
{
  var id = groupArray.length;
  var node = document.createElement("a");
  var textnode = document.createTextNode("Group " + id);
  node.appendChild(textnode);
  node.className="dropdown-item";
  node.id = "G-" + id;
  node.href="#";
  node.onclick=(function() {addMeshToGroup(this);});
  document.getElementById("GroupListSelect").appendChild(node);
}

function addMeshToGroup(groupId)
{
  var id = groupId.id.substring(2);
  var mesh = scene.getObjectById(selectedGeometryId, true);
  groupArray[id-1].add(mesh);
  //scene.add(mesh);
  //console.log(groupArray[id-1]);
}

function updateGeometry(id, property)
{
  var mesh = scene.getObjectById(id, true);
  if(mesh == undefined)
    mesh = scene.getObjectByName("Group-"+id, true);
  switch (property) {
    case "transX":
      mesh.position.x = document.getElementById("trans-x").value;
      break;
    case "transY":
      mesh.position.y = document.getElementById("trans-y").value;
      break;
    case "transZ":
      mesh.position.z = document.getElementById("trans-z").value;
      break;
    case "rotX":
      mesh.rotation.x = document.getElementById("rot-x").value;
      break;
    case "rotY":
      mesh.rotation.y = document.getElementById("rot-y").value;
      break;
    case "rotZ":
      mesh.rotation.z = document.getElementById("rot-z").value;
      break;
    case "scale":
      mesh.scale.set(document.getElementById("scale-x").value, document.getElementById("scale-y").value, document.getElementById("scale-z").value);
      break;
    default:
      break;
  }
}

function updateMeshGeometry(id, geometry)
{
  var mesh = scene.getObjectById(id, true);
  document.getElementById("selectGeometryButton").innerHTML = geometry;
  mesh.geometry.dispose();
  switch (geometry) {
    case "Box":
      mesh.geometry = new THREE.BoxGeometry();
      break;
    case "Icosahedron":
      mesh.geometry = new THREE.IcosahedronGeometry();
      break;
    case "Cone":
      mesh.geometry = new THREE.ConeGeometry();
      break;
    case "Cylinder":
      mesh.geometry = new THREE.CylinderGeometry();
      break;
    case "Dodecahedron":
      mesh.geometry = new THREE.DodecahedronGeometry();
      break;
    case "Octahedron":
      mesh.geometry = new THREE.OctahedronGeometry();
      break;
    case "Ring":
      mesh.geometry = new THREE.RingGeometry();
      break;
    case "Sphere":
      mesh.geometry = new THREE.SphereGeometry();
      break;
    case "Tetrahedron":
      mesh.geometry = new THREE.TetrahedronGeometry();
      break;
    case "Torus":
      mesh.geometry = new THREE.TorusGeometry();
      break;
    case "Torus Knot":
      mesh.geometry = new THREE.TorusKnotGeometry();
      break;
    default:
      break;
  }
}

function updateMeshMaterial(id, material)
{
  var mesh = scene.getObjectById(id, true);
  document.getElementById("selectMaterialButton").innerHTML = material;
  mesh.material.dispose();
  switch (material) {
    case "Normal":
      mesh.material = new THREE.MeshNormalMaterial();
      break;
    case "Wireframe":
      mesh.material = new THREE.MeshBasicMaterial(
        {
          color:materialColor,
          wireframe:true
        });  
      break;
    case "Basic":
      mesh.material = new THREE.MeshBasicMaterial({color:materialColor});
      break;
    case "Depth":
      mesh.material = new THREE.MeshDepthMaterial({color:materialColor});
      break;
    case "Lambert":
      mesh.material = new THREE.MeshLambertMaterial({color:materialColor});
      break;
    case "Phong":
      mesh.material = new THREE.MeshPhongMaterial({color:materialColor});
      break;
    case "Standard":
      mesh.material = new THREE.MeshStandardMaterial({color:materialColor});
      break;
    case "Toon":
      mesh.material = new THREE.MeshToonMaterial({color:materialColor});
      break;
    default:
      break;
  }
}

function toggleAnimation(id)
{
  var mesh = scene.getObjectById(id, true);
  if(mesh.name == "")
  {
    mesh.name = "anim"+id;
    document.getElementById("animationButton").innerHTML = "Animated: True";
  }
  else
  {
    mesh.name = "";
    document.getElementById("animationButton").innerHTML = "Animated: False";
  }
}