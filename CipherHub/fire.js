import { initializeApp } from 'firebase/app'; 
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check'; 
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'; 


const config = {
    apiKey: "AIzaSyASU7cBHuQH_hu0Gja3HiNj9i3adfkkL4I",
    authDomain: "todo-36be6.firebaseapp.com",
    projectId: "todo-36be6",
    storageBucket: "todo-36be6.firebasestorage.app",
    messagingSenderId: "839968582920",
    appId: "1:839968582920:web:cfd0a9a5e4e32ee46c10bd",
    measurementId: "G-W81KCC8QST"
}

const app = initializeApp(config); 

const appcheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider("6LeeQswqAAAAALGqg_L4fM6c-IneR6IFZb8tZ3KD"), 
    isTokenAutoRefreshEnabled: true
})

const auth = getAuth(app)
auth.useDeviceLanguage()

signInAnonymously(auth); 

onAuthStateChanged(auth, (user) => {
    if(user == null){
        console.log("user, noy found")
    }else{
        console.log("user logged in")
    }
})