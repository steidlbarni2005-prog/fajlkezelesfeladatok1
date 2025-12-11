document.addEventListener('DOMContentLoaded',()=>{
    
    getMethodFetch('api/getallstat')
    .then((data) => {
        let hely=document.getElementById('telepulesSelect');
        data.result.forEach(element => {
            let select=document.createElement('option');
            select.textContent=element.megnevezes;
            hely.appendChild(select)
            
        });
       
    })
 /*
     getMethodFetch('/api/getstat/'+33367)
    .then((data) => {
        console.log('Fetch eredménye: ', data.result);   
    })
        */
    document.getElementById('telepulesSelect').addEventListener('change',function(){
    getMethodFetch('api/getallstat')
    .then((data) => {
        data.result.forEach(element => {
          if(element.megnevezes==this.value){
              getMethodFetch('/api/getstat/'+element.telepaz)
                .then((data) => {
                    console.log('Fetch eredménye: ', data.result);   
                    let ide=document.getElementById('statok')
                    ide.innerHTML=""
                    Object.keys(data.result).forEach(element => {
                    console.log(data.result[element])
                        let td=document.createElement('td');
                        td.textContent=data.result[element];
                        ide.appendChild(td)
                    });
                })
          }
        });
       
    })
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