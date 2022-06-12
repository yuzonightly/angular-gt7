import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CarsComponent } from './cars/cars.component';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cars = [
      { id: 11, name: 'GTR Nismo', brand: 'Nissan' },
      { id: 12, name: 'SF90 Stradale', brand: 'Ferrari' },
      { id: 12, name: 'Model S', brand: 'Tesla' },
    ];
    return cars;
  }

  genId(cars: Car[]): number {
    return cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 11;
  }
}
