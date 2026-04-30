import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

export type ButtonType = 'primary' | 'secondary' | 'destructive' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  text = input<string>('Button');
  type = input<ButtonType>('primary');
  size = input<ButtonSize>('md');
  isDisabled = input<boolean>(false);
  isLoading = input<boolean>(false);

  buttonClasses = computed(() => {
    const baseClasses = 'relative flex items-center justify-center transition-all duration-200';
    
    const typeClasses = {
      primary: 'bg-brand-primary text-white enabled:hover:bg-brand-primary/90',
      secondary: 'bg-brand-secondary text-white enabled:hover:bg-brand-secondary/90',
      destructive: 'bg-brand-red text-white enabled:hover:bg-brand-red/90',
      ghost: 'bg-transparent text-gray-600 underline enabled:hover:bg-gray-100',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 body-3 rounded',
      md: 'px-6 py-2.5 body-2 rounded-md',
      lg: 'px-10 py-4 body-1 rounded-lg',
    };

    const stateClasses = this.isDisabled() || this.isLoading() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95';

    return `${baseClasses} ${typeClasses[this.type()]} ${sizeClasses[this.size()]} ${stateClasses}`;
  });
}
