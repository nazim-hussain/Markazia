import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../../../../../shared/components/modal-message/modal-message.component';
import { CloseRegisterService } from '../../services/close-register.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
  providers: [DatePipe],
})
export class ModalEditComponent implements OnInit {
  @Input() details;
  formGroup: FormGroup;
  @Output() loadMainData = new EventEmitter<string>();
  type: string;
  message: string;
  submitted: boolean;
  @Output() loadPageData = new EventEmitter<string>();

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
        .get('ChequeCollectionId')
        .patchValue(this.details.chequeCollectionId);
      this.formGroup
        .get('ChequeCollectionJod')
        .patchValue(this.details.chequeCollectionJod);
      this.formGroup.get('BankId').patchValue(this.details.bankId);
      this.formGroup
        .get('ChequeDrawerName')
        .patchValue(this.details.chequeDrawerName);
      this.formGroup.get('ChequeNo').patchValue(this.details.chequeNo);
      this.formGroup
        .get('ChequeDate')
        .patchValue(
          this.datePipe.transform(this.details.chequeDate, 'yyyy-MM-dd')
        );
    }
  }
  getForm() {
    this.formGroup = this.fb.group({
      ChequeCollectionId: 0,
      ChequeCollectionJod: [''],
      ChequeDate: [''],
      BankId: '',
      ChequeDrawerName: [''],
      ChequeNo: ['', Validators.min(1)],
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.submitted);
    if (this.formGroup.invalid) {
      return window.scroll(0, 0);
    }
    const formData = new FormData();
    formData.append(
      'ChequeCollectionId',
      this.formGroup.get('ChequeCollectionId')?.value
    );
    formData.append(
      'ChequeCollectionJod',
      this.formGroup.get('ChequeCollectionJod')?.value
    );
    formData.append('ChequeDate', this.formGroup.get('ChequeDate')?.value);
    formData.append('BankId', this.formGroup.get('BankId')?.value);
    formData.append(
      'ChequeDrawerName',
      this.formGroup.get('ChequeDrawerName')?.value
    );
    formData.append('ChequeNo', this.formGroup.get('ChequeNo')?.value);

    console.log(this.formGroup.value);
    console.log(formData);
    return this.closeRegisterService.EditCollectionCheuqe(formData).subscribe(
      (response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.type = 'success';
          this.message = 'Edit done successfully';
          setTimeout(() => {
            this.modalService.dismissAll();
            this.toLoadData();
          }, 2000);

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
