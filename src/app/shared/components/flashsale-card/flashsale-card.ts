import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flashsale-card',
  standalone: true,
  imports: [],
  templateUrl: './flashsale-card.html',
  styleUrl: './flashsale-card.css'
})
export class FlashsaleCard {
  
  // 1. ส่วนรูปภาพและป้าย
  @Input() imageUrl: string = 'https://placehold.co/200';
  @Input() isMall: boolean = false; // มีป้าย Mall สีแดงมุมซ้ายบนไหม
  @Input() discountPercent?: number; // ตัวเลขเปอร์เซ็นต์ส่วนลด (มุมขวาบน)
  @Input() promoTagUrl?: string; // รูปรถเข็น/ป้ายลดด่วน (มุมซ้ายล่างของรูป)

  // 2. ส่วนราคา
  @Input() price: number = 0; // ราคาที่ลดแล้ว
  @Input() originalPrice?: number; // (ทางเลือก) ราคาเต็ม เผื่ออยากทำขีดฆ่า

  // 3. ส่วนหลอด Progress Bar ด้านล่างสุด
  // หลอดนี้ Shopee จะมีหลายสถานะ เช่น "ขายแล้ว X", "เหลือ X ชิ้น", "ขายดี"
  @Input() soldCount?: number; // จำนวนที่ขายไปแล้ว (เพื่อเอาไปคำนวณ % หลอด)
  @Input() totalStock?: number; // จำนวนสต็อกทั้งหมด
  @Input() progressText: string = 'ขายดี'; // ข้อความบนหลอด
  
  // เราจะสร้าง Getter ไว้คำนวณ % ความกว้างของหลอดอัตโนมัติ
  get progressPercent(): number {
    if (!this.soldCount || !this.totalStock) return 0;
    const percent = Math.floor((this.soldCount / this.totalStock) * 100);
    return percent > 100 ? 100 : percent; // กันไม่ให้เกิน 100%
  }

}