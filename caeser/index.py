import sys

letters = "abcdefghijklmnopqrstuvwyxz"
def ToCeaser(plain: str): 
    ans = ""
    for x in range(len(plain)):
        if plain[x].isalpha() == False or plain[x].isdigit() == True:
            ans += str(plain[x])
            continue
        for y in range(len(letters)):
            if letters[y] == plain[x]:
                target = y+3
                if target >= len(letters):
                    index = abs(target-len(letters))
                    ans += str(letters[index])
                    continue
                ans += str(letters[target])
    return ans
print(ToCeaser(sys.argv[1]))