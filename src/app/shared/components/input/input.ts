import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'vibecart-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class VibecartInput {
  label = input<string>('');
  placeholder = input<string>('');
  helpText = input<string>('');
  error = input<string | boolean>('');
  type = input<string>('text');
  disabled = input<boolean>(false);
  
  // model() is a two-way signal (like v-model)
  value = model<string>('');

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value.set(inputElement.value);
  }

  clear() {
    this.value.set('');
  }
}
