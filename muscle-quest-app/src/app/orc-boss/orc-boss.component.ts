import { Component } from '@angular/core';
import { Location } from '@angular/common';
// import { MatProgressBar } from '@angular/material/progress-bar';
// import { MatFormField } from '@angular/material/form-field';
// import { localStorage } from ''

@Component({
  selector: 'app-orc-boss',
  templateUrl: './orc-boss.component.html',
  styleUrls: ['./orc-boss.component.scss']
})
export class OrcBossComponent {
  constructor(private location: Location) {}

  title = 'Orc Boss Fight';
  orc_name = 'Grog';
  // hp:number = 450;
  max_hp=500;
  pushups=0;
  hp=500;
  situps=0;

  getHPProgress(): number {
    let hp=this.getHP();
    return (hp*100)/this.max_hp;
  }

  getHP(): number {
    return this.max_hp-5*this.pushups;
  }

  getHPString(): string {
    return String('HP : ' + this.getHP() + '/' + this.max_hp)
  }

  getOrcName(): string {
    let boss_name = localStorage.getItem('orc-boss-name');
    if (boss_name) {
      return boss_name;
    } else {
      // Generate a random name for the boss
      let name_start = Math.floor(Math.random() * 4);
      let name_middle = Math.floor(Math.random() * 4);
      let name_end = Math.floor(Math.random() * 4);
      let name_title = Math.floor(Math.random() * 4);
      let name = '';
      
      // switch based off the various options
      switch (name_start) {
        case 0:
          name += 'Ger';
          break;
        case 1:
          name += 'Bo';
          break;
        case 2:
          name += 'Da';
          break;
        case 3:
          name += 'Jor';
          break;
      }
      switch (name_middle) {
        case 0:
          name += 'bod';
          break;
        case 1:
          name += 'nok';
          break;
        case 2:
          name += 'vik';
          break;
        case 3:
          name += 'jor';
          break;
      }
      switch (name_end) {
        case 0:
          name += 'bod';
          break;
        case 1:
          name += 'nok';
          break;
        case 2:
          name += 'vik';
          break;
        case 3:
          name += 'jor';
          break;
      }
      switch (name_title) {
        case 0:
          name += ' the Mighty';
          break;
        case 1:
          name += ' the Fearsome';
          break;
        case 2:
          name += ' the Terrible';
          break;
        case 3:
          name += ' the Warrior';
          break;
      }
      return name;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
