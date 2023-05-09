import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';

@Component({
  selector: 'app-sloane-reward-display',
  templateUrl: './sloane-reward-display.component.html',
  styleUrls: ['./sloane-reward-display.component.scss'],
})
export class SloaneRewardDisplayComponent {
  @Input() score = 0;
  @Input() equipmentBonus = 0;
  @Input() elementBonus = 0;
  @Output() rewardAvailable = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();
  finalScore = 0;
  lootBundle: number[] = [0, 0, 0];

  constructor(private userService: SloaneUserUpdateService) {}

  ngOnInit() {
    this.calculateFinalScore();
    this.proprietaryLootBundler(this.finalScore);
    this.userService.giveLootBundle(this.lootBundle);
  }

  calculateFinalScore() {
    let finalScore = this.score * this.equipmentBonus * this.elementBonus;
    finalScore = Math.ceil(parseFloat(finalScore.toFixed(2)));
    this.finalScore = finalScore;
  }

  resetScore() {
    this.rewardAvailable.emit(false);
    this.closed.emit();
    // reset loot bundle
    this.lootBundle = [0, 0, 0];
  }

  // Very similar to code in sloane-item-generator service but modified to handle smaller bundles
  proprietaryLootBundler(score: number): void {
    const gold = rng(score);
    const wood = rng(score);
    const iron = rng(score);
    const bundle = [gold, wood, iron];
    console.log(bundle);
    this.lootBundle = bundle;
  }
}

function rng(n: number) {
  return Math.floor(Math.random() * n);
}
