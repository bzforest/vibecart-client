import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // ข้อมูลหลัก
  @Input() imageUrl: string = 'https://placehold.co/400';
  @Input() productName: string = 'ชื่อสินค้า';
  @Input() price: number = 0;
  @Input() soldCount: string = '0';

  // ป้ายต่างๆ (ตั้งค่าเริ่มต้นเป็น false หรือไม่มีค่า)
  @Input() discountPercent?: number; // ใส่ ? คือมีหรือไม่มีก็ได้
  @Input() isFreeShipping: boolean = false;
  @Input() isRecommended: boolean = false;
  @Input() isVibeCartSure: boolean = false;
}

