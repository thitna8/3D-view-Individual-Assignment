let productParts = {};

function createProduct() {
    // Create a chair using basic geometries
    
    // Chair seat
    const seatGeometry = new THREE.BoxGeometry(3, 0.3, 2.5);
    const seatMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.7,
        metalness: 0.2
    });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.y = 1.5;
    seat.castShadow = true;
    seat.receiveShadow = true;
    seat.name = "Seat";
    scene.add(seat);
    productParts.seat = seat;

    // Chair back
    const backGeometry = new THREE.BoxGeometry(3, 2, 0.3);
    const backMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.7,
        metalness: 0.2
    });
    const back = new THREE.Mesh(backGeometry, backMaterial);
    back.position.set(0, 2.5, -1.1);
    back.castShadow = true;
    back.receiveShadow = true;
    back.name = "Back";
    scene.add(back);
    productParts.back = back;

    // Chair legs
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 16);
    const legMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.8,
        metalness: 0.1
    });

    // Create four legs
    const legPositions = [
        { x: 1.3, z: 1 },
        { x: -1.3, z: 1 },
        { x: 1.3, z: -1 },
        { x: -1.3, z: -1 }
    ];

    legPositions.forEach((pos, i) => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos.x, 0.75, pos.z);
        leg.castShadow = true;
        leg.name = `Leg ${i+1}`;
        scene.add(leg);
        productParts[`leg${i+1}`] = leg;
    });

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0xdddddd,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
}