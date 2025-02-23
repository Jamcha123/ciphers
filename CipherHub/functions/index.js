import * as functions from 'firebase-functions'; 
import {onDocumentCreated} from 'firebase-functions/v2/firestore'
import {getFirestore} from 'firebase-admin/firestore'
import {initializeApp} from 'firebase-admin/app'
import {createCipheriv, createDecipheriv, createHmac, generateKeyPair, createSign, randomBytes, scryptSync, pbkdf2} from 'crypto'; 

initializeApp(); 

export const aes = functions.https.onRequest({cors: true}, async (req, res) => {
    const key = scryptSync(req.query.key, "GfG", 32)
    const iv = Buffer.alloc(16, 0) 
    const text = req.query.text;  

    const cipher = createCipheriv("aes256", key, iv); 
    let encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex") 

    const decipher = createDecipheriv("aes256", key, iv)
    let decrypted = decipher.update(encrypted.toString("hex"), "hex", "utf-8") + decipher.final("utf8")
    res.status(200).send("<p>" + encrypted.toString("hex") + "</p><p>" + decrypted.toString("utf-8") + "</p>")
    return res.end() 
})
export const rsa_keys = functions.https.onRequest({cors: true}, async (req, res) => {    
    const length = req.query.length
    generateKeyPair("rsa", {
        modulusLength: Number.parseInt(length),
        publicKeyEncoding: {
            type: "pkcs1", 
            format: "pem", 
        }, 
        privateKeyEncoding: {
            type: "pkcs8", 
            format: "pem"
        }
    }, (err, publicKey, privateKey) => {
        if(err){
            throw new functions.https.HttpsError(err)
        }
        res.status(200).send("<p>" + publicKey + "</p><p>" + privateKey + "</p>")
        return res.end()
    })
})
export const hmac = functions.https.onRequest({cors: true}, async (req, res) => {
    const key = req.query.key;
    const text = req.query.text

    const encrypt = createHmac("sha256", key).update(text.toString()).digest("hex")
                                        
    res.status(200).send(encrypt)
    return res.end()
})