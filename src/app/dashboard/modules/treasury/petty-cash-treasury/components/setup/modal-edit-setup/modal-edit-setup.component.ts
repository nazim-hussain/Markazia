import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreasuryService } from '../../../services/treasury.service';
@Component({
  selector: 'app-modal-edit-setup',
  templateUrl: './modal-edit-setup.component.html',
  styleUrls: ['./modal-edit-setup.component.scss'],
})
export class ModalEditSetupComponent {
  @Input() registerDetails: any;
  @Input() type: any;
  message: string;
  messageError: string;

  @Output() sendtoLoadData = new EventEmitter();

  constructor(
    private treasuryService: TreasuryService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.registerDetails) {
      this.pettyCashLimit = this.registerDetails.pettyCashLimit;
    }
  }
  pettyCashLimit: any;
  msgError: string;
  EditPettyCashLimit() {
    if (this.pettyCashLimit <= 0 || !this.pettyCashLimit) {
      console.log('invalid amount');
      this.msgError = ' Amount must be greater than 0 ';
      setTimeout(() => {
        this.msgError = '  ';
      }, 2000);
      return window.scroll();
    }

    const formData = new FormData();
    formData.append('registerId', this.registerDetails.id);
    formData.append('PettyCashLimit', this.pettyCashLimit);

    console.log(formData);
    return this.treasuryService
      .EditPettyCashLimit(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Approved successfully ';
          setTimeout(() => {
            this.modalService.dismissAll();
            this.sendtoLoadData.emit();
          }, 3000);
        } else {
          console.log('error', response);
          this.messageError = response.Errors[0]?.ErrorMessageEn;
          setTimeout(() => {
            this.messageError = '';
            // this.modalService.dismissAll();
          }, 3000);
        }
      });
  }
}
