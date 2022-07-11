import unittest
from typing import List
from hangman import Hangman
from game import Game, GameRunner
from constants import *


class HangmanTest(unittest.TestCase):
    def test_hints(self) -> None:
        hangman: Hangman = Hangman("surendra", 0, 1)
        self.assertEqual(hangman.hint(), False)  # since we have only 0 hints

        hangman: Hangman = Hangman("surendra", 1, 1)
        self.assertEqual(hangman.hint(), True)
        self.assertEqual(hangman.hint(), False)  # since we have only 1 hint

        hangman: Hangman = Hangman("surendra", 2, 1)
        self.assertEqual(hangman.hint(), True)
        self.assertEqual(hangman.hint(), True)
        self.assertEqual(hangman.hint(), False)  # since we have only 2 hints

    def test_update(self) -> None:
        hangman: Hangman = Hangman("surendra", 0, 10)
        self.assertEqual(hangman.update('s'), True)
        self.assertEqual(hangman.update('s'), False)
        self.assertEqual(hangman.update('u'), True)

    def test_gameover(self) -> None:
        hangman: Hangman = Hangman("surendra", 0, 1)
        hangman.update('s')
        self.assertEqual(hangman.check_game_over(), False)
        hangman.update('p')
        self.assertEqual(hangman.check_game_over(), False)
        hangman.update('o')
        self.assertEqual(hangman.check_game_over(), True)


class GameTest(unittest.TestCase):
    def test_check_endgame(self) -> None:
        game: GameRunner = GameRunner()
        self.assertEqual(game.check_endgame('q'), True)
        self.assertEqual(game.check_endgame('Q'), True)
        self.assertEqual(game.check_endgame('i'), False)
        self.assertEqual(game.check_endgame('z'), False)
        self.assertEqual(game.check_endgame(''), False)

    def test_check_hint(self) -> None:
        game: GameRunner = GameRunner()
        self.assertEqual(game.check_hint('0'), True)
        self.assertEqual(game.check_hint('1'), False)
        self.assertEqual(game.check_hint('a'), False)
        self.assertEqual(game.check_hint('b'), False)
        self.assertEqual(game.check_hint('c'), False)

    def test_check_input(self) -> None:
        game: GameRunner = GameRunner()
        self.assertEqual(game.check_input(''), False)
        self.assertEqual(game.check_input('1'), False)
        self.assertEqual(game.check_input('a'), True)
        self.assertEqual(game.check_input('A'), True)
        self.assertEqual(game.check_input('ab'), False)
