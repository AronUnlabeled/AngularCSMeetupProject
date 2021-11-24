import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../Event';
import { ActivatedRoute } from '@angular/router';
import { FavService } from '../fav.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
/** event-details component*/
export class EventDetailsComponent {
  /** event-details ctor */
  constructor(private eventservice: EventService, private favservice: FavService, private router: ActivatedRoute) {

  }

  resultEvent: Event = {} as Event;

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
    this.eventservice.deleteEvent(eventId).subscribe((response: any) => {
      console.log(response);
    });
     
  };

  addFav(eventId: number): void {

    this.favservice.addFav(eventId).subscribe((response: any) => {

      console.log(response);
    });

  }

  replaceDetails(): void {

    const app = document.getElementById("details");
    app.innerHTML = "This event has been deleted";

  }
}
