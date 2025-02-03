import sys
import os

def book_cipher(file: str):
    f1, targets, words = open(file, "r"), [], []
    ans1 = f1.read().split("\n")
    f1.close()
    for x in range(len(ans1)):
        ans2 = ans1[x].split(" ")
        words.append(ans2)
        for y in range(len(ans2)):
            targets.append("".join(str([str(x) + ":" + str(y)])).replace(" ", "").replace("[", "").replace("]", "").replace("'", ""))
    f2 = open("cipher.txt", "w")
    for x in targets:
        f2.write(x + " ")
    f2.close()
    return ""
print(book_cipher(sys.argv[1]))