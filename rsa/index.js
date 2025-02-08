const {randomBytes, createHash, createDiffieHellman, generateKey, generatePrime, createECDH} = require("crypto"); 
const assert = require("assert"); 

const keys = async () => {
    const alice = createECDH("secp521r1"); 
    const alicekey = alice.generateKeys()

    const bob = createECDH("secp521r1"); 
    const bobkey = bob.generateKeys()

    const aliceSecret = alice.computeSecret(bobkey)
    const bobSecret = bob.computeSecret(alicekey)

    assert.strictEqual(aliceSecret.toString("hex"), bobSecret.toString("hex")); 
    return {
        "private_key": bobSecret.toString("hex"),
        "public_key": aliceSecret.toString("hex")
    }
}
