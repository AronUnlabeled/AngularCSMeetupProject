import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(@Inject('BASE_URL') private baseUrl: string, private http: HttpClient) {

  }

  getEvents(): any {
    return this.http.get(this.baseUrl + 'api/Event/allEvents');
  }

  getEventById(id: number): any {
    return this.http.get(this.baseUrl + `api/Event/getEvent/${id}`);
  }

  addEvent(name: string, date: Date, location: string, description: string) : any {
    return this.http.post(this.baseUrl + 'api/Event/addEvent', {});
  }

  deleteEvent(id : number): any {
    return this.http.delete(this.baseUrl + 'api/Event/deleteEvent')
  }
}
