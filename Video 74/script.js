let button = document.getElementById("btn")
button.addEventListener("dblclick", ()=>{
    document.querySelector(".box").innerHTML = "<b>Yayy you were chicked</b> Enjoy your click!"
})


button.addEventListener("contextmenu", ()=>{
    alert("Don't hack us by Right click pls")
})

button.addEventListener("keydown", ()=>{
   
})