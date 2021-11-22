import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../Event';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
/** Events component*/
export class EventsComponent {
    /** Events ctor */
  constructor(private eventservice: EventService) {

  }

  DisplayEvents: Event[] = [];
  resultEvent: Event = {} as Event;

  ngOnInit(): void {
    this.eventservice.getEvents().subscribe((response: any) => {
      this.DisplayEvents = response;
      console.log(response);
    });
  }

  addEvent(form: NgForm): void {
    let newEvent: Event = {
      Id: 0,
      Name: form.form.value.name,
      Date: form.form.value.date,
      Location: form.form.value.location,
      Description: form.form.value.description
    };

    this.eventservice.addEvent(newEvent.Name, newEvent.Date, newEvent.Location, newEvent.Description).subscribe((response: any) => {
      this.resultEvent = response;
    });
  }


}
