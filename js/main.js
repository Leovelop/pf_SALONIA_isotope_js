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
callHTML(url);

setTimeout(() => {

  grid = new Isotope("#sort", {
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
  console.log(target);

  let tit = target.currentTarget.querySelector("h2").innerText;
  let txt = target.currentTarget.querySelector("p").innerText;
  let src = target.currentTarget.querySelector("img").getAttribute("src");

  aside.querySelector("h2").innerText = tit;
  aside.querySelector("p").innerText = txt;
  aside.querySelector("img").setAttribute("src", src);

  popUp.classList.add(className_on);
}

//HTML 생성함수
function callHTML(url) {
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
      let tags = "";

      dataInfo.map(pic => {
        let len = pic.className.length;
        let len_con = createCon(hairdresserCon)[2];
        let con_title = "";
        let con_desc = "";


        for (let i = 0; i < len_con; i++) {
          for (let j = 0; j < len; j++) {
            if (j == 0) {
              con_title = createCon(hairdresserCon)[0][i];
              con_desc = createCon(hairdresserCon)[1][i];
            } else if (j == 1) {
              con_title = createCon(toolsCon)[0][i];
              con_desc = createCon(toolsCon)[1][i];
            } else if (j == 2) {
              con_title = createCon(placeCon)[0][i];
              con_desc = createCon(placeCon)[1][i];
            }


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
    });
}

//Content List 함수
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