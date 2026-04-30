import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabOption {
  label: string;
  value: string;
}

@Component({
  selector: 'vibecart-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css',
})
export class VibecartTabs {
  options = input<TabOption[]>([]);
  activeTab = model<string>('');

  selectTab(value: string) {
    this.activeTab.set(value);
  }
}
