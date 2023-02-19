import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sloane-lvl-one',
  templateUrl: './sloane-lvl-one.component.html',
  styleUrls: ['./sloane-lvl-one.component.css'],
})
export class SloaneLvlOneComponent {
  constructor(private location: Location) {}

  title = 'The Revenge of Time';

  goBack(): void {
    this.location.back();
  }
}
