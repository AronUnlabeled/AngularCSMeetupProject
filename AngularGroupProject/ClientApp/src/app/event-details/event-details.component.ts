import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../Event';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
/** event-details component*/
export class EventDetailsComponent {
    /** event-details ctor */
  constructor(private eventservice: EventService, private router: ActivatedRoute) {

  }

  resultEvent: Event = {} as Event;

  //@Input() event: Event = {} as Event;
  //@Output() removeFromEvent = new EventEmitter<Number>();

  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    let ID: number = Number(routeParams.get("id"));
    this.eventservice.getEventById(ID).subscribe((response: any) => {
      this.resultEvent = response;
      //let indexNum: number = this.resultEvent.date.indexOf("T");
      //this.resultEvent.date = this.resultEvent.date.substring(0, indexNum);
      console.log(response);
    });
    
  }

  deleteEvent(eventId: number): void {
    //console.log(this.event.id);
    //this.eventservice.deleteEvent(this.event.id).subscribe((response: any) => {
    //  console.log(response)
    //});
    //this.removeFromEvent.emit(this.event.id);

    this.eventservice.deleteEvent(eventId).subscribe((response: any) => {
      console.log(response);
    });
     
  };

  replaceDetails(): void {

    const app = document.getElementById("details");
    app.innerHTML = "This event has been deleted";

  }
}
