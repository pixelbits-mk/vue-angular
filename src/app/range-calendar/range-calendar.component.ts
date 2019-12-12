import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import dateformat from 'dateformat';
import { DateRange } from './range-calendar.model';

declare const Vue: any;
declare const VueTimepicker: any;

@Component({
  selector: 'app-range-calendar',
  templateUrl: './range-calendar.component.html',
  styleUrls: ['./range-calendar.component.scss']
})
export class RangeCalendarComponent implements OnInit {
  @Input()
  dateRange: DateRange;

  @Output()
  dateRangeChange: EventEmitter<DateRange>;

  constructor() {
    this.dateRangeChange = new EventEmitter<DateRange>();
  }

  ngOnInit() {
    const $this = this;

    Vue.customElement('vue-calendar', {
      components: { },
      props: [],
      template: `
      <div class="calendar">
        <div class="date">
          <a v-on:click="prevDay()"><i class="material-icons">keyboard_arrow_left</i></a>
          <v-date-picker mode="range" v-on:input="onChange" :columns="2" :min-date="today" v-model="dateRange" :popover="{ placement: 'bottom', visibility: 'click' }">
            <a>
              <i class="material-icons">date_range</i>&nbsp;&nbsp;
              <span v-if="isToday()">TODAY</span><span v-if="!isToday()">{{ getDisplayString() }}</span>
            </a>
          </v-date-picker>
          <a  v-on:click="nextDay()"><i class="material-icons">keyboard_arrow_right</i></a>
        </div>
      </div>
      `,
      data() {
        const today = new Date();
        return {
          dateRange: $this.dateRange,
          today: new Date(today.getFullYear(), today.getMonth(), today.getDate())
        };
      },
      methods: {
        isToday() {
          if (!this.isDateRange()) {
            return dateformat(this.today, 'yyyy/mm/dd') === dateformat(this.dateRange.start, 'yyyy/mm/dd');
          }
          return false;
        },
        isDateRange() {
          return this.dateRange && dateformat(this.dateRange.start, 'yyyy/mm/dd') !== dateformat(this.dateRange.end, 'yyyy/mm/dd');
        },
        getDisplayString() {
          if (this.isDateRange()) {
            return dateformat(this.dateRange.start, 'mmm dd, yyyy') + '-' + dateformat(this.dateRange.end, 'mmm dd, yyyy');
          }
          return dateformat(this.dateRange.start, 'mmm dd, yyyy');
        },
        nextDay() {
          if (!this.isDateRange()) {
            const date = this.dateRange.start;
            this.dateRange = {
              start: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
              end:  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            };
          }
        },
        prevDay() {
          if (!this.isToday() && !this.isDateRange()) {
            const date = this.dateRange.start;
            this.dateRange = {
              start: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
              end:  new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
            };
          }
        },
        onChange($event: DateRange) {
          if (!$event) {
            $event = this.today;
            this.date = this.today;
          }
          $this.dateRangeChange.next($event);
        }
      }
    });
  }

}
