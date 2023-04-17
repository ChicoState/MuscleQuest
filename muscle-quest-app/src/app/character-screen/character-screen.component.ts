import { Component} from '@angular/core';
import { item_registry } from 'src/lib/registry'
import { UserData } from 'src/lib/user';
import { getItemName, getItemIcon } from 'src/lib/registry'
import { ItemState } from 'src/lib/user';
import { EquipmentSlot } from 'src/lib/registry';
import { Location } from '@angular/common';
import { Element, Material } from 'src/lib/user';





@Component({
  selector: 'app-character-screen',
  templateUrl: './character-screen.component.html',
  styleUrls: ['./character-screen.component.scss']
})
export class CharacterScreenComponent{
  constructor(private location: Location) {}

  getIconImage = getItemIcon;
  getUserData = UserData.get; 
  mode = "normal";
  equipped = UserData.get().equipped;
  currItem:any;
  itemName:any;
  itemStrength:any;
  itemDexterity:any;
  itemElement:any;
  itemMaterial:any;

  closeModal(){
    let statspage = document.getElementById('statsContainer') as HTMLElement;
    statspage.style.display = 'none';
    console.log("hi");
  }

  
  showStats(item:ItemState){
    let statspage = document.getElementById('statsContainer') as HTMLElement;
    statspage.style.display = 'grid';

    
    this.currItem = item;
    this.itemName = "";
    this.itemStrength = 0;
    this.itemDexterity = 0;
    this.itemElement = null;
    this.itemMaterial = null;
    item.display_name ? this.itemName = item.display_name : item_registry[item.id].name;
    item.strength ? this.itemStrength = item.strength : 0;
    item.dexterity ? this.itemDexterity = item.dexterity : 0;
    switch(item.element){
      case Element.FIRE:
        this.itemElement = "Fire";
        break;
      case Element.ICE:
        this.itemElement = "Ice";
        break;
      case Element.LIGHTNING:
        this.itemElement = "Lightning";
        break;
      default:
        this.itemElement = "";
    }
    switch(item.material){
      case Material.IRON:
        this.itemMaterial = "Iron";
        break;
      case Material.STEEL:
        this.itemMaterial = "Steel";
        break;
      case Material.DIAMOND:
        this.itemMaterial = "Diamond";
        break;
      default:
        this.itemMaterial = "";
    }
  }
  goBack(): void {
    this.location.back();
  }
  unEquip(item:ItemState){
    let slot = item_registry[item.id].equipment_slot as EquipmentSlot;
    let blank:ItemState;
    UserData.mutate(data => {
      data.items.push(item);
      data.equipped[slot] = blank;
      return data;
    })
  }
  changeMode(){
    if(this.mode == "normal"){
      this.mode = "delete";
    }else if(this.mode == "delete"){
      this.mode = "normal";
    }
    
  }
  deleteItem(item:ItemState){
    UserData.mutate(data => {
      data.items = data.items.filter((x) => x != item);
      return data;
    })
  }
  equipItem(){
    let item = this.currItem;
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


