# pokemon-team-manager
https://martinf88.github.io/pokemon-team-manager/
https://github.com/Martinf88/pokemon-team-manager

Appen hämtar 50 pokemons från pokeapi.co
går att justera antal i fetching.js

Pokemon Team Manager är ett skolprojekt. 

Kriterierna var följande: 
Så här ska du jobba:
[G] Appen ska demonstreras för läraren och lämnas in korrekt på LearnPoint.
[G] Appen ska publiceras online med GitHub Pages. Du ska använda git under hela utvecklingen. Du ska använda minst två brancher: main och dev.
[G] Det är viktigt för kunden att du gör en professionell Single Page App. Funktionerna alert och prompt får inte användas. Appen får inte heller laddas om, vare sig med location.reload() eller att användaren klickar på en länk. När du använder länkar behöver du stoppa länk-klick med event.preventDefault().
[G] Under utvecklingen ska du använda code review. Dvs granska någon annans kod, och få din kod granskad. (Behöver inte vara samma person.) Du ska dessutom använda minst två testpersoner. Detta ska du skriva om i projektrapporten.
Funktionella krav:
[G] Appen ska vara responsiv. Använd mobile first, dvs. börja med att designa gränssnittet för en smal skärm, och lägg sedan till stöd för större. Appen ska även vara lättanvänd och snygg. Testa den innan du lämnar in!
[G] Appen ska kunna växla mellan två separata vyer: en för att hitta och lägga till lagmedlemmar; en annan för att se laguppställning.
[G] Både bilder och namn på Pokémons ska visas.
[G] Söka efter Pokémon genom att skriva in en del av namnet i ett textfält.
[G] Möjlighet att lägga till Pokémons till laget. Om laget är fullt läggs de till som reserver i stället.
Exempel på sökning: "Char" hittar "Charmander", "Charmeleon" och "Charizard".
[G] När man lägger till en Pokémon, ska man kunna välja ett smeknamn åt den. Till exempel skulle man kunna lägga till två Pikachu och ge dem namnen Pelle och Perez.
[G] Laguppställningen ska tala om ifall laget är komplett eller inte. Alla lag har tre ordinarie medlemmar och obegränsat antal reserver. Ett komplett lag har tre medlemmar.
[G] Kunna kicka en Pokémon, så att den försvinner från laguppställningen.
[VG] Kunna kicka en Pokémon från laget men behålla den som reserv. Det innebär att första reserven kommer befordras till laget. (Observera att man fortfarande ska kunna kicka helt också.)
[VG] Smart sökning: hittar Pokémon oavsett var i namnet strängen förekommer, samt oavsett om det är stora eller små bokstäver. Exempel: "MaN" hittar "Charmander", "Mankey" och "Omanyte".
[VG] Laguppställningen ska visa namnet på alla abilities varje Pokémon har.
[VG] Möjlighet att ändra ordningen på Pokémons i laget och bland reserverna. (När två lag möter varandra, spelar det roll vilken som är först.)
