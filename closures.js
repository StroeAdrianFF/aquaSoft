
const greetings = (firstName) =>{

    console.log(`Hi there! I'm ${firstName}`)
    const game = 'CS:GO'

    const freeTime = (subject)=>{//function is able to access game variable as it's inside the scope it has been declared
        console.log(`In my free time I like playing ${game} but I also study ${subject}`)//subject is taken from the initialization phase at the bottom of the file
    }

    return freeTime;
}

const init = greetings('Adrian')//('Japanese')
init('Japanese')