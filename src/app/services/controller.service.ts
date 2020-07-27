import { Injectable } from '@angular/core';
import { CountryInfo } from '../types/types';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  countrySelected = new Subject<CountryInfo>();

  constructor() { }

  newCountrySelected(country: CountryInfo) {
    this.countrySelected.next(country);
  }

}
