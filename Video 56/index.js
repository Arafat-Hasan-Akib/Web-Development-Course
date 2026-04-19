console.log("Hellow I am conditional tutorial")

let age = 0;
// let grace = 2;

// console.log(age + grace)
// console.log(age - grace)
// console.log(age * grace)
// console.log(age / grace)
// console.log(age ** grace)
// console.log(age % grace)


if(age==18){
    console.log("You can drive");
}

else if(age == 0){
    console.log("Are you kidding?")
}

else{
    console.log("You can't drive");
}

a = 6;
b = 8;
let c = a> b ? (a - b) : (b - a);

/*
transletes to:
if(a>b){
let c = a - b;  
}
else {
    let c = a - b; 
    }


*/