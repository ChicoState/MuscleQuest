import { CheckboxControlValueAccessor } from '@angular/forms';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SloaneItemGeneratorService } from '../../sloane-item-generator.service';
import { ItemState, UserData, Material, Element } from 'src/lib/user';



@Component({
  selector: 'app-leg-day',
  templateUrl: './leg-day.component.html',
  styleUrls: ['./leg-day.component.css']
})
export class LegDayComponent {
  letCheckbox1: boolean = false;
  letCheckbox2: boolean = false;
  letCheckbox3: boolean = false;
  letCheckbox4: boolean = false;
  letCheckbox5: boolean = false;
  showExample: boolean = false;
  showRulesa: boolean = true;
  showRulesb: boolean = true;
  showRulesc: boolean = true;
  showRulesd: boolean = true;
  showRulese: boolean = true;
  total_Health: number = 100;
  negative_Health: number = 0;
  numTrueCheckboxes: number = 0;
  showContent: boolean = false;
  generatedData: any;

  elementChoice: number = 1;
  equipmentBonus: number = 1;
  elementBonus: number = 1;
  item: ItemState = { id: '', strength: 0, dexterity: 0 };

  constructor (
    private rewards: SloaneItemGeneratorService
  )
  {}
  generateItem(): void {
    const rank = 1;
    const newBundle = this.rewards.createLootBundle(rank);
    this.item = this.rewards.createNewItem(rank);
    console.log(newBundle);
    console.log(this.item);
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


