let lines = document.querySelectorAll(".line");

lines.forEach(function (line, index) {

    setTimeout(function () {

        line.style.display = "block";

        let dotsElement = line.querySelector(".dots");

        let count = 0;

        setInterval(function () {

            count++;

            let dots = "";

            if (count % 4 === 1) {
                dots = ".";
            }

           else if (count % 4 === 2) {
                dots = "..";
            }

           else if (count % 4 === 3) {
                dots = "...";
            }

            else{
                dots = "";
            }

            dotsElement.innerHTML = dots;

           }, 500);
            
        }, (index+1) * 2000);
    

})