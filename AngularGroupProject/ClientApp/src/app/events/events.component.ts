import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { Event } from '../Event';
import { FavService } from '../fav.service';
import { Observable } from 'rxjs';



@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})




/** Events component*/
export class EventsComponent {

  @Input() MyEvent: Event = {} as Event;
  @Output() removeFromFav = new EventEmitter<string>();

    /** Events ctor */
  constructor(private eventservice: EventService, private favservice: FavService) {

  }

  DisplayEvents: Event[] = [];
  resultEvent: Event = {} as Event;
  public isAuthenticated: Observable<boolean>;

  ngOnInit(): void {
    this.UpdateEvents();
  }



  UpdateEvents(): void {
    this.eventservice.getEvents().subscribe((response: any) => {
      this.DisplayEvents = response;
      console.log(response);
    });
  }

  addEvent(form: NgForm): void {
    let newEvent: Event = {
      id: 0,
      name: form.form.value.name,
      date: form.form.value.date,
      location: form.form.value.location,
      description: form.form.value.description
    };
    console.log(newEvent);

    this.eventservice.addEvent(newEvent.name, newEvent.date, newEvent.location, newEvent.description).subscribe((response: any) => {
      this.resultEvent = response;
      console.log(response);
      this.UpdateEvents();
    });
  }

  addFav(eventId: number): void {
    
    this.favservice.addFav(eventId).subscribe((response: any) => {
     
      console.log(response);
    });

  }


  removeFromEvents(id: number) {
    let index: number = this.DisplayEvents.findIndex((E: Event) => E.id == id);
    this.DisplayEvents.splice(index, 1);
  }




}
