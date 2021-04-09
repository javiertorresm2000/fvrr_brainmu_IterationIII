import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class CartService {
  data: string;

  constructor() {}
  setValues(data){
    this.data = data;
  }
  getValues(){
    return this.data;
  }
}
