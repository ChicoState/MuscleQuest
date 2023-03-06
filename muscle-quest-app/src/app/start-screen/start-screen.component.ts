import { Component } from '@angular/core';




@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent {
  
}

window.onload = function() {
  let levelsOption = document.getElementById("levels")!; //0
  let characterOption = document.getElementById("character")!;//1
  let shopOption = document.getElementById("shop")!;//2
  let settingsOption = document.getElementById("settings")!;//3
  let sloaneLevel = document.getElementById('revenge')!;//4
  let peterLevel = document.getElementById('orc')!;//5
  let isaLevel = document.getElementById('isa')!;//6
  let backButton = document.getElementById('levelBack')!;//7
  let levelContainer = document.getElementById('levelContainer')!;//8
  let logoDiv = document.getElementById('logoContainer')!;//9


  let elementList = [levelsOption, characterOption, shopOption, settingsOption, sloaneLevel, peterLevel, isaLevel, backButton, levelContainer, logoDiv];


  for(let i = 0; i < 4; i++){
    elementList[i].classList.toggle("slideFromLeft");
    elementList[i].addEventListener("animationend", () => {
      elementList[i].style.opacity = "1";
      elementList[i].style.display = "block";
    }, {once: true})
  }
  elementList[9].classList.toggle("fadeIn");
  elementList[0].addEventListener("click", () =>{
    elementList[8].style.display = "block";
    for(let i = 0; i < 4; i++){
      elementList[i].classList.replace("slideFromLeft", "slideToRight");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.opacity = "0";
        elementList[i].style.display = "none";
      }, {once: true})
    }
    for(let i = 4; i < 8; i++){
      elementList[i].classList.toggle("slideFromLeft");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.opacity = "1";
        elementList[i].style.display = "block";
      }, {once: true})
    }
  })
  elementList[7].addEventListener("click", () => {
    for(let i = 4; i < 8; i++){
      elementList[i].classList.replace("slideFromLeft", "slideToRight");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.opacity = "0";
        elementList[i].style.display = "none";
      }, {once: true})
    }
    for(let i = 0; i < 4; i++){
      elementList[i].classList.replace("slideToRight", "slideFromLeft");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.opacity = "1";
        elementList[i].style.display = "block";
      }, {once: true})
    }
    elementList[8].classList.toggle('wait1s');
    elementList[8].addEventListener("animationend", () => {
      elementList[8].style.display = "none";
    })
  })
}

