import { Component } from '@angular/core';
import { getItemName } from 'lib/registry'
import { UserData } from 'lib/user'
import { Debug } from 'lib/global_data'

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent {
  constructor() {
  }

  title = "Inventory"

  Debug = Debug

  getName = getItemName
  getUserData = UserData.get

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
}
