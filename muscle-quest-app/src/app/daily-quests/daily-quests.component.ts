import { Component } from '@angular/core';
import { QuestStoriesService } from '../quest-stories.service';
import { QuestStory } from '../quest-story';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { ItemState, UserData, Material, Element } from 'src/lib/user';
import { Location } from '@angular/common';
// import { QuestStory } from '../quest-story';

@Component({
  selector: 'app-daily-quests',
  templateUrl: './daily-quests.component.html',
  styleUrls: ['./daily-quests.component.scss']
})
export class DailyQuestsComponent {

  constructor(private location: Location){
    this.story_service = new QuestStoriesService;
    this.itemGen = new SloaneItemGeneratorService;
    this.quests = [];
    this.ready_quests();
  }

  goBack(): void {
    this.location.back();
  }
  story_service:QuestStoriesService;
  itemGen:SloaneItemGeneratorService;

  // Generate 5 daily quests.
  private generate_quests() {
    this.quests = [];
    // Number of quests is arbitrary
    for (let i = 0; i < 5; i++) {
      this.quests.push(this.story_service.random_quest(this.random_rank()));
    }

    // Save the quests with what day they were generated.
    let info = {quests: this.quests, date: new Date().getDate()};
    localStorage.setItem("daily-quests", JSON.stringify(info));
  }

  // Either generate or load quests
  public ready_quests() {
    // Get the json from the localStorage
    let json = localStorage.getItem("daily-quests");
    if (json) {
      // If it exists parse it
      let info = JSON.parse(json);
      if (info.date != new Date().getDate()) {
        // If the date is old generate new quests
        this.generate_quests();
      } else {
        // If not, load them in
        this.quests = info.quests;
      }
    } else {
      // If it doesn't exist generate new quests
      this.generate_quests();
    }
  }

  // Random Rank depending on stats
  public random_rank(): number {
    // Stolen from slone's level
    type EquippedKey = 'head' | 'chest' | 'hands' | 'feet' | 'weapon';
    let user = UserData.get();
    let total = 0;
    for (const key of Object.keys(user.equipped) as EquippedKey[]) {
      const itemState = user.equipped[key];
      if (itemState) {
        total += itemState.dexterity;
        total += itemState.strength;
      }
    }

    // Create the weights for each rank
    let rank1 = Math.max(total, 0);
    let rank2 = Math.max(total-5, 0)*2;
    let rank3 = Math.max(total-10, 0)*4;
    let rank4 = Math.max(total-20, 0)*6;

    // Create random number from 0 to the total sum of the weights
    let result = Math.floor(Math.random() * (rank1+rank2+rank3+rank4))
    
    // if the result landed on any of the ranks return that rank
    if (result < rank1) {
      return 0;
    } else if (result < rank1 + rank2) {
      return 1;
    } else if (result < rank1 + rank2 + rank3) {
      return 2;
    } else if (result < rank1 + rank2 + rank3 + rank4) {
      return 3;
    } else {
      return 0;
    }
  }

  // Add the reward for quest at index to the player object
  public claim_reward(index:number) {
    this.itemGen.giveSpecificResources(
      this.quests[index].resources[0],
      this.quests[index].resources[1],
      this.quests[index].resources[2])
    this.itemGen.giveItem(this.quests[index].reward);
    // Update the state of the quest to complete
    this.update_state(index, 3);
  } 

  public quests:Array<QuestStory>;

  // Updates the state of a quest and saves it back into local storage
  public update_state(index:number, state:number) {
    this.quests[index].state = state;
    // Might be an issue if you do this right at midnight or without closing your browser inbetween the days
    let info = {quests: this.quests, date: new Date().getDate()};
    localStorage.setItem("daily-quests", JSON.stringify(info));
  }
}
