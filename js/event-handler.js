function toolsEvent(evt) 
{    
    switch (evt) {
      case '1':
        // MODEL
        // GEOMETRY
        var geometry = new THREE.BoxGeometry();        
        // MATERIAL
        var material = new THREE.MeshBasicMaterial(
          {
            color:materialColor,
            wireframe:wireframeMaterial
          });  
        // MESH (GEOMETRY + MATERIAL)
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        sceneReady = true;
        break;
      case '3':
        wireframeMaterial = true;
        break;
      case '8':
        playAnim = true;
        break;
      case '9':
        playAnim = false;
        break;
      case '11':
        mesh.rotation.x = 0.0;
        mesh.rotation.y = 0.0;
        break;
      default:
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
