import { Component } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-design-system',
  // เวลาเพิ่มชื่อใน imports ให้เว้นบรรทัดใหม่ทุกครั้งและใส่คอมม่า (,) ต่อท้ายเสมอ จะช่วยให้ Git รวมโค้ดได้ง่ายขึ้นครับ
  imports: [
    ProductCard
  ],
  templateUrl: './design-system.html',
  styleUrl: './design-system.css',
})
export class DesignSystem {}
