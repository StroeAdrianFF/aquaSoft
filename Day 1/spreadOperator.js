const colors = ['red', 'blue', 'purple', 'yellow']
const flowers = ['tulip', 'rose', 'dandelion', 'lily']


const [firstElement, secondElement, ...thirdAndFourth] = colors // saves the first 2 values and the last 2 are saved as an array 
console.log(firstElement,secondElement,thirdAndFourth)


const twoInOne = [...colors,...flowers] //make an array out of the 2 arrays

const twoInOneAlt = colors.concat(flowers)//alternative
console.log(twoInOneAlt)


const string = 'omae wa mou shindeiru'
console.log(...string) // spreading every letter of the string
const [,,thirdLetter] = [...string] //saving the 3rd letter
console.log(thirdLetter)

const object = {
    name: 'adrian',
    age: 22,
    location: 'somewhere in Romania'
}

//make a copy of the object
const copyOfObject = {...object} //contents are the same but refference will differ




