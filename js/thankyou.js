let yourOrderNumber;
let keepShopping;

// Back to index.html, keeping shopping
loadingGif.style.display = "block";
keepShopping = document.getElementById("keepShopping");
keepShopping.addEventListener("click", () => {
  location.href = "index.html";
});

// Show orderNumber on the page
yourOrderNumber = JSON.parse(localStorage.getItem("orderNumber")).data.number;

let orderNumbers = document.getElementsByClassName("order-number");

for(let i = 0; i <orderNumbers.length; i++){
  orderNumbers[i].textContent = yourOrderNumber.toString();
}

loadingGif.style.display = "none";
