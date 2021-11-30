import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { Event } from '../Event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-past-events',
  templateUrl: './past-events.component.html',
  styleUrls: ['./past-events.component.css']
})
/** past-events component*/
export class PastEventsComponent {
  /** past-events ctor */
  constructor(private eventservice: EventService, private authorizeservice: AuthorizeService) {

  }

  today: string = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}T01:00:00`;
  pastEvents: Event[] = [];
  tempEvents: Event[] = [];
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;
  public companyName: string = "clockworks.com"
  public isAdmin: boolean = false;

  ngOnInit(): void {
    this.loadPastEvents();
    this.isAuthenticated = this.authorizeservice.isAuthenticated();
    this.checkAdmin();
  }

  loadPastEvents(): void {
    this.eventservice.getEvents().subscribe((response: any) => {
      this.tempEvents = response;

      for (var i = 0; i < this.tempEvents.length; i++) {
        if (this.tempEvents[i].date + "" < this.today) {
          this.pastEvents.push(this.tempEvents[i]);
        }
      }
    });
  }

  checkAdmin(): void {
    this.userName = this.authorizeservice.getUser().pipe(map(u => u && u.name));
    this.userName.subscribe((response: string) => {
      if (response.includes(this.companyName)) {
        this.isAdmin = true;
      }
    })
  }

  deleteEvent(eventId: number): void {
    this.eventservice.deleteEvent(eventId).subscribe((response: any) => {
      console.log(response);
    });

  }

  refreshPage(): void {
    window.location.reload();
  }
}
