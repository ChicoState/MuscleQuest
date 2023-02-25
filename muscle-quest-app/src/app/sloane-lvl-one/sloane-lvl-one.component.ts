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
  options = ['Pushups', 'Crunches', 'Jumprope', 'Burpees'];
  selected = this.options[0].toLowerCase();
  showExample = true;
  count = 15;
  audioPlayed = false;
  timer: any;

  // Reusing code for simplicity of understanding
  toggleRules() {
    this.showRules ? (this.showRules = false) : (this.showRules = true);
  }

  toggleExample() {
    this.showExample ? (this.showExample = false) : (this.showExample = true);
  }

  onWorkoutSelected(event: any) {
    this.selected = event.target.value.toLowerCase();
    console.log(this.selected);
  }

  @ViewChild('countDownAudio', { static: true })
  audio: ElementRef<HTMLAudioElement>;

  countDown() {
    this.timer = setInterval(() => {
      this.count--;
      if (this.count === 11 && !this.audioPlayed) {
        this.audio.nativeElement.play();
        this.audioPlayed = true;
      }
      if (this.count === -1) {
        this.stopTimer();
        this.count = 15;
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
