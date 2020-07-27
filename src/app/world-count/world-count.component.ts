import { Component, OnInit } from '@angular/core';
import { GlobalInfo } from '../types/types';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-world-count',
  templateUrl: './world-count.component.html',
  styleUrls: ['./world-count.component.css']
})
export class WorldCountComponent implements OnInit {

  globalData: GlobalInfo ;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalData()
    .then((data) => {
      this.globalData = data;
    });
  }
}
