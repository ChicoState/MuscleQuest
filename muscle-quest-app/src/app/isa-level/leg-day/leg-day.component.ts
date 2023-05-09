import { CheckboxControlValueAccessor } from '@angular/forms';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SloaneItemGeneratorService } from '../../sloane-item-generator.service';
import { ItemState, UserData, Material, Element } from 'src/lib/user';



@Component({
  selector: 'app-leg-day',
  templateUrl: './leg-day.component.html',
  styleUrls: ['./leg-day.component.css'],
  template: `<div id="output"></div>`, 
})
export class LegDayComponent {
  letCheckbox1 = false;
  letCheckbox2 = false;
  letCheckbox3 = false;
  letCheckbox4 = false;
  letCheckbox5 = false;
  showExample = false;
  showRulesa = true;
  showRulesb = true;
  showRulesc = true;
  showRulesd = true;
  showRulese = true;
  total_Health = 100;
  negative_Health = 0;
  numTrueCheckboxes = 0;
  showContent = false;
  generatedData: any;

  elementChoice = 1;
  equipmentBonus = 1;
  elementBonus = 1;
  item: ItemState = { id: '', strength: 0, dexterity: 0 };
  output = '';
  
  constructor(private rewards: SloaneItemGeneratorService) {}
  
  generateItem(): void {
    const rank = 1;
    const newBundle = this.rewards.createLootBundle(rank);
    this.item = this.rewards.createNewItem(rank);
  
    this.output = `Congradulations for defeating the Leg Day Boss!!\n
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
  
  
  getHealth(): number {
    this.numTrueCheckboxes = 0;
    for (let i = 1; i <= 5; i++) {
      const checkbox = this[`letCheckbox${i}` as keyof this] ?? false;
      if (checkbox) {
        this.numTrueCheckboxes += 1;
      }
    }
    const deduction = 20 * this.numTrueCheckboxes;
    return this.total_Health - deduction;
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
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

  @ViewChild('collapsibleButton') collapsibleButton!: ElementRef;

  ngAfterViewInit(): void {
    const coll = this.collapsibleButton.nativeElement;
    coll.addEventListener("click", function(this: HTMLElement) {
      this.classList.toggle("active");
      const content = this.nextElementSibling as HTMLElement;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
  
}

