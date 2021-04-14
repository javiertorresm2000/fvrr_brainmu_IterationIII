import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NavigationExtras, Router } from "@angular/router";
import { CartService } from '../../services/cart.service';
import { MapComponent } from '../map/map.component';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent{
  public cart1: Array<any> = [];
  public cart2: Array<any> = [];
  display = 'none';
  border_right = '1px solid #bbb';
  border_left = '1px solid #bbb'; 
  buttons = 'flex';
  public options: any;
  public cartOrder: any;

  ride_green = false;
  display_table = 'none';
  service_selected = 'cart1';

  
  constructor(private router: Router, private _data: CartService) {
    this.cartOrder = {
      source: '',
      destination_address: '',
      birthday: '',
      origin: {
        lat: 0,
        lng: 0
      },
      destination: {
        lat: 0,
        lng: 0
      }
    }

    this.options = {
      title1: '',
      title2: '',
      img1: '',
      img2: '',
      price1: '',
      price2: ''
    }
  }
  @ViewChild("originPlaces") originPlaces: GooglePlaceDirective;
  public handleOriginChange(address: Address) {
    this.cartOrder.source     = address.formatted_address;
    this.cartOrder.origin.lat = address.geometry.location.lat();
    this.cartOrder.origin.lng = address.geometry.location.lng();
  }

  public handleDestinationChange(address: Address) {
    this.cartOrder.destination_address     = address.formatted_address;
    this.cartOrder.destination.lat = address.geometry.location.lat();
    this.cartOrder.destination.lng = address.geometry.location.lng();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(this.cart1);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item: any = event.previousContainer.data[event.previousIndex];
      let copy: any = JSON.parse(JSON.stringify(item));
      let element: any = {};

      if(this.cart1.length === 0){
        for (let attr in copy) {
          element[attr] = copy[attr];
        }
        element['quantity'] = 1;
        element['cart'] = 'cart1';
        this.cart1.push(element);
      } else if (this.cart1.length === 1){
        if(this.ride_green){
          if (this.cart2.length === 0){
            if(this.cart1[0].type === copy.type){
              for (let attr in copy) {
                element[attr] = copy[attr];
              }
              element['quantity'] = 1;
              element['cart'] = 'cart2';
              this.cart2.push(element);
            }
          }
        }
      }
    }
  }

  quantityChanged(e, id, cart) {
    if(cart === 'cart1'){
      this.cart1[0].quantity = parseInt(e.target.value);
    }else{
      this.cart2[0].quantity = parseInt(e.target.value);
    }
  }

  deleteItem(id, cart) {
    if(cart === 'cart1'){
      for(let i = 0; i < this.cart1.length; i++){
        if(this.cart1[i].id === id){
          this.cart1.splice(i, 1);
          break;
        }
      }
    }else{
      for(let i = 0; i < this.cart2.length; i++){
        if(this.cart2[i].id === id){
          this.cart2.splice(i, 1);
          break;
        }
      }
    }
  }

  resetCart() {
    this.cart1 = [];
    this.cart2 = [];
  }

  order() {
    this.display = 'flex';
    this.options.title1 = this.cart1[0].title;
    this.options.img1 = this.cart1[0].img;
    this.options.price1 = this.cart1[0].price;
    if(this.ride_green){
      this.options.title2 = this.cart2[0].title;
      this.options.img2 = this.cart2[0].img;
      this.options.price2 = this.cart2[0].price;
    }
    

    
    this.cleanCartOrder();
  }

  closeModal() {
    this.display = 'none';
  }

  changeService(e){
    this.service_selected = e.target.value;
    console.log(this.service_selected);
  }

  buy() {
    this.cartOrder['items'] = []
    if(this.service_selected === 'cart1'){
      for(let i= 0; i < this.cart1.length; i++){
        this.cartOrder['items'].push(this.cart1[i]);
      }
    }else{
      for(let i = 0; i < this.cart2.length; i++){
        this.cartOrder['items'].push(this.cart2[i]);
      }
    }    
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
    
    // this.options.title1 = '';
    // this.options.img1 = '';
    // this.options.price1 = '';

    // this.options.title2 = '';
    // this.options.img2 = '';
    // this.options.price2 = '';
  }
}
