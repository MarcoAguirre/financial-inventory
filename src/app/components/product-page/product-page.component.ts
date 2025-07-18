import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/prduct.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  products: Product[] = [];
  searchTerm: string = '';
  filteredProducts: Product[] = [];

  minNumberOfProducts: number = 5;
  currentPage: number = 1;
  pagedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (data: any) => {
        this.products = data.data;
        this.filteredProducts = data.data;
        this.updatePagedProducts();
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      },
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm)
    );
  }

  updatePagedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.minNumberOfProducts;
    const endIndex = startIndex + this.minNumberOfProducts;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onChangePageSize(size: number): void {
    this.minNumberOfProducts = size;
    this.currentPage = 1;
    this.updatePagedProducts();
  }
}
