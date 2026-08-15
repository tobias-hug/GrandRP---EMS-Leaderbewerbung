# Leaderbewerbung EMS – Grand RP

Statische One-Page-Bewerbungsseite für die Leader-Bewerbung der **Emergency Medical Services**.
Kein Build, kein Framework – reines HTML/CSS/JS.

## Struktur

```
Leaderbewerbung_EMS/
├─ index.html              ← der gesamte Inhalt (hier trägst du deine Texte ein)
├─ README.md
└─ assets/
   ├─ css/style.css        ← Design, Farben, Layout
   ├─ js/main.js           ← Navigation, Scroll-Effekte, Zähler
   └─ img/
      ├─ ems-logo.png      ← das offizielle EMS-Logo (800×800)
      └─ profil.jpg        ← dein Profilbild (noch anzulegen)
```

## Lokal ansehen

`index.html` einfach doppelklicken – oder für saubere Pfade:

```bash
npx serve .
```

## Inhalte einpflegen

Alle Platzhalter in `index.html` stehen in eckigen Klammern, z. B. `[Vorname Nachname]`.
Such einfach nach `[` und arbeite dich von oben nach unten durch.

Sektionen in der Reihenfolge:

| # | Anker | Inhalt |
|---|---|---|
| – | `#hero` | Name, Motto, 4 Kennzahlen |
| 01 | `#person` | IC-/OOC-Steckbrief, Profilbild, Einstiegszitat |
| 02 | `#karriere` | Timeline deiner Laufbahn |
| 03 | `#leadership` | 6 Führungsqualitäten |
| 04 | `#abteilungen` | 9 EMS-Abteilungen |
| 05 | `#hierarchie` | 30 Ränge in 4 Ebenen |
| 06 | `#vision` | 6 konkrete Maßnahmen |
| 07 | `#schlusswort` | Persönlicher Abschluss |

Sektionen entfernen: den kompletten `<section>`-Block löschen, den passenden Link in der
Navigation (`<nav class="nav__links">`) entfernen, die `section__num` der folgenden
Sektionen durchnummerieren und die Abwechslung von `section--alt` prüfen (jede zweite
Sektion trägt die Klasse – so bleibt der Hintergrundwechsel sauber).

### Bilder

- **Profilbild:** als `assets/img/profil.jpg` ablegen (Hochformat 3:4 sieht am besten aus).
  Fehlt die Datei, zeigt die Seite automatisch einen dezenten Platzhalter.
- **EMS-Logo:** `assets/img/ems-logo.png` – wird an vier Stellen verwendet
  (Favicon, Navigation, Hero, Footer). Zum Austauschen einfach die Datei überschreiben.

### Kennzahlen im Hero

Im `data-count`-Attribut steht der Zielwert. Reine Zahlen werden animiert hochgezählt,
alles andere (z. B. `Oberarzt`) wird einfach angezeigt:

```html
<span class="stat__num" data-count="14">0</span>
```

## Farben anpassen

Alle Farben stecken oben in `assets/css/style.css` unter `:root`.
Rot und Blau sind direkt aus `ems-logo.png` ausgemessen:

```css
--ems-red:  #ED1B24;   /* Rot des Aussenrings */
--ems-blue: #2E4B87;   /* Blau des Star of Life */
--bg:       #080B12;   /* Seitenhintergrund */
```

## Veröffentlichen

Die Seite ist rein statisch und läuft überall:

- **Cloudflare Pages** – Ordner auf dash.cloudflare.com hochladen (Build-Command leer lassen).
  Das ist auch, worauf die Inspirationsseite läuft.
- **GitHub Pages** – Repo anlegen, pushen, in den Settings Pages aktivieren.
- **Netlify** – Ordner auf app.netlify.com/drop ziehen.
