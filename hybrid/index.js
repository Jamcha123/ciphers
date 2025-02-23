import { createCipheriv, createDecipheriv, createSign, generateKeyPair, generateKeyPairSync, privateDecrypt, publicEncrypt, randomBytes, scryptSync, sign, verify } from 'crypto'
import fs from 'fs'; 
import {privateKey, publicKey} from './rsa.js'

const secret = "1234"
const iv = randomBytes(16)

const encryptAES = (secret, iv, plaintext) => {
    const password = scryptSync(secret, "GfG", 32); 

    const cipher = createCipheriv("aes256", password, iv)
    let encrypted = cipher.update(plaintext, "utf-8") + cipher.final("hex")
    fs.createWriteStream("cipher.txt", "utf-8").write(encrypted)

    const encryptSecret = publicEncrypt(publicKey, Buffer.from(secret))
    const signing = sign("RSA-SHA256", Buffer.from(encryptSecret), privateKey)

    return [encrypted, encryptSecret, signing]
}
const decryptAES = (secret, iv, ciphertext) => {
    const decryptSecret = privateDecrypt(privateKey, Buffer.from(secret))
    const password = scryptSync(decryptSecret, "GfG", 32)
    
    const decipher = createDecipheriv("aes256", password, iv)
    let decrypted = decipher.update(ciphertext, "hex") + decipher.final("utf-8"); 

    return decrypted
}
fs.readFile("./plain.txt", async (err, data) => {
    if(err){
        throw new Error(err)
    }
    const obj = encryptAES(secret, iv, data.toString("utf-8")); 
    new Promise((resolve, rejected) => {
        const isVerify = verify("RSA-SHA256", Buffer.from(obj[1]), publicKey, obj[2])
        if(isVerify === true){
            resolve([obj[0], obj[1]])
        }else{
            rejected("failed to verify public-private keys")
        }
    }).then((value) => {
        const arr = {
            "original": data.toString("utf-8"), 
            "ciphertext": obj[0], 
            "plaintext": decryptAES(value[1], iv, value[0])
        }
        console.log(arr)
    }).catch((err) => {
        throw new Error(err)
    })
})
