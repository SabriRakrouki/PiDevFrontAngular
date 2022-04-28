import { Component, OnInit, ViewChild } from '@angular/core';
import { Trip } from 'src/app/model/trip';
import { TripService } from 'src/app/services/trip.service';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {
 
  listTrip!:Trip[];
  ListLocation:Location[];
  from:boolean=false;
  trip!:Trip;
  //pagination
  trips: any;
  page : number =1;
  count: number =0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  closeResult!:string;
  modalOptions:NgbModalOptions;
  //pagination
  //recherche
  search:string;
    constructor(private tripservice:TripService, private modalService: NgbModal,private locationservice:LocationService) {  this.modalOptions = {
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
  this.getAllTrips();
  this.locationservice.getAllCounrties().subscribe((res)=>this.ListLocation.push());
  
    }
  public getAllTrips(){
    this.tripservice.getAllTrips().subscribe(
      ((response)=>{
        this.trips = response;
        console.log(this.trips);
      })
      );   
  }
  addTrip(addForm:NgForm){
    this.tripservice.addTrip(addForm.value).subscribe(()=>{
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
  //pagination
  onTableDataChange(event: any){
    this.page = event;
    this.getAllTrips();
  }
  onTableSizeChange(event: any):void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllTrips();
  }
  //recherche
  Search(){
    if(this.search !=""){
    this.trips = this.trips.filter(res=>{
      return res.description.toLocaleLowerCase().
      match(this.search.toLocaleLowerCase()) ; 
    });
  }else if(this.search ==""){
    this.getAllTrips();
  }
  }
}

