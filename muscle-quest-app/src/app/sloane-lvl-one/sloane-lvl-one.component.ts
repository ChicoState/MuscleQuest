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
  options = ['Pushups', 'Situps', 'Jumprope', 'Burpees'];
  selected = this.options[0];
  count = 15;
  audioPlayed = false;
  timer: any;

  toggleRules() {
    this.showRules ? (this.showRules = false) : (this.showRules = true);
  }

  onWorkoutSelected(event: any) {
    this.selected = event.target.value;
    console.log(this.selected);
  }

  @ViewChild('countDownAudio', { static: true })
  audio: ElementRef<HTMLAudioElement>;

  countDown() {
    this.timer = setInterval(() => {
      this.count--;
      if (this.count === 10 && !this.audioPlayed) {
        this.audio.nativeElement.play();
        this.audioPlayed = true;
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  playSound() {
    this.audio.nativeElement.play();
  }

  goBack(): void {
    this.location.back();
  }
}
