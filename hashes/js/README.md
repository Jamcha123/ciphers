#js 

js is the JS version of the hashing program. 

It has two functions GetHMAC() and GetHash()

functions list:

    GetHMAC(<key>, <hashtype>, <text>)

    GetHash(<hashtype>, <text>)
    GetHash will return a salted hash word 

Arguments list: 

    1. key is secret for the HMAC hash function
    
    2. hashtype is the hash type like md5 or sha1

    3. text is the word you want to hash

Get Started: 

    const obj = new hashes()
    obj.GetHMAC("1234", "md5", "hello world")
    obj.GetHash("md5", "hello world") 