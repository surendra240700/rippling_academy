from ctypes.wintypes import CHAR
from requests import get
import random
from typing import List


CHANCES_LEFT: int = 6


class WordGenerator:
    def __init__(self) -> None:
        self.api: str = 'http://norvig.com/ngrams/sowpods.txt'
        self.words: List[str] = []

    def get_data(self) -> None:
        data: str = get(self.api).text
        self.words = data.split()

    def get_word(self) -> str:
        ind: int = random.randint(0, len(self.words))
        return self.words[ind]


class Hangman:
    def __init__(self, word_generator: WordGenerator) -> None:
        self.word_generator: WordGenerator = word_generator
        self.curr_word: str = ''
        self.dashed_word: List = []
        self.chances_left: int = CHANCES_LEFT

    def welcome(self) -> None:
        print(">>>>>", "WELCOME TO HANGMAN")

    def print_word(self) -> None:
        for i in self.dashed_word:
            print(i, end='')
        print()

    def check_game_over(self) -> bool:
        if('-' not in self.dashed_word):
            print("YOU HAVE WON!!! The word is", self.curr_word)
            return True
        elif(self.chances_left > 0):
            print(self.chances_left, "Chances Left!!!")
            return False
        else:
            print("GAME OVER!!! The word is", self.curr_word)
            return True

    def game_logic(self) -> None:

        self.curr_word = self.word_generator.get_word().upper()
        word_len: int = len(self.curr_word)
        self.dashed_word = ['-'] * word_len
        guessed_alphabets = [False] * 26
        game_over = False
        self.chances_left = CHANCES_LEFT

        while(not game_over):
            self.print_word()
            prompt: str = ">>>>> Guess your letter: "
            inp_letter = input(prompt).upper()
            print(inp_letter)
            if(len(inp_letter) > 1):
                print("Enter only 1 character")
                continue

            if(ord(inp_letter[0]) - ord('A') < 0 or ord(inp_letter[0]) - ord('A') >= 26):
                print("Enter only alphabets(A-Z)")
                continue

            if(guessed_alphabets[ord(inp_letter[0]) - ord('A')]):
                print(inp_letter, "has already been guessed")
                continue

            guessed_alphabets[ord(inp_letter[0]) - ord('A')] = True

            if(inp_letter in self.curr_word):
                for i, x in enumerate(self.curr_word):
                    if x == inp_letter:
                        self.dashed_word[i] = inp_letter
            else:
                self.chances_left -= 1
            game_over = self.check_game_over()

    def start(self):
        # initialize game
        self.welcome()
        self.word_generator.get_data()
        end_game: bool = False
        # Game
        while(not end_game):
            self.game_logic()
            prompt: str = ">>>>> PRESS Q to End Game or Any Key to continue"
            inp: str = input(prompt)
            if(inp == 'Q' or inp == 'q'):
                end_game = True

        print(">>>>> SEE YOU LATER!!!!")


word_generator = WordGenerator()
game = Hangman(word_generator)
game.start()
