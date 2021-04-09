import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
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
    console.log(this.cart);
    this.cart = [];
    console.log(this.cart);
  }
}
