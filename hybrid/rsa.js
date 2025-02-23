import {generateKeyPairSync} from 'crypto'
export const {privateKey, publicKey} = generateKeyPairSync("rsa", {
    modulusLength: 1000, 
    publicKeyEncoding: {
        type: "pkcs1", 
        format: "pem"
    }, 
    privateKeyEncoding: {
        type: "pkcs8", 
        format: "pem"
    }
})