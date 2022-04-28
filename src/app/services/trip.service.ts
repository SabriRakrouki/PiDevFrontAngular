import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  readonly API_URL="http://localhost:8091/travelup/api/v1/trip"

  constructor(private httpClient:HttpClient) { }
  getAllTrips():Observable<Trip[]>{
    
    return this.httpClient.get<Trip[]>(`${this.API_URL}/getAll`)
  }
  addTrip(trip:Trip){
    return this.httpClient.post(`${this.API_URL}/addTrip`,trip)
  }
  editTrip(trip:Trip){
    return this.httpClient.put(`${this.API_URL}/updateTrip/${trip.id}`,trip)
  }
  deleteTrip(id:any):Observable<Trip>{
    return this.httpClient.delete<Trip>(`${this.API_URL}/deleteTrip/${id}`)
  }
}
