#aes

AES or Advance Encryption Standard is a block cipher e.g fixed data like text files or pdf
Since AES is symmetric encryption, it only require one key and on iv (iv help with the randomness)

functions list: 

    1. encryption(<key>, <text>)
    <text> for encryption is just a plaintext word

    2. decryption(<key>, <text>)
    <text> for decryption is the encrypted cipher text

    <key> needs to be the same example randomBytes(32)


Get started: 

    encryption(secret, "hello world").then((value) => {
        console.log(value)
        decryption(secret, value).then((plain) => {
            console.log(plain)
        })
    })
