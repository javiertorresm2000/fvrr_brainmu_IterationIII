import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NavigationExtras, Router } from "@angular/router";
import { CartService } from '../../services/cart.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent{
  cart: Array<any> = [];
  display = 'none';
  buttons = 'flex';

  public cartOrder: any;


  constructor(private router: Router, private _data: CartService) {
    this.cartOrder = {
      source: '',
      destination_address: '',
      birthday: ''
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item: any = event.previousContainer.data[event.previousIndex];
      let copy: any = JSON.parse(JSON.stringify(item));
      let itemAdded = false;
      let indexItem = undefined;
      let element: any = {};

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === copy.id) {
          indexItem = i;
          itemAdded = true;
          break;
        }
      }

      if (!itemAdded) {
        for (let attr in copy) {
          element[attr] = copy[attr];
        }
        element['quantity'] = 1;
        this.cart.push(element);
      } else {
        this.cart[indexItem].quantity = parseInt(this.cart[indexItem].quantity) + 1;
      }
    }
  }

  quantityChanged(e, i) {
    this.cart[i].quantity = parseInt(e.target.value)
  }

  deleteItem(i) {
    this.cart.splice(i, 1);
  }

  resetCart() {
    this.cart = [];
  }

  order() {
    this.display = 'flex';
    this.cleanCartOrder();
  }

  closeModal() {
    this.display = 'none';
  }

  buy() {
    //this._data.setValues(this.cartOrder);
    this.cartOrder['items'] = this.cart;
    this.resetCart();
    this.closeModal();
    this.buttons = 'none';

    this._data.data = this.cartOrder;
    this.router.navigate(['map']);
  }

  cleanCartOrder() {
    this.cartOrder.source = '';
    this.cartOrder.destination_address = '';
    this.cartOrder.birthday = '';
    this.cartOrder.items = [];
  }
}
