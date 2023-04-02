import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sloane-reward-display',
  templateUrl: './sloane-reward-display.component.html',
  styleUrls: ['./sloane-reward-display.component.scss'],
})
export class SloaneRewardDisplayComponent {
  @Input() score: number = 0;
  @Input() equipmentBonus: number = 0;
  @Input() elementBonus: number = 0;
  @Output() rewardAvailable = new EventEmitter<boolean>();
  @Output() updatedScore = new EventEmitter<number>();
  finalScore: number = 0;

  constructor() {}

  ngOnInit() {
    this.calculateFinalScore();
  }

  calculateFinalScore() {
    let finalScore = this.score * this.equipmentBonus * this.elementBonus;
    finalScore = parseFloat(finalScore.toFixed(2));

    this.finalScore = finalScore;
  }

  resetScore() {
    this.rewardAvailable.emit(false);
    this.updatedScore.emit(0);
  }
}
