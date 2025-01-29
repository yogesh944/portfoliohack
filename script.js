let scene, camera, renderer, particles, developerMesh

function init() {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 50

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bg-canvas"), alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Particle system
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 2000

    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * size
        const y = (Math.random() - 0.5) * size
        const z = (Math.random() - 0.5) * size
        vertices.push(x, y, z)
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({ color: 0x00fffc, size: 0.1 })
    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Developer mesh
    const developerGeometry = new THREE.BoxGeometry(5, 5, 5)
    const developerMaterial = new THREE.MeshBasicMaterial({ color: 0xfc00ff, wireframe: true })
    developerMesh = new THREE.Mesh(developerGeometry, developerMaterial)
    scene.add(developerMesh)

    window.addEventListener("resize", onWindowResize, false)
    document.addEventListener("mousemove", onMouseMove, false)

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            card.style.setProperty('--mouse-x', `${x}px`)
            card.style.setProperty('--mouse-y', `${y}px`)
        })
    })

    animate()
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

    particles.rotation.x += mouseY * 0.001
    particles.rotation.y += mouseX * 0.001
}

function animate() {
    requestAnimationFrame(animate)

    particles.rotation.x += 0.0005
    particles.rotation.y += 0.0005

    // Animate developer mesh
    developerMesh.rotation.x += 0.01
    developerMesh.rotation.y += 0.01
    developerMesh.position.y = Math.sin(Date.now() * 0.001) * 2

    renderer.render(scene, camera)
}

init()

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value

    // Replace 'YOUR_EMAIL_HERE' with your actual email address
    const mailtoLink = `mailto:deanlucky07@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${email}`

    window.location.href = mailtoLink
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})