import { Component } from '@angular/core';
import { item_registry } from 'src/lib/registry'
import { ItemState, UserData } from 'src/lib/user'
import { getItemName, getItemIcon } from 'src/lib/registry'
import { Debug } from 'src/lib/global_data'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent {
  title = 'Item Shop';

  items_available = this.getItems();

  getName = getItemName;
  getIcon = getItemIcon;
  getUserData = UserData.get;

  Debug = Debug;

  getItems() {
    const ITEM_COUNT = 5;
    let items_available: Array<ItemState> = [];

    const item_ids = Object.keys(item_registry);
    for (var i = 0; i < ITEM_COUNT; i++) {
      const item_id = item_ids[Math.floor(Math.random() * item_ids.length)];
      items_available.push({
        id: item_id,
        strength: Math.floor(Math.random() * 4),
        dexterity: Math.floor(Math.random() * 2),
        shop_data: {
          cost: Math.floor(Math.random() * 10) + 3,
        },
      });
    }

    return items_available;
  }

  getData(item: ItemState) {
    return JSON.stringify(item ?? {}, null, 2);
  }

  giveItem(item: ItemState) {
    UserData.mutate((data) => {
      data.items.push(item);
      return data;
    });
  }
}
