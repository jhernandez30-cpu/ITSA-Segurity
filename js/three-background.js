import * as THREE from 'three';

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Configuración de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // fondo transparente
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparente
    container.appendChild(renderer.domElement);

    // Nube de partículas
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random() - 0.5) * 12;
        positions[i*3+1] = (Math.random() - 0.5) * 8;
        positions[i*3+2] = (Math.random() - 0.5) * 8 - 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ color: 0x00aaff, size: 0.05, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Cubo wireframe
    const boxGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00aaff, wireframe: true, transparent: true, opacity: 0.25 });
    const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(cube);

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    // Ajuste al redimensionar
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});
