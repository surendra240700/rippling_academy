from requests import get
import random
from typing import List


class WordGenerator:
    def __init__(self, url) -> None:
        self.api: str = url
        self.words: List[str] = []

    def fetch_data(self) -> None:
        data: str = get(self.api).text
        self.words = data.split()

    def get_word(self) -> str:
        ind: int = random.randint(0, len(self.words) - 1)
        return self.words[ind]
