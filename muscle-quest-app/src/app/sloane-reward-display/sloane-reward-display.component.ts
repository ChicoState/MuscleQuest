import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sloane-reward-display',
  templateUrl: './sloane-reward-display.component.html',
  styleUrls: ['./sloane-reward-display.component.scss'],
})
export class SloaneRewardDisplayComponent {
  @Input() score: number = 0;
  @Input() equipmentBonus: number = 0;
  @Input() elementBonus: number = 0;

  constructor() {}

  ngOnInit() {
    console.log(this.equipmentBonus);
    console.log(this.elementBonus);
  }
}
