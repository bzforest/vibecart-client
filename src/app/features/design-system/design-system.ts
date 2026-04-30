import { Component, signal } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { VibecartInput } from '../../shared/components/input/input';
import { VibecartCheckbox } from '../../shared/components/checkbox/checkbox';
import { VibecartTabs, TabOption } from '../../shared/components/tabs/tabs';
import { VibecartSteps, StepItem } from '../../shared/components/steps/steps';
import { VibecartSelect, SelectOption } from '../../shared/components/select/select';

@Component({
  selector: 'app-design-system',
  imports: [
    ProductCard,
    VibecartInput,
    VibecartCheckbox,
    VibecartTabs,
    VibecartSteps,
    VibecartSelect
  ],
  templateUrl: './design-system.html',
  styleUrl: './design-system.css',
})
export class DesignSystem {
  // Demo Data
  inputText = signal('');
  isChecked = signal(false);
  
  tabOptions: TabOption[] = [
    { label: 'หน้าแรก', value: 'home' },
    { label: 'หมวดหมู่', value: 'category' },
    { label: 'โปรโมชั่น', value: 'promo' },
    { label: 'ช่วยเหลือ', value: 'help' }
  ];
  activeTab = signal('home');

  steps: StepItem[] = [
    { title: 'รถเข็น' },
    { title: 'ที่อยู่จัดส่ง' },
    { title: 'ชำระเงิน' },
    { title: 'สำเร็จ' }
  ];
  currentStep = signal(1);

  selectOptions: SelectOption[] = [
    { label: 'ใน เสื้อผ้าแฟชั่นผู้ชาย', value: 'men-fashion' },
    { label: 'ใน อุปกรณ์ไอที', value: 'it-devices' },
    { label: 'ใน เครื่องใช้ไฟฟ้า', value: 'electronics' }
  ];
  selectedCategory = signal('men-fashion');
}
