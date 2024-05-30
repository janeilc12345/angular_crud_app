import { Component } from '@angular/core';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductDetailsComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Product 1', description: 'This is a product description.', price: 20 },
    { id: 2, name: 'Product 2', description: 'This is a product description.', price: 20 },
    { id: 3, name: 'Product 3', description: 'This is a product description.', price: 20 },
    { id: 4, name: 'Product 4', description: 'This is a product description.', price: 20 },
    { id: 5, name: 'Product 5', description: 'This is a product description.', price: 20 },
    // Add more products as needed
  ];

  constructor(private cartService: CartService) {}

  onAddToCart(product: any) {
    this.cartService.addToCart(product);
    console.log(this.cartService.getCartItems());
  }

  toggleCart() {
    this.cartService.toggleCartVisibility();
  }
}