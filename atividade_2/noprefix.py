#!/bin/python3
import math
import os
import random
import re
import sys

#
# Complete the 'noPrefix' function below.
#
# The function accepts STRING_ARRAY words as parameter.
#

#!/bin/python3


class NoTrie:
    def __init__(self):
        self.filhos = {}
        self.e_final = False

def noPrefix(palavras):
    raiz = NoTrie()

    for palavra in palavras:
        palavra = palavra.strip() 
        no = raiz
        for c in palavra:
            if no.e_final:  
                print("BAD SET")
                print(palavra)
                return
            if c not in no.filhos:
                no.filhos[c] = NoTrie()
            no = no.filhos[c]
        if no.e_final or no.filhos:  
            print("BAD SET")
            print(palavra)
            return
        no.e_final = True

    print("GOOD SET")

if __name__ == '__main__':
    n = int(input().strip())
    palavras = []

    for _ in range(n):
        palavra_item = input().strip()
        palavras.append(palavra_item)

    noPrefix(palavras)