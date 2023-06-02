# Vue-Movie

MovieApp to aplikacja Vue.js, kt�ra umo�liwia u�ytkownikom wyszukiwanie film�w za pomoc� API OMDb i wy�wietlanie wynik�w wyszukiwania w przyjaznym interfejsie.

## Funkcje

- Wyszukiwanie film�w: U�ytkownicy mog� wyszukiwa� filmy po tytule za pomoc� paska wyszukiwania.
- Szczeg�y filmu: Klikni�cie na wybrany film z wynik�w wyszukiwania wy�wietla szczeg�owe informacje o filmie.
- Responsywny design: Aplikacja zosta�a zaprojektowana tak, aby dobrze dzia�a� na r�nych rozmiarach ekranu, w tym na urz�dzeniach mobilnych.

## U�yte Technologie

- Vue.js: Framework JavaScript do budowania interfejs�w u�ytkownika.
- Vue Router: Oficjalny router dla Vue.js do obs�ugi nawigacji mi�dzy r�nymi widokami.
- Axios: Klient HTTP oparty na obietnicach do wykonywania zapyta� API.
- OMDb API: Otwarte API Bazy Danych Filmowych do pobierania informacji o filmach.

## Rozpocz�cie pracy

Post�puj zgodnie z poni�szymi instrukcjami, aby rozpocz�� prac� z projektem MovieApp:

1. Sklonuj repozytorium:
git clone https://github.com/lukocu/Vue-Movie.git
2. Przejd� do katalogu projektu:
cd Vue-Movie
3. Zainstaluj zale�no�ci:
npm install
4. Utw�rz plik `.env` w g��wnym katalogu projektu i dodaj sw�j klucz API OMDb:
 VUE_APP_API_KEY=tw�j-klucz-api
5. Uruchom serwer deweloperski:
 npm run serve
6. Otw�rz aplikacj� w przegl�darce:
http://localhost:8080/
