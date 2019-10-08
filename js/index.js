let query;
let categs = ["女裝", "男裝", "配件"];
let timer;

// Render Products
function render(info){
  info.forEach(detail => {
  productsDiv = document.createElement("div");
  productsDiv.setAttribute("class", "product");
  appendChild(currentDiv, productsDiv);
  createProductLinkA(detail.id);
  createImg(detail.main_image);
  createRectDiv();
  createProdInfo("", detail.title);
  createProdInfo("TWD.", detail.price);
  detail.colors.forEach(color => {
    createRect(color.code);
    });
  });
}

// Render Products Info Functions Group
let createRect = dataColorCode => {
  createElement("div");
  element.setAttribute("class", "rect");
  element.setAttribute("style", `background-color:#${dataColorCode}`);
  appendChild(rectDiv, element);
}

let createRectDiv = () => {
  rectDiv = document.createElement("div");
  appendChild(linkA, rectDiv);
}

let createProdInfo = (text, info) => {
  createElement("div");
  element.setAttribute("class", "prod-info");
  retrieveContent(text, info);
  appendChild(element, textContent);
  appendChild(linkA, element);
}

let createImg = dataImg => {
  createElement("img");
  element.setAttribute("src", dataImg);
  appendChild(linkA, element);
}

let createProductLinkA = dataId => {
  linkA = document.createElement("a");
  linkA.setAttribute("href", `products.html?id=${dataId}`);
  appendChild(productsDiv, linkA);
}

// Render banners function
function renderBanner(info) {
  info.forEach(detail => {
    bannerContents = detail.story.split("\r\n");
    createHeaderPhotoWrapper(detail.picture);
    createHeaderPhoto();
    let laseItem = bannerContents.pop();
    bannerContents.forEach(content => {
      createBannerText(content);
    });
    createBannerTextLast(laseItem);
  });
}

// Render Banners Functions Group
let createBannerText = text => {
  createElement("div");
  retrieveContent("", text);
  element.setAttribute("class", "big-heading");
  appendChild(element, textContent);
  appendChild(headerPhoto, element);
}

let createBannerTextLast = text => {
  createElement("div");
  retrieveContent("", text);
  element.setAttribute("class", "small-heading");
  appendChild(element, textContent);
  appendChild(headerPhoto, element);
}

let createHeaderPhoto = () => {
  headerPhoto = document.createElement("div");
  headerPhoto.setAttribute("class", "header-photo");
  appendChild(headerPhotoWrapper, headerPhoto);
}

let createHeaderPhotoWrapper = bannerImg => {
  headerPhotoWrapper = document.createElement("div");
  headerPhotoWrapper.setAttribute("class", "slides");
  headerPhotoWrapper.setAttribute("style", `background-image:url('${initialUrl}${bannerImg}')`);
  appendChild(banners, headerPhotoWrapper);
}

// Initial Banner render
function renderInitialBanner() {
  main = "marketing";
  categ = "campaigns";
  url = `${initialUrl}${api}/${vs}/${main}/${categ}`;
  ajax(url, function(res){renderBanner(res);addClasses();
    timer = setInterval(carousel, 10000); // ***Put in a variable => calling it !
  });
}
renderInitialBanner();

// Render Content according to category or search and make title dynamically function
function renderInitial() {
  query = location.search.split("="); //"?search=xxx"
  if(!location.search){
    categ = "all";
    main = "products";
    url = `${initialUrl}${api}/${vs}/${main}/${categ}/`;
    ajax(url, function(res){render(res);});
  }else if(query[0] === "?categ"){
    categ = location.search.slice(7); // "?categ=women"
    main = "products";
    url = `${initialUrl}${api}/${vs}/${main}/${categ}`;
    ajax(url, function(res){
      render(res);
      if(categ === "women"){
        document.title = `${categs[0]} - Stylish`;
      } else if(categ === "men"){
        document.title = `${categs[1]} - Stylish`;
      } else {
        document.title = `${categs[2]} - Stylish`;
      }
    });

  }else{
    categ = "search";
    main = "products";
    url = `${initialUrl}${api}/${vs}/${main}/${categ}?keyword=${query[1]}`;
    ajax(url, function(res){render(res);});
    let searchTitle = decodeURIComponent(query[1]);
    document.title = `${searchTitle} - Stylish`;
  }
}

renderInitial();

// Slideshow function
///////***** need to DRY
let smallDots = document.getElementsByClassName("small-dot");
let smallDot1 = smallDots[0];
let smallDot2 = smallDots[1];
let smallDot3 = smallDots[2];

function addClasses(){
  banner1 = document.getElementsByClassName("slides")[0];
  banner2 = document.getElementsByClassName("slides")[1];
  banner3 = document.getElementsByClassName("slides")[2];
  banner1.setAttribute("class","bannerFirst header-photo-wrapper slides");
  banner2.setAttribute("class","noshow header-photo-wrapper slides");
  banner3.setAttribute("class","bannerSecond header-photo-wrapper slides");
}

function carousel(){
   if(banner1.classList.contains("bannerFirst") ){
    banner1.classList.remove("bannerFirst");
    banner1.classList.add("bannerSecond");
    banner2.classList.add("bannerFirst");
    banner2.classList.remove("noshow");
    banner3.classList.remove("bannerSecond");
    banner3.classList.add("noshow");
    smallDot1.classList.remove("your-turn");
    smallDot2.classList.add("your-turn");
  } else if (banner2.classList.contains("bannerFirst") ){
    banner1.classList.remove("bannerSecond");
    banner1.classList.add("noshow");
    banner2.classList.add("bannerSecond");
    banner2.classList.remove("bannerFirst");
    banner3.classList.add("bannerFirst");
    banner3.classList.remove("noshow");
    smallDot3.classList.add("your-turn");
    smallDot2.classList.remove("your-turn");
  } else if(banner3.classList.contains("bannerFirst") ){
    banner1.classList.add("bannerFirst");
    banner1.classList.remove("noshow");
    banner2.classList.remove("bannerSecond");
    banner2.classList.add("noshow");
    banner3.classList.remove("bannerFirst");
    banner3.classList.add("bannerSecond");
    smallDot3.classList.remove("your-turn");
    smallDot1.classList.add("your-turn");
  }
}

let smallDot1Func = () => {
  clearInterval(timer);
  banner1.setAttribute("class","bannerFirst header-photo-wrapper slides");
  banner2.setAttribute("class","noshow header-photo-wrapper slides");
  banner3.setAttribute("class","bannerSecond header-photo-wrapper slides");
  smallDot1.setAttribute("class", "small-dot first-dot your-turn");
  smallDot2.setAttribute("class", "small-dot second-dot");
  smallDot3.setAttribute("class", "small-dot third-dot");

  timer = setInterval(carousel, 10000);
}

let smallDot2Func = () => {
  clearInterval(timer);
  banner1.setAttribute("class","bannerSecond header-photo-wrapper slides");
  banner2.setAttribute("class","bannerFirst header-photo-wrapper slides");
  banner3.setAttribute("class","noshow header-photo-wrapper slides");
  smallDot1.setAttribute("class", "small-dot first-dot");
  smallDot2.setAttribute("class", "small-dot second-dot your-turn");
  smallDot3.setAttribute("class", "small-dot third-dot");
  timer = setInterval(carousel, 10000);
}

let smallDot3Func = () => {
  clearInterval(timer);
  banner1.setAttribute("class","noshow header-photo-wrapper slides");
  banner2.setAttribute("class","bannerSecond header-photo-wrapper slides");
  banner3.setAttribute("class","bannerFirst header-photo-wrapper slides");
  smallDot1.setAttribute("class", "small-dot first-dot");
  smallDot2.setAttribute("class", "small-dot second-dot");
  smallDot3.setAttribute("class", "small-dot third-dot your-turn");
  timer = setInterval(carousel, 10000);
}

smallDot1.addEventListener("click", smallDot1Func);
smallDot2.addEventListener("click", smallDot2Func);
smallDot3.addEventListener("click", smallDot3Func);


// Infinite Scroll
let loading = false;
function ajaxMore(){
  scrollY = window.scrollY;
  footerHeight = document.querySelector("footer").getBoundingClientRect().top;
  if(footerHeight <= scrollY && !loading){
    if(paging){
      nextPageUrl = `${initialUrl}${api}/${vs}/${main}/${categ}?paging=${paging}`;
    } else{
      return;
    }
    loading = true;
    ajax(nextPageUrl, function(res){render(res); loading = false;})
  }
}
function scroll(){
  window.addEventListener("scroll", ajaxMore);
}
scroll();
