import * as THREE from 'three'
import './style.css'
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//creating secen
const scene=new THREE.Scene();


//sphere
const geometry=new THREE.SphereGeometry(3,32,32)
const material=new THREE.MeshStandardMaterial({
    color:"#00ff83",
    roughness: 0.5, // Increase roughness for better visibility
    metalness: 0.5 // Increase metalness for better reflection

})

//mesh-combination of geometry and material
const mesh=new THREE.Mesh(geometry,material)
mesh.position.x+=0.1;
scene.add(mesh)


//sizes
const sizes={
    width:window.innerWidth,
    height:window.innerHeight,
}

//camera
const camera=new THREE.PerspectiveCamera(50,sizes.width/sizes.height,0.1,100)
camera.position.z=15
scene.add(camera)

//Light
const light=new THREE.PointLight(0xffffff,20,100)
light.position.set(0,10,10)

// light.intensity=1.25
scene.add(light)


// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.021); // Added ambient light for better visibility
scene.add(ambientLight);

//Renderer
const canvas=document.querySelector('.webgl')
const renderer=new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//Controls
const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=5


//Resize
window.addEventListener('resize',()=>{
    //upadate sizes
    sizes.width=window.innerWidth,
    sizes.height=window.innerHeight

    //camera resizing
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width,sizes.height)
})

//loop
const loop=()=>{
    controls.update()
    renderer.render(scene,camera)

    window.requestAnimationFrame(loop)
}
loop();

//Timeline magic
const tl=gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{x:0,y:0,z:0},{x:1,y:1,z:1})
tl.fromTo('nav',{y:"-100%"},{y:"0"})
tl.fromTo('.title',{opacity:0},{opacity:1},)

//Mouse color animation
let mouseDown=false
window.addEventListener('mousedown',()=>{
    mouseDown=true
})
window.addEventListener('mouseup',()=>{
    mouseDown=false
})

window.addEventListener('mousemove',(e)=>{
    let rgb=[]
    if(mouseDown){
        // rgb=[Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)]
        //providing color depending on position of cursor
        rgb=[Math.round((e.pageX/sizes.width)*255),Math.round((e.pageY/sizes.height)*255),150]
        //animate
        let newColor=new THREE.Color(`rgb(${rgb.join(',')})`)
        gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
    }
})