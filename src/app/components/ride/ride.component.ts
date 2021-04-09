import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cars = [
    {id: '1', img: '../../../assets/img/car1.jpg', title: 'VW 2021', price: '65000'},
    {id: '2', img: '../../../assets/img/car2.png', title: 'Chevrolet 2021', price: '65000'},
    {id: '3', img: '../../../assets/img/car3.jpg', title: 'VW 2021', price: '65000'}
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
