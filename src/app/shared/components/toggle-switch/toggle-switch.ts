import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.html',
  styleUrl: './toggle-switch.css'
})
export class ToggleSwitch {
  // สถานะเปิด/ปิด (ค่าเริ่มต้นคือปิด)
  @Input() checked: boolean = false; 

  // (ทางเลือก) ขนาดของสวิตช์ เผื่ออยากได้ใหญ่หรือเล็ก
  @Input() size: 'sm' | 'md' | 'lg' = 'md'; 

  // (ทางเลือก) ข้อความกำกับสวิตช์
  @Input() label?: string; 

  // ส่ง Event ออกไปเวลาผู้ใช้กดสวิตช์
  @Output() checkedChange = new EventEmitter<boolean>();

  // ฟังก์ชันสลับสถานะเมื่อคลิก
  toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked); // แจ้งแม่ว่าเปลี่ยนสถานะแล้ว
  }
}