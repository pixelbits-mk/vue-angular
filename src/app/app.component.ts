import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import VCalendar from 'v-calendar';
declare const Vue: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  text = 'hello there how are you?';
  ngOnInit() {
    const text = this.text;
    const MyVueWebComp = {
      props: [],
      template: `
      <v-calendar  :attributes='attrs'></v-calendar>
      `,
      data() {
        return {
          selectedDate: null,
          mode: 'single',
          attrs: [
            {
              key: 'today',
              highlight: true,
              popover: {
                label: text,
              },
              dates: new Date()
            },
          ]
        };
      },
      methods: {
      }
    };
    Vue.customElement('vue-calendar', MyVueWebComp);
  }
}
