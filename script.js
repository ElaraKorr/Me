// Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById('avatar-container');
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Create avatar (simple cube for demonstration)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x0066cc });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 5;

// Animation
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Mouse interaction
container.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

    cube.rotation.x = y;
    cube.rotation.y = x;
});

// Mini series navigation
let currentEpisode = 1;
const totalEpisodes = 3;

function nextEpisode() {
    if (currentEpisode < totalEpisodes) {
        currentEpisode++;
        updateEpisode();
    }
}

function previousEpisode() {
    if (currentEpisode > 1) {
        currentEpisode--;
        updateEpisode();
    }
}

function updateEpisode() {
    const episodeContent = document.querySelector('.episode');
    episodeContent.innerHTML = `
        <h2>Episode ${currentEpisode}: ${getEpisodeTitle()}</h2>
        <p>${getEpisodeContent()}</p>
        <div class="episode-navigation">
            <button ${currentEpisode === 1 ? 'disabled' : ''} onclick="previousEpisode()">Previous</button>
            <button ${currentEpisode === totalEpisodes ? 'disabled' : ''} onclick="nextEpisode()">Next</button>
        </div>
    `;
}

function getEpisodeTitle() {
    const titles = {
        1: 'The Beginning',
        2: 'The Journey',
        3: 'The Resolution'
    };
    return titles[currentEpisode];
}

function getEpisodeContent() {
    const content = {
        1: 'This is where it all started...',
        2: 'The journey continues with new challenges and opportunities...',
        3: 'Finally, reaching the destination and looking ahead...'
    };
    return content[currentEpisode];
}
