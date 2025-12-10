document.addEventListener('DOMContentLoaded',()=>{
    getMethodFetch('api/osszeg')
    .then((data) => {
        console.log('Fetch eredménye: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/sorozat')
    .then((data) => {
        console.log('elso es uzolso: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    getMethodFetch('api/atlag')
    .then((data) => {
        console.log('atlag: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

    
    getMethodFetch('api/min')
    .then((data) => {
        console.log('min: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

     getMethodFetch('api/max')
    .then((data) => {
        console.log('max: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

        getMethodFetch('api/sort')
    .then((data) => {
        console.log('sort: ', data.result);
       
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });


})
const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':  'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
    }
    return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};

const getMethodFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`GET hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
}