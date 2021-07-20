const country = {
    name: 'japan',
    population: 10000000,
    lang: 'japanese',
    weather: 'really hot'
}




let tempArray = []
const keys = Object.keys(country)
//iterating through the object
keys.forEach((key)=>{
    console.log(`${key}: ${country[key]}`)
    tempArray.push(country[key]) //store values in an array
})
console.log(tempArray)


//copying an object
const fakeCountry = {}
for(key in country){
    fakeCountry[key] = country[key]
} 
console.log(fakeCountry)



//a not so much recommended alternative of deepcopying
const alternative = JSON.parse(JSON.stringify(country))
console.log(alternative)