#hybrid 

hybrid is a mix of AES and RSA encryption. 

How it Works: 

    1. First it creates a public and private key in the RSA.js file then it exports the keys to the index.js file

    2. Then it initializes the global variables secret and iv.
    secret is the symmetric key for AES and iv is a random 16 bytes string for random cryptography creation.

    3. Then it encrypts the contents of the plain.txt text file and puts in the cipher text file. 

    4. Then it encrypt the AES secret using the public key and signs it using the private key.

    5. It has to verify the encrypted AES key using the public key before you can decrypt the Ciphertext. 

How to use: 
    
    1. the plain text file contains the words that you want to encrypt. 

    2. you can change the secret global variable which is the AES key. 

    3. run node index.js

    node index.js