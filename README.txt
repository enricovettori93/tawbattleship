Gruppo UniveMean

Prerequisiti:
    - Aver installato MongoDB sulla macchina https://docs.mongodb.com/manual/installation/
    - Aver installato Node.js con NPM https://nodejs.org/it/

Istruzioni per eseguire il server:
    - Recarsi nella directory /server
    - Eseguire il comando "npm install" per installare tutti i pacchetti necessari
    - Eseguire il comando "npm run compile" per compilare i sorgenti TypeScript in JavaScript
    - Eseguire il comando "npm start" per far partire MongoDB e per eseguire il server oppure solo "node battleship" per eseguire il web server

Istruzioni per eseguire il client web:
    - Recarsi nella directory /client/battleship
    - Eseguire il comando "npm install" per installare tutti i pacchetti necessari
    - Eseguire il comando "ng build" per compilare e servire il client in angular in automatico all'indirizzo http://localhost:4200
    - Opzionale: eseguire il comando "ng serve --open" per aprire il client in automatico

Istruzioni per eseguire il client Android:
    Per la compilazione ed esecuzione con il Cordova da CLI (se correttamente installato inseme ad Android SDK):
    - Recarsi nella directory /client/battleship-android-cordova
    - Eseguire "cordova platform add android" per aggiungere come piattaforma predefinita Android
    - Eseguire: "cordova build" per creare l'apk
    - Eseguire: "cordova run" per avviare l'applicazione sul dispositivo di default trovato da Cordova
    Altrimenti utilizzare l'apk presente in  /client/dist

Istruzioni per eseguire il client Desktop:
    - Recarsi nella directory /client/battleship-desktop
    - Eseguire il comando "npm install" per installare tutti i pacchetti necessari
    - Eseguire il comando "ng build" per fare il buil dell'applicazione
    - Eseguire il comando "npm start" per far partire l'applicazione
