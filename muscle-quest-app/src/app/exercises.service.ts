import { Injectable } from '@angular/core';
import { Exercise, ExerciseInfo } from './exercise';

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {

  constructor() { }

  private right_rank(rank: number) {
    return function(element: ExerciseInfo) {
      return (element.difficulty >= rank && element.difficulty < (rank+1)*2); 
    }
  }

  private generate_single_exercise(rank: number): ExerciseInfo {
    let possible_exercises: ExerciseInfo[] = this.exercises.filter(this.right_rank(rank));
    let exercise_number = Math.floor(Math.random() * possible_exercises.length);
    return this.exercises[exercise_number];
  }

  public generate_exercise_array(rank: number, count: number): Exercise {
    let exercises: Array<string> = [];
    let counts: Array<number> = [];
    let current_count: Array<number> = [];

    for (let i = 0; i < count; i++) {
      let exercise: ExerciseInfo = this.generate_single_exercise(rank);
      // Add a bit of randomness to the reps
      let modifier: number = Math.floor(Math.random() * 4) - 1;
      exercises.push(exercise.name);
      counts.push(exercise.standard_reps+modifier);
      current_count.push(0);
    }

    let result : Exercise = {
      exercises: exercises,
      counts: counts,
      current_count: current_count,
    }
    return result;
  }

  private exercises: ExerciseInfo[] = [
    {
      name: "Push-ups",
      difficulty: 2,
      standard_reps: 12,
      muscle_group: "Chest, triceps, shoulders"
    },
    {
      name: "Squats",
      difficulty: 4,
      standard_reps: 10,
      muscle_group: "Quadriceps, hamstrings, glutes"
    },
    {
      name: "Lunges",
      difficulty: 3,
      standard_reps: 12,
      muscle_group: "Quadriceps, hamstrings, glutes"
    },
    {
      name: "Deadlifts",
      difficulty: 7,
      standard_reps: 5,
      muscle_group: "Back, glutes, hamstrings"
    },
    {
      name: "Bicep Curls",
      difficulty: 1,
      standard_reps: 15,
      muscle_group: "Biceps"
    },
    {
      name: "Burpees",
      difficulty: 5,
      standard_reps: 10,
      muscle_group: "Full-body"
    },
    {
      name: "Plank",
      difficulty: 2,
      standard_reps: 30,
      muscle_group: "Core"
    }, {
      name: "Pull-ups",
      difficulty: 8,
      standard_reps: 5,
      muscle_group: "Back, biceps"
    },
    {
      name: "Dumbbell bench press",
      difficulty: 5,
      standard_reps: 10,
      muscle_group: "Chest, triceps, shoulders"
    },
    {
      name: "Dumbbell shoulder press",
      difficulty: 4,
      standard_reps: 12,
      muscle_group: "Shoulders"
    },
    {
      name: "Dumbbell bicep curls",
      difficulty: 2,
      standard_reps: 15,
      muscle_group: "Biceps"
    },
    {
      name: "Tricep dips",
      difficulty: 3,
      standard_reps: 12,
      muscle_group: "Triceps"
    },
    {
      name: "Plank with leg lifts",
      difficulty: 4,
      standard_reps: 12,
      muscle_group: "Core, glutes"
    },
    {
      name: "Russian twists",
      difficulty: 2,
      standard_reps: 20,
      muscle_group: "Core"
    },
    {
      name: "Jumping jacks",
      difficulty: 1,
      standard_reps: 20,
      muscle_group: "Full-body"
    },
    {
      name: "High knees",
      difficulty: 2,
      standard_reps: 20,
      muscle_group: "Legs, core"
    },
    {
      name: "Mountain climbers",
      difficulty: 3,
      standard_reps: 12,
      muscle_group: "Full-body"
    },
    {
      name: "Dead hang",
      difficulty: 1,
      standard_reps: 30,
      muscle_group: "Forearms, grip strength"
    },
    {
      name: "Hammer curls",
      difficulty: 3,
      standard_reps: 12,
      muscle_group: "Biceps"
    },
    {
      name: "Bent over rows",
      difficulty: 6,
      standard_reps: 8,
      muscle_group: "Back, biceps"
    },
    {
      name: "Leg press",
      difficulty: 4,
      standard_reps: 12,
      muscle_group: "Quadriceps, hamstrings, glutes"
    },
    {
      name: "Calf raises",
      difficulty: 2,
      standard_reps: 20,
      muscle_group: "Calves"
    },
    {
      name: "Sit-ups",
      difficulty: 2,
      standard_reps: 15,
      muscle_group: "Core"
    },
    {
      name: "Reverse crunches",
      difficulty: 3,
      standard_reps: 12,
      muscle_group: "Lower abs"
    },
    {
      name: "Hanging leg raises",
      difficulty: 6,
      standard_reps: 8,
      muscle_group: "Core, hip flexors"
    },
    {
      name: "Burpee with push-up",
      difficulty: 7,
      standard_reps: 8,
      muscle_group: "Full-body"
    },
  ];
}
