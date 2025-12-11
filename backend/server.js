//!Module-ok importálása
const express = require('express'); //?npm install express
const session = require('express-session'); //?npm install express-session
const path = require('path');
const fs = require('fs/promises');

//!Beállítások
const app = express();
const router = express.Router();

const ip = '127.0.0.1';
const port = 3000;

app.use(express.json()); //?Middleware JSON
app.set('trust proxy', 1); //?Middleware Proxy

//!Session beállítása:
app.use(
    session({
        secret: 'titkos_kulcs', //?Ezt generálni kell a későbbiekben
        resave: false,
        saveUninitialized: true
    })
);

//!Routing
//?Főoldal:
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

router.get('/feladat1', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/feladat1.html'));
});

router.get('/feladat2', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/feladat2.html'));
});
router.get('/feladat3', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/feladat3.html'));
});
router.get('/feladat4', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/html/feladat4.html'));
});


//!API endpoints
app.use('/', router);
const endpoints = require('./api/api.js');
const { write } = require('fs');
app.use('/api', endpoints);

//!Szerver futtatása
app.use(express.static(path.join(__dirname, '../frontend'))); //?frontend mappa tartalmának betöltése az oldal működéséhez
app.listen(port, ip, () => {
    console.log(`Szerver elérhetősége: http://${ip}:${port}`);
});

//masodik feladat
const fsSync=require('fs');
const writeFileSync=()=>{
    let numbers=[];
    for(let i=0;i<20;i++){
        numbers.push(Math.floor(Math.random()*(50-1+1))+1);
    }
    
    fsSync.writeFileSync(
        
        path.join(__dirname,'../backend/forras/szamok.txt'),
        numbers.join(','),
        'utf8'
    );

};
writeFileSync();
/*
const writeTextFile = async (filePath, content) => {
    try {
      await fs.writeFile(filePath, content, 'utf8');
      return 'Fájl sikeresen mentve.';
    } catch (error) {
      throw new Error(`Írási hiba (text): ${error.message}`);
    }
};

try {
     let text;
    for(let i=0;i<19;i++){
      text=text+','+(Math.floor(Math.random() * (50- 1) +1) + 1);
    }
    const message = writeTextFile('forras/notes.txt', text);
    
  } catch (error) {
    console.log('POST /api/write-text error:', error);
}*/

  
  

//?Szerver futtatása terminalból: npm run dev
//?Szerver leállítása (MacBook és Windows): Control + C
//?Terminal ablak tartalmának törlése (MacBook): Command + K
