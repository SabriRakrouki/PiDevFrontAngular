import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  readonly API_URL="http://localhost:8091/travelup/api/v1/trip"
  constructor(private httpClient:HttpClient) { }
  getAllCounrties():Observable<Location[]>{
  return this.httpClient.get<Location[]>(`${this.API_URL}/countries`);
  }




  
}
