import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.html',
  styleUrl: './star-button.css',
})
export class StarButton {
  disabled = input<boolean>();
  selected = input<boolean>();
  onButtonClick = output<null>();

  onClick() {
    this.onButtonClick.emit(null);
  }

}