import { Component, OnInit } from '@angular/core';
import { DataService} from '../services/data.service';
import { CountryInfo } from '../types/types';
import { ControllerService } from '../services/controller.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: CountryInfo[] = [];
  userFilter: any = { title: '' };
  constructor(
    private dataService: DataService,
    private controllerService: ControllerService
    ) { }

  ngOnInit(): void {
    this.dataService.getCountryList()
    .then((data) => {
      this.countries = data;
    })
    .catch( e => {
      alert('Sorry, Data provider is down! Please try later.');
    });
  }

  onCountrySelected(country: CountryInfo) {
    this.controllerService.newCountrySelected(country);
    this.userFilter = { title: '' };
  }
}
