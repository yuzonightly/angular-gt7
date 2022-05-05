import { Injectable } from '@angular/core';
import { Car } from './car';
import { CARS } from './mock-cars';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root',
})
export class CarService {

  constructor(private messageService: MessageService) {}

  getCar(id: number): Observable<Car> {
    const car = CARS.find(c => c.id === id);
    this.messageService.add('CarService fetched car id=$(id)');
    return of(car);
  }
  
  getCars(): Observable<Car[]> {
    const cars = of(CARS);
    this.messageService.add('CarService: fetched cars');
    return cars;
  }
}
