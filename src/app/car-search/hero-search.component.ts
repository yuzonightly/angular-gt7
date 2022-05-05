import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  cars$!: Observable<Car[]>;
  private searchTerms = new Subject<string>();

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.cars$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.carService.searchCars(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
