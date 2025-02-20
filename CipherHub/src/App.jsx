import { useState, useEffect, useRef } from 'react'
import './App.css'
import $ from 'jquery'; 
import {motion} from 'framer-motion'
import crypto from 'crypto'
import * as THREE from 'three'
import git from './assets/git.svg'
import axios from 'axios'; 
import * as cheerio from 'cheerio'
import jquery from 'jquery'

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
    <div className="fixed w-[100%] min-h-[5vh] max-h-[35vh] m-auto p-[0] bg-transparent z-[1000] flex flex-col align-middle justify-center text-center translate-x-[-50%] translate-y-[-50%] top-[15%] lg:top-[5%] left-[50%] ">
      <nav className="relative w-[100%] min-h-[5vh] max-h-[30vh] m-auto p-[0] flex flex-col align-middle justify-center text-center z-[100] ">
        <div className="flex flex-row align-middle justify-center text-center min-h-[5vh] min-w-[100%]">
          <ul className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[25%] md:min-w-[50%] lg:min-w-[75%] ">
            <div className="relative w-[25%] h-[100%] m-auto p-[0] flex lg:hidden flex-col align-middle justify-center text-center">
              <span style={{fontSize: 30 + "px"}} onClick={active? () => setActive(false) : () => setActive(true)} className="text-8xl cursor-pointer text-white material-symbols-outlined">
                menu
              </span>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item1">About CipherHub</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item2">HMAC Hashes</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item3">AES Encryption</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item4">Public-Private Keys</a></li>
            </div>
          </ul>
          <ul className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[75%] md:min-w-[50%] lg:min-w-[25%] ">
            <div className="flex flex-row align-middle justify-evenly text-center min-h-[50%] min-w-[75%] ">
              <img src={git} className="cursor-pointer" onClick={() => {window.location.href = "https://github.com/jamcha123/ciphers"}} width="35px" height="35px" alt="" />
              <div className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[50%] ">
                <iframe className="cursor-pointer bg-gray-600 rounded-xl text-3xl" src="https://github.com/sponsors/Jamcha123/button" title="Sponsor Jamcha123" height="32" width="120"></iframe>
              </div>
            </div>
          </ul>
        </div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item1">About CipherHub</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 2}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item2">Hmac Hashes</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item3">AES Encryption</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 2}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item4">Public-Private Keys</a></li>
          </div>
        </motion.div>
      </nav>
    </div>
  )
}
function AddMain(){
  useEffect(() => {
    const forms = document.getElementById("forms"); 
    const text = document.getElementById("text1"); 
    const plain = document.getElementById("plain"); 
    const key = document.getElementById("key"); 

    forms.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      jquery("#text1").empty(); 

      const link = "https://hmac-mfkmp3s2rq-uc.a.run.app?key=" + key.value + "&text=" + plain.value + ""
      const data = await axios.get(link)

      let x = document.createElement("h2"); 
      x.innerText = data["data"] 
      text.appendChild(x); 

      plain.value = ""
      key.value = ""
    })
  })
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent ">
      <motion.section initial={{translateX: -100 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 0.5}} className="flex flex-col align-middle justify-center text-center min-h-[90vh] min-w-[100%] " >
        <div className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[75%] ">
          <div className="flex flex-row align-middle justify-start text-start min-h-[100%] min-w-[35%]  ">
            <h1 className="text-4xl text-white">CipherHub</h1>
          </div>
        </div>
        <div className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[75%]">
          <div className="flex flex-row align-middle justify-start text-start min-h-[100%] min-w-[35%] ">
            <h1 className="text-3xl text-gray-300">Ciphers and Encryption</h1>
          </div>
        </div>
      </motion.section>
      <motion.section id="item1" className="flex flex-col align-middle justify-center text-center min-h-[80vh] min-w-[100%] " >
        <div className="flex flex-row align-middle justify-center text-center min-h-[fit-content] min-w-[75%] ">
          <div className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[75%]  ">
            <h1 className="text-4xl text-white">About CipherHub</h1>
          </div>
        </div>
        <div className="relative w-[75%] h-[75vh] m-auto p-[0] grid-cols-2 grid-rows-2 gap-[50px] flex flex-col align-middle justify-center xl:grid  ">
          <motion.div className="relative w-[80%] h-[75%] m-auto p-[0] bg-transparent border-white border-[1px] rounded-xl flex flex-col align-middle justify-center text-center " initial={{translateX: 0 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1.5}}>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-3xl text-gray-200">Open Source</h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  CipherHub is Open Source and Free.<br></br>
                </h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  Check out the Git Repo
                </h1>
                <a href="https://github.com/jamcha123/ciphers" className="text-xl ml-[1%] cursor-pointer text-violet-500 underline underline-offset-1">
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div className="relative w-[80%] h-[75%] m-auto p-[0] bg-transparent border-green-300 border-[1px] rounded-xl flex flex-col align-middle justify-center text-center " initial={{translateX: 0 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1.5}}>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-3xl text-gray-200">Buy me a coffee</h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  Feel free to sponser me.<br></br>
                </h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  My Github Sponsor page:
                </h1>
                <a href="https://github.com/sponsors/jamcha123" className="text-xl text-violet-500 ml-[1%] underline underline-offset-1 ">Sponsor Page</a>
              </div>
            </div>
          </motion.div>
          <motion.div className="relative w-[80%] h-[75%] m-auto p-[0] bg-transparent border-red-300 border-[1px] rounded-xl flex flex-col align-middle justify-center text-center " initial={{translateX: 0 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1.5}}>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-3xl text-gray-200">Encryption Methods</h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  Keep your data safe from your Ex.
                </h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  Generate public-private keys and encrypt documents.<br></br>
                  Or use AES to encrypt to encrypt documents
                </h1>
              </div>
            </div>
          </motion.div>
          <motion.div className="relative w-[80%] h-[75%] m-auto p-[0] bg-transparent border-blue-300 border-[1px] rounded-xl flex flex-col align-middle justify-center text-center " initial={{translateX: 0 + "%"}} whileInView={{translateX: 0 + "%"}} transition={{type: "keyframes", duration: 1.5}}>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-3xl text-gray-200">HMAC Hashes</h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  CipherHub Also has HMAC Hashes.<br></br>
                  Just enter a Key and some Plaintext and hash it.
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section id="item2" className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >
        <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
          <div className="flex flex-row align-middle justify-center text-center min-w-[50%] min-h-[fit-content] ">
            <h1 className="text-4xl text-white">HMAC Hashes - SHA256 </h1>
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center text-center min-h-[50vh] min-w-[50%] ">
          <div className="relative w-[100%] h-[45vh] m-auto p-[0] text-center " id="text1"></div>
          <form action="" className="relative w-[75%] h-[5vh] m-auto p-[0] flex flex-row align-middle justify-center text-center " method='post' id="forms">
            <input type="text" placeholder="enter plaintext here" id="plain" className="w-[50%] h-[100%] m-auto p-[0] relative text-center text-2xl text-white bg-transparent border-transparent  " />
            <input type="text" placeholder="enter a key" id="key" className="w-[25%] relative h-[100%] m-auto p-[0] text-center text-2xl text-white bg-transparent border-transparent " />
            <input type="submit" value="submit" id="submit" className="w-[25%] cursor-pointer relative h-[100%] m-auto p-[0] text-center text-2xl underline underline-offset-2 text-white bg-transparent border-transparent " />
          </form>
        </div>
      </motion.section>
      <motion.section id="item3" className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

      </motion.section>
      <motion.section id="item4" className="flex flex-col align-middle justify-center text-center min-h-[100vh] min-w-[100%] " >

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