const vacanta = (callback) =>{ //callback = a function used as a parameter for another function
    console.log('A inceput concediul!')
    callback('adrian','kyoto')
}


const detalii = (firstName, destination) =>{
    console.log(`Salut ${firstName}! Speram sa te bucuri de calatoria in ${destination}!`);
}
 vacanta(detalii)


//promises
 let promise = new Promise((resolve, reject) =>{ //create a new promise
     const number = 0.33
    if(Math.random() < number){//if true we succeeded, set succeed message
        setTimeout(() => {
            resolve('Succes!')
        }, 500);
    }else{//else set fail message
        setTimeout(() => {
            reject('Eroare!')
        }, 500);
    }
 })

 promise.then(()=>{//if promise is successful log OK else NU-I OK
    console.log('OK')
 })
 .catch(()=>{
    console.log('NU-I OK')
 })