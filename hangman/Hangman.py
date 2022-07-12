import random
from typing import List
from constants import *


class Hangman:
    def __init__(self, word: str, hints_left, chances_left) -> None:
        self.curr_word: str = word.upper()
        self.dashed_word: List = [UNGUESSED_CHAR] * len(word)
        self.chances_left: int = chances_left
        self.hints_left: int = hints_left
        self.guessed_alphabets: List[bool] = [False] * 26
        self.game_over = False

    def check_game_over(self) -> bool:
        if(UNGUESSED_CHAR not in self.dashed_word):
            print("YOU HAVE WON!!! The word is", self.curr_word)
            return True
        elif(self.chances_left >= 0):
            return False
        else:
            print("GAME OVER!!! The word is", self.curr_word)
            return True

    def hint(self) -> bool:
        if self.hints_left == 0:
            print(self.hints_left, "Hints left!!!")
            return False

        while(True):  # randomly choose an index until it has not been guessed
            ind: int = random.randint(0, len(self.dashed_word)-1)
            if self.dashed_word[ind] == UNGUESSED_CHAR:
                self.dashed_word[ind] = self.curr_word[ind]
                break
        self.hints_left -= 1
        return True

    def update(self, inp: str) -> bool:
        inp = inp.upper()
        # index of the alphabet entered [A: 0,B: 1 ,....]
        alpha: int = ord(inp) - ord('A')

        if(self.guessed_alphabets[alpha]):
            print(inp, "has already been guessed")
            return False

        self.guessed_alphabets[alpha] = True

        if(inp in self.curr_word and not inp in self.dashed_word):
            for i, x in enumerate(self.curr_word):
                if x == inp:
                    self.dashed_word[i] = inp
        else:
            self.chances_left -= 1

        self.game_over = self.check_game_over()

        if(inp in self.curr_word):
            return True

        return False
