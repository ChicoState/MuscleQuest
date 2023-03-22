import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ItemState, UserData, Material, Element } from 'src/lib/user';

@Component({
  selector: 'app-sloane-lvl-one',
  templateUrl: './sloane-lvl-one.component.html',
  styleUrls: ['./sloane-lvl-one.component.css'],
})
export class SloaneLvlOneComponent {
  constructor(private location: Location) {
    this.audio = new ElementRef<HTMLAudioElement>(new Audio());
  }

  item: ItemState = {
    id: 'helmet',
    strength: 1,
    dexterity: 2,
    shop_data: {
      cost: 100,
    },
    element: Element.FIRE,
    material: Material.STEEL,
    display_name: 'Iron Helmet of Wings',
  };

  addItem(item: ItemState) {
    UserData.mutate((data) => {
      data.items.push(item);
      return data;
    });
  }

  title = 'The Revenge of Time';
  showRules = true;
  showExample = false;
  exerciseOptions = ['Pushups', 'Crunches', 'Jumprope', 'Burpees'];
  timeOptions = [30, 60, 90, 120, 180, 300];
  exerciseSelected = this.exerciseOptions[0].toLowerCase();
  timeSelected = this.timeOptions[0];
  count = this.timeSelected;
  audioPlayed = false;
  timer: any;
  score = 0;
  music = new Audio();
  timerGoing = false;

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
    if (this.timerGoing) return;
    this.timerGoing = true;
    this.music.src = '../../assets/sloane/sounds/mambo.mp3';
    this.music.load();
    this.music.play();
    this.timer = setInterval(
      () => {
        this.count--;
        if (this.count === 11 && !this.audioPlayed) {
          this.stopMusic();
          this.audio.nativeElement.play();
          this.audioPlayed = true;
        }
        if (this.count === -1) {
          this.stopTimer();
          this.audioPlayed = false;

          let whistle = new Audio();
          whistle.src = '../../assets/sloane/sounds/whistle.wav';
          whistle.load();
          whistle.play();
          this.score += this.timeSelected;
        }
      },
      1000,
      false
    );
  }

  stopTimer() {
    clearInterval(this.timer);
    this.count = this.timeSelected;
    this.stopMusic();
    this.timerGoing = false;
    this.addItem(this.item);
  }

  playSound() {
    this.audio.nativeElement.play();
  }

  stopMusic() {
    this.music.pause();
    this.music.currentTime = 0;
  }

  goBack(): void {
    this.location.back();
  }
}
