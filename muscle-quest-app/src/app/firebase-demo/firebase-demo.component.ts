import { Component } from '@angular/core';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';

@Component({
  selector: 'app-firebase-demo',
  templateUrl: './firebase-demo.component.html',
  styleUrls: ['./firebase-demo.component.scss'],
})
export class FirebaseDemoComponent {
  userData: any;
  allUserData: any;
  constructor(
    private itemGeneratorService: SloaneItemGeneratorService,
    private userService: SloaneUserUpdateService
  ) {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userData = user;
    });
  }

  giveRandomItem() {
    const newItem = this.itemGeneratorService.createNewItem(1);
    this.userService.giveItem(newItem);
  }

  giveRandomLootBundle() {
    const newBundle = this.itemGeneratorService.createLootBundle(1);
    console.log(this.userData.items);
    this.userService.giveLootBundle(newBundle);
  }

  removeFirstItem() {
    this.userService.removeItem(this.userData.equipped[0]);
  }

  getUserData() {
    this.userData = this.userService.getCurrentUserData();
    console.log(this.userData);
  }

  getAllUserData() {
    this.allUserData = this.userService.getAllUserData();
    console.log(this.allUserData);
  }

  saveData() {
    this.userData.equipped = [this.itemGeneratorService.createNewItem(0)];
    this.userService.updateUserData(this.userData);
  }
}
