// NL service pages — mirrors `services` in ./en.
import type { Service, Services } from "./en";

export const servicesNL = {
  hub: {
    seo: {
      title: "Diensten — website laten maken, webshop & redesign",
      description:
        "Websites op maat, webshops en website-redesigns, met de hand geschreven in Lyon voor klanten in België, Frankrijk en daarbuiten. Snel, meertalig, SEO-klaar.",
    },
    eyebrow: "Diensten",
    title: "Wat ik voor je bouw.",
    intro:
      "Drie manieren om samen te werken — telkens vanaf nul met de hand geschreven, meertalig en SEO-klaar, met een CMS dat je zelf beheert.",
    more: "Meer info",
  },
  labels: {
    points: "Waarom het werkt",
    included: "Wat je krijgt",
    process: "Hoe het verloopt",
    cases: "Bewijs, live in productie",
    faq: "Veelgestelde vragen",
    caseStudy: "Case study",
  },
  items: [
    {
      slug: "website",
      name: "Website op maat",
      seo: {
        title: "Website op maat laten maken",
        description:
          "Een website op maat laten maken, vanaf nul met de hand geschreven: snel, meertalig, SEO-klaar en eenvoudig zelf aan te passen. Geen WordPress, geen templates.",
      },
      hero: {
        eyebrow: "Website op maat · Lyon, FR",
        h1: [[{ t: "Een website gebouwd" }], [{ t: "vanaf " }, { t: "nul", accent: true, scramble: true }, { t: "." }]],
        sub: "Geen templates, geen page builders. Een site ontworpen rond je merk en je bezoekers, met de hand geschreven voor snelheid en vindbaarheid — en opgeleverd met een CMS dat je zelf beheert.",
      },
      card: "Een merk- of bedrijfssite rond jou ontworpen — snel, meertalig en goed vindbaar.",
      points: [
        { h: "Standaard snel", p: "Statische pagina's, geoptimaliseerde beelden en geen plugin-ballast — top Lighthouse-scores en een site die meteen laadt op mobiel." },
        { h: "Gevonden in Google", p: "Schone code, gestructureerde data, sitemaps en metadata per taal vanaf dag één ingebouwd, niet achteraf toegevoegd." },
        { h: "Meertalig", p: "Nederlands, Frans, Engels — of een mix — met echte taalroutes en vertaalde SEO, geen vertaalwidget." },
        { h: "Zelf aan te passen", p: "Een headless CMS (Sanity) om teksten, beelden en pagina's te wijzigen zonder een developer te bellen." },
      ],
      included: [
        "Discovery-workshop & sitestructuur",
        "Design system op maat — typografie, kleur, animatie",
        "Met de hand geschreven build (Next.js)",
        "Headless CMS-opzet & training",
        "Technische SEO & statistieken",
        "Hosting, domein & lancering",
      ],
      cases: ["milo", "bermuda", "automatx"],
      faq: [
        { q: "Hoe lang duurt het om een website op maat te laten maken?", a: "De meeste merk- of bedrijfssites nemen 4 tot 8 weken van discovery tot lancering, afhankelijk van het aantal pagina's, talen en hoe snel de content klaar is." },
        { q: "Wat kost een website?", a: "Elke site krijgt een vaste prijs na een gratis kennismakingsgesprek — je kent de totale kost voor het werk begint. Geen verrassingen achteraf." },
        { q: "Kan ik de website zelf aanpassen?", a: "Ja. De content zit in een eenvoudig headless CMS (Sanity): je wijzigt zelf teksten, beelden en pagina's, en ik blijf beschikbaar voor alles wat structureel is." },
        { q: "Waarom geen WordPress of Wix?", a: "Een met de hand geschreven site is sneller, veiliger en beter vindbaar — geen plugin-updates, geen themabeperkingen, geen page-builder-ballast. Je krijgt precies de site die je nodig hebt." },
        { q: "Werk je ook buiten Lyon?", a: "Ja — ik zit in Lyon en werk met klanten in België, Frankrijk en daarbuiten, in het Nederlands, Frans of Engels." },
      ],
    },
    {
      slug: "e-commerce",
      name: "Webshop",
      seo: {
        title: "Webshop laten maken — Stripe & headless",
        description:
          "Een webshop op maat laten maken met Stripe-checkout: snelle productpagina's, meertalig en in meerdere valuta, SEO-klaar en eenvoudig te beheren.",
      },
      hero: {
        eyebrow: "E-commerce · Stripe · headless",
        h1: [[{ t: "Een webshop" }], [{ t: "die " }, { t: "verkoopt", accent: true, scramble: true }, { t: "." }]],
        sub: "Een webshop ontworpen rond je producten, met een vlotte Stripe-checkout — snel op elke smartphone, vertaald voor elke markt en beheerd vanuit één CMS.",
      },
      card: "Een webshop op maat met Stripe-checkout — snel, meertalig en gericht op conversie.",
      points: [
        { h: "Een checkout die converteert", p: "Stripe Checkout met Apple Pay, Google Pay, Bancontact, kaarten en Twint — veilig, SCA-klaar en met één tik op mobiel." },
        { h: "Snelheid is omzet", p: "Elke seconde kost verkoop. Productpagina's worden vooraf gegenereerd en beelden geoptimaliseerd zodat ze meteen laden." },
        { h: "Elke markt", p: "Meerdere talen en valuta, btw- en verzendregels — één webshop, ingesteld voor elk land waar je verkoopt." },
        { h: "Eenvoudig te beheren", p: "Producten, voorraad en content in één CMS, bestellingen en uitbetalingen in Stripe — geen stapel plugins om bij te houden." },
      ],
      included: [
        "Webshopstructuur & productmodel",
        "Webshopdesign op maat",
        "Stripe-checkout, betalingen & webhooks",
        "Meertalige & multi-valuta-opzet",
        "Product-SEO & gestructureerde data",
        "CMS-training & lanceringsbegeleiding",
      ],
      cases: ["nu"],
      faq: [
        { q: "Shopify of een webshop op maat?", a: "Shopify is prima voor standaardcatalogi. Een webshop op maat loont wanneer design, snelheid, content of meertalige SEO belangrijk zijn — en zonder maandelijkse app-kosten." },
        { q: "Welke betaalmethodes worden ondersteund?", a: "Alles wat Stripe ondersteunt: kaarten, Bancontact, iDEAL, Apple Pay, Google Pay, SEPA, Twint en meer, met sterke klantauthenticatie (SCA) ingebouwd." },
        { q: "Kan ik producten zelf beheren?", a: "Ja. Producten, prijzen, beelden en content beheer je in het CMS; bestellingen, terugbetalingen en uitbetalingen in je Stripe-dashboard." },
        { q: "Hoe lang duurt een webshop?", a: "Meestal 6 tot 10 weken, afhankelijk van de catalogus, de markten en de integraties. De vaste offerte na discovery bevat een duidelijke planning." },
        { q: "Is de webshop geoptimaliseerd voor Google?", a: "Ja — gestructureerde productdata, snelle pagina's, schone URL's en metadata per taal, zodat producten met prijs en beschikbaarheid in de zoekresultaten kunnen verschijnen." },
      ],
    },
    {
      slug: "redesign",
      name: "Website redesign",
      seo: {
        title: "Website redesign & migratie — weg van WordPress of Wix",
        description:
          "Je website vernieuwen: van WordPress, Wix of Squarespace naar een snelle, handgeschreven site — zonder je posities in Google te verliezen.",
      },
      hero: {
        eyebrow: "Redesign · migratie · SEO-veilig",
        h1: [[{ t: "Je site, herbouwd" }], [{ t: "om te " }, { t: "presteren", accent: true, scramble: true }, { t: "." }]],
        sub: "Is je WordPress-, Wix- of Squarespace-site traag of beperkend geworden? Ik bouw hem opnieuw vanaf nul — nieuw design, echte snelheid — en migreer je content en posities mee.",
      },
      card: "Stap over van WordPress, Wix of Squarespace naar een snelle, handgeschreven site — posities behouden.",
      points: [
        { h: "Posities behouden", p: "Elke oude URL wordt in kaart gebracht en doorverwezen, metadata overgenomen en de sitemap opnieuw ingediend — Google volgt je naar de nieuwe site." },
        { h: "Content gemigreerd", p: "Pagina's, artikels, beelden en vertalingen verhuisd naar een modern CMS, en meteen opgeschoond." },
        { h: "Een echte snelheidswinst", p: "Van plugin-zware pagina's naar statische, geoptimaliseerde — meestal seconden sneller en groene Core Web Vitals." },
        { h: "Een design van vandaag", p: "Je merk, opgefrist in een samenhangend design system dat meegroeit, in plaats van een thema waar je tegen vecht." },
      ],
      included: [
        "Audit van de huidige site, SEO & statistieken",
        "URL-mapping & 301-redirectplan",
        "Nieuw design system & build op maat",
        "Contentmigratie naar het CMS",
        "Continuïteit van Search Console & statistieken",
        "Opvolging na de lancering",
      ],
      cases: ["ywdesign"],
      faq: [
        { q: "Verlies ik mijn posities in Google?", a: "Niet bij een goede migratie. Elke URL krijgt een 301-redirect, metadata blijft behouden en Search Console wordt bijgewerkt — posities blijven doorgaans stabiel en verbeteren vaak dankzij de snelheidswinst." },
        { q: "Kun je migreren vanaf WordPress, Wix of Squarespace?", a: "Ja — content, beelden en pagina's worden geëxporteerd en naar een headless CMS verhuisd, en waar nuttig opgeschoond en geherstructureerd." },
        { q: "Wordt mijn content overgezet?", a: "Ja. Teksten, beelden, artikels en vertalingen worden gemigreerd; verouderde pagina's markeren we zodat we samen beslissen wat blijft." },
        { q: "Hoe lang duurt een redesign?", a: "Meestal 5 tot 10 weken, afhankelijk van de grootte van de huidige site en hoeveel content er gemigreerd wordt." },
      ],
    },
  ] as Service[],
} satisfies Services;
