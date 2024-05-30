import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('productDetails') model: ElementRef | undefined;
  productObj: ProductDetails = new ProductDetails();
  totalCost$: Observable<number>;
  totalQuantity$: Observable<number>;

  cartItems: { product: any, quantity: number }[] = [];
  cartVisible$: Observable<boolean>;

  constructor(public cartService: CartService) {
    this.cartVisible$ = this.cartService.cartVisible$;
    this.totalCost$ = this.cartService.totalCost$;
    this.totalQuantity$ = this.cartService.totalQuantity$;
  }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  removeProduct(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }
}

export class ProductDetails {
  name: string;
  description: string;
  price: string;

  constructor() {
    this.name = '';
    this.description = '';
    this.price = '';
  }
}
