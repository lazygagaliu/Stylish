let memberName = document.getElementById("memberName");
let memberPic = document.getElementById("memberPic");
let memberEmail = document.getElementById("memberEmail");
let memberId = document.getElementById("memberId");
let logout = document.getElementById("logout");

let memberData;

// Show member info on the page
loadingGif.style.display = "block";
memberInfo = JSON.parse(localStorage.getItem("memberInfo") );
memberName.textContent = memberInfo.name;
memberPic.setAttribute("src", memberInfo.picture);
memberEmail.textContent = memberInfo.email;
memberId.textContent = memberInfo.id;
loadingGif.style.display = "none";


// Logout feature
logout.addEventListener("click", () => {
  FB.logout(function(response) {
    alert("您已登出囉！");
    memberInfo = {};
    localStorage.removeItem("accessToken");
    localStorage.removeItem("memberInfo");
    location.href = "index.html";
  });
});

// Send Fb accessToken back to signin API
let ajaxFbToken = () => {
  accessToken = localStorage.getItem("accessToken");
  let fbJson = {};
  fbJson.provider = "facebook";
  fbJson.access_token = accessToken;
  fbJson = JSON.stringify(fbJson);
  console.log(fbJson);
  url = `${initialUrl}${api}/${vs}/user/signin`;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      memberData = JSON.parse(xhr.responseText);
      console.log(memberData);
      localStorage.setItem("memberData", memberData);
    }
  };
  xhr.send(fbJson);
}

ajaxFbToken();
