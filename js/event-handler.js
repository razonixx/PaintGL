function toolsEvent(evt) 
{    
    switch (evt) {
      case '1': // Normal Material
        var material = new THREE.MeshNormalMaterial();  
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
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
        break;
      case '4': // Basic Material
        var material = new THREE.MeshBasicMaterial(
          {
            color:materialColor,
          });  
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
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
      default:
        console.log("Not implemented");
        break;
    }
}

function colorPaletteEvent(event)
{
  //console.log(document.getElementById("color-palette").value);
  materialColor = document.getElementById("color-palette").value;
}


function initEventHandler(evt)
{
	
}
