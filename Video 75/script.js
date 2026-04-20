console.log("Akib is a hacker")
console.log("Farhan is a hecker")

setTimeout(() => {
    console.log("I am inside settimeout")
}, 2000);

console.log("The End")

const callback = (arg)=>{
    console.log(arg)
}

const loadScript = (src, callback) => {
  let sc = document.createElement("script");
  sc.src = src;
  sc.onload = callback("Akib");
  document.head.append(sc)
}
