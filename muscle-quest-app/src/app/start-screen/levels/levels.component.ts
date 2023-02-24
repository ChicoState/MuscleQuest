import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent { 
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }
  
}
