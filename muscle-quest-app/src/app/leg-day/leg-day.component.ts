import { Component } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-leg-day',
  templateUrl: './leg-day.component.html',
  styleUrls: ['./leg-day.component.css']
})
export class LegDayComponent {

  checkboxes=false;
  get(): boolean {
    return this.checkboxes;
  }
}
