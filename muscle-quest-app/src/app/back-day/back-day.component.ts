import { Component } from '@angular/core';

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
