import { Routes } from '@angular/router';
import { DesignSystem } from './features/design-system/design-system'; 
import { HealthComponent } from './health/health';

export const routes: Routes = [
  { path: 'health', component: HealthComponent },
  { path: '', component: DesignSystem }
];