import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/model/domain';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { DomainService } from 'src/app/services/domain.service';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
listDomain!:Domain[];
domain:Domain;
modalOptions: NgbModalOptions;
closeResult!: string;


  constructor(private domainService:DomainService,private modalService: NgbModal) { 

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'

    }

  }

  ngOnInit(): void {
    this.domain={
      id:null,
      nameDomain:null
    }
    this.getAllDomain();
  }

getAllDomain(){
  this.domainService.getAllDomain().subscribe((res)=>{
    this.listDomain=res;
  })
}
addDomain(addDomain:NgForm){
this.domainService.addDomain(addDomain.value).subscribe(()=>{
  this.getAllDomain();
});

}
editDomain(){
  this.domainService.editDomain(this.domain).subscribe(()=>{
  this.getAllDomain();
  });
}
  deleteDomain(domain:Domain){
    this.domainService.deleteDomain(domain.id).subscribe(()=>{
  this.getAllDomain();
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



