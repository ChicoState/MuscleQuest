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
    const newItem: ItemState = {
      id: 'Sword',
      strength: 3,
      dexterity: 3,
      element: Element.FIRE,
      material: Material.IRON,
      display_name: 'Iron Sword of Fire',
      shop_data: {
        cost: 100,
      },
    };
    return newItem;
  }
}

// Given a rank, generate a ran
function randomNumber(rank: number) {}
