import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/model/trip';
import { TripService } from 'src/app/services/trip.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  listTrip!:Trip[];
  from:boolean=false;
  trip!:Trip;
  closeResult!:string;
  modalOptions:NgbModalOptions;
    constructor(private tripservice:TripService, private modalService: NgbModal) {  this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop',
      size:'lg'
      
    }}
  
    ngOnInit(): void {
      this.trip={
        id:null,
        arrivalDate:null,
        attribution:null,
        compteur:0,
        departDate:null,
        description:null,
        employee:null,
        entreprise:null,
        note:0,
        programs:null,
        rating:0,
        totalattribution:0,
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
  addTrip(trip:Trip){
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
  open(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

