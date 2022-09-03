from word_generator import WordGenerator
from constants import *
from hangman import Hangman


class GameRunner:
    def __init__(self):
        self.word_generator: WordGenerator = WordGenerator(SOWPODS)
        self.word_generator.fetch_data()
        self.hangman: Hangman = None

    def initlaize_game(self):
        word: str = self.word_generator.get_word()
        self.hangman = Hangman(word, HINTS_LEFT, CHANCES_LEFT)

    def print_word(self) -> None:
        print("\n        ", end='')
        for i in self.hangman.dashed_word:
            print(i, end=' ')
        print('\n')

    def get_input(self) -> str:
        self.print_word()
        print(self.hangman.chances_left, "Chances Left!!!")
        print(self.hangman.hints_left, "Hints Left!!! (press 0 for hint)")
        prompt: str = ">>>>> Guess your letter: "
        inp_letter = input(prompt).upper()
        return inp_letter

    def check_input(self, inp: str) -> bool:
        inp = inp.upper()
        if(len(inp) != INPUT_LENGTH):
            print("Enter only {:d} character".format(INPUT_LENGTH))
            return False
        # index of the alphabet entered [A: 0,B: 1 ,....]
        alpha: int = ord(inp) - ord('A')

        if(alpha < 0 or alpha >= NO_ALPHABETS):
            print("Enter only alphabets(A-Z)")
            return False

        return True

    def check_hint(self, inp: str) -> bool:
        if(inp == HINT_OPTION):  # For hints
            return True
        return False

    def get_endgame_input(self) -> str:
        prompt: str = ">>>>> PRESS Q to End Game or Any Key to continue: "
        inp: str = input(prompt)
        return inp

    def check_endgame(self, inp: str) -> bool:
        if(inp == 'Q' or inp == 'q'):
            return True
        return False

    def start_game(self) -> bool:
        self.initlaize_game()

        while(not self.hangman.game_over):
            inp = self.get_input()
            is_hint: bool = self.check_hint(inp)

            upd: bool = False
            if(is_hint):
                upd = self.hangman.hint()
                continue

            is_valid_input: bool = self.check_input(inp)
            if(is_valid_input):
                upd = self.hangman.update(inp)

        inp = self.get_endgame_input()
        end_game: bool = self.check_endgame(inp)

        return end_game


if __name__ == '__main__':
    game: GameRunner = GameRunner()
    end_game: bool = False
    while(not end_game):
        end_game = game.start_game()
