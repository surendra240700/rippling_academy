from ctypes.wintypes import CHAR
from requests import get
import random
from typing import List


CHANCES_LEFT: int = 6
HINTS_LEFT: int = 1
NO_ALPHABETS: int = 26
INPUT_LENGTH: int = 1
SOWPODS: str = 'http://norvig.com/ngrams/sowpods.txt'


class WordGenerator:
    def __init__(self, url) -> None:
        self.api: str = url
        self.words: List[str] = []

    def get_data(self) -> None:
        data: str = get(self.api).text
        self.words = data.split()

    def get_word(self) -> str:
        ind: int = random.randint(0, len(self.words) - 1)
        return self.words[ind]


class Hangman:
    def __init__(self, word_generator: WordGenerator) -> None:
        self.word_generator: WordGenerator = word_generator
        self.curr_word: str = ''
        self.dashed_word: List = []
        self.chances_left: int = CHANCES_LEFT
        self.hints_left: int = HINTS_LEFT
        self.guessed_alphabets: List[bool] = []

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
            return False
        else:
            print("GAME OVER!!! The word is", self.curr_word)
            return True

    def hint(self) -> None:
        if self.hints_left == 0:
            print(self.hints_left, "Hints left!!!")
            return

        while(True):
            ind: int = random.randint(0, len(self.dashed_word)-1)
            if self.dashed_word[ind] == '-':
                self.dashed_word[ind] = self.curr_word[ind]
                break
        self.hints_left -= 1
        return

    def update(self, inp_letter: str) -> None:

        if(len(inp_letter) != INPUT_LENGTH):
            print("Enter only {:d} character".format(INPUT_LENGTH))
            return
        # index of the alphabet entered [A: 0,B: 1 ,....]
        alpha: int = ord(inp_letter) - ord('A')

        if(alpha < 0 or alpha >= NO_ALPHABETS):
            print("Enter only alphabets(A-Z)")
            return

        if(self.guessed_alphabets[alpha]):
            print(inp_letter, "has already been guessed")
            return

        self.guessed_alphabets[alpha] = True

        if(inp_letter in self.curr_word):
            for i, x in enumerate(self.curr_word):
                if x == inp_letter:
                    self.dashed_word[i] = inp_letter
        else:
            self.chances_left -= 1

    def get_input(self) -> str:
        self.print_word()
        print(self.chances_left, "Chances Left!!!")
        print(self.hints_left, "Hints Left!!! (press 0 for hint)")
        prompt: str = ">>>>> Guess your letter: "
        inp_letter = input(prompt).upper()
        return inp_letter

    def game_logic(self) -> None:

        self.curr_word = self.word_generator.get_word().upper()
        word_len: int = len(self.curr_word)
        self.dashed_word = ['-'] * word_len
        game_over = False
        self.chances_left = CHANCES_LEFT
        self.hints_left = HINTS_LEFT
        self.guessed_alphabets = [False] * 26

        while(not game_over):
            inp_letter = self.get_input()
            if(inp_letter == '0'):  # For hints
                self.hint()
                continue
            self.update(inp_letter)
            game_over = self.check_game_over()

    def check_endgame(self) -> bool:
        end_game: bool = False
        prompt: str = ">>>>> PRESS Q to End Game or Any Key to continue: "
        inp: str = input(prompt)
        if(inp == 'Q' or inp == 'q'):
            end_game = True
        return end_game

    def start(self):
        # initialize game
        self.welcome()
        self.word_generator.get_data()
        end_game: bool = False

        # Game
        while(not end_game):
            self.game_logic()
            end_game = self.check_endgame()

        print(">>>>> SEE YOU LATER!!!!")


if __name__ == '__main__':
    word_generator = WordGenerator(SOWPODS)
    game = Hangman(word_generator)
    game.start()
