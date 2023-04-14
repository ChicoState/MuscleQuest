import { Component } from '@angular/core';

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