/* 전역변수 리스트---------------------------------------- */
let grid;

const className_on = "on";

//header#header
const header = document.querySelector("#header");
const menu = header.querySelector(".menu");
const btns = menu.querySelectorAll("#gnb li");
let total = btns.length;

const main = document.querySelector("main");
const sort = main.querySelector("#sort");

//section#sort
const articles = document.querySelectorAll("article");

//section#popUp
const popUp = document.querySelector("#popUp");
const aside = popUp.querySelector("aside");
const close = popUp.querySelector("span");


/* 이벤트 연결---------------------------------------- */
setTimeout(() => {
  grid = new Isotope("section", {
    itemSelection: "article",
    columnWidth: "article",
    transitionDuration: "1s",
  });

  main.classList.add(className_on);
}, 2500);

for (let i = 0; i < total; i++) {
  btns[i].addEventListener("click", e => {
    e.preventDefault();

    let isOn = btns[i].classList.contains(className_on);
    if (isOn) return;

    sortFrame(e);
    activation(btns, e);
  })
}

for (let el of articles) {
  el.addEventListener("click", e => {
    e.preventDefault();
    activePopUp(e);
  });
}

close.addEventListener("click", () => {
  popUp.classList.remove("on");
});


fetch("./data/data.json")
  .then(data => {
    return data.json();
  })
  .then(json => {
    const dataInfo = json.data;
    const hairdresserCon = json.hairdresserCon;
    console.log(hairdresserCon.length);
    
    let tags = "";

    dataInfo.map(pic => {
      let len = pic.className.length;
      let picCon = "";
      //console.log(len);
      
      /*hairCon.map(con => {
        console.log(con);
      });*/
      


      for(let k = 0; k < 2; k++){
        for(let i = 0; i < len; i++){
          tags += `
          <article class="${pic.className[i]}">
            <div>
              <img src="${pic.src[k] + (k+1)}.jpg" alt="${pic.alt[i]+(k+1)}">
              <div>
                <h2></h2>
                <p></p>
              </div>
            </div>
          </article>
          `;
        }
      }

      console.log(tags);

      /*tags = `
        <article class="${pic.className[0]}">
          <div>
            <img src="${pic.src[0]}.jpg">
          </div>
        </article>
      `;*/
    });
  });

fetch("./data/content.json")
  .then(data => {
    return data.json();
  })
  .then(json => {
    const conInfo = json.content;
    let arr = [];

    conInfo.map(con => {
      //console.log(con);
    });
  });


/* 함수 선언---------------------------------------- */
//선택한 메뉴에 .on 추가
function activation(lists, active) {
  for (let el of lists) {
    el.classList.remove(className_on);
  }

  active.currentTarget.classList.add(className_on);
}

//정렬 함수
function sortFrame(target) {
  const sort = target.currentTarget.querySelector("a").getAttribute("href");

  grid.arrange({
    filter: sort,
  });
}

//팝업 함수
function activePopUp(target) {
  let tit = target.currentTarget.querySelector("h2").innerText;
  let txt = target.currentTarget.querySelector("p").innerText;
  let src = target.currentTarget.querySelector("img").getAttribute("src");

  aside.querySelector("h2").innerText = tit;
  aside.querySelector("p").innerText = txt;
  aside.querySelector("img").setAttribute("src", src);

  popUp.classList.add(className_on);
}

//html 생성 함수
function callHTML(){
  let htmls = "";

  
}