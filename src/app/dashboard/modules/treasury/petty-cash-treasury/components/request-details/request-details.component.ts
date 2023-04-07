import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreasuryService } from '../../services/treasury.service';
import { ModalApproveComponent } from '../modal-approve/modal-approve.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent implements OnInit {
  registerId: number;
  requestId: number;

  constructor(
    private treasuryService: TreasuryService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.registerId = this.route.snapshot.params['id'];
    this.requestId = this.route.snapshot.params['id2'];

    this.GetRegisterPettycashrequestDetails();
  }

  details: any;
  GetRegisterPettycashrequestDetails() {
    return this.treasuryService
      .GetRegisterPettycashrequestDetails(this.requestId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
        }
      });
  }

  openModalApprove(details) {
    const modalRef = this.modalService.open(ModalApproveComponent);
    modalRef.componentInstance.requestDetails = details;
    modalRef.componentInstance.type = 'approve';
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetRegisterPettycashrequestDetails();
    });
  }
  openModalReject(details) {
    const modalRef = this.modalService.open(ModalApproveComponent);
    modalRef.componentInstance.requestDetails = details;
    modalRef.componentInstance.type = 'reject';
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.GetRegisterPettycashrequestDetails();
    });
  }
}
