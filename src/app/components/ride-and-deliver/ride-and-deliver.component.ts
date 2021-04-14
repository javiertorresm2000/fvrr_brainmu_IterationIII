import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-ride-and-deliver',
  templateUrl: './ride-and-deliver.component.html',
  styleUrls: ['./ride-and-deliver.component.scss']
})
export class RideAndDeliverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  products = [
    {id: 'p1',type: 'product', img: '/assets/img/product1.jpg', title: 'Roses', price: '25'},
    {id: 'p2',type: 'product', img: '/assets/img/product2.jpg', title: 'Gerveras', price: '23'},
    {id: 'p3',type: 'product', img: '/assets/img/product3.jpg', title: 'Lavanda', price: '21'}
  ];


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
