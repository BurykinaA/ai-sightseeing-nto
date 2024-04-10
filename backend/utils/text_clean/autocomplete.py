import csv
from fast_autocomplete import AutoComplete
from typing import List, Dict
import re
import string as s

text = [{'product_name': 'Ноутбук Lenovo ThinkPad X270 [X270 20HN0012RT]'}, {'product_name': 'Материнская плата MSI B250M BAZOOKA PLUS'}, {'product_name': 'Электрочайник Oursson \t EK1763M'}, {'product_name': 'Фен Sinbo SHD-7034'}, {'product_name': 'Ноутбук HP 250 G6 [250G6 1WY51EA]'}, {'product_name': 'Ноутбук HP 15-bs000 [15-BS019UR 1ZJ85EA]'}, {'product_name': 'Видеокарта Gigabyte GeForce GTX 1050 GV-N1050WF2OC-2GD'}, {'product_name': 'Массажер для тела GEZAtone AMG114'}, {'product_name': 'Ноутбук Dell Inspiron 15 5570 [5570-0054]'}, {'product_name': 'Ноутбук Dell Latitude 3480 [3480-6126]'}, {'product_name': 'Монитор Acer G237HLAwi'}, {'product_name': 'Электродуховка Artel MD 4212 E'}, {'product_name': 'Электрическая зубная щетка CS Medica Sonic Pulsar CS-131'}, {'product_name': 'Материнская плата MSI H81M-E33'}, {'product_name': 'Ноутбук MSI GS70 6QE Stealth Pro [GS70 6QE-265]'}, {'product_name': 'Швейная машина, оверлок Singer 14SH754'}, {'product_name': 'Пылесос Samsung SC-432A'}, {'product_name': 'Микроволновая печь Candy CMXW 22 DS'}, {'product_name': 'Ноутбук HP 15-bw000 [15-BW071UR 2CN98EA]'}, {'product_name': 'Антенна для Wi-Fi и 3G Ubiquiti AirMax Sector M-V5G-Ti'}, {'product_name': 'Швейная машина, оверлок BERNINA B580'}, {'product_name': 'Пылесос Agressor AGR 140'}, {'product_name': 'Весы Kromax KS-519'}, {'product_name': 'Кофемолка Saturn ST-CM1033'}, {'product_name': 'Весы Tanita HD-394'}, {'product_name': 'Сумка для ноутбуков Sumdex Impulse Fashion Place Portfolio Brief [Impulse Fashion Place Portfolio Brief 15.4]'}, {'product_name': 'Антенна для Wi-Fi и 3G Antex PETRA Broad Band 75'}, {'product_name': 'Фен Redmond RF-524'}, {'product_name': 'Оперативная память Transcend DDR2 [JM800QLU-2G]'}, {'product_name': 'Фен Beurer HS80'}, {'product_name': 'Фен Gamma Piu Rainbow'}, {'product_name': 'Машинка для стрижки волос Moser 1245-0066'}, {'product_name': 'Жесткий диск WD RE [WD2004FBYZ]'}, {'product_name': 'Монитор Sharp PN-80SC5'}, {'product_name': 'Микроволновая печь LG MS-23M38GIH'}, {'product_name': 'Ноутбук MSI GP72M 7RDX Leopard [GP72M 7RDX-1239]'}, {'product_name': 'Блок питания Thermaltake Toughpower DPS [TPG-0850D]'}, {'product_name': 'Коммутатор Dell X4012'}, {'product_name': 'Оперативная память Corsair Vengeance RGB DDR4 [CMR32GX4M4A2666C16]'}, {'product_name': 'Фен Moser 4445-0050'}, {'product_name': 'Блинница Kromax CM-24'}, {'product_name': 'Коммутатор Cisco WS-C2960X-48TD-L'}, {'product_name': 'Электрочайник Tefal KI 760'}, {'product_name': 'Весы Scarlett SC-KS57P20'}, {'product_name': 'Система охлаждения Thermaltake CLW0222'}, {'product_name': "Кофемолка De'Longhi KG 49"}, {'product_name': 'Коммутатор HP JG221A'}, {'product_name': 'Ноутбук Lenovo Ideapad 710S 13 [710S-13ISK 80SW0063RK]'}, {'product_name': 'Швейная машина, оверлок Toyota ART 20'}, {'product_name': 'Сумка для ноутбуков Sumdex Passage Computer Brief PON-328 [Passage Computer Brief PON-328 15.6]'}]

class LayoutCorrector:
    def __init__(self):
        self.rus = "§1234567890-=qwertyuiop[]asdfghjkl;'\`zxcvbnm,./"
        self.eng = ">1234567890-=йцукенгшщзхъфывапролджэё]ячсмитьбю/"
        self.ru2en_dict = dict(zip(self.eng, self.rus))
        self.en2ru_dict = dict(zip(self.rus, self.eng))

    def en2ru(self, string) -> str:
        return "".join([self.en2ru_dict[a] for a in string])
    
    def ru2en(self, string) -> str:
        return "".join([self.ru2en_dict[a] for a in string])

    def isEnglish(self, string) -> bool:
        count = 0
        for x in string:
            if x in self.eng:
                count += 1
        if len(string) * 0.5 < count:
            return False
        return True


class AutoCompleter:
    def __init__(
        self, 
        path2csv = None, 
        trainColumnName = "Название СТЕ", 
    ) -> None:
        self.symbols = self.getValidSymbols()
        self.trainColumnName = trainColumnName
        self.words = self.getWords()
        self.autoComplete = self.getAutoComplete(self.words, self.symbols)
        self.corrector = LayoutCorrector()

    def getValidSymbols(self):
        return s.ascii_lowercase + "абвгдеёжзийклмнопрстуфхцчшщъыьэюя" + "1234567890"

    def processString(self, query: str, do_print = False) -> str:

        do_print = False
        # Remove Unicode
        output_string = re.sub(r'\W+', ' ', query)
        # Remove Mentions
        output_string = re.sub(r'@\w+', '', output_string)
        # Lowercase the document
        output_string = output_string.lower()
        # Remove punctuations
        # soutput_string = re.sub(r'[%s]' % re.escape('.,/"'), ' ', output_string)
        # Remove the doubled space
        output_string = re.sub(r'\s{2,}', ' ', output_string)
        if do_print:
            print(output_string)
        return output_string


    def getWords(self) -> Dict[str, dict]:
        words = {}

        for line in text:
            processed_string = line['product_name']
            local_words = processed_string.split(" ")
            while local_words:
                word = local_words.pop()
                if word not in words:
                    words[word] = {}
            if processed_string not in words:
                words[processed_string] = {}
        return words
    
    def getAutoComplete(self, words, symbols):
        return AutoComplete(
            words=words,
            valid_chars_for_string= symbols
            )
    
    def search(self, query : str, size = 5, max_cost = 2, translated = False) -> List[str]:
        outputs = self.autoComplete.search(
            word=self.processString(query, do_print = True), 
            size = size, 
            max_cost = max_cost
            )
        output = [item[0] for item in outputs]
        if not output and not translated:
            if self.corrector.isEnglish(query):
                output = self.search(
                    self.corrector.en2ru(query), size, max_cost, True
                    )
            else:
                output = self.search(
                    self.corrector.ru2en(query), size, max_cost, True
                    )
        if not output:
            return "Товаров по данному запросу не найдено"
        return output


    def __call__(self, query : str, size = 5, max_cost = 2, translated = False) -> List[str]:
        return self.search(query, size, max_cost, translated)


corrector = LayoutCorrector()
completer = AutoCompleter()

if __name__ == "__main__":
    corrector = LayoutCorrector()
    completer = AutoCompleter()

    while True:
       print(completer(input("search...")))
