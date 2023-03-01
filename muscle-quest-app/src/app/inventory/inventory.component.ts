import { Component } from '@angular/core';
import { getItemName } from 'src/lib/registry'
import { ItemState, UserData } from 'src/lib/user'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent {
  constructor() {
    if (localStorage.getItem('mq:debug') === null) {
      localStorage.setItem('mq:debug', String(false))
    }
  }

  title = "Inventory"

  getDebug() {
    return localStorage.getItem('mq:debug') == 'true'
  }

  getName(item: ItemState) {
    return getItemName(item)
  }

  getUserData() {
    return UserData.get()
  }

  incrementGold() {
    return UserData.mutate((data) => {
      data.gold++
      return data
    })
  }

  decrementGold() {
    return UserData.mutate((data) => {
      data.gold--
      return data
    })
  }

  toggleDebug() {
    localStorage.setItem('mq:debug', String(!this.getDebug()))
  }
}
