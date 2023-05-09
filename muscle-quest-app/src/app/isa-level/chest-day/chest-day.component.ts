import { Component } from '@angular/core';

@Component({
  selector: 'app-chest-day',
  templateUrl: './chest-day.component.html',
  styleUrls: ['./chest-day.component.css'],
})
export class ChestDayComponent {
  letCheckbox1 = false;
  letCheckbox2 = false;
  letCheckbox3 = false;
  letCheckbox4 = false;
  letCheckbox5 = false;
  letCheckbox6 = false;
  letCheckbox7 = false;
  letCheckbox8 = false;
  total_Health = 100;
  negative_Health = 0;
  numTrueCheckboxes = 0;
  showExample = false;
  showRulesa = true;
  showRulesb = true;
  showRulesc = true;
  showRulesd = true;
  showRulese = true;
  showRulesf = true;
  showRulesg = true;
  showRulesh = true;
  showContent = false;

  toggleExample() {
    this.showExample ? (this.showExample = false) : (this.showExample = true);
  }
  toggleRulesa() {
    this.showRulesa ? (this.showRulesa = false) : (this.showRulesa = true);
  }
  toggleRulesb() {
    this.showRulesb ? (this.showRulesb = false) : (this.showRulesb = true);
  }
  toggleRulesc() {
    this.showRulesc ? (this.showRulesc = false) : (this.showRulesc = true);
  }
  toggleRulesd() {
    this.showRulesd ? (this.showRulesd = false) : (this.showRulesd = true);
  }
  toggleRulese() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesf() {
    this.showRulesf ? (this.showRulesf = false) : (this.showRulesf = true);
  }
  toggleRulesg() {
    this.showRulesg ? (this.showRulesg = false) : (this.showRulesg = true);
  }
  toggleRulesh() {
    this.showRulesh ? (this.showRulesh = false) : (this.showRulesh = true);
  }
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  getHealth(): number {
    this.numTrueCheckboxes = 0;
    for (let i = 1; i <= 8; i++) {
      const checkbox = this[`letCheckbox${i}` as keyof this] ?? false;
      if (checkbox) {
        this.numTrueCheckboxes += 1;
      }
    }
    const deduction = 12.5 * this.numTrueCheckboxes;
    return this.total_Health - deduction;
  }
}
