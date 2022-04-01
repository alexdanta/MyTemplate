import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import { ArrayCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Sizes
 */
const sizes = { width: window.innerWidth, height: window.innerHeight }

window.addEventListener('resize', () => {

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// fullscreen
window.addEventListener('dblclick', () => {
    // console.log('dblclick')
    // camera.position.set(0, 0, 0)
    // // camera.lookAt(cube.position)
    // camera.updateProjectionMatrix()
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
    else {
        document.exitFullscreen()
    }
})

// Scene
const scene = new THREE.Scene()

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = (event.clientY / sizes.height - 0.5) * -1
})



/**
 * Objects
 */

// const group = new THREE.Group()
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// )
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube2.position.set(1, 0, 0)
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x0000ff })
// )
// cube3.position.set(-1, 0, 0)
// group.add(cube3)


// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)

scene.add(cube)
const tl = gsap.timeline()
tl.to(cube.position, { duration: 1, x: 1.25 })
gsap.to(cube.position, { duration: 1, delay: 3, x: 0 })


/**
 * Helpers
 */

// //Grid helper
// const gridHelper = new THREE.GridHelper(10, 10)
// scene.add(gridHelper)

// polar grid helper
const polarGridHelper = new THREE.PolarGridHelper(10, 10)
scene.add(polarGridHelper)

// Axis helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)



/**
 * Renderer
 */
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Camera
 */
const fov = 45
const near = 0.1
const far = 50
const camera = new THREE.PerspectiveCamera(fov, sizes.width / sizes.height, near, far)
camera.position.set(2, 2, 3)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.set(0, 1.5, 0)

// Clock
const clock = new THREE.Clock()



/**
 * Tick
 */
const tick = () => {

    // Clock
    const elapsedTime = clock.getElapsedTime()

    // Cube rotation
    cube.rotation.y = elapsedTime * -2



    // Update controls
    controls.update()

    // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    camera.lookAt(cube.position)


    // Update objects
    requestAnimationFrame(tick)


    //  Render
    renderer.render(scene, camera)

}
tick()
