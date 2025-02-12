const {randomBytes, generateKeyPair} = require("crypto"); 
const assert = require("assert"); 

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
    console.log("public key is " + publickey.toString("hex"));
    console.log("private key is " + privatekey.toString("hex"));
})