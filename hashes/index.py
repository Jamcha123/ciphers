import hashlib
import base64
import sys
import random

def hashed(plain: str):
    ans = plain.encode("ascii")
    baseEncode = base64.b64encode(ans)

    getHash = hashlib.sha256(ans).hexdigest()
    return getHash
print(hashed(sys.argv[0]))