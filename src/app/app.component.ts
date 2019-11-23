import { Component, OnInit } from '@angular/core';
import VueCustomElement from 'vue-custom-element';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app17';
  date = new Date(2021, 1, 1);
  from = {  hh: '01', mm: '00', A: 'AM' };
  to = {  hh: '09', mm: '00', A: 'AM' };

  ngOnInit() {

  }
}
