import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../../services/shared.service';
import { CollectService } from '../../services/collect.service';

@Component({
  selector: 'app-modal-needmodify',
  templateUrl: './modal-needmodify.component.html',
  styleUrls: ['./modal-needmodify.component.scss'],
})
export class ModalNeedmodifyComponent {
  @Input() SalesOrderId: any;
  @Input() OrderType: any;
  @Input() userType: string;

  message: string;
  messageError: string;

  notes: string;

  constructor(
    private collectService: CollectService,
    public sharedService: SharedService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,

    private router: Router
  ) {}

  ngOnInit(): void {}

  NeedModify() {
    const formData = new FormData();
    formData.append('SalesOrderId', this.SalesOrderId);
    formData.append('OrderType', this.OrderType);
    formData.append('NeedModifyNote', this.OrderType);

    console.log(formData);
    return this.collectService
      .NeedModify(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Modify request successfully sent';
          setTimeout(() => {
            this.modalService.dismissAll();
            this.router.navigateByUrl('/collect');
          }, 4000);
          // const modalRef = this.modalService.open(ModalMessageComponent);
          // modalRef.componentInstance.type = 'success';
          // modalRef.componentInstance.message = 'Order done successfully';
          // modalRef.componentInstance.routeName = '/collect';
          // modalRef.componentInstance.loadPageData.subscribe((result: any) => {
          //   console.log('result', result);
          //   // this.GetCurrentSessionCollectedCard();
          //   // this.loadMainData.emit();
          // });
        } else {
          console.log('error', response);
          this.messageError = response.Errors[0]?.ErrorMessageEn;
          setTimeout(() => {
            this.modalService.dismissAll();
            this.router.navigateByUrl('/collect');
          }, 4000);

          // const modalRef = this.modalService.open(ModalMessageComponent);
          // modalRef.componentInstance.type = 'error';
          // modalRef.componentInstance.messageError = response.Errors;
          // modalRef.componentInstance.routeName = '/collect';
        }
      });
  }
}
