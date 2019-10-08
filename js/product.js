let productUrlParam = location.search; // "?id=201807201824"
categ = "products";
url = `${initialUrl}${api}/${vs}/${categ}/details${productUrlParam}`;

let proInfoWrapper = document.getElementById("proInfoWrapper");
let proDescription = document.getElementById("proDescription");
let mainPhoto = document.getElementById("mainPhoto");

let element;
let textContent;
let ulRowColor;
let colors;
let ulRowSize;
let elementId;
let span;
let innerText;
let imgIncrease;
let imgDecrease;
let divNumber;
let divProDetail;
let ulColumnFirst;
let ulColumnSecond;
let divProDesTop;
let storyPhoto;
let detailsStory;

let quantity;
let colorBlocks;
let chosenColor;
let chosenColorCode;
let sizes;
let chosenSize;
let variants;
let stock;
let noStock;
let unchecked;
let noColor;
let perHex;
let hex;
let rgbStringArray;
let bigImgIncrease;
let bigImgDecrease;
let bigSpan;

let addToCart;
let productsInCart = [];
let productInfo = {};
let proId;
let proTitle;
let proPrice;
let proColor;
let proSize;
let proQty;
let proImg;
let proStock;

// Render Product Details
function renderDetail(info) {
  createMainPhoto(info.main_image);
  createTitle(info.title);
  createIdNum(info.id);
  createPrice(info.price);
  createUlRow("ul-row", "ulRowColor");
  createLiTitle("ulRowColor", "顏色", "pro-info-colorsize");
  createLiColorBlock(info.colors);
  createUlRow("ul-row", "ulRowSize");
  createLiTitle("ulRowSize","尺寸", "pro-info-colorsize");
  createLiSize(info.sizes);
  createUlRow("ul-row", "ulNumber");
  document.getElementsByClassName("ul-row")[2].classList.add("ul-number");
  createLiTitle("ulNumber","數量", "pro-info-colorsize");
  createLiNumber();
  createSmallNumberDiv();
  createAddCart();
  createProNote(info.note);
  createProDetail(info.texture, info.description, info.place);
  //description Part
  createProDesTop();
  createDetailsStory(info.images, info.story);
  setDefaultStock();
  document.title = `${info.title} - Stylish`; //Meke title dynamically
  addToCart = document.getElementById("addToCart");
}

//Render Products Details Functions
let createMainPhoto = mainImg => {
  createElement("img");
  element.setAttribute("class", "main-photo-img");
  element.setAttribute("src", mainImg);
  appendChild(mainPhoto, element);
}

let createTitle = title => {
  createElement("h3");
  retrieveContent("", title);
  appendChild(element, textContent);
  appendChild(proInfoWrapper, element);
}

let createIdNum = idNum => {
  createElement("p");
  retrieveContent("", idNum); // only 8 numbers?!
  appendChild(element, textContent);
  appendChild(proInfoWrapper, element);
}

let createPrice = proPrice => {
  createElement("div");
  retrieveContent("TWD.",proPrice);
  appendChild(element, textContent);
  appendChild(proInfoWrapper, element);
  element.setAttribute("class", "pro-price");
}

// Function for Creating Ul Row
let createUlRow = (className, id ) => {
  createElement("ul");
  appendChild(proInfoWrapper, element);
  element.setAttribute("class", className);
  element.setAttribute("id", id);
}

let createLiTitle = (id, text, className) => {
  getId(id);
  createElement("li");
  retrieveContent(text,"");
  appendChild(element, textContent);
  appendChild(elementId, element);
  element.setAttribute("class", className);
}

let createLiColorBlock = colors => {
  colors.forEach(color => {
    createElement("li");
    element.setAttribute("class", "pro-info-colorblock");
    element.setAttribute("style", `background-color:#${color.code}`);
    appendChild(elementId, element);
  });
}

let createLiSize = proSizes => {
  proSizes.forEach(size => {
    createElement("li");
    element.setAttribute("class", "pro-info-size");
    retrieveContent("",size);
    appendChild(element, textContent);
    appendChild(elementId, element);
  });
}

//Quantity Board Div
let createNumberDiv = divClassName => {
  span = document.createElement("span");
  innerText = document.createTextNode("1");
  imgIncrease = document.createElement("img");
  imgDecrease = document.createElement("img");
  divNumber = document.createElement("div");
  appendChild(span, innerText);
  imgDecrease.setAttribute("src", "images/decrease.png");
  imgIncrease.setAttribute("src", "images/increase.png");
  divNumber.setAttribute("class", divClassName);
  appendChild(divNumber, imgDecrease);
  appendChild(divNumber, span);
  appendChild(divNumber, imgIncrease);
}

let createLiNumber = () => {
  createNumberDiv("li-number");
  createElement("li");
  appendChild(element, divNumber);
  appendChild(ulNumber, element);
}

let createSmallNumberDiv = () => {
  createNumberDiv("number");
  appendChild(proInfoWrapper, divNumber);
}

let createAddCart = () => {
  createElement("div");
  retrieveContent("加入購物車","");
  appendChild(element, textContent);
  appendChild(proInfoWrapper, element);
  element.setAttribute("class", "addto-cart");
  element.setAttribute("id", "addToCart");
}

let createProNote = proNote => {
  createElement("div");
  retrieveContent("*", proNote);
  appendChild(element, textContent);
  appendChild(proInfoWrapper, element);
  element.setAttribute("class", "pro-note");
}

// Function for Creating Ul Column in Div
let createUlColumn = (className, id) => {
  createElement("ul");
  appendChild(divProDetail, element);
  element.setAttribute("class", className);
  element.setAttribute("id", id);
}

// Create Pro Detail Li
let createProDetailLi = (text, data, parent) => {
  createElement("li");
  retrieveContent(text, data);
  appendChild(element, textContent);
  appendChild(parent, element);
}

let createProDetail = (proTexture, proDescription, proPlace) => {
  divProDetail = document.createElement("div");
  divProDetail.setAttribute("class", "pro-detail");
  divProDetail.setAttribute("id", "proDetail");
  appendChild(proInfoWrapper, divProDetail);
  createUlColumn("ul-column", "ulColumnFirst");
  createUlColumn("ul-column", "ulColumnSecond");
  ulColumnFirst = document.getElementById("ulColumnFirst");
  ulColumnSecond = document.getElementById("ulColumnSecond");
  createProDetailLi("", proTexture, ulColumnFirst );
  createProDetailLi("", proDescription.split("\r\n")[0], ulColumnFirst);
  createProDetailLi("", proDescription.split("\r\n")[1], ulColumnFirst);
  createProDetailLi("素材產地 /", proPlace, ulColumnSecond);
  createProDetailLi("加工產地 /", proPlace, ulColumnSecond);
}

let createProDesTopDetails = () => {
  createElement("div");
  element.setAttribute("class", "details");
  retrieveContent("細部說明", "");
  appendChild(element, textContent);
  appendChild(divProDesTop, element);
}

let createProDesTopDetailsLine = () => {
  createElement("div");
  element.setAttribute("class", "details-line");
  appendChild(divProDesTop, element);
}

let createProDesTop = () => {
  divProDesTop = document.createElement("div");
  divProDesTop.setAttribute("class", "pro-des-top");
  createProDesTopDetails();
  createProDesTopDetailsLine();
  appendChild(proDescription, divProDesTop);
}

let createDetailsStoryImg = (proImg, i) => {
  createElement("img");
  element.setAttribute("src", proImg[i]);
  element.setAttribute("class", "story-photo");
  appendChild(detailsStory, element);
}

let createStoryP = proStory => {
  createElement("p");
  retrieveContent("", proStory);
  appendChild(element, textContent);
  appendChild(detailsStory, element);
}

let createDetailsStory = (proImg, proStory) => {
  detailsStory = document.createElement("div");
  detailsStory.setAttribute("class", "details-story");
  createStoryP(proStory);
  createDetailsStoryImg(proImg, 0);
  createStoryP(proStory);
  createDetailsStoryImg(proImg, 1);
  appendChild(proDescription, detailsStory);
}

let setDefaultStock = () => {
  colorBlocks = document.getElementsByClassName("pro-info-colorblock");
  sizes = document.getElementsByClassName("pro-info-size");
  colorBlocks[0].classList.add("pro-info-colorblock-selected");
  sizes[0].classList.add("pro-info-size-selected");
  chosenColor = colorBlocks[0].style.backgroundColor;
  rgbToHex(chosenColor);
  chosenSize = sizes[0].textContent;
  variants = data.variants;
  variants = variants.filter(variant => `#${variant.color_code}` === hex);
  variants = variants.filter(variant => variant.size === chosenSize);
  stock = variants[0].stock;
}

// Counter Feature
let counter = () => {
  quantity = parseInt(span.textContent);
  increaseQuantity(imgIncrease, span);
  decreaseQuantity(imgDecrease, span);
  getBigCounterEle();
  increaseQuantity(bigImgIncrease, bigSpan);
  decreaseQuantity(bigImgDecrease, bigSpan);
}

let increaseQuantity = (sizeButton, sizeSpan) => {
  sizeButton.addEventListener("click", () => {
    if(quantity < stock){
    quantity += 1;
    sizeSpan.textContent = quantity.toString();
    }else{return;}
  });
}
let decreaseQuantity = (sizeButton, sizeSpan) => {
  sizeButton.addEventListener("click", () => {
    if(quantity > 1){quantity -= 1}else{return;};
    sizeSpan.textContent = quantity.toString();
  });
}
let getBigCounterEle = () => {
  bigImgDecrease = document.getElementsByClassName("li-number")[0].children[0];
  bigImgIncrease = document.getElementsByClassName("li-number")[0].children[2];
  bigSpan = document.getElementsByClassName("li-number")[0].children[1];
}

// Check the Stocks
let checkQuantity = () => {
  for(let i = 0; i < colorBlocks.length; i++){
    colorBlocks[i].addEventListener("click", selectedColor);
  }
  for(let j = 0; j < sizes.length; j++){
    sizes[j].addEventListener("click", selectedSize);
  }
}

let selectedColor = e => {
  backToInitialStateFirstStage();
  removeSelectedClass(colorBlocks, "pro-info-colorblock-selected");
  e.target.classList.add("pro-info-colorblock-selected");
  chosenColor = e.target.style.backgroundColor;
  rgbToHex(chosenColor);
  variants = variants.filter(variant => `#${variant.color_code}` === hex);
  outOfStockSize(variants);
  for(let i = 0; i < sizes.length; i++){
    if(sizes[i].classList.contains("pro-info-size-selected")){
      chosenSize = sizes[i].textContent;
    }
  }

  unchecked = data.variants;
  unchecked = unchecked.filter(variant => variant.size === chosenSize);
  outOfStockColor(unchecked);
  variants = variants.filter(variant => variant.size === chosenSize);
  stock = variants[0].stock;
}

let selectedSize = e => {
  backToInitialStateFirstStage();
  removeSelectedClass(sizes, "pro-info-size-selected");
  e.target.classList.add("pro-info-size-selected");
  chosenSize = e.target.textContent;
  variants = variants.filter(variant => variant.size === chosenSize);
  outOfStockColor(variants);
  for(let i = 0; i < colorBlocks.length; i++){
    if(colorBlocks[i].classList.contains("pro-info-colorblock-selected") ){
      chosenSize = colorBlocks[i].style.backgroundColor;
      rgbToHex(chosenColor);
    }
  }

   unchecked = data.variants;
   unchecked = unchecked.filter(variant => `#${variant.color_code}` === hex);
   outOfStockSize(unchecked);

   variants = variants.filter(variant => `#${variant.color_code}` === hex);
   stock = variants[0].stock;
}

let backToInitialStateFirstStage = () => {
  variants = data.variants;
  quantity = 1;
  span.textContent = "1";
  bigSpan.textContent = "1";
  backToInitialClassState(colorBlocks, "colorblock", selectedColor);
  backToInitialClassState(sizes, "size", selectedSize);
  stock = 0;
}

let backToInitialClassState = (type, typeClass, func) => {
  for(let i = 0; i < type.length; i++){
    type[i].classList.remove(`pro-info-${typeClass}-remove`)
    type[i].addEventListener("click", func);
  }
}

// Disable/Active options if out of stock
let outOfStockSize = array => {
  for(let i = 0; i < array.length; i++){
    if(array[i].stock === 0){
      noStock = array[i].size; //what if there are more than one size out of stock?!
      for(let j = 0; j < sizes.length; j++){
        if(sizes[j].textContent === noStock){
          sizes[j].classList.add("pro-info-size-remove");
          sizes[j].removeEventListener("click", selectedSize);
          if(sizes[j].textContent === noStock && sizes[j].classList.contains("pro-info-size-selected") ){
            sizes[j].classList.remove("pro-info-size-selected");
          }
        }
      }
    }
  }
}

let outOfStockColor = array => {
  for(let i = 0; i < array.length; i++){
    if(array[i].stock === 0){
      noStock = `#${array[i].color_code}`;
      for(let j = 0; j < colorBlocks.length; j++){
        let rgbColor = colorBlocks[j].style.backgroundColor;
        rgbToHex(rgbColor);
        if(hex === noStock){
          colorBlocks[j].classList.add("pro-info-colorblock-remove");
          colorBlocks[j].removeEventListener("click", selectedColor);
          if(hex === noStock && colorBlocks[j].classList.contains("pro-info-colorblock-seleted") ){
            colorBlocks[j].classList.remove("pro-info-colorblock-selected");
          }
        }
      }
    }
  }
}

// Convert RGB to Hex
let rgbToHex = rgbString => {
  let regexp = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;  // need to research
  rgbStringArray = rgbString.match(regexp);
  rgbStringArray.shift();
  hex="#";
  rgbStringArray.forEach(perRgb => {
    perHex = Number(perRgb).toString(16);
    if(perHex.length < 2){
      perHex = "0" + perHex;
    }
    hex += perHex;
  });
  hex = hex.toUpperCase();
}

// Remove Selected Class
let removeSelectedClass = (typeCollections, className) => {
  for(let i = 0; i < typeCollections.length; i++){
    if(typeCollections[i].classList.contains(className) ){
      typeCollections[i].classList.remove(className);
    }
  }
}

// Function for Adding Products to Shopping Cart and localStorage
let addProduct = () => {
  productsInCart = productsInCartOrder.list;

  class Products {
    constructor(id, name, price, color, size, qty, img, stock){
      this.id = id;
      this.name = name;
      this.price = price;
      this.color = color;
      this.size = size;
      this.qty = qty;
      this.img = img;
      this.stock = stock;
    }
  }

  let proColorName = data.colors.filter(color => color.code === variants[0].color_code);
  proColorName = proColorName[0].name;

  proId = data.id;
  proTitle = data.title;
  proPrice = data.price;
  proColor = { name: proColorName, code: variants[0].color_code };
  proSize = variants[0].size;
  proQty = quantity;
  proImg = data.main_image;
  proStock = stock;

  productInfo = new Products(proId, proTitle, proPrice, proColor, proSize, proQty, proImg, proStock);

  for(let i = 0; i < productsInCart.length; i++){
    let repeatItemId = productsInCart[i].id;
    let repeatItemSize = productsInCart[i].size;
    let repeatItemColor = productsInCart[i].color.name;
    if(proId === repeatItemId && proSize === repeatItemSize && proColor.name === repeatItemColor){
      productsInCart.splice(i, 1);
    }
  }
  productsInCart.push(productInfo);

  productsInCartOrder.list = productsInCart;
  order = JSON.stringify(productsInCartOrder);
  localStorage.setItem("order", order);
  quantityInCartCount(productsInCart.length);
  alert("商品已加入購物車囉！");
}

ajax(url, function(res){
  renderDetail(res);
  checkQuantity();
  counter();
  addToCart.addEventListener("click", addProduct);
});
