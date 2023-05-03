import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  ngOnInit(): void {
    this.playThemeSong();
  }

  playThemeSong() {
    const lastPlayedDate = localStorage.getItem('lastPlayedDate');
    const today = new Date().toLocaleDateString();
    if (lastPlayedDate != today) {
      // Play the sound
      const audio = new Audio('../../assets/sloane/sounds/muscle-quest.wav');
      audio.play();
      // Store today's date as the last played date
      localStorage.setItem('lastPlayedDate', today);
    }
  }
}
