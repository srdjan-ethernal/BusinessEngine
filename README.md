# Business Engine

Statički demo sajt za pregled i pripremu biznisa. Početna stranica **My business** prikazuje tri primera: **Robot factory**, **Dropshipping** i **Amazon referrals**. Prva dva imaju demo datum početka i zaradu, dok Amazon referrals još nije pokrenut.

**New business** otvara wizard sa ulaznim parametrima i četiri faze: Product Market Fit, Go-To-Market, Marketing i Sales. Svaki biznis ima zasebne detalje od pripreme do poslovanja. Stranica agenata predstavlja 24 stručna agenta. Faze su ubrzane simulacije koje mogu da se pauziraju i nastave.

Podaci se čuvaju lokalno u pregledaču (`localStorage`).

## Provera

Ako imate Node.js, pokrenite `node tests/portfolio.cjs`. Provera pokriva odvojene projekte, faze u pozadini, pauzu i nastavak, čuvanje i finansijske izvoze.

## Pokretanje

Otvorite `index.html` u pregledaču ili pokrenite lokalni server iz ovog direktorijuma:

```sh
python -m http.server 8080
```

Zatim otvorite [http://localhost:8080](http://localhost:8080).

Ovo je demo bez backend-a i povezivanja sa stvarnim AI agentima, prodajom ili naplatom. Svi finansijski podaci, rezultati i prednarudžbine su ilustrativni.
