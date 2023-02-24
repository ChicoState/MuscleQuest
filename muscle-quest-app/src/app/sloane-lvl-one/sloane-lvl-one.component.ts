import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sloane-lvl-one',
  templateUrl: './sloane-lvl-one.component.html',
  styleUrls: ['./sloane-lvl-one.component.css'],
})
export class SloaneLvlOneComponent {
  constructor(private location: Location) {
    this.audio = new ElementRef<HTMLAudioElement>(new Audio());
  }

  title = 'The Revenge of Time';
  showRules = true;

  toggleRules() {
    this.showRules ? (this.showRules = false) : (this.showRules = true);
  }

  @ViewChild('myAudio', { static: true }) audio: ElementRef<HTMLAudioElement>;

  playSound() {
    this.audio.nativeElement.play();
  }

  goBack(): void {
    this.location.back();
  }
}
