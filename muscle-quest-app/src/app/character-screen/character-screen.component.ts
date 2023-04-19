import { Component, AfterViewInit, HostListener} from '@angular/core';
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
export class CharacterScreenComponent implements AfterViewInit{
  constructor(private location: Location) {}


  getIconImage = getItemIcon;
  getUserData = UserData.get; 
  mode = "normal";
  equipped = UserData.get().equipped;
  comparing = false;
  currItem = {
    item: {} as ItemState,
    name : "",
    strength: 0,
    strength_color: 'white',
    dexterity: 0,
    dexterity_color: 'white',
    element: "",
    material: ""
  }
  currEquipped = {
    item: {} as ItemState,
    name : "",
    strength: 0,
    strength_color: 'white',
    dexterity: 0,
    dexterity_color: 'white',
    element: "",
    material: ""
  }
  createStats(item:ItemState){
    this.currItem.name = item_registry[item.id].name;
    this.currItem.item = item;
    item.display_name ? this.currItem.name = item.display_name : item_registry[item.id].name;
    this.currItem.strength_color = 'white';
    this.currItem.dexterity_color = 'white';
    this.currItem.strength = item.strength;
    this.currItem.dexterity = item.dexterity;
    switch(item.element){
      case Element.FIRE:
        this.currItem.element = "Fire";
        break;
      case Element.ICE:
        this.currItem.element = "Ice";
        break;
      case Element.LIGHTNING:
        this.currItem.element = "Lightning";
        break;
      default:
        this.currItem.element = "";
        break;
    } 
    switch(item.material){
      case Material.IRON:
        this.currItem.material = "Iron";
        break;
      case Material.STEEL:
        this.currItem.material = "Steel";
        break;
      case Material.DIAMOND:
        this.currItem.material = "Diamond";
        break;
      default:
        this.currItem.material = "";
        break;

    } 
    let slot = item_registry[item.id].equipment_slot as EquipmentSlot;
    this.createEquippedStats(UserData.get().equipped[slot]!);
  }
  createEquippedStats(item:ItemState){
    if(item){
      this.currEquipped.name = item_registry[item.id].name;
      this.currEquipped.item = item;
      item.display_name ? this.currEquipped.name = item.display_name : item_registry[item.id].name;
      this.currEquipped.strength_color = 'white';
      this.currEquipped.dexterity_color = 'white';
      this.currEquipped.strength = item.strength;
      this.currEquipped.dexterity = item.dexterity;
      if(this.currEquipped.strength > this.currItem.strength){
        this.currItem.strength_color = 'red';
      }else if(this.currEquipped.strength < this.currItem.strength){
        this.currItem.strength_color = 'green';
      }else{
        this.currItem.strength_color = 'white';
      }
      if(this.currEquipped.dexterity > this.currItem.dexterity){
        this.currItem.dexterity_color = 'red';
      }else if(this.currEquipped.dexterity < this.currItem.dexterity){
        this.currItem.dexterity_color = 'green';
      }else{
        this.currItem.dexterity_color = 'white';
      }
      switch(item.element){
        case Element.FIRE:
          this.currEquipped.element = "Fire";
          break;
        case Element.ICE:
          this.currEquipped.element = "Ice";
          break;
        case Element.LIGHTNING:
          this.currEquipped.element = "Lightning";
          break;
        default:
          this.currEquipped.element = "";
          break;
      } 
      switch(item.material){
        case Material.IRON:
          this.currEquipped.material = "Iron";
          break;
        case Material.STEEL:
          this.currEquipped.material = "Steel";
          break;
        case Material.DIAMOND:
          this.currEquipped.material = "Diamond";
          break;
        default:
          this.currEquipped.material = "";
          break;
  
      } 
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
  ngAfterViewInit(){
    // Attach a 'mousemove' event handler to elements with class '.slot'
    var slotElements = document.querySelectorAll('.slot');
    slotElements.forEach(function(slotElement) {
      slotElement.addEventListener('mousemove', function(event) {
        // Get cursor's coordinates
        let mEvent = event as MouseEvent;
        var cursorX = mEvent.clientX;
        var cursorY = mEvent.clientY;
        // Set modal's position to cursor's coordinates
        var modal = document.getElementById('compareContainer') as HTMLElement;
        modal.style.display = 'grid';
        modal.style.left = (cursorX-100) + 'px';
        modal.style.top = (cursorY-240) + 'px';
      });
  
      slotElement.addEventListener('mouseout', function() {
        // Hide modal when cursor is no longer hovering over div
        document.getElementById('compareContainer')!.style.display = 'none';
      });
    });
  }
  

}



