import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OrcBossInfoComponent } from 'src/app/orc-boss-info/orc-boss-info.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatProgressBar } from '@angular/material/progress-bar';
// import { MatFormField } from '@angular/material/form-field';
// import { localStorage } from ''

@Component({
  selector: 'app-orc-boss',
  templateUrl: './orc-boss.component.html',
  styleUrls: ['./orc-boss.component.scss']
})
export class OrcBossComponent {
  constructor(private location: Location, public dialog: MatDialog) {}

  title = 'Orc Boss Fight';
  orc_name = 'Grog';
  max_hp=500;
  pushups=0;
  miles_run=0;
  squats=0;
  situps=0;
  situps_done=true;

  getHPProgress(): number {
    let hp=this.getHP();
    return (hp/this.max_hp)*100;

  }

  getHP(): number {
    return this.max_hp-5*this.pushups-50*this.miles_run-2*this.situps-this.squats;
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
      localStorage.setItem('orc-boss-name', name);
      return name;
    }
  }

  plus_one_pushup(): void {
    this.pushups+=1;
  }
  plus_one_mile_run(): void {
    this.miles_run+=1;
  }
  plus_one_squat(): void {
    this.squats+=1;
  }
  plus_one_situp(): void {
    this.situps+=1;
  }

  showStats(): void {
    const dialogRef = this.dialog.open(OrcBossInfoComponent);
  }

  newBoss(): void {
    this.squats=0;
    this.miles_run=0;
    this.situps=0;
    this.pushups=0;
    localStorage.removeItem('orc-boss-name');
    this.getOrcName();
  }

  goBack(): void {
    this.location.back();
  }
}
