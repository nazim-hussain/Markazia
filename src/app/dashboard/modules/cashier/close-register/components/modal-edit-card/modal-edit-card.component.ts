import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../../../../../shared/components/modal-message/modal-message.component';
import { CloseRegisterService } from '../../services/close-register.service';

@Component({
  selector: 'app-modal-edit-card',
  templateUrl: './modal-edit-card.component.html',
  styleUrls: ['./modal-edit-card.component.scss'],
  providers: [DatePipe],
})
export class ModalEditCardComponent {
  @Input() details;
  formGroup: FormGroup;
  @Output() loadMainData = new EventEmitter<string>();
  type: string;
  message: string;
  @Output() loadPageData = new EventEmitter<string>();
  submitted: boolean;
  constructor(
    public closeRegisterService: CloseRegisterService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getForm();
    this.getBanks();

    if (this.details) {
      console.log(this.details);
      this.formGroup
        .get('OrdersCardsCollectionId')
        .patchValue(this.details.ordersCardsCollectionId);
      this.formGroup
        .get('LastTerminalId')
        .patchValue(this.details.lastTerminalId || this.details.cardTerminalId);
      this.formGroup.get('BankId').patchValue(this.details.bankId);
      this.formGroup
        .get('LastCollectedAmount')
        .patchValue(
          this.details.lastCollectedAmount || this.details.cardCollectionJod
        );
      this.formGroup.get('CardDrawerName').patchValue(this.details.customer);
      this.formGroup
        .get('CardInvoiceNo')
        .patchValue(this.details.cardInvoiceNo);

      this.formGroup
        .get('CollectionAt')
        .patchValue(
          this.datePipe.transform(this.details.collectionAt, 'yyyy-MM-dd')
        );

      this.formGroup
        .get('CardDate')
        .patchValue(
          this.datePipe.transform(this.details.collectionAt, 'yyyy-MM-dd')
        );

      // this.formGroup.get('CardDate').patchValue('');
      this.formGroup
        .get('CardFirst6Digits')
        .patchValue(this.details.cardFirst6Digits);
      this.formGroup
        .get('CardLast4Digits')
        .patchValue(this.details.cardLast4Digits);
    }
  }
  getForm() {
    this.formGroup = this.fb.group({
      OrdersCardsCollectionId: 0,
      LastTerminalId: [''],
      LastCollectedAmount: [''],
      CardDrawerName: '',
      CardInvoiceNo: [''],
      CollectionAt: [''],
      CardDate: [''],
      BankId: [''],
      CardFirst6Digits: [''],
      CardLast4Digits: [''],
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit() {
    // this.isLoading = true;

    this.submitted = true;
    console.log(this.submitted);
    if (this.formGroup.invalid) {
      return window.scroll(0, 0);
    }

    const formData = new FormData();
    formData.append(
      'OrdersCardsCollectionId',
      this.formGroup.get('OrdersCardsCollectionId')?.value
    );
    formData.append(
      'LastCollectedAmount',
      this.formGroup.get('LastCollectedAmount')?.value
    );
    formData.append(
      'CardDrawerName',
      this.formGroup.get('CardDrawerName')?.value
    );
    formData.append(
      'CardInvoiceNo',
      this.formGroup.get('CardInvoiceNo')?.value
    );
    formData.append('CollectionAt', this.formGroup.get('CollectionAt')?.value);
    formData.append('CardDate', this.formGroup.get('CardDate')?.value);
    formData.append('BankId', this.formGroup.get('BankId')?.value);
    formData.append(
      'CardFirst6Digits',
      this.formGroup.get('CardFirst6Digits')?.value
    );
    formData.append(
      'CardLast4Digits',
      this.formGroup.get('CardLast4Digits')?.value
    );

    console.log(this.formGroup.value);
    console.log(formData);
    return this.closeRegisterService.EditCollectionByCards(formData).subscribe(
      (response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.type = 'success';
          this.message = 'Edit done successfully';
          setTimeout(() => {
            this.modalService.dismissAll();
            this.toLoadData();
          }, 2000);
          // const modalRef = this.modalService.open(ModalMessageComponent);
          // modalRef.componentInstance.type = 'success';
          // modalRef.componentInstance.message = 'Edit done successfully';
          // modalRef.componentInstance.routeName = '/close-register';
          // modalRef.componentInstance.loadPageData.subscribe((result: any) => {
          //   console.log('result', result);
          //   // this.GetCurrentSessionCollectedCheques();
          //   // this.loadMainData.emit();
          // });
          console.log(response);
        } else {
          // console.log('error', response);
        }
      },
      (error: any) => {
        // this.isLoading = false;
        // console.log('error', error);
      }
    );
  }
  toLoadData() {
    this.loadPageData.emit();
  }
  banks: any;
  getBanks() {
    this.closeRegisterService.getLookupsById(11).subscribe(
      (response: any) => {
        this.banks = response.data.map((x) => ({
          id: x.id,
          name: x.name[0].lookupName,
        }));
      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }
}
