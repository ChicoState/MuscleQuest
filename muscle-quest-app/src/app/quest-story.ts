import { ItemState } from 'src/lib/user';

export interface QuestStory {
    start: string;
    end: string;
    state: number;
    exercise: string;
    reward: ItemState;
    resources: Array<number>;
    rank: number;
}
