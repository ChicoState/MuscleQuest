import { Component } from '@angular/core';
import { QuestStoriesService } from '../quest-stories.service';
import { QuestStory } from '../quest-story';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
// import { QuestStory } from '../quest-story';

@Component({
  selector: 'app-daily-quests',
  templateUrl: './daily-quests.component.html',
  styleUrls: ['./daily-quests.component.scss']
})
export class DailyQuestsComponent {

  constructor(){
    this.story_service = new QuestStoriesService;
    this.itemGen = new SloaneItemGeneratorService;
    this.quests = [];
    this.ready_quests();
  }

  story_service:QuestStoriesService;
  itemGen:SloaneItemGeneratorService;

  // Generate 5 daily quests.
  private generate_quests() {
    this.quests = [];
    this.quests.push(this.story_service.random_quest());
    this.quests.push(this.story_service.random_quest());
    this.quests.push(this.story_service.random_quest());
    this.quests.push(this.story_service.random_quest());
    this.quests.push(this.story_service.random_quest());
    localStorage.setItem("daily-quests", JSON.stringify(this.quests));
  }

  // Either generate or load quests
  public ready_quests() {
    let json = localStorage.getItem("daily-quests");
    if (json) {
      this.quests = JSON.parse(json);
    } else {
      this.generate_quests();
    }
  }

  public claim_reward(index:number) {
    this.itemGen.giveSpecificResources(
      this.quests[index].resources[0],
      this.quests[index].resources[1],
      this.quests[index].resources[2])
    this.itemGen.giveItem(this.quests[index].reward);
    this.update_state(index, 3);
  } 

  public quests:Array<QuestStory>;

  public update_state(index:number, state:number) {
    this.quests[index].state = state;
    localStorage.setItem("daily-quests", JSON.stringify(this.quests));
  }
}
