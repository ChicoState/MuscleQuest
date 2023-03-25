import { Injectable } from '@angular/core';
import { ItemState, UserData, ShopData, Material, Element } from 'src/lib/user';

@Injectable({
  providedIn: 'root',
})
export class SloaneItemGeneratorService {
  constructor() {}

  /**
   * To generate an item, the only required argument is rank: (0 = low, 1 = medium, 2 = high, 3 = ultimate)
   * Other item values will be generated based on the rank provided
   */
  createNewItem(
    rank: number,
    id?: string,
    strength?: number,
    dexterity?: number,
    element?: Element,
    material?: Material,
    display_name?: string,
    display_icon?: string,
    shop_data?: ShopData
  ): ItemState {
    const stats = statTotal(rank);
    const elements = Object.values(Element);
    const elementIndex = Math.floor(Math.random() * elements.length);
    const newItem: ItemState = {
      id: 'Sword',
      strength: stats[0],
      dexterity: stats[1],
      material: Material.IRON,
      display_name: 'Iron Sword of Fire',
      shop_data: {
        cost: 100,
      },
    };

    if (id !== undefined) {
      newItem.id = id;
    } else {
      newItem.id = randomID();
    }
    if (strength !== undefined) {
      newItem.strength = strength;
    } else {
      newItem.strength = stats[0];
    }
    if (dexterity !== undefined) {
      newItem.dexterity = dexterity;
    } else {
      newItem.dexterity = stats[1];
    }
    if (element !== undefined) {
      newItem.element = element;
    }
    // Beginner level items will not have any elements assigned automatically
    else if (rank > 0) {
      newItem.element = randomElement();
    }
    if (material !== undefined) {
      newItem.material = material;
    } else {
      newItem.material = materialChooser(rank);
    }
    if (display_name !== undefined) {
      newItem.display_name = display_name;
    }
    if (display_icon !== undefined) {
      newItem.display_icon = display_icon;
    }
    if (shop_data !== undefined) {
      newItem.shop_data = shop_data;
    }

    return newItem;
  }
}

// Given a rank, generate an array containing two numbers:
// array[0] = strength; array[1] = dex;
function statTotal(rank: number) {
  const totals = [2, 4, 7, 12];
  const total = totals[rank];
  const str = Math.ceil(Math.random() * total);
  const dex = total - str;
  return [str, dex];
}

function randomElement(): Element {
  const elements = Object.values(Element);
  const elementIndex = Math.floor(Math.random() * elements.length);
  const elementString = elements[elementIndex];
  let selected: Element;

  switch (elementString) {
    case 'FIRE':
      selected = Element.FIRE;
      break;

    case 'ICE':
      selected = Element.ICE;
      break;

    case 'LIGHTNING':
      selected = Element.LIGHTNING;
      break;

    default:
      selected = Element.FIRE;
  }
  return selected;
}

function materialChooser(rank: number): Material {
  switch (rank) {
    case 0:
      return Material.IRON;
      break;
    case 1:
      return Material.STEEL;
      break;
    case 2:
      return Material.STEEL;
      break;
    case 3:
      return Material.DIAMOND;
      break;
    default:
      return Material.IRON;
  }
}

function randomID(): string {
  const ids = ['Sword', 'Helmet', 'Chestplate', 'Gloves', 'Boots'];

  const randomIndex = Math.floor(Math.random() * ids.length);

  return ids[randomIndex];
}
