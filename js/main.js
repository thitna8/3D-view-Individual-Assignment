// Main Three.js application
document.addEventListener('DOMContentLoaded', () => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 5, 10);
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    
    // Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create a table (our product)
    const table = createTable();
    scene.add(table);
    
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xdddddd,
        roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Interaction setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const infoPanel = document.getElementById('info');
    
    function createTable() {
        const tableGroup = new THREE.Group();
        
        // Table top
        const topGeometry = new THREE.BoxGeometry(6, 0.5, 3);
        const topMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513,
            roughness: 0.7
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 2;
        top.castShadow = true;
        top.name = "Table Top";
        tableGroup.add(top);
        
        // Table legs
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
        const legMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321,
            roughness: 0.8
        });
        
        const positions = [
            { x: 2.5, z: 1 },
            { x: -2.5, z: 1 },
            { x: 2.5, z: -1 },
            { x: -2.5, z: -1 }
        ];
        
        positions.forEach((pos, i) => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos.x, 1, pos.z);
            leg.castShadow = true;
            leg.name = `Table Leg ${i+1}`;
            tableGroup.add(leg);
        });
        
        return tableGroup;
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Handle mouse clicks
    window.addEventListener('click', (event) => {
        // Calculate mouse position in normalized device coordinates
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Check for intersections
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            
            // Display info
            infoPanel.textContent = `Clicked: ${object.name}`;
            infoPanel.style.display = 'block';
            
            // Hide after 2 seconds
            setTimeout(() => {
                infoPanel.style.display = 'none';
            }, 2000);
            
            // Animation effect
            object.scale.set(1.2, 1.2, 1.2);
            setTimeout(() => {
                object.scale.set(1, 1, 1);
            }, 200);
        }
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
});