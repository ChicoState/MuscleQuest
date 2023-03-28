import { Component } from '@angular/core';
import { item_registry } from 'lib/registry'
import { UserData } from 'lib/user';
import { getItemName, getItemIcon } from 'lib/registry'

@Component({
  selector: 'app-character-screen',
  templateUrl: './character-screen.component.html',
  styleUrls: ['./character-screen.component.scss']
})
export class CharacterScreenComponent {
  getIcon = getItemIcon;
  getUserData = UserData.get;
  let helmetIcon = getElementByID();
}
