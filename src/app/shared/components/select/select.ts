import { Component, input, model, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'vibecart-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class VibecartSelect {
  label = input<string>('');
  placeholder = input<string>('โปรดเลือก');
  options = input<SelectOption[]>([]);
  disabled = input<boolean>(false);
  
  value = model<any>(null);
  isOpen = signal(false);

  constructor(private el: ElementRef) {}

  toggle() {
    if (!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  select(option: SelectOption) {
    this.value.set(option.value);
    this.isOpen.set(false);
  }

  getSelectedLabel() {
    const selected = this.options().find(o => o.value === this.value());
    return selected ? selected.label : this.placeholder();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
