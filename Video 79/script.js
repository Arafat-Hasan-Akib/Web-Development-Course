let a = prompt("Enter First number")

let b = prompt("Enter second Number")

//  let sum = a + b ( it won't work)

if(isNaN(a) || isNaN(b)){
    throw SyntaxError("Sorry this is not allowed")
}

let sum = parseInt(a) + parseInt(b)

function main(){
    try {
    console.log("The sum is ", sum*x)
    return true
} catch (error) {
    console.log("Error aisha porse bhai")
    return false
}

finally{
    console.log("files are being cclosed and db connection is being closed")
}

}

let c = main()
