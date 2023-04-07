import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImageComponent } from '../../../../cashier/petty-cash/modal-image/modal-image.component';
import { TreasuryService } from '../../services/treasury.service';

@Component({
  selector: 'app-modal-expense-details',
  templateUrl: './modal-expense-details.component.html',
  styleUrls: ['./modal-expense-details.component.scss'],
})
export class ModalExpenseDetailsComponent {
  @Input() expenseDetails: any;

  message: string;
  messageError: string;
  type: string = 'Approved';
  msgError: string;
  constructor(
    private treasuryService: TreasuryService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openMdalImageView() {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.imageUploadedView =
      this.expenseDetails?.files[0]?.attachmentPath;
  }

  chooseType(e) {
    console.log(e);
    console.log(e.target.value);

    const type = e.target.value;
    if (type == 'Approved') {
      this.type = 'Approved';
    } else {
      this.type = 'Reject';
    }
  }

  ApproveExpense() {
    const formData = new FormData();
    formData.append('ExpenseRecordId', this.expenseDetails.expenseRecordId);

    console.log(formData);
    return this.treasuryService
      .ApproveExpense(formData)
      .subscribe((response: any) => {
        console.log(response);
        if (response.isSuccess == true) {
          this.message = 'Approved successfully ';
          setTimeout(() => {
            this.modalService.dismissAll();
            window.location.reload();
          }, 4000);
        } else {
          console.log('error', response);
          this.messageError = response.Errors[0]?.ErrorMessageEn;
          setTimeout(() => {
            this.messageError = '';
            // this.modalService.dismissAll();
          }, 4000);
        }
      });
  }
  RejectionReason: string;
  RejectExpense() {

    if (!this.RejectionReason) {
      this.msgError = ' Reason is required';
      setTimeout(() => {
        this.msgError = '';
      }, 2000);
      return window.scroll();
    }
    const formData = new FormData();
    formData.append('ExpenseRecordId', this.expenseDetails.expenseRecordId);
    formData.append('RejectionReason', this.RejectionReason);

    console.log(formData);
    return this.treasuryService
      .RejectExpense(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Rejected successfully ';
          setTimeout(() => {
            this.modalService.dismissAll();
            window.location.reload();
          }, 4000);
        } else {
          console.log('error', response);
          this.messageError = response.Errors[0]?.ErrorMessageEn;
          setTimeout(() => {
            this.messageError = '';
            // this.modalService.dismissAll();
          }, 4000);
        }
      });
  }

  submitExpenseAction() {
    if (this.type == 'Approved') {
      this.ApproveExpense();
    } else {
      this.RejectExpense();
    }
  }
}
