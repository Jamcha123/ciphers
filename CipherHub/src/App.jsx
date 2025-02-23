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
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item3">Symmetric Encryption</a></li>
            </div>
            <div className="relative w-[fit-content] h-[100%] m-auto p-[0] hidden lg:flex flex-col align-middle justify-center text-center ">
              <li className="text-2xl text-white underline underline-offset-3"><a href="#item4">Public-Private Keys</a></li>
            </div>
          </ul>
          <ul className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[75%] md:min-w-[50%] lg:min-w-[25%] ">
            <div className="flex flex-row align-middle justify-evenly text-center min-h-[50%] min-w-[75%] ">
              <a href="https://github.com/jamcha123/ciphers">
                <img src={git} className="cursor-pointer" width="30px" height="30px" alt="" />
              </a>
              <div className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[50%] ">
                <iframe className="cursor-pointer bg-gray-600 rounded-xl text-3xl" src="https://github.com/sponsors/Jamcha123/button" title="Sponsor Jamcha123" height="32" width="120"></iframe>
              </div>
            </div>
          </ul>
        </div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 0.5}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item1">About CipherHub</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item2">Hmac Hashes</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 0.5}}>
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[50%] ">
            <li className="text-2xl text-white list-none underline underline-offset-1 "><a href="#item3">Symmetric Encryption</a></li>
          </div>
        </motion.div>
        <motion.div className="relative w-[100%] mt-[1%] h-[5vh] m-auto p-[0] flex lg:hidden align-middle justify-center text-center flex-col " initial={{translateX: -0 + "%"}} animate={{translateX: active? 0 + "%" : -100 + "%"}} transition={{type: "keyframes", duration: 1}}>
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
    const forms1 = document.getElementById("forms1"); 
    const text1 = document.getElementById("text1"); 
    const plain = document.getElementById("plain"); 
    const key1 = document.getElementById("key1"); 

    forms1.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      jquery("#text1").empty(); 

      const link = "https://hmac-mfkmp3s2rq-uc.a.run.app?key=" + key1.value + "&text=" + plain.value + ""
      const data = await axios.get(link)

      let x = document.createElement("h2"); 
      x.innerText = data["data"] 
      text1.appendChild(x); 

      plain.value = ""
      key1.value = ""
    })
    const forms2 = document.getElementById("forms2")
    const plaintext = document.getElementById("plaintext1"); 
    const key2 = document.getElementById("key2")
    const [text2, text3] = [document.getElementById("text2"), document.getElementById("text3")]; 

    forms2.addEventListener("submit", async (e) => {
      e.preventDefault();
      jquery("#text2").empty()
      jquery("#text3").empty()
      if(key2.value == "" || plaintext.value == ""){
        alert("key or plaintext is empty")
        plaintext.value = ""
        key2.value = ""
      }else{
        const link = "https://aes-mfkmp3s2rq-uc.a.run.app/?key=" + key2.value + "&text=" + plaintext.value + ""; 

        const webby = await axios.get(link)
        const $ = cheerio.load(webby["data"])
        const data1 = $("p:first").text()
        const data2 = $("p:last").text()
  
        const x = document.createElement("h3")
        x.innerText = "ciphertext: " + data1.toString("utf-8")
        text2.appendChild(x)
  
        const y = document.createElement("h3"); 
        y.innerText = "plaintext: " + data2.toString("utf-8")
        text3.appendChild(y)

        plaintext.value = ""
        key2.value = ""
      }
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
        <div className="flex flex-row align-middle justify-center text-center min-h-[25%] min-w-[75%]">
          <div className="flex flex-row align-middle justify-start text-start min-h-[100%] min-w-[35%] ">
            <h1 className="text-3xl text-gray-300">Ciphers and Encryption</h1>
          </div>
        </div>
        <div className="flex xl:flex-row flex-colalign-middle justify-center text-center min-h-[75%] min-w-[75%] mt-[5%]">
          <div className="flex xl:flex-row flex-col align-middle justify-evenly text-cemter min-h-[100%] min-w-[100%] ">
            <a className="underline underline-offset-2 text-violet-400 text-2xl mt-[5%] xl:mt-[0%]  " href="#item2">HMAC Hashes</a>
            <a className="underline underline-offset-2 text-violet-400 text-2xl mt-[5%] xl:mt-[0%]  " href="#item3">Symmetric encryption</a>
            <a className="underline underline-offset-2 text-violet-400 text-2xl mt-[5%] xl:mt-[0%]  " href="#item4">Public - Private keys</a>
          </div>
        </div>
      </motion.section>
      <motion.section id="item1" className="flex flex-col align-middle justify-center text-center min-h-[80vh] min-w-[100%] " >
        <div className="flex flex-row align-middle justify-center text-center min-h-[fit-content] min-w-[75%] ">
          <div className="flex flex-row align-middle justify-center text-center min-h-[100%] min-w-[75%]  ">
            <h1 className="text-4xl text-white">About CipherHub</h1>
          </div>
        </div>
        <div className="relative w-[75%] h-[75vh] mt-[5%] xl:mt-[0%] m-auto p-[0] grid-cols-2 grid-rows-2 gap-[50px] flex flex-col align-middle justify-center xl:grid  ">
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
                  CipherHub uses the MIT license
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
                <h1 className="text-3xl text-gray-200">Bugs and Errors</h1>
              </div>
            </div>
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] mt-[1%] min-h-[fit-content] ">
              <div className="flex flex-row align-middle justify-start text-start min-w-[90%] min-h-[fit-content] ">
                <h1 className="text-xl text-gray-300 ">
                  Report any bugs to my Github Issues page.<br></br>
                  <a className="underline underline-offset-2 text-2xl text-violet-500 " href="https://github.com/Jamcha123/ciphers/issues">Issues</a>
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
      <motion.section id="item2" className="flex flex-col align-middle justify-center text-center mt-[5%] min-h-[50vh] min-w-[100%] " >
        <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[fit-content] ">
          <div className="flex flex-col align-middle justify-center text-center min-w-[50%] min-h-[fit-content] ">
            <h1 className="text-4xl text-white">HMAC Hashes - SHA256 </h1><br></br>
            <a href="https://en.wikipedia.org/wiki/HMAC" className="text-2xl underline underline-offset-2 text-violet-400">HMAC wikipedia</a>
          </div>
        </div>
        <div className="flex flex-col align-middle justify-center text-center min-h-[50vh] min-w-[50%] ">
          <form action="" className="relative w-[75%] h-[50vh] m-auto p-[0] flex flex-col align-middle justify-center text-center " method='post' id="forms1">
            <div className="relative w-[100%] h-[10vh] m-auto p-[0] text-center " id="text1"></div>
            <input type="text" placeholder="enter plaintext here" id="plain" className="w-[100%] h-[5vh] underline underline-offset-6 m-auto p-[0] relative text-center text-2xl text-gray-300 bg-transparent border-transparent  " />
            <input type="text" placeholder="enter a key" id="key1" className="w-[100%] relative h-[5vh] underline underline-offset-6 m-auto p-[0] text-center text-2xl text-gray-300 bg-transparent border-transparent " />
            <input type="submit" value="submit" id="submit" className="w-[100%] cursor-pointer relative h-[5vh] m-auto p-[0] text-center text-2xl underline underline-offset-2 text-white bg-transparent border-transparent " />
          </form>
        </div>
      </motion.section>
      <motion.section id="item3" className="flex flex-col align-middle justify-center text-center min-h-[75vh] mt-[5%] min-w-[100%] " >
        <div className="flex flex-col align-middle justify-center text-center min-w-[25%] min-h-[100%]">
          <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[15vh] ">
            <div className="flex flex-col align-middle justify-center text-center min-w-[fit-content] min-h-[100%] ">
              <h1 className="text-4xl text-white ">Symmetric Encryption - AES</h1>
            </div>
          </div>
          <div className="flex flex-col align-middle justify-evenly text-center min-w-[100%] min-h-[40vh] ">
            <div id="text2" className="flex flex-row align-middle justify-center text-center min-h-[50%] min-w-[100%] ">
            </div>
            <div id="text3" className="flex flex-row align-middle justify-center text-center min-h-[50%] min-w-[100%] ">
            </div>
          </div>
          <form action="" method="post" id="forms2" className="flex flex-col align-middle justify-center text-center min-w-[100%] min-h-[10vh] ">
            <div className="flex flex-row align-middle justify-center text-center min-w-[100%] min-h-[5vh] ">
              <input type="text" id="plaintext1" className="relative w-[25%] h-[5vh] m-auto p-[0] text-white text-center text-2xl border-transparent bg-transparent " placeholder="enter plaintext here" />
              <input type="text" id="key2" className="relative w-[25%] h-[5vh] m-auto p-[0] text-white text-center text-2xl border-transparent bg-transparent " placeholder="enter AES key here" />
            </div>
            <input type="submit" className="w-[100%] cursor-pointer relative h-[5vh] m-auto p-[0] bg-transparent border-transparent underline-offset-2 underline text-2xl text-white " id="submit" value="submit" />
          </form>
        </div>
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