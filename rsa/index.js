const {randomBytes, generateKeyPair, publicEncrypt, privateDecrypt} = require("crypto"); 
const assert = require("assert"); 
const fs = require("fs")


generateKeyPair("rsa", {
    modulusLength: 530,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem"
    },
    privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
    }
}, (err, publickey, privatekey) => {
    if(err){
        throw new Error(err)
    }
    const text = fs.readFileSync("./plain.txt", "utf-8")
    const encrypted = publicEncrypt(publickey, Buffer.from(text))
    console.log(encrypted.toString("hex"))
    fs.createWriteStream("cipher.txt", "utf-8").write(encrypted.toString("hex"))

    const decrypted = privateDecrypt(privatekey, encrypted)
    console.log(decrypted.toString("utf-8"))
})