import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-card',
  standalone: true,
  imports: [],
  templateUrl: './categories-card.html',
  styleUrl: './categories-card.css'
})
export class CategoriesCard {
  @Input() imageUrl: string = 'https://placehold.co/100/png';
  @Input() categoryName: string = 'ชื่อหมวดหมู่';
}