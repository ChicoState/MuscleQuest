import { Component } from '@angular/core';
// import { SloaneItemGeneratorService } from '../../sloane-item-generator.service';
// import { ItemState, UserData, Material, Element } from 'src/lib/user';

@Component({
  selector: 'app-back-day',
  templateUrl: './back-day.component.html',
  styleUrls: ['./back-day.component.css'],
})
export class BackDayComponent {
  letCheckbox1 = false;
  letCheckbox2 = false;
  letCheckbox3 = false;
  letCheckbox4 = false;
  letCheckbox5 = false;
  letCheckbox6 = false;
  letCheckbox7 = false;
  letCheckbox8 = false;
  letCheckbox9 = false;
  letCheckbox10 = false;
  letCheckbox11 = false;
  letCheckbox12 = false;
  letCheckbox13 = false;
  total_Health = 100;
  negative_Health = 0;
  numTrueCheckboxes = 0;
  prevCheckbox: Record<string, boolean> = {};

  showExample = false;
  showRulesa = true;
  showRulesb = true;
  showRulesc = true;
  showRulesd = true;
  showRulese = true;
  showRulesf = true;
  showRulesg = true;
  showRulesh = true;
  showRulesi = true;
  showRulesj = true;
  showRulesk = true;
  showRulesl = true;
  showRulesm = true;
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
  toggleRulesi() {
    this.showRulesi ? (this.showRulesi = false) : (this.showRulesi = true);
  }
  toggleRulesj() {
    this.showRulesj ? (this.showRulesj = false) : (this.showRulesj = true);
  }
  toggleRulesk() {
    this.showRulesk ? (this.showRulesk = false) : (this.showRulesk = true);
  }
  toggleRulesl() {
    this.showRulesl ? (this.showRulesl = false) : (this.showRulesl = true);
  }
  toggleRulesm() {
    this.showRulesm ? (this.showRulesm = false) : (this.showRulesm = true);
  }
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  getHealth(): number {
    this.numTrueCheckboxes = 0;
    for (let i = 1; i <= 13; i++) {
      const checkbox = this[`letCheckbox${i}` as keyof this] ?? false;
      if (checkbox) {
        this.numTrueCheckboxes += 1;
      }
    }
    const deduction = 7.7 * this.numTrueCheckboxes;
    return this.total_Health - deduction;
  }
}
