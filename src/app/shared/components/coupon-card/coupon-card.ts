import { Component, Input } from '@angular/core';

// กำหนด Type เพื่อความปลอดภัยของข้อมูล
export type CouponTheme = 'shipping' | 'discount' | 'shop' | 'partner';
export type CouponStatus = 'available' | 'collected' | 'used' | 'expired';

@Component({
  selector: 'app-coupon-card',
  standalone: true,
  imports: [],
  templateUrl: './coupon-card.html',
  styleUrl: './coupon-card.css'
})
export class CouponCard {
  // Theme & Branding
  @Input() theme: CouponTheme = 'discount'; 
  @Input() logoUrl?: string; 
  @Input() storeName?: string; 

  // Content
  @Input() title: string = 'ส่วนลด'; 
  @Input() subtitle: string = 'ไม่มีขั้นต่ำ'; 
  
  // Tags & Flags
  @Input() tags: string[] = []; 
  @Input() isNew: boolean = false;
  @Input() quantity: number = 1;

  // Status & Expiry (รับเป็น String สำเร็จรูปจาก Backend)
  @Input() expiryText: string = 'หมดอายุเร็วๆ นี้'; 
  @Input() usagePercent?: number; 
  @Input() usageText?: string; 
  @Input() status: CouponStatus = 'available'; 
}