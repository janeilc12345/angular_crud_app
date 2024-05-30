import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, ProductDetailsComponent, CartComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-crud-app';

  constructor(public cartService: CartService) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const cartContainer = document.querySelector('.cart-container');
    const cartButton = document.querySelector('.cart-button');

    if (!cartContainer || !cartButton) {
      return;
    }

    // Check if the click target is outside the cart container and not the cart button
    if (!cartContainer.contains(event.target as Node) && event.target !== cartButton) {
      this.cartService.toggleCart();
    }
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
