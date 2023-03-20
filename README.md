# PV247 projekt

Představme si, že se nacházíme v roce 2012 a chci jezdit po Brně na kole, šalinou nebo autem. Naše appka bude na základě dopravních nehod doporučovat, který dopravní prostředek je vhodný pro zítřejší cestování.

Jelikož si hrajeme na to, že je rok 2012, máme informaci o tom, jaké nehody se “zítra” stanou (zítra v roce 2012). Proto dokážeme říct, aby uživatel jel zítra autem, protože se třeba stanou 3 nehody cyklistů. Informace o nehodách poskytuje brněnské API.

Přihlášený uživatel si může uložit předdefinované “oblíbené” lokace v Brně, ve kterých často jezdí a customizovat si tak, které nehody se mu budou zobrazovat. (To API poskytuje info o tom, kde se ta nehoda stala, tak dokážeme vyfiltrovat jen ty nehody, které se staly v lokacích, které má uživatel vytvořené). Na stránce bude taky vyhledávací pole na fulltext search v nehodách, které se staly za např. poslední týden. Dále filter podle typu nehody - auto, kolo, šalina.

API: https://data.brno.cz/search

Firebase kolekce:

- User - id, name, accidents
- Location - id, name
- UserLocation - userId, locationId
- ReceantlySearchedTrip - id, from, to, searchedOn, pinned, userEmail

Screens:

- `/` Úvodní stránka (Landing page)
- `/auth/home` Home - Informace o včerešjím, dnšením a zítřejším dni
- `/auth/profile` - Uživatelský profil - úpravy preferencí uživatelových lokací.
  - Výběr preferovaných lokací
  - Zobrazení posledních vyhledávání na stránce `/auth/plan-trip`
    - Možnost řazení pomocí "pinu"
- `/auth/forecast` - Forecast - předpověď na další dny
  - Týdenní/denní zobrazení. Možnost zobrazení nehody u konkrétního dne
  - Vyhledávání nehody
- `/auth/plan-trip` - Plan your trip - Zobrazení mapy s nehodami s možností vyhledání trasy
  - Mapycz mapy + API + Suggest
  - Zobrazení nehody po kliknutí na "pin" na mapě
  - Vykreslení trasy po zadání from-to
  - Zobrazení posledních vyhledávaných tras

Stack:

- Next 13
- Firebase
- NextAuth
- Firestore
- React-query
- DaisyUI, Tailwindcss

---
TODOs:
- [ ] Odstranit všechny TODOs v kódu
- [ ] Nastavit CRON na Upstash nebo Vercelu - revalidovat `/auth/home` jednou denně
- [ ] Umožnit zvolit rok v `/auth/forecast` (a přizpůsobit volbu týdnů)
- [x] Upravit importy - nastavit baseUrl
