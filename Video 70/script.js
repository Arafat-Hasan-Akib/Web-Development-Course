document.getElementById("colorBtn").addEventListener("click", () => {
  boxes.forEach(box => {
    box.style.backgroundColor = getRandomColor();
  });
});


