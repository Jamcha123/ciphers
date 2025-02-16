import fs from 'fs'; 
import {createCipheriv, randomBytes, createDecipheriv} from 'crypto'; 

const secret = randomBytes(32)
const iv = randomBytes(16)

const encryption = async (key, text) => {
    const cipher = createCipheriv("aes256", key, iv)
    let encrypted = cipher.update(text, "utf-8", "hex") + cipher.final("hex")
    return encrypted
}
const decryption = async (key, text) => {
    const decipher = createDecipheriv("aes256", key, iv); 
    let decrypted = decipher.update(text, "hex", "utf-8") + decipher.final("utf-8"); 
    return decrypted.toString("utf-8")
}
encryption(secret, "hello world").then((value) => {
    console.log(value)
    decryption(secret, value).then((plain) => {
        console.log(plain)
    })
})