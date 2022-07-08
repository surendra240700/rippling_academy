from typing import List
from wordGenerator import WordGenerator
from constants import *
from Hangman import Hangman

if __name__ == '__main__':
    word_generator = WordGenerator(SOWPODS)
    game = Hangman(word_generator)
    game.start()
