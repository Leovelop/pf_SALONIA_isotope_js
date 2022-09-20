window.addEventListener("load", () => {
  /* 전역변수 리스트---------------------------------------- */
  const grid = new Isotope("section", {
    itemSelection: "article",
    columnWidth: "article",
    transitionDuration: "1s"
  });

  const className_on = "on";

  //header#header
  const header = document.querySelector("#header");
  const menu = header.querySelector(".menu");
  const btns = menu.querySelectorAll("#gnb li");

  //section#sort
  const articles = document.querySelectorAll("article");

  //section#popUp
  const popUp = document.querySelector("#popUp");
  const aside = popUp.querySelector("aside");
  const close = popUp.querySelector("span");


  /* 이벤트 연결---------------------------------------- */
  for (let el of btns) {
    el.addEventListener("click", e => {
      e.preventDefault();

      sortFrame(e);
      activation(btns, e);
    });
  }

  for (let el of articles) {
    el.addEventListener("click", e => {
      activePopUp(e);
    })
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
    let tit = target.currentTarget.querySelector("h2").innerText;
    let txt = target.currentTarget.querySelector("p").innerText;
    let src = target.currentTarget.querySelector("img").getAttribute("src");

    aside.querySelector("h2").innerText = tit;
    aside.querySelector("p").innerText = txt;
    aside.querySelector("img").setAttribute("src", src);

    popUp.classList.add(className_on);
  }
});
