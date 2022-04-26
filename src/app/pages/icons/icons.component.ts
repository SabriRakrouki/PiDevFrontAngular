import { Component, OnInit } from "@angular/core";
import { Trip } from "src/app/model/trip";
import { TripService } from "src/app/services/trip.service";
@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {
  listTrip!:Trip[];
  from:boolean=false;
  trip!:Trip;
  closeResult!:string;
    constructor(private tripservice:TripService) { }
  
    ngOnInit(): void {
      this.trip={
        id:null,
        arrivalDate:null,
        attribution:null,
        compteur:null,
        departDate:null,
        description:null,
        employee:null,
        entreprise:null,
        note:null,
        programs:null,
        rating:null,
        totalattribution:null,
        tripLocation:null
      }
  this.getAllTrips()  
    }
  public getAllTrips(){
    this.tripservice.getAllTrips().subscribe(
      (data:Trip[])=>{this.listTrip=data
      console.log(this.listTrip)}
      );   
  }
  addTrip(trip:any){
    this.tripservice.addTrip(trip).subscribe(()=>{
      this.getAllTrips();
      this.from=false;
    });
  
  }
  editTrip(trip:Trip){
    this.tripservice.editTrip(trip).subscribe(()=>{
      this.getAllTrips();
    });
  }
  deleteTrip(trip:Trip){
  this.tripservice.deleteTrip(trip.id).subscribe((res:any)=>{
    console.log(res)
    this.getAllTrips();
  });
   
  }



}
