// Create a localStorage Empty Structure
// let listLength;
// let quantityInCart = document.getElementsByClassName("quantity-in-cart");
// let productsInCartOrder;
let primeKey = [];
let order = {
  shipping: "",
  payment: "",
  subtotal: "",
  freight: "",
  total: "",
  recipient: {
    name: "",
    phone: "",
    email:"",
    address: "",
    time: "",
  },
  list: []
};

localStorage.setItem("prime", JSON.stringify(primeKey) );
if (localStorage.getItem("order") === null) {
    localStorage.setItem("order", JSON.stringify(order));
} else {
    productsInCartOrder = JSON.parse(localStorage.getItem("order"));
    listLength = productsInCartOrder.list.length;
    quantityInCartCount();
};

let quantityInCartCount = () => {
  for(let i = 0; i < quantityInCart.length; i++){
    quantityInCart[i].textContent = listLength.toString();
  }
}

// localStorage.setItem("order", JSON.stringify(order) );
