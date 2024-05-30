import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { product: any, quantity: number }[] = [];
  private cartSubject = new BehaviorSubject<{ product: any, quantity: number }[]>(this.cart);
  private cartVisibleSubject = new BehaviorSubject<boolean>(false);
  private totalCostSubject = new BehaviorSubject<number>(0);
  private totalQuantitySubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartSubject.asObservable();
  cartVisible$ = this.cartVisibleSubject.asObservable();
  totalCost$ = this.totalCostSubject.asObservable();
  totalQuantity$ = this.totalQuantitySubject.asObservable();

  toggleCart() {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
  }

  addToCart(product: any) {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.cartSubject.next(this.cart);
    this.updateTotalCost();
    this.updateTotalQuantity();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.cartSubject.next(this.cart);
    this.updateTotalCost();
    this.updateTotalQuantity();
  }

  increaseQuantity(productId: number) {
    const cartItem = this.cart.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity++;
      this.cartSubject.next(this.cart);
      this.updateTotalCost();
      this.updateTotalQuantity();
    }
  }

  decreaseQuantity(productId: number) {
    const cartItem = this.cart.find(item => item.product.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else if (cartItem && cartItem.quantity === 1) {
      this.removeFromCart(productId);
    }
    this.cartSubject.next(this.cart);
    this.updateTotalCost();
    this.updateTotalQuantity();
  }

  private updateTotalCost() {
    const totalCost = this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.totalCostSubject.next(totalCost);
  }

  private updateTotalQuantity() {
    const totalQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.totalQuantitySubject.next(totalQuantity);
  }

  getCartItems() {
    return this.cart;
  }

  toggleCartVisibility() {
    this.cartVisibleSubject.next(!this.cartVisibleSubject.value);
  }
}
