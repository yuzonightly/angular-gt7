import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Car } from './car';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private carsUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl).pipe(
      tap((_) => this.log('fetched cars')),
      catchError(this.handleError<Car[]>('getCars', []))
    );
  }

  getCarNo404<Data>(id: number): Observable<Car> {
    const url = `${this.carsUrl}/?id=${id}`;
    return this.http.get<Car[]>(url).pipe(
      map((cars) => cars[0]),
      tap((c) => {
        const outcome = c ? 'fetched' : 'did not find';
        this.log(`${outcome} car id=${id}`);
      }),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.get<Car>(url).pipe(
      tap((_) => this.log(`fetched car id=${id}`)),
      catchError(this.handleError<Car>(`getCar id=${id}`))
    );
  }

  searchCars(term: string): Observable<Car[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Car[]>(`${this.carsUrl}/?name=${term}`)
      .pipe(
        tap(
          (x) =>
            x.length
              ? this.log(`found cars matching "${term}"`)
              : this.log(`no cars matching "${term}"`),
          catchError(this.handleError<Car[]>(`searchCars`, []))
        )
      );
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, car, this.httpOptions).pipe(
      tap((newCar: Car) => this.log(`added car w/ id ${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }

  deleteCar(id: number): Observable<Car> {
    const url = `${this.carsUrl}/${id}`;
    return this.http.delete<Car>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted car id=${id}`)),
      catchError(this.handleError<Car>('deletedCar'))
    );
  }

  updateCar(car: Car): Observable<any> {
    return this.http.put(this.carsUrl, car, this.httpOptions).pipe(
      tap((_) => this.log(`updated car id=${car.id}`)),
      catchError(this.handleError<any>('updateCar'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`CarService ${message}`);
  }
}
