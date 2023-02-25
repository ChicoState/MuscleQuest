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
  showExample = false;
  exerciseOptions = ['Pushups', 'Crunches', 'Jumprope', 'Burpees'];
  timeOptions = [5, 30, 60, 90, 120, 180];
  exerciseSelected = this.exerciseOptions[0].toLowerCase();
  timeSelected = this.timeOptions[0];
  count = this.timeSelected;
  audioPlayed = false;
  timer: any;
  score = 0;

  // Reusing code for simplicity of understanding
  toggleRules() {
    this.showRules ? (this.showRules = false) : (this.showRules = true);
  }

  toggleExample() {
    this.showExample ? (this.showExample = false) : (this.showExample = true);
  }

  onExerciseSelected(event: any) {
    this.exerciseSelected = event.target.value.toLowerCase();
    console.log(this.exerciseSelected);
  }

  onTimeSelected(event: any) {
    this.timeSelected = event.target.value;
    this.count = this.timeSelected;
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
        this.count = this.timeSelected;
        this.audioPlayed = false;

        let whistle = new Audio();
        whistle.src = '../../assets/sounds/whistle.wav';
        whistle.load();
        whistle.play();
        this.score += this.timeSelected;
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
