// let obj = {
//     a: 1,
//     b:"Akib"

// }

// console.log(obj)

// let animal = {
//     eats: true
// };

// let rabbit = {
//     jumps: true
// };

// rabbit._proto_ = animal;  // sets rabbit.[[Prototype]] = animal



class Animal{
    constructor(name){
        this.name = name
        console.log("Object is created...")
    }

eats(){
    console.log("Khaitasi")
}

jumps(){
    console.log("lafaitasi")
}

}

class lion extends Animal {
     constructor(name){
        super(name)
        console.log("Object is created...")
    }

}


let a = new Animal("Bunny");

console.log(a)

let l = new lion("Shingho")
console.log(l)