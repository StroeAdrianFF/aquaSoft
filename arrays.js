const songs = ['hikari are', 'uptown funk', 'funhouse', 'jailhouse rock']
console.log(songs)

songs.push('la chilia-n port') //add to the end
console.log(songs)

songs.reverse() //reverse order
console.log(songs)

songs.shift() // remove first element
console.log(songs)

songs.unshift('walk') // add to the beginning of the array
console.log(songs)

songs.pop()//remove from the end
console.log(songs)

songs.splice(1,2,'baton road','phoenix')//splice removes 2 elements starting with index 1 and adds the 2 mentioned elements. Splice and add/delete/replace
console.log(songs)

const copiedElements = songs.slice(1,2)//copies 1 element starting from index 1
console.log(copiedElements)

const concatenated = songs.concat('crazy loop') //concatenates any no of args to the array
console.log(concatenated)


songs.forEach(song =>{//applies a function for each element of the array
    if(song.length > 5){
        console.log('prea lung')
    }
})


console.log(songs.indexOf('phoenix')) //indexof returns index of specified item

let song = songs.find(s => s.length >4 && s.length < 10) //find item which is part of specified parameters
console.log(song)

let someSongs = songs.filter(s => s.includes(' '))//filter out songs that have spaces in them
console.log(someSongs)


const firstName = 'adrian'
const reversedName = firstName.split('').reverse().join('')//split the string then reverse it and join the letters back together
console.log(reversedName)


