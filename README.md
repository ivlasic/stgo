# HŽI - stalne točke geodetske osnove

Karta s prikazom stalnih točaka geodetske osnove na mreži Hrvatskih željeznica.

👉 __https://ivlasic.github.io/stgo/__

![Screenshot](https://raw.githubusercontent.com/ivlasic/stgo/master/assets/images/screenshot.png)

Snimka zaslona prikazuje primjer jedne točke. Svaka točka ima svoju poveznicu! Na primjer [link to P1](https://ivlasic.github.io/stgo/#m202-515).

## Kako dodati novu točku?

Možete dodati marker na kartu i sami upravljati svojim podacima. Naučite kako [3 načina kako dodati svoju točku](https://github.com/ivlasic/stgo/tree/master/_directory)! 🚀

## Za koga je ova karta?

Karta je namijenjena svim osobama uključenim u održavanje i izgradnju pruga: geodetima, graževinarima i drugima. Radi se o vizualizaciji stalnih točaka geodetske osnove diljem RH. Ako koristite ili podržavate HŽI, karta je za Vas!

## Kako ova karta funkcionira?

Ništa posebno: GitHub omogućava generiranje statičkih web stranica iz repozitorija. Koriste [Jekyll] (https://jekyllrb.com), generator temeljen na rubyu. Jekyll dolazi sa [Liquid] (https://shopify.github.io/liquid/) predlošcima koji omogućavaju da putem HTML-a unesemo sve zapise naše karte unutar JSON-a. JavaScript uzima podatke i pokreće lijepu [Leaflet] (http://leafletjs.com) kartu s zgodnim podacima koje pruža [CARTO] (https://carto.com/location-data-services/basemaps/).

## Možemo li koristiti kartu za vlastite potrebe?

Sure, it’s open source! However, we don’t provide a release or some setup script. We’d recommend you to download the repo as zip file instead and make it run on your local machine first (see [SETUP.md](https://github.com/FriendsOfREDAXO/community/blob/master/SETUP.md) for instructions). Afterwards you’ll need to replace some `REDAXO` content with your community content, empty the `_directory/data` folder and start over with a shiny fresh map.

## How to run the map on my local machine?

See [SETUP.md](https://github.com/ivlasic/stgo/blob/master/SETUP.md) for instructions.

## What else?

