import { createHash, createHmac, pbkdf2, randomBytes } from 'crypto'
import fs from 'fs'

class hashes{
    async GetHmac(key, hashtype, text){
        const encrypt = createHmac(hashtype, key).update(text).digest("hex")
        console.log(encrypt)
        return encrypt
    }
    async GetHash(hashtype, text){
        const key = randomBytes(32)
        const salt = randomBytes(16).toString("base64"); 

        const encrypt = createHash(hashtype, key).update(text).digest("hex")
        pbkdf2(encrypt, salt, 50, 32, "md5", async (err, keys) =>  {
            if(err){
                throw new Error(err)
            }
            console.log(keys.toString("hex"))
        })
        
    }
}
const obj = new hashes()
obj.GetHmac("1234", "md5", "hello")
