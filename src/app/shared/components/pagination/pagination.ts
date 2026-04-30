import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [NgIcon, FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideChevronLeft, lucideChevronRight })]
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  isJumping = signal(false);
  jumpValue = signal<number | null>(null);

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    
    if (current > 4) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 3) pages.push('...');
    
    pages.push(total);
    return pages;
  });

  onPageClick(page: number | string) {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
      this.isJumping.set(false);
      this.scrollToTop();
    } else {
      this.isJumping.set(true);
      this.jumpValue.set(this.currentPage());
    }
  }

  onJumpSubmit() {
    const value = this.jumpValue();
    if (value && value >= 1 && value <= this.totalPages()) {
      this.pageChange.emit(value);
      this.isJumping.set(false);
      this.scrollToTop();
    }
  }

  next() {
    if (this.currentPage() < this.totalPages()) {
      this.pageChange.emit(this.currentPage() + 1);
      this.scrollToTop();
    }
  }

  prev() {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
      this.scrollToTop();
    }
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
