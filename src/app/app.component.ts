import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import VCalendar from 'v-calendar';
declare const Vue: any;
declare const Vuetify: any;

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
      <div>
      <v-app id="inspire">
      <v-row>
        <v-col>
        <table>
        <tr><td>
        <v-calendar  :attributes='attrs'></v-calendar>
        </td></tr>
        <tr>
          <td>
          <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>

          </td>
          <td>
          <v-dialog
          ref="dialog"
          v-model="modal2"
          :return-value.sync="time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="time"
              label="Picker in dialog"
              prepend-icon="access_time"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal2"
            v-model="time"
            full-width
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

    
          </td>
        </tr>
      </table>

        </v-col>
      </v-row>
    </v-app>
      
    </div>
      `,
      vuetify: new Vuetify(),
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
          ],
          picker: null,
          time: null,
          menu2: false,
          modal2: false,
        };
      },
      methods: {
      }
    };
    Vue.customElement('vue-calendar', MyVueWebComp);
  }
}
