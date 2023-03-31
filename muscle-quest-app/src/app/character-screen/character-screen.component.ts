import { Component } from '@angular/core';
import { item_registry } from 'lib/registry'
import { UserData } from 'lib/user';
import { getItemName, getItemIcon } from 'lib/registry'
import { ItemState } from 'lib/user';
import { EquipmentSlot } from 'lib/registry';


@Component({
  selector: 'app-character-screen',
  templateUrl: './character-screen.component.html',
  styleUrls: ['./character-screen.component.scss']
})
export class CharacterScreenComponent {
  getIcon = getItemIcon;
  getUserData = UserData.get;

}

window.onload = function(){
  setInterval(updatePage, 100);
}

function updatePage(){
  let inventory = document.querySelector('.inventory')!;
  let equipment = document.querySelector('.equipped')!;
  createInv(inventory, equipment);
  switchItems(inventory, equipment);
}

function createInv(inventory:Element, equipment:Element){
  let childs = inventory.children;
  let childsEquipped = equipment.children;
  for(let i = 0; i < childsEquipped.length; i++){
    let child = childsEquipped[i];
    let image = child.querySelector(".equipSlotImage") as HTMLImageElement;
    switch(child.id){
      case "0":
        image.src = getItemImage((UserData.get().equipped.head)!)!;
        console.log(getItemImage((UserData.get().equipped.head)!)!);
        break;
      case "1":
        image.src = getItemImage((UserData.get().equipped.chest)!)!;
        console.log(getItemImage((UserData.get().equipped.chest)!)!);
        break;
      case "2":
        image.src = getItemImage((UserData.get().equipped.hands)!)!;
        console.log(getItemImage((UserData.get().equipped.hands)!)!);
        break;
      case "3":
        image.src = getItemImage((UserData.get().equipped.feet)!)!;
        console.log(getItemImage((UserData.get().equipped.feet)!)!);
        break;
      case "4":
        image.src = getItemImage((UserData.get().equipped.weapon)!)!;
        console.log(getItemImage((UserData.get().equipped.weapon)!)!);
        break;
    }
  }
    
  for(let i = 0; i < childs.length;i++){
    let child = childs[i];
    let image = child.querySelector(".slotImage") as HTMLImageElement;
    if(UserData.get().items[i].display_icon!){
      image.src = UserData.get().items[i].display_icon!;
    }else{
      image.src = item_registry[child.id].icon;
    }
    
  }
}

function switchItems(inventory:Element, equipment:Element){
  let childs = inventory.children;
  let currItem:ItemState;
  let currEquipped:ItemState;
  for(let i = 0; i < childs.length; i++){
    let child = childs[i] as HTMLElement;
    currItem = UserData.get().items[i];
    child.addEventListener('click', () => {
      switch(item_registry[currItem.id].equipment_slot){
        case EquipmentSlot.HEAD:
          console.log("Head");
          currEquipped = UserData.get().equipped.head as ItemState;
          break;
        case EquipmentSlot.CHEST:
          console.log("Chest");
          currEquipped = UserData.get().equipped.chest as ItemState;;
          break;
        case EquipmentSlot.HANDS:
          console.log("Hands");
          currEquipped = UserData.get().equipped.hands as ItemState;;
          break;
        case EquipmentSlot.FEET:
          console.log("Feet");
          currEquipped = UserData.get().equipped.feet as ItemState;;
          break;
        case EquipmentSlot.WEAPON:
          console.log("Weapon");
          currEquipped = UserData.get().equipped.weapon as ItemState;;
          break;
      }
      UserData.mutate(data => {
        let temp = data.items.splice(i, 1)[0] as ItemState;
        data.items.push(currEquipped);
        switch(item_registry[currItem.id].equipment_slot){
          case EquipmentSlot.HEAD:
            data.equipped.head = temp;
            break;
          case EquipmentSlot.CHEST:
            data.equipped.chest = temp;
            break;
          case EquipmentSlot.HANDS:
            data.equipped.hands = temp;
            break;
          case EquipmentSlot.FEET:
            data.equipped.feet = temp;
            break;
          case EquipmentSlot.WEAPON:
            data.equipped.weapon = temp;
            break;
        }
        return data;
      })
    });
  }
}

function getItemImage(item:ItemState){
  if(item.display_icon){
    return item.display_icon;
  }else{
    switch(item_registry[item.id].equipment_slot){
      case EquipmentSlot.HEAD:
        return item_registry['head'].icon;
      case EquipmentSlot.CHEST:
        return item_registry['chest'].icon;
      case EquipmentSlot.HANDS:
        return item_registry['hands'].icon;
      case EquipmentSlot.FEET:
        return item_registry['feet'].icon;
      case EquipmentSlot.WEAPON:
        return item_registry['weapon'].icon;
      default:
        return null;
    }
  }
}
