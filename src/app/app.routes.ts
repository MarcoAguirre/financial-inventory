import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

export const routes: Routes = [
  { path: '', component: ProductPageComponent },
  { path: 'create', component: ProductFormComponent },
];
