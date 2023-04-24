import { CheckboxControlValueAccessor } from '@angular/forms';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SloaneItemGeneratorService } from '../../sloane-item-generator.service';
import { ItemState, UserData, Material, Element } from 'src/lib/user';

@Component({
  selector: 'app-back-day',
  templateUrl: './back-day.component.html',
  styleUrls: ['./back-day.component.css']
})
export class BackDayComponent 
{
  letCheckbox1: boolean = false;
  letCheckbox2: boolean = false;
  letCheckbox3: boolean = false;
  letCheckbox4: boolean = false;
  letCheckbox5: boolean = false;
  letCheckbox6: boolean = false;
  letCheckbox7: boolean = false;
  letCheckbox8: boolean = false;
  letCheckbox9: boolean = false;
  letCheckbox10: boolean = false;
  letCheckbox11: boolean = false;
  letCheckbox12: boolean = false; 
  letCheckbox13: boolean = false;
  total_Health: number = 100;
  negative_Health: number = 0;
  numTrueCheckboxes: number = 0;
  prevCheckbox: Record<string, boolean> = {};

  showExample: boolean = false;
  showRulesa: boolean = true;
  showRulesb: boolean = true;
  showRulesc: boolean = true;
  showRulesd: boolean = true;
  showRulese: boolean = true;
  showRulesf: boolean = true;
  showRulesg: boolean = true;
  showRulesh: boolean = true;
  showRulesi: boolean = true;
  showRulesj: boolean = true;
  showRulesk: boolean = true;
  showRulesl: boolean = true;
  showRulesm: boolean = true;
  showContent: boolean = false;

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
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesg() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesh() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesi() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesj() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesk() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesl() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
  }
  toggleRulesm() {
    this.showRulese ? (this.showRulese = false) : (this.showRulese = true);
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