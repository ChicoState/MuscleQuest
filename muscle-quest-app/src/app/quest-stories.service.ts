import { Injectable } from '@angular/core';
import { QuestStory } from './quest-story';
import { SloaneItemGeneratorService } from './sloane-item-generator.service';

@Injectable({
  providedIn: 'root'
})
export class QuestStoriesService {
  itemGen: SloaneItemGeneratorService;
  constructor() { 
    this.itemGen = new SloaneItemGeneratorService;
  }

  // Generates a random quest with a start, an end, and rewards.
  // Also contains a state which may be used as the developer desires
  // Random short workout is also included.
  public random_quest(rank: number): QuestStory {
    let story_number = Math.floor(Math.random() * this.starts.length);
    let exercise_number = Math.floor(Math.random() * this.workouts.length);
    let story: QuestStory = {
      start: this.starts[story_number],
      end: this.ends[story_number],
      exercise: this.workouts[exercise_number],
      state: 0,
      rank:rank,
      reward: this.itemGen.createNewItem(rank),
      resources: this.itemGen.createLootBundle(rank)};
    return story;
  }

  private readonly starts = [
    "A small village is being terrorized by a harpy that swoops down and steals their livestock. The villagers are offering a bounty to anyone who can hunt and kill the harpy.",

    "A powerful sorceress has been kidnapped by a group of harpies and taken to their lair. The only way to rescue her is to battle the harpies and defeat their queen.",

    "A group of travelers has been ambushed by a harpy while passing through a dense forest. The lone survivor is asking for help to track down and kill the harpy before it strikes again.",

    "A group of miners has discovered a vein of precious minerals, but they can't mine it because a harpy has made its nest nearby. They need someone to clear out the harpy so they can resume mining.",

    "A town is in danger of being destroyed by a flock of harpies that are nesting in nearby cliffs. The town's leaders are offering a reward to anyone who can get rid of the harpies.",

    "A powerful artifact has been stolen by a harpy and taken to its lair. The artifact is needed to stop an evil sorcerer from summoning a demon, and the player must retrieve it.",

    "A group of adventurers has been hired to escort a merchant caravan through a dangerous mountain pass. They soon find out that a harpy has been attacking travelers in the area, and they must protect the caravan and defeat the harpy.",

    "A princess has been kidnapped by a group of harpies and taken to their lair. The player must rescue the princess and defeat the harpies before they harm her.",

    "A group of farmers is being threatened by a harpy that is stealing their crops. They need someone to track down and kill the harpy to protect their livelihoods.",

    "A small village has been under attack by a group of harpies who have been stealing their livestock. The villagers need a skilled adventurer to eliminate the harpies and save their livelihood.",

    "A powerful wizard has hired you to retrieve a rare herb that grows on a mountaintop. The catch is that the herb is guarded by a group of harpies who won't let anyone near it. You'll need to defeat them to complete your mission.",

    "A local lord has tasked you with clearing out a nearby ruin that has become overrun with harpies. The lord wants to use the ruins for his own purposes, but he can't do so until the harpies have been dealt with.",

    "The people of a coastal town have been terrorized by a flock of harpies who have been swooping down and snatching up unsuspecting children. The townspeople are desperate for someone to rid them of this menace.",

    "A group of treasure hunters has stumbled upon a hidden cavern filled with valuable gems and artifacts. Unfortunately, the cavern is guarded by a powerful harpy who won't let anyone take the treasure without a fight.",

    "The queen's daughter has been kidnapped by a group of harpies and taken to their lair. The queen has tasked you with rescuing her daughter and taking out the harpies who took her.",

    "A group of merchants have been ambushed by harpies on their way to a nearby town. They've lost their valuable goods and need someone to help them retrieve them from the harpies' nest.",

    "Greetings, adventurer! I have a mission for you. Our village has been raided by a group of orcs, and we need your help to drive them back and protect our people.",

    "I have urgent news from the king! The orcs have begun to invade our lands and we need a brave warrior to push them back. Will you answer the call?",

    "You have been chosen to lead a team of fighters to infiltrate the orc stronghold and defeat their leader. Your skills and courage will be put to the test.",

    "Our scouts have reported a large orc encampment in the nearby mountains. We need you to gather a group of adventurers and launch a surprise attack before they can mount an assault on our town.",

    "The orcs have stolen an ancient artifact from our temple and are using its power to wreak havoc on our lands. We need you to retrieve the artifact and defeat their leader to put an end to their tyranny.",

    "The orcs have taken over a nearby mine and are using it to arm their army. We need you to clear them out and reclaim the mine for our people.",

    "Our caravan has been attacked by a group of orcs on our way to the city. We need you to track down their hideout and recover the stolen goods.",

    "The orcs have set up traps and barricades on the only path through the forest, blocking our supply lines. We need you to clear the path and defeat their leader to ensure our troops can get through.",

    "Greetings, adventurer! Our kingdom is under attack by an evil sorcerer who seeks to destroy us. We need you to track down and defeat him before it's too late.",

    "The local villagers have reported strange occurrences and dark magic in the nearby woods. We suspect an evil spellcaster is behind it and we need you to investigate and put an end to it.",

    "The legendary wizard tower has been taken over by an evil mage who is using its power for his own twisted purposes. We need you to infiltrate the tower and defeat the mage to restore balance to the realm.",

    "A powerful spellcaster has taken control of a nearby city and is using his magic to enslave its people. We need you fight him and liberate the city from his grasp.",

    "The ancient ruins of a forgotten civilization have been disturbed by an evil sorcerer, unleashing a horde of undead creatures. We need you to defeat the sorcerer and restore peace to the land.",

    "An evil mage has cursed our king, causing him to fall into a deep sleep. We need you to find the mage and break the curse before it's too late.",

    "The powerful magical artifact, the Staff of the Elements, has been stolen by an evil spellcaster who plans to use it to conquer the land. We need you to retrieve the staff and defeat the spellcaster before it's too late.",

    "An ancient tomb has been discovered, but an evil spellcaster has placed a curse on it, raising the dead and unleashing chaos. We need you to break the curse and defeat the spellcaster to restore peace to the land.",
  ];

  private readonly ends = [
    "You return to the village with the harpy's head in hand. The villagers swarm around you, cheering and clapping. The headman steps forward, a wide smile on his face. \"You've done it!\" he exclaims. \"Our livestock will be safe now, thanks to you.\" He hands you a generous pouch of coins, and the villagers continue to thank and congratulate you.",

    "After battling your way through the harpy's lair and defeating the queen, you emerge victorious. The sorceress runs to you, tears streaming down her face. \"Thank you,\" she says, embracing you tightly. \"I feared I would never see the light of day again.\" She hands you a small, intricately carved box. \"Take this,\" she says. \"It's a token of my gratitude. It will aid you in your future quests.\"",

    "You track the harpy to its lair and engage in a fierce battle. In the end, you emerge victorious, and the survivor thanks you for your bravery. \"I thought I was a goner,\" he says, clapping you on the back. \"You've saved my life, and I won't forget it.\" He hands you a pouch of coins as a reward and offers to help you on your future adventures if you ever need it.",

    "You venture to the mine and clear out the harpy's nest, allowing the miners to resume their work. They thank you profusely, and the foreman hands you a shiny lump of the precious mineral you helped them uncover. \"Take this,\" he says. \"It's not much, but it's the least we can do to show our appreciation.\"",

    "You climb the cliffs to the harpies' nesting grounds and engage in a fierce battle. The town's leaders watch from below, fear in their eyes. But as you slay the final harpy, they erupt into cheers and applause. The mayor approaches you, a wide smile on his face. \"You've saved our town,\" he says. \"We'll never forget your bravery.\" He hands you a pouch of coins and a valuable item as a reward.",

    "You retrieve the artifact from the harpy's lair, bringing it back to the grateful townspeople. The sorcerer thanks you, taking the artifact and examining it closely. \"This will do nicely,\" he says, a glint in his eye. \"Thank you for your service.\" He hands you a generous reward, and you can't help but feel satisfied knowing that you've stopped a great evil from being unleashed upon the world.",

    "You successfully protected the merchant caravan from the harpy attacks and safely escorted them through the mountain pass. The merchants are grateful for your help and pay you handsomely for your services.",

    "After a fierce battle, you rescue the princess and defeat the harpies. The grateful king rewards you with a chest of treasure and the undying gratitude of his kingdom.",

    "You track down the harpy and eliminate it, allowing the farmers to protect their crops and make a living. They thank you for your assistance and offer you a portion of their bountiful harvest as a reward.",

    "Thanks to your bravery and skill, the village is safe once again. The villagers are overjoyed and express their gratitude by offering you a comfortable place to rest and replenish your supplies.",

    "You defeat the harpies guarding the rare herb and successfully retrieve it for the wizard. The wizard is impressed with your prowess and offers to teach you a powerful new weapon as a reward.",

    "The harpies in the nearby ruin are no match for your skills. You clear out the area and make it safe for the local lord to use for his own purposes. The lord is grateful for your assistance and offers you a reward.",

    "You successfully eliminate the harpies terrorizing the coastal town, freeing the people from their terror. The grateful townspeople offer you a place to stay and a lifetime of free goods and services as a reward.",

    "After slaying the harpy and returning to the treasure hunters, they thank you and marvel at your bravery. As promised, they let you choose a few of the treasures you helped them uncover.",

    "As you hand the queen her daughter, you can see the relief in her eyes. She thanks you for your service and rewards you generously.",

    "The grateful merchants thank you for your help and offer you a portion of their recovered goods.",

    "You successfully drove back the orc raiders and protected the village. As a reward, the village leader presents you with a small chest filled with treasure.",

    "You led the charge against the invading orcs and pushed them back to their own lands. As a token of gratitude, the king rewards you with a pouch containing treasure.",

    "You and your team of fighters infiltrated the orc stronghold and defeated their leader. As a reward, you are presented with a small chest filled with treasure.",

    "You and your group of adventurers launched a surprise attack on the orc encampment, catching them off guard and defeating them. As a reward, the village chief gives you a pouch filled with treasure and a valuable piece of armor.",

    "You retrieved the stolen artifact from the orcs and defeated their leader, putting an end to their tyranny. As a reward, the temple priests give you a small chest containing treasure and a magical potion.",

    "You cleared out the orc infested mine and reclaimed it for the people. As a reward, the mine owner gives you a pouch containing treasure and a valuable weapon.",

    "You tracked down the orc hideout and recovered the stolen goods. As a reward, the caravan leader gives you a pouch filled with treasure and a rare piece of jewelry.",

    "You cleared the path through the forest and defeated the orc leader, ensuring the safe passage of troops and supplies. As a reward, the army general gives you a pouch filled with treasure and a powerful magical item.",

    "You tracked down the evil sorcerer and defeated him, saving the kingdom from destruction. As a reward, the king presents you with a small chest filled with treasure.",

    "You investigated the dark magic in the woods and defeated the evil spellcaster behind it. As a reward, the villagers give you a pouch containing treasure.",

    "You infiltrated the wizard tower and defeated the evil mage, preventing him from using its power for his twisted purposes. As a reward, you are presented with a small chest filled with treasure.",

    "You gathered a team of warriors and liberated the enslaved city from the evil spellcaster. As a reward, the city leaders give you a pouch filled with treasure.",

    "You defeated the evil sorcerer who unleashed the undead creatures from the ancient ruins, restoring peace to the land. As a reward, the temple priests give you a small chest containing treasure.",

    "You broke the curse on the king and defeated the evil mage responsible for it. As a reward, the king gives you a pouch containing treasure.",

    "You retrieved the stolen Staff of the Elements and defeated the evil spellcaster who sought to conquer the land. As a reward, the artifact's guardian gives you a pouch filled with treasure.",

    "You broke the curse on the ancient tomb and defeated the evil spellcaster, putting an end to the chaos. As a reward, the tomb's guardian gives you a pouch filled with treasure.",
  ]

  private workouts = [
    "10 push-ups, 10 squats, 10 sit-ups",  "20 jumping jacks, 10 lunges (each leg), 10 tricep dips",  "5 burpees, 10 mountain climbers, 15-second plank",  "10 jumping squats, 10 push-ups, 10 bicycle crunches",  "20-second sprint, 10 jumping lunges (each leg), 10 leg raises",  "10 squat jumps, 10 diamond push-ups, 10 Russian twists",  "10 box jumps, 10 push-ups, 10 V-ups",  "30 jumping jacks, 10 jump squats, 10 supermans",  "10 plank jacks, 10 jumping lunges (each leg), 10 leg curls",  "20 high knees, 10 squat thrusts, 10 mountain climbers",
    "10 jumping jacks, 10 push-ups, 10 crunches",  "10 burpees, 10 lunges (each leg), 10 reverse crunches",  "15 squat jumps, 10 push-ups, 10 leg raises",  "20-second sprint, 10 jumping jacks, 10 Russian twists",  "10 box jumps, 10 tricep dips, 10 V-ups",  "10 squat thrusts, 10 mountain climbers, 10 bicycle crunches",  "10 plank jacks, 10 jumping lunges (each leg), 10 supermans",  "10 jump squats, 10 diamond push-ups, 10 leg curls",  "20 high knees, 10 push-ups, 10 sit-ups",  "5 burpees, 10 squat jumps, 10 tricep dips"
  ]
}
