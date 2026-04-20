function createCard(title, cName, views, monthsOld, duration, thumbnail) {
    let card = document.querySelector(".card");

    let img = document.createElement("img");
    img.src = thumbnail;
    img.alt = title;
    card.appendChild(img);


    let titleEl = document.createElement("h3");
    titleEl.innerText = title;
    card.appendChild(titleEl);
    

    let channelEl = document.createElement("p");
    channelEl.innerText = `Channel: ${cName}`;
    card.appendChild(channelEl);


    let viewsEl = document.createElement("p");
    viewsEl.innerText = `${views} views • ${monthsOld} months ago`;
    card.appendChild(viewsEl);

    let durationEl = document.createElement("span");
    durationEl.innerText = duration;
    durationEl.classList.add("duration");
    card.appendChild(durationEl);
}


createCard(
    "Introduction to Backend | Sigma Web Dev Video #1",
    "CodeWithHarry",
    560000,
    "31:20",
    "card.png"
)