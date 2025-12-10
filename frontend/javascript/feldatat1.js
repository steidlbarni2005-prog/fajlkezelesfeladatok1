document.addEventListener('DOMContentLoaded',()=>{
    getMethodFetch('api/readfile')
    .then((data) => {
        console.log('Fetch eredménye: ', data);
        h1(data);
    })
    .catch((error) => {
        console.error('Hiba: ', error.message);
    });

})
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
const h1=async(data)=>{
    let h1=document.createElement('h1');
    h1.textContent="Feladat";
    h1.setAttribute('class','display-4 shadow-sm text-start')
    let h2=document.createElement('h1');
    h2.textContent="Eredmény: "+data.result;
    h2.setAttribute('class','display-6 text-center')
    document.querySelector('body').appendChild(h1);
    document.querySelector('body').appendChild(h2);
    
}
