let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;
const infoPanel = document.getElementById('info-panel');

function setupInteraction() {
    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check for intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(productParts));

    // Reset all objects to their original state
    Object.values(productParts).forEach(part => {
        part.scale.set(1, 1, 1);
        if (part.material.emissive) {
            part.material.emissive.setHex(0x000000);
        }
    });

    // Highlight hovered object
    if (intersects.length > 0) {
        const object = intersects[0].object;
        object.scale.set(1.05, 1.05, 1.05);
        
        // Add emissive effect
        if (!object.material.emissive) {
            object.material.emissive = new THREE.Color(0x000000);
        }
        object.material.emissive.setHex(0x333333);
    }
}

function onClick(event) {
    // Calculate mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Check for intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(productParts));

    if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // Show info panel
        infoPanel.textContent = object.name;
        infoPanel.style.display = 'block';
        
        // Hide after 2 seconds
        setTimeout(() => {
            infoPanel.style.display = 'none';
        }, 2000);

        // Click animation
        object.scale.set(1.1, 1.1, 1.1);
        setTimeout(() => {
            object.scale.set(1.05, 1.05, 1.05);
        }, 200);
    }
}