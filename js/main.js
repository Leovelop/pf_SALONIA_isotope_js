/* 전역변수 리스트---------------------------------------- */
let grid;

const className_on = "on";
const url = `./data/data.json`;

//header#header
const header = document.querySelector("#header");
const menu = header.querySelector(".menu");
const btns = menu.querySelectorAll("#gnb li");
let total = btns.length;

//main
const main = document.querySelector("main");
const sort = main.querySelector("#sort");
const articles = sort.querySelectorAll("article");

//section#popUp
const popUp = document.querySelector("#popUp");
const aside = popUp.querySelector("aside");
const close = popUp.querySelector("span");


/* 이벤트 연결---------------------------------------- */
callData(url);

for (let i = 0; i < total; i++) {
  btns[i].addEventListener("click", e => {
    e.preventDefault();

    let isOn = btns[i].classList.contains(className_on);
    if (isOn) return;

    sortFrame(e);
    activeNav(btns, e);
  })
}

//팝업 닫는 이벤트
close.addEventListener("click", () => {
  popUp.classList.remove("on");
});



/* 함수 선언---------------------------------------- */
function jsonTest(items){
  let title = items.title;
  let desc = items.description;
  
  return {
    title: title,
    desc: desc
  };
}

//선택한 메뉴에 .on 추가
function activeNav(lists, active) {
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


function active(){
  const articles = sort.querySelectorAll("article");

  for (let el of articles) {
    el.addEventListener("click", e => {
      e.preventDefault();

      activePopUp(e);
    });
  }
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

//data.json파일 fetch로 받아오는 함수
function callData(url) {
  sort.innerHTML = "";
  main.classList.remove(className_on);

  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(json => {
      const dataInfo = json.data;
      const hairdresserCon = json.hairdresserCon;
      const toolsCon = json.toolsCon;
      const placeCon = json.placeCon;

      if(dataInfo.length > 0) {
        createHTML(dataInfo, hairdresserCon, toolsCon, placeCon);
        delayLoading();
        active();
      }
    });
}

//section#sort에 태그들을 생성하는 함수
function createHTML(items, con1, con2, con3) {
  let tags = "";

  items.map(pic => {
    let len = pic.className.length;
    //let len_con = createCon(con1)[2];
    let con_title = "";
    let con_desc = "";

    if((len != pic.src.length) && (len != pic.alt.length)) {
      console.error("data.json의 data키의 className, src, alt의 키값 개수를 똑같이 맞춰주십시오.");
      return;
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < len; j++) {
        /*if (j == 0) {
          con_title = jsonTest(hairInfo).title[i];
          con_desc = jsonTest(hairInfo).desc[i];
        } else if (j == 1) {
          con_title = createCon(con2)[0][i];
          con_desc = createCon(con2)[1][i];
        } else if (j == 2) {
          con_title = createCon(con3)[0][i];
          con_desc = createCon(con3)[1][i];
        }*/

        tags += `
              <article class="${pic.className[j]}">
                <div>
                  <img src="${pic.src[j] + (i + 1)}.jpg" alt="${pic.alt[j] + (i + 1)}">
                  <div>
                    <h2>${con_title}</h2>
                    <p>${con_desc}</p>
                  </div>
                </div>
              </article>
        `;
      }
    }
  });

  sort.innerHTML = tags;
}

function createCon2(itemTitle, itemDesc){
  let len = 0;

  
}

//data.json의 title, description키값 가져오는 함수
function createCon(items) {
  let arr_title = [];
  let arr_desc = [];
  let len = 0;

  items.map(data => {
    arr_title.push(data.title);
    arr_desc.push(data.description);
    len = arr_title.length;

  });

  return [arr_title, arr_desc, len];
}

//이미지들이 전부 로딩이 되면 isoLayout()을 실행하는 함수
function delayLoading() {
  const imgs = sort.querySelectorAll("img");
  const len = imgs.length;
  let count = 0;

  for (let el of imgs) {
    el.onload = () => {
      count++;

      if (count == len) isoLayout();
    }    
  }
}

//Isotope 실행, main에 .on추가하는 함수
function isoLayout() {
  setTimeout(() => {
    grid = new Isotope("#sort", {
      itemSelection: "article",
      columnWidth: "article",
      transitionDuration: "1s"
    });
    
    main.classList.add(className_on);
  }, 500);
}