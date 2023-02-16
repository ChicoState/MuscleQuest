import { Component } from '@angular/core';
import { StartScreenService } from './start-screen.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  characterIMG;
  let service = new StartScreenService();
  this.characterIMG = service.getCharacterIMG();
}
