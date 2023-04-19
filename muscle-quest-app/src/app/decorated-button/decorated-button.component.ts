import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-decorated-button',
  templateUrl: './decorated-button.component.html',
  styleUrls: ['./decorated-button.component.scss'],
})
export class DecoratedButtonComponent {
  @Input() title!: String;
  @Input() href!: String;
}
