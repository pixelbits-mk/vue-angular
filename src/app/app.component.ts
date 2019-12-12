import { Component, OnInit } from '@angular/core';
import VueCustomElement from 'vue-custom-element';
import { DateRange } from './range-calendar/range-calendar.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app17';
  dateRange: DateRange;


  ngOnInit() {
    const date = new Date();
    this.dateRange = {
      start: new Date(),
      end: new Date()
    };
  }
}
