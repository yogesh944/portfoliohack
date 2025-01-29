let personScene, personCamera, personRenderer, person, laptop

function initPersonScene() {
  personScene = new THREE.Scene()
  personCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  personCamera.position.z = 5
  personCamera.position.y = 1

  personRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById("person-canvas"), alpha: true })
  personRenderer.setSize(window.innerWidth, window.innerHeight)

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  personScene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(5, 5, 5)
  personScene.add(pointLight)

  // Create person (simplified as a stick figure)
  const personGeometry = new THREE.BufferGeometry()
  const personMaterial = new THREE.LineBasicMaterial({ color: 0x00fffc })

  const personPoints = [
    0,
    0,
    0, // Base
    0,
    1,
    0, // Spine
    -0.5,
    1.5,
    0, // Left arm
    0,
    1,
    0, // Back to spine
    0.5,
    1.5,
    0, // Right arm
    0,
    1,
    0, // Back to spine
    0,
    1.5,
    0, // Neck
    0,
    1.7,
    0, // Head
  ]

  personGeometry.setAttribute("position", new THREE.Float32BufferAttribute(personPoints, 3))
  person = new THREE.Line(personGeometry, personMaterial)
  personScene.add(person)

  // Create laptop
  const laptopGeometry = new THREE.BoxGeometry(0.6, 0.04, 0.4)
  const laptopMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
  laptop = new THREE.Mesh(laptopGeometry, laptopMaterial)
  laptop.position.set(0, 1.2, 0.2)
  personScene.add(laptop)

  // Create laptop screen
  const screenGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.01)
  const screenMaterial = new THREE.MeshPhongMaterial({ color: 0x00fffc, emissive: 0x00fffc, emissiveIntensity: 0.5 })
  const screen = new THREE.Mesh(screenGeometry, screenMaterial)
  screen.position.set(0, 1.4, 0)
  screen.rotation.x = -Math.PI / 6
  personScene.add(screen)

  animatePersonScene()
}

function animatePersonScene() {
  requestAnimationFrame(animatePersonScene)

  // Animate person (simple breathing effect)
  person.scale.y = 1 + Math.sin(Date.now() * 0.003) * 0.01

  // Animate laptop (typing effect)
  laptop.rotation.x = Math.sin(Date.now() * 0.01) * 0.02

  personRenderer.render(personScene, personCamera)
}

function onWindowResize() {
  personCamera.aspect = window.innerWidth / window.innerHeight
  personCamera.updateProjectionMatrix()
  personRenderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("resize", onWindowResize)

initPersonScene()

