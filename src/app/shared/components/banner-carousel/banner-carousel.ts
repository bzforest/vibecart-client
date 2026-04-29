import { Component, signal, input, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';

@Component({
  selector: 'app-banner-carousel',
  imports: [NgOptimizedImage, NgIcon],
  templateUrl: './banner-carousel.html',
  styleUrl: './banner-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideChevronLeft, lucideChevronRight })]
})
export class BannerCarousel implements OnInit, OnDestroy {
  images = input.required<string[]>();
  autoSlideInterval = input<number>(5000);
  width = input<string>('w-200');
  height = input<string>('h-60');

  currentIndex = signal(0);
  private timer: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.stopTimer(); 
    this.timer = setInterval(() => {
      this.next();
    }, this.autoSlideInterval());
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  next() {
    const total = this.images().length;
    if (total > 0) {
      this.currentIndex.update(index => (index + 1) % total);
    }
  }

  prev() {
    const total = this.images().length;
    if (total > 0) {
      this.currentIndex.update(index => (index - 1 + total) % total);
    }
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }

  onMouseEnter() {
    this.stopTimer();
  }

  onMouseLeave() {
    this.startTimer();
  }
}
