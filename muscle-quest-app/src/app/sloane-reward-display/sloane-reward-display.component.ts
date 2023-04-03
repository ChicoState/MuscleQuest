import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { UserData } from 'src/lib/user';

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
  @Output() closed = new EventEmitter<void>();
  finalScore: number = 0;
  lootBundle: number[] = [0, 0, 0];

  constructor(private itemService: SloaneItemGeneratorService) {}

  ngOnInit() {
    this.calculateFinalScore();
    this.proprietaryLootBundler(this.finalScore);
    this.itemService.giveLootBundle(this.lootBundle);
    console.log(UserData.get().gold);
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
    let bundle = [gold, wood, iron];
    console.log(bundle);
    this.lootBundle = bundle;
  }
}

function rng(n: number) {
  return Math.floor(Math.random() * n);
}
