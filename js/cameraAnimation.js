let autoRotateEnabled = true;
let lastTime = 0;
const rotationSpeed = 0.5; // radians per minute

function setupCameraAnimation() {
    // Enable auto-rotation toggle on user interaction
    controls.addEventListener('start', () => {
        autoRotateEnabled = false;
    });

    controls.addEventListener('end', () => {
        // Re-enable auto-rotation after 5 seconds of inactivity
        setTimeout(() => {
            autoRotateEnabled = true;
        }, 5000);
    });
}

function updateCameraAnimation(time) {
    if (!lastTime) lastTime = time;
    const deltaTime = (time - lastTime) / 1000; // Convert to seconds
    lastTime = time;

    if (autoRotateEnabled) {
        // Convert rotation speed to radians per second
        const angle = (rotationSpeed / 60) * Math.PI * 2 * deltaTime;
        
        // Rotate camera around the chair
        camera.position.x = camera.position.x * Math.cos(angle) - camera.position.z * Math.sin(angle);
        camera.position.z = camera.position.z * Math.cos(angle) + camera.position.x * Math.sin(angle);
        camera.lookAt(0, 1.5, 0);
    }
}