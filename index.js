const es6Variables = () =>{
    let number = 0
        {
            let number = 1
            console.log(number) // let and const are blocked scoped
        }
    console.log(number)
}
es6Variables()



const first = 1
let second;
second = 2;
// first = first + 1 --- error, cannot reasign a value to const 
console.log(first, second)



const variables = ()=>{
    var test = 'salutari'
    var test = 'al doilea rand de salutari'
    console.log(test) //vars can be redeclared with no problem
}

variables()
console.log(test) // var is function scoped


