import { ItemState } from 'src/lib/user';
import { Exercise } from './exercise';

export interface QuestStory {
    start: string;
    end: string;
    state: number;
    exercise: Exercise;
    reward: ItemState;
    resources: Array<number>;
    rank: number;
}
