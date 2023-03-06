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

  elementList[0].addEventListener("click", () => {
    for(let i = 0; i < 4; i++){
      elementList[i].setAttribute('closed', "");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.display = "none";
      })
    }
    for(let i = 4; i < 8; i++){
      elementList[i].setAttribute('open', "");
      elementList[i].addEventListener("animationend", () => {
        elementList[i].style.display = "block";
      })
    }
  })
  
}

