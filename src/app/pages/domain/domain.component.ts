import { Component, OnInit } from '@angular/core';
import { Domain } from 'src/app/model/domain';
import { FormControl, NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

import { DomainService } from 'src/app/services/domain.service';
import { ReplaySubject } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss']
})
export class DomainComponent implements OnInit {
listDomain!:Domain[];
domainCntrl:FormControl=new FormControl();
domainCntrlFilter:FormControl=new FormControl();
domain:Domain;
modalOptions: NgbModalOptions;
closeResult!: string;
domaines:Record<string,string>[];
filteredDomains:ReplaySubject<Domain[]>=new ReplaySubject<Domain[]>(1);

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
   res.forEach((te)=>{
    this.domaines.push({'naimeDomain':te.nameDomain});
   })
  })
}
addDomain(addDomain:NgForm){
this.domainService.addDomain(addDomain.value).subscribe(()=>{
  this.getAllDomain();
});

}
editDomain(UpdateForm:NgForm){
  this.domainService.editDomain(UpdateForm.value).subscribe(()=>{
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


  exportpdf():void{
    let DATA: any = document.getElementById('table');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
}



