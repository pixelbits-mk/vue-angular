import { Component, OnInit, Input } from '@angular/core';
import dateformat from 'dateformat';

declare const Vue: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    Vue.customElement('vue-calendar', {
      props: [],
      template: `
      <div class="calendar">
        <a v-on:click="prevDay()"><i class="material-icons">keyboard_arrow_left</i></a>
        <v-date-picker :min-date="today" v-model="date" :popover="{ placement: 'bottom', visibility: 'click' }">
          <a>
            <i class="material-icons">date_range</i>&nbsp;&nbsp;
            <span v-if="isToday()">TODAY</span><span v-if="!isToday()">{{ getDisplayString() }}</span>
          </a>
        </v-date-picker>
        <a  v-on:click="nextDay()"><i class="material-icons">keyboard_arrow_right</i></a>
      </div>
      `,
      data() {
        return {
          date: new Date(),
          today: new Date()
        };
      },
      methods: {
        isToday() {
          return dateformat(this.today, 'yyyy/mm/dd') === dateformat(this.date, 'yyyy/mm/dd');
        },
        getDisplayString() {
          return dateformat(this.date, 'mmm dd, yyyy');
        },
        nextDay() {
          this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1);
        },
        prevDay() {
          if (!this.isToday()) {
            this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - 1);
          }
        }
      }
    });
  }

}
