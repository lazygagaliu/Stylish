let cartWrapper = document.getElementById("cartWrapper");
let productWrapper;
let productPhotoDetailWrapper;
let productDetailWrapper;
let productTypeWrapper;
let productInfoWrapper;
let ul;
let productInfo;
let select;
let stockForProduct;
let variantsInApi;
let qtyInCart;
let productAmount;
let qtys;
let unitPrices;
let productTotalAmount;
let titleNumber;
let newQty;
let deletes;
let productWrappers;
let totalAmount;
let totalAmountSpan;
let freightSpan;
let finalAmountSpan;
let freight;
let finalAmount;

let payment;
let name;
let phone;
let address;
let email;
let deliveries;
let chosenDelivery;
let prime;
let orderNumber;
let popUpReminders = document.getElementsByClassName("pop-up-reminder");

let confirmBlock;

// Get localStorage Data
let getLocalStorage = () => {
  productsInCartOrder = JSON.parse(localStorage.getItem("order"));
  totalInCart = productsInCartOrder.list;
  listLength = totalInCart.length;
}

// Set localStorage Data
let setLocalStorage = () => {
  productsInCartOrder.list = totalInCart;
  order = JSON.stringify(productsInCartOrder);
  localStorage.setItem("order", order);
  quantityInCartCount(listLength); //From main.js
}

// Not Working?!?!?!
// let createWrapper = (div, className, parent) => {
//   div = document.createElement("div");
//   div.setAttribute("class", className);
//   appendChild(parent, div);
// }

// Render carts functions
let createProductWrapper = () => {
  productWrapper = document.createElement("div");
  productWrapper.setAttribute("class", "product-wrapper");
  appendChild(cartWrapper, productWrapper);
}

let createProductPhotoDetailWrapper = () => {
  productPhotoDetailWrapper = document.createElement("div");
  productPhotoDetailWrapper.setAttribute("class", "product-photo-detail-wrapper");
  appendChild(productWrapper, productPhotoDetailWrapper);
}

let createProductImg = img => {
  createElement("img");
  element.setAttribute("class", "img");
  element.setAttribute("src", img);
  appendChild(productPhotoDetailWrapper, element);
}

let createProductDetailWrapper = () => {
  productDetailWrapper = document.createElement("div");
  productDetailWrapper.setAttribute("class", "product-detail-wrapper");
  appendChild(productPhotoDetailWrapper, productDetailWrapper);
}

let createProductDetail = detail => {
  createElement("div");
  element.setAttribute("class", "product-detail");
  retrieveContent("", detail);
  appendChild(element, textContent);
  appendChild(productDetailWrapper, element);
}

let createProductTypeWrapper = () => {
  productTypeWrapper = document.createElement("product-type-wrapper");
  productTypeWrapper.setAttribute("class", "product-type-wrapper");
  appendChild(productDetailWrapper, productTypeWrapper)
}

let createProductType = type => {
  createElement("div");
  element.setAttribute("class", "product-type");
  retrieveContent(type, "");
  appendChild(element, textContent);
  appendChild(productTypeWrapper, element);
}

let createProductTypeContent = content => {
  createElement("div");
  element.setAttribute("class", "product-type-content");
  retrieveContent("", content);
  appendChild(element, textContent);
  appendChild(productTypeWrapper, element);
}

let createProductInfoWrapper = () => {
  productInfoWrapper = document.createElement("div");
  productInfoWrapper.setAttribute("class", "product-info-wrapper");
  appendChild(productWrapper, productInfoWrapper);
}

let createUl = () => {
  ul = document.createElement("ul");
  createLi("數量");
  createLi("單價");
  createLi("小計");
  appendChild(productInfoWrapper, ul)
}

let createLi = content => {
  createElement("li");
  retrieveContent(content, "");
  appendChild(element, textContent);
  appendChild(ul, element);
}

let createProductInfo = () => {
  productInfo = document.createElement("div");
  productInfo.setAttribute("class", "product-info");
  appendChild(productInfoWrapper, productInfo);
}

let createSelect = () => {
  select = document.createElement("select");
  select.setAttribute("class", "qty")
  appendChild(productInfo, select);
}

let createPrices = price => {
  createElement("div");
  retrieveContent("NT.", price);
  element.setAttribute("class", "unit-price");
  appendChild(element, textContent);
  appendChild(productInfo, element);
}

let getApiData = data => variantsInApi = data.variants;

let createModifiedNumber = dataInCart => {
  for(let i = 0; i < variantsInApi.length; i++){
    if(variantsInApi[i].size === dataInCart.size && variantsInApi[i].color_code === dataInCart.color.code){
      stockForProduct = parseInt(variantsInApi[i].stock);
    }
  }
  for(let i = 1; i <= dataInCart.stock; i++){
    createElement("option");
    retrieveContent("",i);
    element.setAttribute("value", i);
    if(i === dataInCart.qty){
      element.setAttribute("selected", "selected");
    }
    appendChild(element, textContent);
    appendChild(select, element);
  }
}

let createTotalPrices = unitPrice => {
  createElement("div");
  qtyInCart = parseInt(select.value);
  productAmount = qtyInCart * unitPrice;
  element.setAttribute("class", "product-total-amount");
  retrieveContent("NT.", productAmount);
  appendChild(element, textContent);
  appendChild(productInfo, element);
}

let createDeleteButton = () => {
  createElement("img");
  element.setAttribute("class", "delete");
  element.setAttribute("src", "images/cart-remove.png");
  appendChild(productWrapper, element);
}

// Calculate Single Product Total Price
let calculateProductTotal = () => {
  qtys = document.getElementsByClassName("qty");
  unitPrices = document.getElementsByClassName("unit-price");
  productTotalAmount = document.getElementsByClassName("product-total-amount");
  for(let j = 0; j < qtys.length; j++){
    qtys[j].addEventListener("change", () => {
      qtys = document.getElementsByClassName("qty");
      unitPrices = document.getElementsByClassName("unit-price");
      productTotalAmount = document.getElementsByClassName("product-total-amount");
      getLocalStorage();
      for(let i = 0; i < qtys.length; i++){
        let splitPrice = unitPrices[i].textContent.split(".")
        productAmount = parseInt(qtys[i].value) * parseInt(splitPrice[1])
        productTotalAmount[i].textContent = `NT.${productAmount}`;
        totalInCart[i].qty = parseInt(qtys[i].value);
        setLocalStorage();
        showTotalAmount();
        showFinalAmount();
      }
    });
  }
}

// Show Total Amount
let showTotalAmount = () => {
  getLocalStorage();
  totalAmount = 0;
  productTotalAmount = document.getElementsByClassName("product-total-amount");
  totalAmountSpan = document.getElementById("totalAmountSpan");
  for(let i = 0; i < productTotalAmount.length; i++){
    let splitAmount = productTotalAmount[i].textContent.split(".");
    totalAmount += parseInt(splitAmount[1]);
  }
  productsInCartOrder.subtotal = totalAmount;
  totalAmountSpan.textContent = totalAmount.toString();
  setLocalStorage();
}

// Show Final Amount
let showFinalAmount = () => {
  getLocalStorage();
  freightSpan = document.getElementById("freightSpan");
  finalAmountSpan = document.getElementById("finalAmountSpan");
  freight = freightSpan.textContent;
  finalAmount = parseInt(totalAmount) + parseInt(freight);
  finalAmountSpan.textContent = finalAmount.toString();
  productsInCartOrder.total = finalAmount;
  productsInCartOrder.freight = parseInt(freight);
  setLocalStorage();
}

// Delete Product Feature
let deleteProduct = () => {
  deletes = document.getElementsByClassName("delete");
  productWrappers = document.getElementsByClassName("product-wrapper");
  for(let i = 0; i < deletes.length; i++){
    deletes[i].addEventListener("click", () => {
      getLocalStorage();
      productWrappers[i].style.display = "none";
      productTotalAmount[i].textContent = "NT.0";
      console.log(totalInCart);
      totalInCart.splice(i, 1);
      console.log(totalInCart);
      setLocalStorage();
      showTotalAmount();
      showFinalAmount();
      getLocalStorage();
      quantityInCartCount(listLength);
      makeTitleUpdated();
    });
  }
}

// Make Title Number Updated
let makeTitleUpdated = () => {
  titleNumber = document.getElementById("titleNumber");
  listLength = listLength.toString();
  titleNumber.textContent = `(${listLength})`;
}

// Cart page main functions
let renderCart = () => {
  let i = 0; // flag for checking if ajax has done its' work

  if(totalInCart.length < 1){
    alert("購物車空空捏～快回去大採買一番！！！");
    location.href = "index.html";
  }

  totalInCart.forEach(info => {

    url = `${initialUrl}${api}/${vs}/products/details?id=${info.id}`;
    ajax(url, data => {
      getApiData(data);

      makeTitleUpdated();
      createProductWrapper();
      createProductPhotoDetailWrapper();
      createProductImg(info.img);
      createProductDetailWrapper();
      createProductDetail(info.name);
      createProductDetail(info.id);
      createProductTypeWrapper();
      createProductType("顏色");
      createProductTypeContent(info.color.name);
      createProductTypeWrapper();
      createProductType("尺寸");
      createProductTypeContent(info.size);
      createProductInfoWrapper();
      createUl();
      createProductInfo();
      createSelect();
      createModifiedNumber(info);
      createPrices(info.price);
      createTotalPrices(parseInt(info.price));
      createDeleteButton();

      i++;
      if(i === totalInCart.length){
        calculateProductTotal();
        showTotalAmount();
        deleteProduct();
        showFinalAmount();
      }
    });
  });
}

renderCart();

// Get PaymentMethod
payment = document.getElementById("payment");
payment.addEventListener("change", () => {
  getLocalStorage();
  productsInCartOrder.payment = payment.value;
  setLocalStorage();
});

// Didn't Work!!!!!!!
// let getInputData = (div, info) => {
//   div.addEventListener("input", info => {
//     getLocalStorage();
//     info = div.value;
//     setLocalStorage();
//   });
// }


// Get Inputs Data and also check the data format -- try to DRY!!!
let checkFormat = (name, number) => {
  popUpReminders[number].textContent = `***Oooooops! 您的${name}未填寫或是格式有誤喔!`;
}
let checkFormatOk = number => {
  popUpReminders[number].textContent = "";
}

name = document.getElementById("name");
name.addEventListener("input", () => {
  getLocalStorage();
  productsInCartOrder.recipient.name = name.value;
  setLocalStorage();
});
name.addEventListener("blur", () => {
  if(!/^[\u4E00-\u9FA5]{2,4}$/.test(name.value) ){
    checkFormat("名字", 0);
  } else {
    checkFormatOk(0);
  }
});

phone = document.getElementById("phone");
phone.addEventListener("input", () => {
  getLocalStorage();
  productsInCartOrder.recipient.phone = phone.value;
  setLocalStorage();
});
phone.addEventListener("blur", () => {
  if(!/^0[0-9]{1}[0-9]{7,8}$/.test(phone.value) ){
    checkFormat("電話", 1);
  } else {
    checkFormatOk(1);
  }
});

address = document.getElementById("address");
address.addEventListener("input", () => {
  getLocalStorage();
  productsInCartOrder.recipient.address = address.value;
  setLocalStorage();
});
address.addEventListener("blur", () => {
  if(!address.value){
    checkFormat("地址", 2);
  } else {
    checkFormatOk(2);
  }
});

email = document.getElementById("email");
email.addEventListener("input", () => {
  getLocalStorage();
  productsInCartOrder.recipient.email = email.value;
  setLocalStorage();
});
email.addEventListener("blur", () => {
  if(!/^\w+@\w+\.\w{2,3}\.?(\w\w)?$/.test(email.value) ){
    checkFormat("電子郵件", 3);
  } else {
    checkFormatOk(3);
  }
});

deliveries = document.getElementsByClassName("delivery");
for(let i = 0; i < deliveries.length; i++){
  deliveries[i].addEventListener("click", () => {
    getLocalStorage();
    productsInCartOrder.recipient.time = deliveries[i].value;
    setLocalStorage();
    chosenDelivery = true;
  });
}

// Set TapPay
TPDirect.setupSDK(12348, 'app_pa1pQcKoY22IlnSXq5m5WP5jFKzoRG58VEXpT7wU62ud7mMbDOGzCYIlzzLF', 'sandbox');
  let fields = {
    number: {
        // css selector
        element: '#card-number',
        placeholder: '**** **** **** ****'
    },
    expirationDate: {
        // DOM object
        element: document.getElementById('card-expiration-date'),
        placeholder: 'MM / YY'
    },
    ccv: {
        element: '#card-ccv',
        placeholder: '後三碼'
    }
}
TPDirect.card.setup({
    fields: fields,
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.cvc': {
            'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            'font-size': '16px'
        },
        // style focus state
        ':focus': {
            'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
    }
});

// If user login in send the order list and accessToken back to server
let ajaxCheckOutLogIn = () => {
  let json = {};
  let jsonPrime = JSON.parse(localStorage.getItem("prime"));
  let jsonOrder = JSON.parse(localStorage.getItem("order"));
  let jsonAccessToken = localStorage.getItem("accessToken");
  json.prime = jsonPrime;
  json.order = jsonOrder;
  json = JSON.stringify(json);
  console.log(json);
  url = `${initialUrl}${api}/${vs}/order/checkout`;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("Authorization", `Bearer ${jsonAccessToken}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      orderNumber = xhr.responseText;
      console.log(jsonAccessToken);
      localStorage.clear();
      localStorage.setItem("orderNumber", orderNumber);
      alert("您的訂單已完成，感謝您的購買！");
      location.href = "thankyou.html";
    }
  };
  xhr.send(json);
}

// If user not login in send only the order list back to server
let ajaxCheckOutLogOut = () => {
  let jsonLogOut = {};
  let jsonPrime = JSON.parse(localStorage.getItem("prime"));
  let jsonOrder = JSON.parse(localStorage.getItem("order"));
  jsonLogOut.prime = jsonPrime;
  jsonLogOut.order = jsonOrder;
  jsonLogOut = JSON.stringify(jsonLogOut);
  console.log(jsonLogOut);
  url = `${initialUrl}${api}/${vs}/order/checkout`;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      orderNumber = xhr.responseText;
      console.log(orderNumber);
      localStorage.clear();
      localStorage.setItem("orderNumber", orderNumber);
      alert("您的訂單已完成，感謝您的購買！");
      location.href = "thankyou.html";
    }
  };
  xhr.send(jsonLogOut);
}

//Check out function
function onSubmit(event) {
    event.preventDefault();
    for(let i = 0; i < popUpReminders.length; i++){
      if(popUpReminders[i].textContent !== ""){
        alert("還有資料未填寫完全或正確喔！");
        return;
      }
    }

    if(!chosenDelivery){
      alert("Oooooops! 請讓我們獲得您的希望送達時間喔!");
      location.href = "#deliveryWrapper";
      return;
    }

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('can not get prime');
        return;
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            alert('get prime error ' + result.msg);
            return;
        };
        alert('get prime 成功，prime: ' + result.card.prime);
        // send prime to your server, to pay with Pay by Prime API .
        prime = JSON.parse(localStorage.getItem("prime"));
        prime = result.card.prime;
        prime = JSON.stringify(prime);
        localStorage.setItem("prime", prime);

        if(localStorage.getItem("accessToken") ){
        ajaxCheckOutLogIn();
      } else {
        ajaxCheckOutLogOut();
      }
    })
}

confirmBlock = document.querySelector(".confirm-block");

TPDirect.card.onUpdate(function (update) {
    // update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        confirmBlock.removeAttribute("disabled");
        confirmBlock.addEventListener("click", onSubmit);
    } else {
        // Disable submit Button to get prime.
        confirmBlock.setAttribute('disabled', true);
    }

    // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
    // if (update.cardType === 'visa') {
    //     // Handle card type visa.
    // }

    // number 欄位是錯誤的
    if (update.status.number === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

    if (update.status.expiry === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }

    if (update.status.cvc === 2) {
        // setNumberFormGroupToError();
    } else if (update.status.cvc === 0) {
        // setNumberFormGroupToSuccess();
    } else {
        // setNumberFormGroupToNormal();
    }
})
