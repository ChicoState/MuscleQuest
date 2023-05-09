import { Component, AfterViewInit, HostListener, OnInit} from '@angular/core';
import { item_registry, EquipmentSlot } from 'src/lib/registry'
import { DEFAULT_USER_DATA, DataObject, ItemState } from 'src/lib/user';
import { Location } from '@angular/common';
import { Element, Material } from 'src/lib/user';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';
import { isTemplateMiddle } from 'typescript';
import { NONE_TYPE } from '@angular/compiler';





@Component({
  selector: 'app-character-screen',
  templateUrl: './character-screen.component.html',
  styleUrls: ['./character-screen.component.scss']
})
export class CharacterScreenComponent implements AfterViewInit, OnInit{
  playerStats = {
    strength: 0,
    dexterity: 0,
    fireAffinity: 0,
    iceAffinity: 0,
    lightningAffinity:0
  }
  equippedColor: any = null;
  hoveredColor: any = null;
  hoveredItem: any = null;
  UserData:any;
  mode = "normal";
  comparing = false;
  equipped:any;
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
  constructor(private location: Location, private userService: SloaneUserUpdateService) {
    this.userService.getCurrentUser().subscribe((user) => {
      this.UserData = user;
    });
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    // Attach a 'mousemove' event handler to elements with class '.slot'
    setInterval(function(){
      const slotElements = document.querySelectorAll('.slot');
      slotElements.forEach(function(slotElement) {
        slotElement.addEventListener('mousemove', function(event) {
          // Get cursor's coordinates
          const mEvent = event as MouseEvent;
          const cursorX = mEvent.clientX;
          const cursorY = mEvent.clientY;
          // Set modal's position to cursor's coordinates
          const modal = document.getElementById('compareContainer') as HTMLElement;
          modal.style.display = 'grid';
          modal.style.left = (cursorX-100) + 'px';
          modal.style.top = (cursorY-240) + 'px';
        });
    
        slotElement.addEventListener('mouseout', function() {
          // Hide modal when cursor is no longer hovering over div
          document.getElementById('compareContainer')!.style.display = 'none';
        });
      });
    }, 100)
  }

  equip(item:ItemState | undefined){
    this.getPlayerStats();
    if(item != undefined){
      if(this.UserData){
        if(this.UserData.equipped[item_registry[item.id].equipment_slot!]){
          const tempItem = this.UserData.equipped[item_registry[item.id].equipment_slot!] as ItemState;
          this.UserData.items.push(tempItem);
        }
        this.UserData.equipped[item_registry[item.id].equipment_slot!] = null;
        this.userService.updateUserData(this.UserData);
        this.UserData.equipped[item_registry[item.id].equipment_slot!] = item;
        this.UserData.items = this.UserData.items.filter((x:ItemState) => x != item)
        this.userService.updateUserData(this.UserData);
        this.UserData = this.userService.getCurrentUserData();
        document.getElementById('compareContainer')!.style.display = 'none';
      }
    }
  }
  unEquip(item:ItemState | undefined){
    this.getPlayerStats();
    if(this.UserData){
      if(item != undefined){
        this.UserData.equipped[item_registry[item.id].equipment_slot!] = null;
        this.UserData.items.push(item);
      }
      
    }
    this.userService.updateUserData(this.UserData!);
    this.UserData = this.userService.getCurrentUserData();
    
  }
  getIcon(i:number){
    if(this.UserData)
     return this.UserData.items[i].display_icon ? this.UserData.items[i].display_icon : item_registry[this.UserData.items[i].id].icon;
    return "/assets/CharacterScreen/default-icon.png";
  }
  getEquippedIcon(item:ItemState | undefined){
    if(item != undefined){
      if(this.UserData){
        if(this.UserData.equipped){
          if(item.display_icon){
            return item.display_icon;
          }else{
            return item_registry[item.id].icon;
          }
        }
      }
    }
    return "/assets/CharacterScreen/default-icon.png";
  }
  changeMode(){
    if(this.mode == "normal"){
      this.mode = "delete";
    }else if(this.mode == "delete"){
      this.mode = "normal";
    }
  }
  updateStats(item:ItemState | undefined){
    this.getPlayerStats();
    this.hoveredItem = item;
    if(item != undefined){
      if(this.UserData){
        const tempE = this.UserData.equipped[item_registry[item.id].equipment_slot!];
        this.currItem.name = "";
        this.currEquipped.name = "";
        item.display_name  ? this.currItem.name = item.display_name : this.currItem.name = item_registry[item.id].name;
        item.display_name  ? this.currItem.name = item.display_name : this.currItem.name = item_registry[item.id].name;
        if(tempE){
          tempE.display_name  ? this.currEquipped.name = tempE.display_name : this.currEquipped.name = item_registry[tempE.id].name;
          tempE.display_name  ? this.currEquipped.name = tempE.display_name : this.currEquipped.name = item_registry[tempE.id].name;
        }
        
        this.currItem.strength = 0;
        this.currEquipped.strength = 0
        this.currItem.strength = item.strength;
        if(tempE)
        this.currEquipped.strength = tempE.strength;
    
        this.currItem.dexterity = 0;
        this.currEquipped.dexterity = 0
        this.currItem.dexterity = item.dexterity;
        if(tempE)
        this.currEquipped.dexterity = tempE.dexterity;
    
        this.currItem.strength_color = "white";
        this.currEquipped.strength_color = "white";
        this.currItem.dexterity_color = "white";
        this.currEquipped.dexterity_color = "white";
    
        this.currEquipped.element = "";
        this.currItem.element = "";
    
        this.currEquipped.material = "";
        this.currItem.material = "";
    
        switch(item.element){
          case Element.FIRE:
            this.equippedColor = 'red';
            this.currItem.element = "Fire";
            break;
          case Element.ICE:
            this.equippedColor = 'blue';
            this.currItem.element = "Ice";
            break;
          case Element.LIGHTNING:
            this.equippedColor = 'yellow';
            this.currItem.element = "Lightning";
            break;
          default:
            this.equippedColor = '#eb5d25';
        }
        if(tempE)
        switch(tempE.element){
          case Element.FIRE:
            
            this.currEquipped.element = "Fire";
            break;
          case Element.ICE:
            
            this.currEquipped.element = "Ice";
            break;
          case Element.LIGHTNING:
            
            this.currEquipped.element = "Lightning";
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
        }
        if(tempE)
        switch(tempE.material){
          case Material.IRON:
            this.currEquipped.material = "Iron";
            break;
          case Material.STEEL:
            this.currEquipped.material = "Steel";
            break;
          case Material.DIAMOND:
            this.currEquipped.material = "Diamond";
            break;
        }
      }
    }
    
  }
  deleteItem(item:ItemState | undefined){
    if(item != undefined){
      if(this.UserData){
        this.UserData.items = this.UserData.items.filter((x:ItemState) => x != item)
        this.userService.updateUserData(this.UserData);
        this.UserData = this.userService.getCurrentUserData();
      }
    }
  }
  createItem(){
    const item = {} as ItemState;
    item.dexterity = 4;
    item.strength = 10;
    item.display_icon = "/assets/CharacterScreen/reg_sword_1.png";
    item.display_name = "Refined Iron Sword";
    item.id = 'sword';
    item.material = Material.IRON;
    this.UserData.items.push(item);
    this.userService.updateUserData(this.UserData);
    this.UserData = this.userService.getCurrentUserData();
  }
  getBoxShadow(item:ItemState | undefined){
    if(this.hoveredItem == item){
      if(item != undefined && item != null){
        switch(item.element){
          case Element.FIRE:
            this.hoveredColor = 'red';
            return `0px 0px 8px 1px red`;
          case Element.ICE:
            return `0px 0px 8px 1px blue`;
          case Element.LIGHTNING:
            return `0px 0px 8px 1px yellow`;
          default:
            return `0px 0px 8px 1px white`;
        }
      }
    }else{
      return null;
    }
    return null;
  }
  getCompareBorder(){
    switch(this.equippedColor){
      case 'red':
        return '3px solid red';
      case 'blue':
        return '3px solid blue';
      case 'yellow':
        return '3px solid yellow';

    }
    return '3px solid #eb5d25';
  }
  onMouseLeave(){
    this.hoveredItem = null;
  }
  getPlayerStats(){
    this.playerStats.strength = 0;
    this.playerStats.dexterity = 0;
    this.playerStats.fireAffinity = 0;
    this.playerStats.iceAffinity = 0;
    this.playerStats.lightningAffinity = 0;
    
    if(this.UserData.equipped.head){
      this.playerStats.strength += this.UserData.equipped.head.strength;
      this.playerStats.dexterity += this.UserData.equipped.head.dexterity;
      switch(this.UserData.equipped.head.element){
        case Element.FIRE:
          this.playerStats.fireAffinity++;
          break;
        case Element.ICE:
          this.playerStats.iceAffinity++;
          break;
        case Element.LIGHTNING:
          this.playerStats.lightningAffinity++;
          break;
      }
    }
    if(this.UserData.equipped.feet){
      this.playerStats.strength += this.UserData.equipped.feet.strength;
      this.playerStats.dexterity += this.UserData.equipped.feet.dexterity;
      switch(this.UserData.equipped.feet.element){
        case Element.FIRE:
          this.playerStats.fireAffinity++;
          break;
        case Element.ICE:
          this.playerStats.iceAffinity++;
          break;
        case Element.LIGHTNING:
          this.playerStats.lightningAffinity++;
          break;
      }
    }
    if(this.UserData.equipped.chest){
      this.playerStats.strength += this.UserData.equipped.chest.strength;
      this.playerStats.dexterity += this.UserData.equipped.chest.dexterity;
      switch(this.UserData.equipped.chest.element){
        case Element.FIRE:
          this.playerStats.fireAffinity++;
          break;
        case Element.ICE:
          this.playerStats.iceAffinity++;
          break;
        case Element.LIGHTNING:
          this.playerStats.lightningAffinity++;
          break;
      }
    }
    if(this.UserData.equipped.hands){
      this.playerStats.strength += this.UserData.equipped.hands.strength;
      this.playerStats.dexterity += this.UserData.equipped.hands.dexterity;
      switch(this.UserData.equipped.hands.element){
        case Element.FIRE:
          this.playerStats.fireAffinity++;
          break;
        case Element.ICE:
          this.playerStats.iceAffinity++;
          break;
        case Element.LIGHTNING:
          this.playerStats.lightningAffinity++;
          break;
      }
    }
    if(this.UserData.equipped.weapon){
      this.playerStats.strength += this.UserData.equipped.weapon.strength;
      this.playerStats.dexterity += this.UserData.equipped.weapon.dexterity;
      switch(this.UserData.equipped.weapon.element){
        case Element.FIRE:
          this.playerStats.fireAffinity++;
          break;
        case Element.ICE:
          this.playerStats.iceAffinity++;
          break;
        case Element.LIGHTNING:
          this.playerStats.lightningAffinity++;
          break;
      }
    }
    
  }
}



