# B3-Lexikon

## Lexikon lokal ausführen

1. ### Packages installieren

    `npm install`

2. ### NodeJS Server starten

    `npm start`

3. ### Webseite aufrufen

    [http://localhost:8080](http://localhost:8080)

## Lexikon in einem Docker Container ausführen

1. ### Docker Image bauen:

    `docker build -f Dockerfile -t lexicon .`

2. ### Docker Image auf Docker Container ausführen

    `docker run -p 8080:8080 --name lexicon -d lexicon`

3. ### Laufende Container ansehen

    `docker ps`

4. ### Webseite aufrufen

    [http://localhost:8080](http://localhost:8080)