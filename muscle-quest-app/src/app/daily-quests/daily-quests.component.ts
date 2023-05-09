import { Component } from '@angular/core';
import { QuestStoriesService } from '../quest-stories.service';
import { QuestStory } from '../quest-story';
import { SloaneItemGeneratorService } from '../sloane-item-generator.service';
import { ItemState, UserData, Material, Element, DataObject} from 'src/lib/user';
import { Location } from '@angular/common';
import { SloaneUserUpdateService } from '../sloane-user-updater.service';
// import { QuestStory } from '../quest-story';
// import { DataObject } from 'src/lib/user';

@Component({
  selector: 'app-daily-quests',
  templateUrl: './daily-quests.component.html',
  styleUrls: ['./daily-quests.component.scss'],
})
export class DailyQuestsComponent {
  constructor(private location: Location,
              private userService: SloaneUserUpdateService) {
    this.story_service = new QuestStoriesService();
    this.itemGen = new SloaneItemGeneratorService();
    this.quests = [];
    this.userData = null;
    this.userService.getCurrentUser().subscribe((user) => {
      this.userData = user;
      if (user != null) {
        this.ready_quests();
      }
    });
  }
  userData: DataObject | null;
  story_service: QuestStoriesService;
  itemGen: SloaneItemGeneratorService;

  // Generate 5 daily quests.
  private generate_quests() {
    this.quests = [];
    // Number of quests is arbitrary
    for (let i = 0; i < 5; i++) {
      this.quests.push(this.story_service.random_quest(this.random_rank()));
    }

    // Save the quests with what day they were generated.
    const info = { quests: this.quests, date: new Date().getDate() };
    if (this.userData != null) {
      this.userData.dailyQuests = JSON.stringify(info);
      this.userService.updateUserData(this.userData);
    }
    // localStorage.setItem('daily-quests', JSON.stringify(info));
  }

  public exercise(quest_index: number, exercise_index: number, count: number) {
    if (count == -1) {
      this.quests[quest_index].exercise.current_count[exercise_index] =
        this.quests[quest_index].exercise.counts[exercise_index];
    } else {
      this.quests[quest_index].exercise.current_count[exercise_index] += count;
    }
    // Might be an issue if you do this right at midnight or without closing your browser inbetween the days
    const info = { quests: this.quests, date: new Date().getDate() };
    if (this.userData != null) {
      this.userData.dailyQuests = JSON.stringify(info);
      this.userService.updateUserData(this.userData);
    }
    // localStorage.setItem('daily-quests', JSON.stringify(info));
  }

  // Either generate or load quests
  public ready_quests() {
    // Get the json from the localStorage
    const json = this.userData?.dailyQuests;
    if (json) {
      // If it exists parse it
      const info = JSON.parse(json);
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
    const user = UserData.get();
    let total = 0;
    for (const key of Object.keys(user.equipped) as EquippedKey[]) {
      const itemState = user.equipped[key];
      if (itemState) {
        total += itemState.dexterity;
        total += itemState.strength;
      }
    }

    // Create the weights for each rank
    const rank1 = Math.max(total, 0);
    const rank2 = Math.max(total - 5, 0) * 2;
    const rank3 = Math.max(total - 10, 0) * 4;
    const rank4 = Math.max(total - 20, 0) * 6;

    // Create random number from 0 to the total sum of the weights
    const result = Math.floor(Math.random() * (rank1 + rank2 + rank3 + rank4));

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

  // returns a number 0-1 of the average completion of the exercises in this quest
  public quest_completeness(index: number): number {
    let total = 0;
    for (let i = 0; i < this.quests[index].exercise.counts.length; i++) {
      total +=
        this.quests[index].exercise.current_count[i] /
        this.quests[index].exercise.counts[i];
    }
    total /= this.quests[index].exercise.counts.length;

    return total;
  }

  // Add the reward for quest at index to the player object
  public claim_reward(index: number) {
    const percentage_complete: number = this.quest_completeness(index);
    this.itemGen.giveSpecificResources(
      this.quests[index].resources[0],
      this.quests[index].resources[1],
      this.quests[index].resources[2]
    );
    if (percentage_complete > 0.9)
      this.itemGen.giveItem(this.quests[index].reward);
    // Update the state of the quest to complete
    this.update_state(index, 3);
  }

  private adjust_reward(index: number) {
    const percentage_complete = this.quest_completeness(index);
    for (let i = 0; i < 3; i++)
      this.quests[index].resources[i] = Math.floor(
        this.quests[index].resources[i] * percentage_complete
      );
  }

  public quests: Array<QuestStory>;

  // Updates the state of a quest and saves it back into local storage
  public update_state(index: number, state: number) {
    if (state == 2) this.adjust_reward(index); // If claimed complete then adjust reward based on number of things completed
    this.quests[index].state = state;
    // Might be an issue if you do this right at midnight or without closing your browser inbetween the days
    const info = { quests: this.quests, date: new Date().getDate() };
    // localStorage.setItem('daily-quests', JSON.stringify(info));
    if (this.userData != null) {
      this.userData.dailyQuests = JSON.stringify(info);
      this.userService.updateUserData(this.userData);
    }
  }
}
