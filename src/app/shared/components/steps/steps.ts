import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StepItem {
  title: string;
  description?: string;
}

@Component({
  selector: 'vibecart-steps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './steps.html',
  styleUrl: './steps.css',
})
export class VibecartSteps {
  steps = input<StepItem[]>([]);
  currentStep = input<number>(0); // 0-indexed
}
