import { Component, OnInit, OnDestroy } from '@angular/core';
import { ControllerService } from '../services/controller.service';
import { CountryInfo, CountryTotalData, CountryDataTimeline } from '../types/types';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-count',
  templateUrl: './country-count.component.html',
  styleUrls: ['./country-count.component.css']
})
export class CountryCountComponent implements OnInit, OnDestroy {

  selectedCountry: CountryInfo;
  countryTotalData: CountryTotalData;
  timelines: CountryDataTimeline[];
  subscription: Subscription;

  constructor(
    private controllerService: ControllerService,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.subscription = this.controllerService.countrySelected.subscribe((country) => {
      if (this.selectedCountry !== country) {
        this.selectedCountry = country;
        this.updateData();
      }
    });
  }

  async updateData() {
    const data = await this.dataService.getTotalCountryData(this.selectedCountry);
    this.countryTotalData = data;
    this.timelines = await this.dataService.getCountryDataTimeline(this.selectedCountry);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
