import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ItemState, UserData, Material, Element } from 'src/lib/user';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';

/**
 * Features to add: :
 *     - Add an explanation for how bonus points work somewhere
 * Add different music options based on workout chosen
 * Add random time trial mode: announce a new exercise after an interval for a certain time
 * */

@Component({
  selector: 'app-sloane-lvl-one',
  templateUrl: './sloane-lvl-one.component.html',
  styleUrls: ['./sloane-lvl-one.component.css'],
})
export class SloaneLvlOneComponent {
  // Background image determines the level's current element
  backgroundImageUrl: string = '';
  title = 'The Revenge of Time';
  showRules = true;
  showExample = false;
  exerciseOptions = [
    'Pushups',
    'Crunches',
    'Bicycle-crunches',
    'Jumprope',
    'Burpees',
    'Pull-ups',
    'Lunges',
  ];
  toughOptions = ['pull-ups', 'burpees'];
  timeOptions = [3, 30, 60, 90, 120, 180, 300];
  exerciseSelected = this.exerciseOptions[0].toLowerCase();
  timeSelected: number = this.timeOptions[0];
  count = this.timeSelected;
  audioPlayed = false;
  timer: any;
  score: number = 0;
  rewardAvailable: boolean = false;
  music = new Audio();
  timerGoing = false;
  item: ItemState = { id: '', strength: 0, dexterity: 0 };
  // Equipment and element multipliers will apply a bonus to any loot earned
  equipmentBonus: number = 1;
  elementBonus: number = 1;
  elementChoice: number;
  userEquipment = UserData.get().equipped;
  elements: { [key: number]: string } = {
    0: 'url(../assets/sloane/images/fire-background.jpg)',
    1: 'url(../assets/sloane/images/ice-background.jpg)',
    2: 'url(../assets/sloane/images/lightning-background.jpg)',
  };
  constructor(
    private location: Location,
    private itemService: SloaneItemGeneratorService
  ) {
    this.audio = new ElementRef<HTMLAudioElement>(new Audio());
    this.elementChoice = rng(Object.keys(this.elements).length);
  }

  ngOnInit() {
    this.chooseBackground(this.elementChoice);
    console.log(UserData.get().items);
    console.log(this.userEquipment);

    // FOR TESTING ONLY: Equip some items to user from their inventory

    this.itemService.giveItem(this.itemService.createNewItem(3));
    this.itemService.giveItem(this.itemService.createNewItem(3));

    UserData.mutate((data) => {
      data.equipped.feet = data.items[13];
      data.equipped.chest = data.items[14];
      return data;
    });

    this.setBonus();
  }

  // Calculate user's total dex;
  // Also, determine how many of the user's equipped items match the level's current element
  // Set a static bonus which will be applied whenever the user earns any loot
  setBonus() {
    type EquippedKey = 'head' | 'chest' | 'hands' | 'feet' | 'weapon';
    let user = UserData.get();
    let dex = 0;
    console.log(user.equipped);
    const currentElement = this.elementChoice;
    let itemsWithMatchingElement = 0;
    for (const key of Object.keys(user.equipped) as EquippedKey[]) {
      const itemState = user.equipped[key];
      if (itemState) {
        dex += itemState.dexterity;
        if (itemState.element == currentElement) {
          itemsWithMatchingElement++;
        }
      }
    }
    console.log('Total dex: ', dex);
    console.log('Matching items: ', itemsWithMatchingElement);
    this.elementBonus += itemsWithMatchingElement * 0.05;
    let fixedElementBonus = parseFloat(this.elementBonus.toFixed(3));
    this.elementBonus = fixedElementBonus;

    this.equipmentBonus += dex * 0.1;
    let fixedEquipmentBonus = parseFloat(this.equipmentBonus.toFixed(3));
    this.equipmentBonus = fixedEquipmentBonus;
  }

  generateItem(): void {
    const rank = 1;
    this.item = this.itemService.createNewItem(rank);
    console.log(this.item);
  }

  // Reusing code for simplicity of understanding
  toggleRules() {
    this.showRules ? (this.showRules = false) : (this.showRules = true);
  }

  toggleExample() {
    this.showExample ? (this.showExample = false) : (this.showExample = true);
  }

  onExerciseSelected(event: any) {
    this.exerciseSelected = event.target.value.toLowerCase();
  }

  onTimeSelected(event: any) {
    console.log(event.target.value);
    this.timeSelected = event.target.value;
    this.count = event.target.value;
  }

  @ViewChild('countDownAudio', { static: true })
  audio: ElementRef<HTMLAudioElement>;

  countDown() {
    if (this.timerGoing) return;
    this.timerGoing = true;
    switch (rng(4)) {
      case 0:
        this.music.src = '../../assets/sloane/sounds/pizza-compressed.wav';
        break;
      case 1:
        this.music.src = '../../assets/sloane/sounds/wasting-compressed.wav';
        break;
      case 2:
        this.music.src = '../../assets/sloane/sounds/the-mall.mp3';
        break;
      default:
        this.music.src = '../../assets/sloane/sounds/mambo.mp3';
    }
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
          // tough options are worth extra points
          if (this.toughOptions.indexOf(this.exerciseSelected) > -1) {
            this.score += this.timeSelected;
          }
          this.rewardAvailable = true;
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

  chooseBackground(choice: number) {
    this.backgroundImageUrl = this.elements[choice];
  }

  resetScore() {
    this.score = 0;
  }
}

function rng(n: number) {
  return Math.floor(Math.random() * n);
}
