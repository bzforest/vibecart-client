import { Component, signal, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideShoppingCart, lucideSearch, lucideUser } from '@ng-icons/lucide';
import { NgOptimizedImage } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

export interface NavMenu {
  label: string;
  link: string;
}

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, NgOptimizedImage, TranslateModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideChevronDown, lucideShoppingCart, lucideSearch, lucideUser })],
})
export class Navbar {
  private translate = inject(TranslateService);

  cartCount = input<number>(0);
  onSearch = output<string>();
  currentLanguage = signal('English');

  constructor() {
    // กำหนดภาษาเริ่มต้น
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  setLanguage(langName: string, langCode: string) {
    this.currentLanguage.set(langName);
    this.translate.use(langCode);
  }

  // ฟังก์ชันส่งค่าการค้นหา
  handleSearch(event: any) {
    const value = event.target.value;
    this.onSearch.emit(value);
  }
}
