const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { text } = require('stream/consumers');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});
const readTextFile = async (filePath) => {
    try {
      const text = await fs.readFile(filePath, 'utf8');
      return text; // string
    } catch (error) {
      throw new Error(`Olvasási hiba (text): ${error.message}`);
    }
  };
  
router.get('/readfile', async (request, response) => {
  try{ 
    const content = await readTextFile( path.join(__dirname, '../forras/adatok.txt')); 
    response.status(200).json({
        result:content
    });
  }catch(error){
    console.log('GET api/readfile error: '+error);
  }

});
router.get('/osszeg', async (request, response) => {
    try{ 
      const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
      let numbers=content.split(',');
      let osszeg=0;
      
      for(const item of numbers){
        osszeg+=parseInt(item);
      }
      response.status(200).json({
          result:osszeg
      });
    }catch(error){
      console.log('GET api/readfile error: '+error);
    }
  });
router.get('/sorozat', async (request,response)=>{
    try{
        const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
        let numbers=content.split(',');
        let elso=numbers[0];
        let utolso=numbers[numbers.length-1];
        response.status(200).json({
            result:""+ elso+" "+utolso
        });
      
    }
    catch(error){
        console.log('GET api/readfile error: '+error);
    }
})
router.get('/atlag',async (request,response)=>{
    try{
        const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
        let numbers=content.split(',');
        let osszeg=0;
        
        for(const item of numbers){
          osszeg+=parseInt(item);
        }
        let atlag=osszeg/numbers.length;
        response.status(200).json({
            result:atlag
        });

    }
    catch(error){
        console.log('GET api/readfile error: '+error);
    }
})
router.get('/min',async (request,response)=>{
    try{
        const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
        let numbers=content.split(',');
        let min=0;
        
        for(let i=0;i<numbers.length;i++){
          if(parseInt(numbers[i])<parseInt(numbers[min])){
            min=i;
          }
          console.log(numbers[min]);
        }
  
        response.status(200).json({
            result:numbers[min]
        });

    }
    catch(error){
        console.log('GET api/readfile error: '+error);
    }
})

router.get('/max',async (request,response)=>{
    try{
        const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
        let numbers=content.split(',');
        let min=0;
        
        for(let i=0;i<numbers.length;i++){
          if(parseInt(numbers[i])>parseInt(numbers[min])){
            min=i;
          }
          console.log(numbers[min]);
        }
  
        response.status(200).json({
            result:numbers[min]
        });

    }
    catch(error){
        console.log('GET api/readfile error: '+error);
    }
})
router.get('/sort',async (request,response)=>{
    try{
        const content = await readTextFile( path.join(__dirname, '../forras/szamok.txt')); 
        let numbers=content.split(',');
        numbers.sort((a, b)=> a-b);
        response.status(200).json({
            result: numbers          
        });
    }
    catch(error){
        console.log('GET api/readfile error: '+error);
    }
})

/*harmas feladat */
  
router.get('/getallstat', async (request, response) => {
  try{ 
    const {telepules:content} = JSON.parse(await readTextFile( path.join(__dirname, '../forras/statisztika.json'))); 
    response.status(200).json({
        result:content
    });
  }catch(error){
    console.log('GET api/readfile error: '+error);
  }
});

router.get('/getstat/:telepaz',async (request,response)=>{
    const id =request.params.telepaz;
    console.log(id)
    const {telepules:content} = JSON.parse(await readTextFile( path.join(__dirname, '../forras/statisztika.json'))); 
    let j=0;
    console.log(content)
    while(j<content.length&&content[j].telepaz!=id){
        j++;
    }
    if(j<content.length){
          response.status(200).json({
            result:content[j]
    });
    }
    else{
          response.status(200).json({
            result: "errorMsg Nem található ilyen település azonosító!"
          })
    }
    
});





module.exports = router;

