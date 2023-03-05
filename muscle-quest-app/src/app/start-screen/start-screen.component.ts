import { Component } from '@angular/core';




@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})

export class StartScreenComponent {
  
}

function switchToLevels(elementList: HTMLElement[], state: number){
  elementList[0].classList.toggle('slideFromLeft');
  elementList[1].classList.toggle('slideFromLeft-2');
  elementList[2].classList.toggle('slideFromLeft-3');
  elementList[3].classList.toggle('slideFromLeft-4');
  elementList[0].classList.toggle('slideToRight');
  elementList[1].classList.toggle('slideToRight-2');
  elementList[2].classList.toggle('slideToRight-3');
  elementList[3].classList.toggle('slideToRight-4');
  if(state == 1) {
    elementList[3].addEventListener("animationend", () => {
      for(let i = 0; i < 4; i++){
        console.log(state);
        elementList[i].style.display = "none";
        elementList[i].style.opacity = "0";
      }
    })
  }
  
  elementList[8].style.display = "block";
  elementList[4].classList.toggle('slideFromLeft');
  elementList[5].classList.toggle('slideFromLeft-2');
  elementList[6].classList.toggle('slideFromLeft-3');
  elementList[7].classList.toggle('slideFromLeft-4');
  if(state == 1){
    for(let i = 4; i < 8; i++){
      elementList[i].style.opacity = "1";
    }
  }
  state = 10;
}
function switchToOptions(elementList: HTMLElement[], state: number){
  elementList[4].classList.toggle('slideFromLeft');
  elementList[5].classList.toggle('slideFromLeft-2');
  elementList[6].classList.toggle('slideFromLeft-3');
  elementList[7].classList.toggle('slideFromLeft-4');
  elementList[4].classList.toggle('slideToRight');
  elementList[5].classList.toggle('slideToRight-2');
  elementList[6].classList.toggle('slideToRight-3');
  elementList[7].classList.toggle('slideToRight-4');
  if(state == 0){
    elementList[7].addEventListener("animationend", () => {
      for(let i = 4; i < 8; i++){
        elementList[i].style.display = "none";
        elementList[i].style.opacity = "0";
      }
      elementList[8].style.display = "none";
    })
  }
  
  elementList[0].classList.toggle('slideToRight');
  elementList[1].classList.toggle('slideToRight-2');
  elementList[2].classList.toggle('slideToRight-3');
  elementList[3].classList.toggle('slideToRight-4');
  elementList[0].classList.toggle('slideFromLeft');
  elementList[1].classList.toggle('slideFromLeft-2');
  elementList[2].classList.toggle('slideFromLeft-3');
  elementList[3].classList.toggle('slideFromLeft-4');
  if(state == 0) {
    for(let i = 0; i < 4; i++){
      elementList[i].style.display = "block";
      elementList[i].style.opacity = "1";
    }
  }
  
}

window.onload = function() {
  let levelsOption = document.getElementById("levels")!; //0
  let characterOption = document.getElementById("character")!;//1
  let shopOption = document.getElementById("shop")!;//2
  let settingsOption = document.getElementById("settings")!;//3
  let sloaneLevel = document.getElementById('revenge')!;//4
  let peterLevel = document.getElementById('orc')!;//5
  let isaLevel = document.getElementById('isa')!;//6
  let backButton = document.getElementById('back')!;//7
  let levelContainer = document.getElementById('levelContainer')!;//8
  let logoDiv = document.getElementById('logoContainer')!;//9
  let state = 0;


  let elementList = [levelsOption, characterOption, shopOption, settingsOption, sloaneLevel, peterLevel, isaLevel, backButton, levelContainer, logoDiv];


  levelsOption.classList.toggle('slideFromLeft');
  characterOption.classList.toggle('slideFromLeft-2');
  shopOption.classList.toggle('slideFromLeft-3');
  settingsOption.classList.toggle('slideFromLeft-4');
  logoDiv.classList.toggle('fadeIn');
  // for(let i = 0; i < 4; i++){
  //   elementList[i].style.opacity = "1";
  // }

  levelsOption.addEventListener("click", () => {
    state = 1;
    switchToLevels(elementList, state);
  })
  backButton.addEventListener("click", () => {
    state = 0;
    switchToOptions(elementList, state);
  })
}

