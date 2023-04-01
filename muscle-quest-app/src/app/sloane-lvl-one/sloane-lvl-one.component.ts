import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ItemState, UserData, Material, Element } from 'src/lib/user';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';

/**
 * Features to add: variable background image corresponding to an element:
 *     - Give user extra reward for exercises if they have the opposite element in the MAJORITY of their gear
 *     - Add an explanation for how this works somewhere
 * Add different music options based on workout chosen
 * Add random time trial mode: announce a new exercise after an interval for a certain time
 * Give user extra rewards for any dex points in their equipped gear
 * */

@Component({
  selector: 'app-sloane-lvl-one',
  templateUrl: './sloane-lvl-one.component.html',
  styleUrls: ['./sloane-lvl-one.component.css'],
})
export class SloaneLvlOneComponent {
  item: ItemState = { id: '', strength: 0, dexterity: 0 };
  backgroundImageUrl: string;
  constructor(
    private location: Location,
    private itemService: SloaneItemGeneratorService
  ) {
    this.audio = new ElementRef<HTMLAudioElement>(new Audio());
    this.backgroundImageUrl = chooseBackground();
  }

  ngOnInit() {}

  generateItem(): void {
    const rank = 1;
    this.item = this.itemService.createNewItem(rank);
    console.log(this.item);
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
    this.generateItem();
    let data = this.itemService.giveItem(this.item);
    const newBundle = this.itemService.createLootBundle(2);
    this.itemService.giveLootBundle(newBundle);
    console.log(data);

    this.itemService.giveSpecificResources(undefined, 100);

    const newItem = this.itemService.createNewItem(1);
    this.itemService.giveItem(newItem);
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

function rng(n: number) {
  return Math.floor(Math.random() * n);
}

function chooseBackground() {
  const urls = [
    'url(../assets/sloane/images/fire-background.jpg)',
    'url(../assets/sloane/images/ice-background.jpg)',
    'url(../assets/sloane/images/lightning-background.jpg)',
  ];

  const choice = rng(3);

  return urls[choice];
}
