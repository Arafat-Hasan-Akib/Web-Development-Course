function createCard(title, cName, views, monthsOld, duration, thumbnail) {
    let viewStr


    if (views < 1000) {
        viewStr = views;
    }

    else if (views > 1000, views < 1000000){
        viewStr = views / 1000 + "K"
    }


    else if (views > 1000000) {
        viewStr = views / 1000000 + "M";
    }


   




    let html = ` <div class="card">
            <div class="image">
                <img src="${thumbnail}" alt="">
                 <div class="capsule">${duration}</div>
            </div>
            <div class="text">
                <h1>${title}</h1>
                <p>${cName} . ${viewStr} views . ${monthsOld} months ago</p>
            </div>
        </div>`


        document.querySelector(".container").innerHTML =  document.querySelector(".container").innerHTML + html
}





createCard("Introduction to Backend | Sigma Web Dev Video #1", "CodeWithHarry", 560000, 7, "31:22", "card.png" )