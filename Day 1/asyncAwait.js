const fetch = require('node-fetch')//import fetch module

const asyncFunction = async () =>{//set function as async so we can use await inside of it
    const data = await fetch('http://api.friendlyrobot.fr/v1/nicknames/william')//await for the result and THEN resume the process
    const data2 = await data.json()//parse data as json so we can display it
 
console.log(`My name's: ${data2.name}, insa prietenii imi spun ${data2.nicknames[0].nickname} sau ${data2.nicknames[4].nickname}`) //log the results after the awaits have completed
}

asyncFunction();