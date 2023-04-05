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
export class CharacterScreenComponent{
  getIconImage = getItemIcon;
  getUserData = UserData.get; 
  equipped = UserData.get().equipped;
  equipItem(item:ItemState){
    let slot = item_registry[item.id].equipment_slot as EquipmentSlot;
    console.log(slot);
    let currentEquipped = UserData.get().equipped[slot];
    if (!currentEquipped) {
      UserData.mutate(data => {
        data.equipped[slot] = item;
        data.items = data.items.filter((x) => x != item);
        return data;
      })
    }else{
      UserData.mutate(data => {
        let currEquip = data.equipped[slot] as ItemState;
        data.equipped[slot] = item;
        data.items = data.items.filter((x) => x != item);
        data.items.push(currEquip);
        return data;
      })
    }
    console.log(currentEquipped);
    
  }
  getIcon(i:number):string{
    let item = UserData.get().items[i];
    return getItemIcon(item);
  }
}

