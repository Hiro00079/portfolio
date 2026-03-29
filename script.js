// Section switching
function showSection(id) {
  document.querySelectorAll(".panel").forEach(p => {
    p.classList.remove("active");
  });

  const section = document.getElementById(id);
  section.classList.add("active");

  gsap.fromTo(section,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.5 }
  );
}

// Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// GitHub Projects
fetch("https://api.github.com/users/YOUR_USERNAME/repos")
.then(res => res.json())
.then(data => {
  const container = document.getElementById("projects-container");

  data.slice(0,6).forEach(repo => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description"}</p>
      ⭐ ${repo.stargazers_count}
    `;

    div.onclick = () => div.classList.toggle("active");

    container.appendChild(div);
  });
});

// Demo
function runDemo() {
  document.getElementById("demo-output").innerText =
    "Running Python simulation...\nResult: +Efficiency Boost";
}

// Three.js interactive background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg") });

renderer.setSize(innerWidth, innerHeight);

const geometry = new THREE.BufferGeometry();
const vertices = [];

for (let i = 0; i < 1500; i++) {
  vertices.push((Math.random() - 0.5) * 10);
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ size: 0.02 });
const points = new THREE.Points(geometry, material);

scene.add(points);
camera.position.z = 3;

// Mouse interaction
document.addEventListener("mousemove", e => {
  points.rotation.y = e.clientX * 0.0005;
  points.rotation.x = e.clientY * 0.0005;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();