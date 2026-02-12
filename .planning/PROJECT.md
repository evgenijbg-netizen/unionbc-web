# Union B+C — Web Redesign

## What This Is

Moderní prezentační web pro Union B+C s.r.o., výhradního distributora TEMP-COAT tekuté keramické tepelné izolace pro český trh. Web nahrazuje zastaralou stránku (generovanou Xarou, éra IE6) a představuje produkt TC101 způsobem odpovídajícím roku 2026 — průmyslový seriózní design, přepsaný obsah v moderní češtině a angličtině, interaktivní kalkulačka úspor.

## Core Value

Návštěvník pochopí, co TEMP-COAT TC101 je, proč funguje a kolik mu ušetří — a ví, koho kontaktovat.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Moderní responsivní web s průmyslovým designem (tmavší tóny, důraz na data, seriózní dojem)
- [ ] Dvoujazyčný obsah (čeština + angličtina)
- [ ] Hlavní stránka s přehledem produktu a hodnotovou nabídkou
- [ ] Produktová stránka TC101 — co to je, jak to funguje, technické parametry, výhody
- [ ] Interaktivní kalkulačka úspor (zadá plochu + typ povrchu → úspora energie + návratnost)
- [ ] FAQ sekce — přepsané otázky a odpovědi z původního webu
- [ ] Certifikáty a dokumenty ke stažení (PDF)
- [ ] Kontaktní stránka s údaji o firmě
- [ ] Přepsaný obsah — moderní čeština, bez ruských referencí, zaměřený na český/evropský kontext
- [ ] SEO optimalizace pro klíčová slova (tekutá izolace, keramická izolace, tepelná izolace, TEMP-COAT)

### Out of Scope

- E-shop / online prodej — prodej probíhá offline
- Ostatní produkty (Silent Running, Q2, ostatní) — fokus je na TC101
- Blog / aktuality — jednoduchý prezentační web
- CMS / administrační rozhraní — statický web
- Uživatelské účty / registrace

## Context

**Starý web (www.unionbc.cz):**
- Generován Xara HTML filter v6 (~2013-2014)
- Fixní šířka 955px, navigace jako PNG obrázky, IE conditional comments
- Windows-1250 kódování, absolutní pozicování
- Obsah přeložený z ruštiny — kostrbatá čeština, reference na ruské case studies
- Obsahově bohatý: technické parametry, rozsáhlé FAQ (~20 otázek), testy, certifikáty

**Společnost Union B+C s.r.o.:**
- Sídlo: Jiskrova 1566, Brandýs nad Labem, 25001
- Kontakt: Halina Bogdanovich, +420 777 832 348, info@unionbc.cz
- Výhradní distributor TEMP-COAT pro ČR (od 2004)

**Produkt TEMP-COAT TC101:**
- Tekutá keramická tepelná izolace na latexové bázi
- Aplikuje se jako nátěr, působí jako tepelná bariéra
- Teplotní rozsah: -60°C až +260°C
- Tepelná vodivost: λ₀ = 0.001 W/m.°C
- Vyvinuto na základě technologie NASA (TEMP-COAT Brand Products, LLC, od 1990)
- Certifikováno v ČR
- Využití: průmysl (potrubí, nádrže, parovody), stavebnictví (fasády, střechy), námořnictví

**Klíčový obsah k přepisu:**
- O tepelné izolaci (princip fungování — keramické kuličky, reflexe tepla)
- Jak to funguje (srovnání s konvenční izolací, R-hodnota vs reflexe)
- Technické parametry (hustota, tepelná kapacita, vodivost, emisivita)
- Výhody (úspora času, žádné lešení, nehořlavý, lehký, antikorozní)
- FAQ (~20 otázek: aplikace, teploty, údržba, koroze, kompatibilita materiálů)
- Testy (5 testů s PDF výsledky — přehodnotit relevanci)
- Certifikáty (certifikát výrobku, STO, bezpečnostní list)

## Constraints

- **Jazyk**: Dvoujazyčný CZ/EN — obsah musí být nativní v obou jazycích, ne překlad
- **Obsah**: Vychází ze starého webu, ale přepsaný do moderní češtiny; odstranit ruské reference a case studies
- **Design**: Průmyslový a seriózní — tmavší tóny, technický dojem, důraz na data a důvěryhodnost
- **Technologie**: Statický web (žádný CMS), moderní frontend stack
- **Hosting**: Doména unionbc.cz (existující)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Fokus na TC101 | Hlavní produkt, ostatní nemají prioritu | — Pending |
| Dvoujazyčný web CZ/EN | Rozšíření dosahu, profesionální dojem | — Pending |
| Statický web bez CMS | Jednoduchá údržba, rychlost, bezpečnost | — Pending |
| Přepis obsahu místo kopie | Starý text je překlad z RU, nevhodný pro 2026 | — Pending |
| Kalkulačka úspor | Konkrétní hodnota pro zákazníka — zadá plochu + typ, vidí úsporu a návratnost | — Pending |
| Průmyslový design | Cílová skupina je B2B průmysl/stavebnictví, ne spotřebitelé | — Pending |

---
*Last updated: 2026-02-12 after initialization*
