import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vibecart-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class VibecartCheckbox {
  label = input<string>('');
  disabled = input<boolean>(false);
  
  checked = model<boolean>(false);

  toggle() {
    if (!this.disabled()) {
      this.checked.set(!this.checked());
    }
  }
}
