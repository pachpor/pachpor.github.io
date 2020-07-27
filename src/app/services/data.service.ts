import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { CountryInfo, CountryTotalData, CountryDataTimeline, GlobalInfo } from '../types/types';
import { ControllerService } from './controller.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  pathUrl = environment.API_URL;
  globalData: GlobalInfo = {
    total_cases: 0 ,
    total_recovered: 0 ,
    total_deaths: 0 ,
    total_new_cases_today: 0 ,
    total_new_deaths_today: 0 ,
    total_active_cases: 0 ,
    total_serious_cases: 0 ,
  };

  constructor( private http: HttpClient, private controllerService: ControllerService) { }

  async getCountryList(): Promise<CountryInfo[]> {
    const params = new HttpParams().set('countryTotals', 'All');
    const data: any = await this.http.get(this.pathUrl,  { params }).toPromise();
    const countries: CountryInfo[] = [];
    const dataCountryItems = data.countryitems[0];
    Object.keys(dataCountryItems).map(key => {
      if(key !== 'stat') {
        const countryInfo: CountryInfo = {
          ourid: dataCountryItems[key]['ourid'],
          title: dataCountryItems[key]['title'],
          code: dataCountryItems[key]['code'],
          source: dataCountryItems[key]['source'],
        } ;
        countries.push(countryInfo);
        if(countryInfo.title === 'India') {
          this.controllerService.newCountrySelected(countryInfo);
        }
      }
    });
    return countries;
  }

  async getGlobalData(): Promise<GlobalInfo> {
    const params = new HttpParams().set('countryTotals', 'All');
    const data: any = await this.http.get(this.pathUrl,  { params }).toPromise();

    const dataCountryItems = data.countryitems[0];
    Object.keys(dataCountryItems).map(key => {
      if(key !== 'stat') {
        this.globalData.total_cases += dataCountryItems[key]['total_cases'];
        this.globalData.total_recovered += dataCountryItems[key]['total_recovered'];
        this.globalData.total_deaths += dataCountryItems[key]['total_deaths'];
        this.globalData.total_new_cases_today += dataCountryItems[key]['total_new_cases_today'];
        this.globalData.total_new_deaths_today += dataCountryItems[key]['total_new_deaths_today'];
        this.globalData.total_active_cases += dataCountryItems[key]['total_active_cases'];
        this.globalData.total_serious_cases += dataCountryItems[key]['total_serious_cases'];
      }
    });
    return this.globalData;
  }

  async getTotalCountryData( country: CountryInfo): Promise<CountryTotalData> {
    const params = new HttpParams().set('countryTotal', country.code);
    const data: any = await this.http.get(this.pathUrl,  { params }).toPromise();
    const countryTotalData: CountryTotalData = data['countrydata'][0];
    return countryTotalData;
  }

  async getCountryDataTimeline(country: CountryInfo): Promise<CountryDataTimeline[]> {
    const params = new HttpParams().set('countryTimeline', country.code);
    const data: any = await this.http.get(this.pathUrl,  { params }).toPromise();
    const timelines: CountryDataTimeline[] = [];
    const countryDataTimeline = data['timelineitems'][0];
    Object.keys(countryDataTimeline).map(key => {
      if(key !== 'stat') {
        const countryTimeline: CountryDataTimeline = {
          date: key,
          new_daily_cases: countryDataTimeline[key]['new_daily_cases'],
          new_daily_deaths: countryDataTimeline[key]['new_daily_deaths'],
          total_cases: countryDataTimeline[key]['total_cases'],
          total_recoveries: countryDataTimeline[key]['total_recoveries'],
          total_deaths: countryDataTimeline[key]['total_deaths']
        } ;
        timelines.unshift(countryTimeline);
      }
    });
    return timelines;
  }
}
