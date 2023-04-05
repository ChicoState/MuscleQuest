import { Component } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';

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
  total_Health: number = 100;
  negative_Health: number = 0;
  numTrueCheckboxes: number = 0;


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
}
