import { Component } from '@angular/core';
import { item_registry } from 'lib/registry'
import { UserData } from 'lib/user';
import { getItemName, getItemIcon } from 'lib/registry'
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { InventoryComponent } from 'app/inventory/inventory.component';


@Component({
  selector: 'app-character-screen',
  templateUrl: './character-screen.component.html',
  styleUrls: ['./character-screen.component.scss']
})
export class CharacterScreenComponent {
  getIcon = getItemIcon;
  getUserData = UserData.get;
}


window.onload = (event) => {
  setIcons();
  let inventory = document.getElementById("inventory")!;
  let slots = document.querySelectorAll<HTMLElement>('.slot');
  
  for(let i = 0; i < slots.length; i++){
    slots[i].style.backgroundImage = getItemIcon(UserData.get().items[i]);
    alert(slots[i].style.backgroundImage);
  }
  inventory.addEventListener("click" , function handleClick(event) {
    let target = event.target as Element;
    alert(target.id);
    
  }, {once : true}) 
};
function setIcons(){
  (<HTMLImageElement>document.getElementById("helmetIcon"))!.src = getIconEquipped("head");
  (<HTMLImageElement>document.getElementById("chestplateIcon"))!.src = getIconEquipped("chest");
  (<HTMLImageElement>document.getElementById("glovesIcon"))!.src = getIconEquipped("hands");
  (<HTMLImageElement>document.getElementById("bootsIcon"))!.src = getIconEquipped("feet");
  (<HTMLImageElement>document.getElementById("weaponIcon"))!.src = getIconEquipped("weapon");
}

function switchItem(clicked:HTMLElement){
  alert("clicked " + clicked.id);
}

function getIconEquipped(piece:string):string{
  let Icon:string;
  switch(piece){
    case "head":
      if(UserData.get().equipped.head?.display_icon){
        Icon = UserData.get().equipped.head?.display_icon!;
      }else{
        Icon = item_registry['helmet'].icon;
      }
      return Icon;
      break;
    case "chest":
      if(UserData.get().equipped.chest?.display_icon){
        Icon = UserData.get().equipped.head?.display_icon!;
      }else{
        Icon = item_registry['chestplate'].icon;
      }
      return Icon;
      break;
    case "hands":
      if(UserData.get().equipped.hands?.display_icon){
        Icon = UserData.get().equipped.head?.display_icon!;
      }else{
        Icon = item_registry['gloves'].icon;
      }
      return Icon;
      break;
    case "feet":
      if(UserData.get().equipped.feet?.display_icon){
        Icon = UserData.get().equipped.head?.display_icon!;
      }else{
        Icon = item_registry['boots'].icon;
      }
      return Icon;
      break;
    case "weapon":
      if(UserData.get().equipped.weapon?.display_icon){
        Icon = UserData.get().equipped.head?.display_icon!;
      }else{
        Icon = item_registry['sword'].icon;
      }
      return Icon;
      break;  
    default:
      return "None";
  }
  
}
