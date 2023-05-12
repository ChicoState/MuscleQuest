import { CheckboxControlValueAccessor } from '@angular/forms';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SloaneItemGeneratorService } from '../../sloane-item-generator.service';
import { ItemState, UserData, Material, Element } from 'src/lib/user';

@Component({
  selector: 'app-chest-day',
  templateUrl: './chest-day.component.html',
  styleUrls: ['./chest-day.component.css']
})
export class ChestDayComponent {

  letCheckbox1: boolean = false;
  letCheckbox2: boolean = false;
  letCheckbox3: boolean = false;
  letCheckbox4: boolean = false;
  letCheckbox5: boolean = false;
  letCheckbox6: boolean = false;
  letCheckbox7: boolean = false;
  letCheckbox8: boolean = false;
  total_Health: number = 100;
  negative_Health: number = 0;
  numTrueCheckboxes: number = 0;
  showExample: boolean = false;
  showRulesa: boolean = true;
  showRulesb: boolean = true;
  showRulesc: boolean = true;
  showRulesd: boolean = true;
  showRulese: boolean = true;
  showRulesf: boolean = true;
  showRulesg: boolean = true;
  showRulesh: boolean = true;
  showContent: boolean = false;

  item: ItemState = { id: '', strength: 0, dexterity: 0 };
  output = '';
  
  constructor(private rewards: SloaneItemGeneratorService) {}
  
  generateItem(): void {
    const rank = 1;
    const newBundle = this.rewards.createLootBundle(rank);
    this.item = this.rewards.createNewItem(rank);
  
    this.output = `Congradulations for defeating the Chest Day Boss!!\n
    Here is your your New Bundle:\n 
    Gold:${newBundle[0]},\n
    Wood:${newBundle[1]},\n
    Iron:${newBundle[2]} \n 
    New Item: ${JSON.stringify(this.item)}`;
  }
  
  showItem(): void {
    this.generateItem();
    window.alert(this.output);
  }

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