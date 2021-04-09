import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from "@angular/router";
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService]
})
export class CartComponent {
  cart: Array<any> = [];
  display = 'none';

  public cartOrder: any;

  constructor(private router: Router, private _cartService:CartService) {
    this.cartOrder = {
      source: '',
      destination_address: '',
      birthday: '',
      items: []
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

      for(let i = 0; i < this.cart.length; i++){
        if(this.cart[i].id === copy.id){
          indexItem = i;
          itemAdded = true;
          break;
        }
      }

      if(!itemAdded){
        for (let attr in copy) {
          element[attr] = copy[attr];
        }
        element['quantity'] = 1;
        this.cart.push(element);
        console.log(this.cart)
      } else {
        this.cart[indexItem].quantity = parseInt(this.cart[indexItem].quantity) + 1;
      }
    }
  }

  quantityChanged(e,i){
    this.cart[i].quantity = parseInt(e.target.value)
    console.log(this.cart);
  }

  deleteItem(i){
    this.cart.splice(i, 1);
  }

  resetCart(){
    this.cart = [];
  }

  order(){
    this.display='block';
    this.cleanCartOrder();
  }

  closeModal(){
    this.display='none';
  }

  buy(){
    //this._cartService.setValues(this.cartOrder);
    this._cartService.data = "Algooo";
    this.resetCart();
    this.closeModal();
    this.router.navigate(['/map']);
  }

  cleanCartOrder(){
    this.cartOrder.source = '';
    this.cartOrder.destination_address = '';
    this.cartOrder.birthday = '';
    this.cartOrder.items = [];
  }
}
