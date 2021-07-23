"use strict";

let music = new Audio();
window.onload = () => {
  window.onselectstart = () => false;
  play.onclick = () => {
    music.src = "audio/back.mp3";
    music.volume = 0.7;
    music.loop = true;
    music.play();
    let flag = true;
    game(flag);
  };
};

function init(field) {
  for (let item = 0; item < 60; ++item) {
    let elmItem = document.createElement("div");
    elmItem.setAttribute("class", "holes");
    elmItem.setAttribute("id", `hole${item}`);
    let random = Math.floor(Math.random() * (3 - 1)) + 1;
    elmItem.innerHTML = `<img src=images/krot${random}.gif  class='killhim' id='killhim${item}'>`;
    field.append(elmItem);
  }
}

function game(flag) {
  let playAudio = document.getElementById("audioOn");
  playAudio.style.display = "inline-block";
  playAudio.onclick = function () {
    music.volume = 0.7;
  };
  let stopAudio = document.getElementById("audioOff");
  stopAudio.style.display = "inline-block";
  stopAudio.onclick = function () {
    music.volume = 0;
  };
  let score = 0;
  let startMin = 1;
  let startSec = 30;
  let play = document.getElementById("play");
  let timer = document.getElementById("timer");
  timer.innerHTML = "Оставшееся время: 01:30";
  let end = document.getElementById("end");
  let again = document.getElementById("again");
  let field = document.getElementById("field");
  let police = document.getElementById("police");
  let krot = document.getElementById("krot");
  let counter = document.getElementById("counter");
  counter.innerHTML = "Поймано кротов: 0";
  let header = document.getElementById("header");
  end.style.display = "none";
  again.style.display = "none";
  timer.style.display = "inline";
  field.style.display = "grid";
  counter.style.display = "inline";
  play.style.display = "none";
  krot.style.display = "none";
  police.style.display = "none";
  header.style.display = "none";
  if (flag) {
    init(field);
  }
  const time = setInterval(() => {
    if (startSec < 0) {
      startMin--;
      startSec = 59;
    }
    timer.innerHTML =
      startSec < 10
        ? `Оставшееся время: 0${startMin}:0${startSec}`
        : `Оставшееся время: 0${startMin}:${startSec}`;
    startSec--;
    if (startMin == 0 && startSec < 0) clearInterval(time);
  }, 1000);
  const spawn = setInterval(() => {
    let random = Math.floor(Math.random() * Math.floor(60));
    let img = document.getElementById(`killhim${random}`);
    let hole = document.getElementById(`hole${random}`);
    let allImg = document.getElementsByTagName("img");
    for (let image of allImg) image.style.display = "none";
    img.style.display = "inline";
    hole.onclick = function (e) {
      if (img.style.display == "inline") {
        score++;
        let hit = new Audio();
        hit.src = "audio/hit.mp3";
        hit.volume = 1;
        hit.play();
        img.style.display = "none";
      }
    };

    let miss = 75 - score;
    counter.innerHTML = `Поймано кротов: ${score}`;
    if (startMin == 0 && startSec < 0) {
      for (let image of allImg) image.style.display = "none";
      music.volume = 0;
      let end = new Audio();
      end.src = "audio/end.mp3";
      end.volume = 1;
      end.play();
      clearInterval(spawn);
      timer.style.display = "none";
      field.style.display = "none";
      counter.style.display = "none";
      ending(score, miss);
    }
  }, 1200);
}

function ending(score, miss) {
  let end = document.getElementById("end");
  let again = document.getElementById("again");
  end.style.display = "block";
  again.style.display = "inline-block";
  end.innerHTML = `<p class='endcatch'>Поймано: ${score}
Cбежало: ${miss}</p>`;

  again.onclick = () => {
    let flag = false;
    music.src = "audio/back.mp3";
    music.volume = 0.7;
    music.loop = true;
    music.play();
    game(flag);
  };
}
