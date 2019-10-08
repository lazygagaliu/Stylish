let url;
let main;
let api = "api";
let vs = "1.0";
let initialUrl = "https://api.appworks-school.tw/";
let nextPageUrl;
let loadingGif = document.querySelector(".loading");

let currentDiv = document.getElementById("pros");
let categ;
let products;
let paging;
// let pagingNum;
let data;
// let id;
// let ids;
let productsDiv;
// let index;

let rectDiv;
let linkA;

let input = document.querySelector("input");
let inputItem;

let footerHeight;
let scrollY;

let banners = document.getElementById("banner");
let headerPhotoWrapper;
let headerPhoto;
let bannerContents;
let bannerWrapper;
let bannersHeight;
let banner1;
let banner2;
let banner3;
let slides;

let smallMember;
let bigMember;
let accessToken;
let memberInfo;

let smallCart = document.getElementById("smallCart");
let bigCart = document.getElementById("bigCart");

// Create an Empty Structure for localStorage
let totalInCart;
let productsInCartOrder;
let quantityInCart;
let listLength;
let primeKey = [];
let order = {
  shipping: "delivery",
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

// AJAX
function ajax(src, callback) {
  let get = new XMLHttpRequest();
  get.onreadystatechange = function (){
    if(get.readyState === 4 && get.status === 200){
      products = JSON.parse(get.responseText)
      paging = products.paging;
      data = products.data;
      callback(data);
      loadingGif.style.display = "none";
    }
    // Error message
  };
  get.open("GET", src);
  loadingGif.style.display = "block";
  get.send();
}

/////Functions for render
// Create Element
let createElement = el => element = document.createElement(el);

// Retrieve text content of data
let retrieveContent = (text, data) =>  {
  textContent = document.createTextNode(`${text}${data}`);
}

//getElementById
let getId = elId => elementId = document.getElementById(elId);

// AppendChild to Node //seems no need = =
let appendChild = (parent, child) => {
  parent.appendChild(child);
}

// Display search input feature
let mediumSearchWrapper = document.getElementById("mediumSearchWrapper");
let mediumSearch = document.getElementById("mediumSearch");
let smallSearch = document.getElementById("smallSearch");
let smallInput = document.getElementById("smallInput");
let smallCancelSearch = document.getElementById("smallCancelSearch");
let mediumInput = document.getElementById("mediumInput");
let mediumCancelSearch = document.getElementById("mediumCancelSearch");
let bigInput = document.getElementById("bigInput");
let logo = document.querySelector(".logo");
let header = document.querySelector(".header");

mediumSearch.addEventListener("click", ()=> {
  header.style.display = "none";
  mediumSearchWrapper.style.display = "flex";
});
smallSearch.addEventListener("click", ()=> {
  logo.style.display = "none"; smallSearch.style.display = "none";
  smallInput.style.display = "block"; smallCancelSearch.style.display = "inline";
});

function checkWin768(width) {
  if (width.matches) { // If media query matches
    mediumSearchWrapper.style.display = "none";
    header.style.display = "none";
  }
}
function checkWin1000(width) {
  if (width.matches) { // If media query matches
    header.style.display = "flex";
  }
}
function checkWin768S(width) {
  if (width.matches) { // If media query matches
    header.style.display = "flex";
  }
}

let win768 = window.matchMedia("(max-width: 768px)");
let win768S = window.matchMedia("(min-width: 769px)");
let win1000 = window.matchMedia("(min-width: 1000px)");
win768.addListener(checkWin768);
win768S.addListener(checkWin768S);
win1000.addListener(checkWin1000); // Attach listener function on state changes
checkWin768(win768); // Call listener function at run time
checkWin768S(win768S);
checkWin1000(win1000);

// search feature
function renderSearch(size){
  inputItem = document.getElementById(size).value;
  location.href = `index.html?search=${inputItem}`;
}

bigInput.addEventListener("keypress", e =>{
  if(e.keyCode === 13){
    renderSearch("bigInput");
  }
});
mediumInput.addEventListener("keypress", e =>{
  if(e.keyCode === 13){
    renderSearch("mediumInput");
  }
});
smallInput.addEventListener("keypress", e =>{
  if(e.keyCode === 13){
    renderSearch("smallInput");
  }
});

// cancel feature
smallCancelSearch.addEventListener("click", ()=>{
  logo.style.display = "block"; smallSearch.style.display = "block";
  smallInput.style.display = "none"; smallCancelSearch.style.display = "none";
});

mediumCancelSearch.addEventListener("click", ()=>{
  header.style.display = "flex";
  mediumSearchWrapper.style.display = "none";
});

// initializeLocalStorage
let initializeLocalStorage = () => {
  quantityInCart = document.getElementsByClassName("quantity-in-cart");
  localStorage.setItem("prime", JSON.stringify(primeKey) );
  if (!localStorage.getItem("order") ) {
      localStorage.setItem("order", JSON.stringify(order));
      productsInCartOrder = JSON.parse(localStorage.getItem("order"));
  } else {
      productsInCartOrder = JSON.parse(localStorage.getItem("order"));
  }
  totalInCart = productsInCartOrder.list;
  listLength = totalInCart.length;
  quantityInCartCount(listLength);
}

// Show number on the cart img
let quantityInCartCount = state => {
  for(let i = 0; i < quantityInCart.length; i++){
    quantityInCart[i].textContent = state.toString();
  }
}

initializeLocalStorage();

// Redirect to cart page
let assignToCart = () => {
  location.assign("cart.html");
}

smallCart.addEventListener("click", assignToCart);
bigCart.addEventListener("click", assignToCart);


// Click member img to log in through Facebook
smallMember = document.querySelector(".member");
bigMember = document.querySelector(".header-member");

window.fbAsyncInit = function() {
  FB.init({
    appId      : '364249850918861',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.3'
  });

  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(res) {
    console.log(res);
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

let statusCallback = res => {
  console.log(res);
  if(res.status === "connected"){
    alert("您已登入囉！");
    accessToken = res.authResponse.accessToken;
    FB.login(function(res) {
      getFbApi();
    }, {
        scope: 'email'
    });
  } else if(res.status === "not_authorized"){
    alert("您已登入Facebook, 尚未登入Stylish喔！ 登入可能不時會有小驚喜喔！");
    FB.login(function(res) {
      console.log(res);
      accessToken = res.authResponse.accessToken;
      getFbApi();
    }, {
        scope: 'email'
    });
  } else{
    alert("您尚未登入Facebook與Stylish喔！登入可能不時會有小驚喜喔！");
    FB.login(function(res) {
      console.log(res);
      accessToken = res.authResponse.accessToken;
      getFbApi();
    }, {
        scope: 'email'
    });
  }
}

let checkMemberStatus = () => {
  FB.getLoginStatus(function(res) {
    console.log(res);
    statusCallback(res);
  });
}

let getFbApi = () => {
  FB.api("/me?fields=id, name, picture.width(720).height(720), email", res => {
    console.log(res);
    memberInfo = {};
    memberInfo.id = res.id;
    memberInfo.name = res.name;
    memberInfo.picture = res.picture.data.url;
    memberInfo.email = res.email;
    localStorage.setItem("memberInfo", JSON.stringify(memberInfo) );
    localStorage.setItem("accessToken", accessToken);
    location.href = "profile.html";
  });
}

smallMember.addEventListener("click", checkMemberStatus);
bigMember.addEventListener("click", checkMemberStatus);


// Old ways
// let categW = document.getElementById("categW");
// let categBW = document.getElementById("categBW");
// let categM = document.getElementById("categM");
// let categBM = document.getElementById("categBM");
// let categA = document.getElementById("categA");
// let categBA = document.getElementById("categBA");
// let smallLogo = document.getElementById("smallLogo");
// let mediumLogo = document.getElementById("mediumLogo");

/////Event Listener
// menu feature
// let toggleCateg = categName => {
//   currentDiv.innerHTML = "";
//   categ = categName;
//   ajax(`${initialUrl}${api}/${vs}/${main}/${categ}`, function(res){render(res);})
// }
// smallLogo.addEventListener("click", () => toggleCateg("all") );
// mediumLogo.addEventListener("click", () => toggleCateg("all") );
// categW.addEventListener("click", () => toggleCateg("women") );
// categBW.addEventListener("click", () => toggleCateg("women") );
// categM.addEventListener("click", () => toggleCateg("men") );
// categBM.addEventListener("click", () => toggleCateg("men") );
// categA.addEventListener("click", () => toggleCateg("accessories") );
// categBA.addEventListener("click", () => toggleCateg("accessories") );
