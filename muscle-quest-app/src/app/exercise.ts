export interface Exercise {
    exercises: Array<string>;
    counts: Array<number>;
    current_count: Array<number>;
}

export interface ExerciseInfo {
    name: string;
    difficulty: number;
    standard_reps: number;
    muscle_group: string;
}
