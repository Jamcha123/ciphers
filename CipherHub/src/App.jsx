import { useState, useEffect, useRef } from 'react'
import './App.css'
import $ from 'jquery'; 
import {motion} from 'framer-motion'
import crypto from 'crypto'
import * as THREE from 'three'
import git from './assets/git.svg'

function AddTHREE(){
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a011f);
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000); 
    camera.position.set(0, 0, 30)

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"), 
      antialias: true, 
      depth: true, 
    })
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    let scaling = 10; 
    function AddSphere(x, y, z){
      const spheregeometry = new THREE.SphereGeometry(10, 64); 
      const spherematerial = new THREE.PointsMaterial({
        color: 0xffffff, 
        size: 0.05
      })
      const spheres = new THREE.Points(spheregeometry, spherematerial); 
      spheres.name = "1"; 
      spheres.scale.set(scaling, scaling, scaling); 
      spheres.position.set(x, y, z)
      scene.add(spheres); 

      renderer.render(scene, camera); 
    }
    AddSphere(0, 0, 0)

    function onScrollDown(){
      const t = document.body.getBoundingClientRect().top; 
      const obj = scene.getObjectByName("1");
      obj.position.y = 0.02 * t; 
      renderer.render(scene, camera)
    }
    document.body.onscroll = onScrollDown
    function resize(){
      camera.aspect = window.innerWidth / window.innerHeight; 
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight); 
      renderer.render(scene, camera); 
    }
    function animate(){
      window.addEventListener("resize", resize); 
      const obj = scene.getObjectByName("1");
      obj.rotation.x += 0.0005
      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate); 
  })
  return(
    <canvas id="bg" className="fixed top-[0] left-[0] " ></canvas>
  )
}
function AddNavBar(){
  const [active, setActive] = useState(false); 
  return(
    <div className="fixed w-[100%] h-[100%] m-auto p-[0] bg-transparent z-[200] flex flex-col align-middle justify-center text-center translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] ">
      <nav className="relative w-[100%] min-h-[5vh] max-h-[30vh] m-auto p-[0] flex flex-col align-middle justify-center text-center z-[100] ">
        <div className="flex flex-row align-middle justify-center text-center min-h-[5vh] min-w-[100%]">
          <ul className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[25%] md:min-w-[50%] lg:min-w-[75%] ">
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] flex lg:hidden flex-col align-middle justify-center text-center">
              <span style={{fontSize: 30 + "px"}} onClick={active? () => setActive(false) : () => setActive(true)} className="text-8xl cursor-pointer text-white material-symbols-outlined">
                menu
              </span>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white"><a href="#item1">About CipherHub</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white"><a href="#item2">Api Docs</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white"><a href="#item3">AES Encryption</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white"><a href="#item4">RSA Encryption</a></li>
            </div>
          </ul>
          <ul className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[75%] md:min-w-[50%] lg:min-w-[25%] ">
            <div className="flex flex-row align-middle justify-evenly text-center min-h-[50%] min-w-[100%] ">
              <img src={git} className="cursor-pointer" onClick={() => {window.location.href = "https://github.com/jamcha123/ciphers"}} width="35px" height="35px" alt="" />
              <div className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[50%] ">
                <iframe className="cursor-pointer bg-gray-600 rounded-xl text-3xl" src="https://github.com/sponsors/Jamcha123/button" title="Sponsor Jamcha123" height="32" width="120"></iframe>
              </div>
            </div>
          </ul>
        </div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none "><a href="#item1">About CipherHub</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 2}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none "><a href="#item2">Api Docs</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none "><a href="#item3">AES Encryption</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 2}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none "><a href="#item4">RSA Encryption</a></li>
          </div>
        </motion.div>
      </nav>
      <div className="w-[100%] h-[95vh] m-auto p-[0] relative "></div>
    </div>
  )
}
function AddMain(){
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent ">
      <motion.section initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >
        <h1 className="text-4xl text-white ">CipherHub</h1>
        <h1 id="plain" className="text-3xl text-white mt-[2%] ">Ciphers and Encryption</h1>
      </motion.section>
      <motion.section id="item1" initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

      </motion.section>
      <motion.section id="item2" initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

      </motion.section>
      <motion.section id="item3" initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

      </motion.section>
      <motion.section id="item4" initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

      </motion.section>
    </div>
  )
}
export default function App(){
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center ">
      <AddTHREE></AddTHREE>
      <AddNavBar></AddNavBar>
      <AddMain></AddMain>
    </div>
  )
}