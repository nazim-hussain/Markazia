import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../../../../../shared/components/modal-message/modal-message.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';
import { PettyCashService } from '../services/petty-cash.service';
import { ExpenseConfirmComponent } from '../expense-confirm/expense-confirm.component';
@Component({
  selector: 'app-add-petty-cash',
  templateUrl: './add-petty-cash.component.html',
  styleUrls: ['./add-petty-cash.component.scss'],
})
export class AddPettyCashComponent {
  formGroup: FormGroup;
  @Input() expenseId: number;
  errorMessage: any;
  submitted = false;
  isLoading: boolean;
  isShowToUplaod: boolean = true;

  isViewFile: boolean;
  @ViewChild("fileUpload", {static: false})
  InputVar: ElementRef;
  @Output() sendtoLoadData = new EventEmitter();
  constructor(
    private pettyCashService: PettyCashService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getForm();
    this.getExpenseCategory();

    if (this.expenseId) {
      console.log(this.expenseId);
      this.isShowToUplaod = false;

      this.GetExpenseDetails();
    }
  }

  getForm() {
    this.formGroup = this.fb.group({
      ExpenseRecordId: 0,
      InvoiceNo: [''],
      ExpenseCategoryId: null,
      ExpenseAmount: '',
      ExpenseTax: [''],
      ExpenseNotes: [''],
      Status: 2001,
      Attachments: null,
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  onSubmit() {
    // console.log(this.formGroup.value);

    if (this.formGroup.get('ExpenseRecordId')?.value == 0) {
      this.AddExpense();
    } else {
      this.EditExpense();
    }
  }

  AddExpense() {
    this.isLoading = true;
    this.submitted = true;

    if (
      this.formGroup.invalid ||
      this.formGroup.get('ExpenseAmount')?.value <= 0 ||
      this.formGroup.get('ExpenseTax')?.value <= 0 ||
      this.formGroup.get('Attachments').value == null
    ) {
      console.log('invalid amount');
      this.isLoading = false;
      return window.scroll(0, 0);
    } else {
      const formData = new FormData();
      formData.append('InvoiceNo', this.formGroup.get('InvoiceNo')?.value);
      formData.append(
        'ExpenseCategoryId',
        this.formGroup.get('ExpenseCategoryId')?.value
      );
      formData.append(
        'ExpenseAmount',
        this.formGroup.get('ExpenseAmount')?.value
      );
      formData.append('ExpenseTax', this.formGroup.get('ExpenseTax')?.value);
      formData.append(
        'ExpenseNotes',
        this.formGroup.get('ExpenseNotes')?.value
      );
      formData.append('Attachments', this.formGroup.get('Attachments')?.value);

      // console.log(this.formGroup.value);
      // console.log(formData);

      // return this.propertyService
      // .addProperty(formData)
      // .subscribe((event: any) => {

      return this.pettyCashService.AddExpense(formData).subscribe(
        (event: any) => {
          // console.log(event);
          // console.log(event.body);

          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
            // console.log(event.body.isSuccess);
            // console.log(event.body['isSuccess']);
            if (event.body.isSuccess == true) {
              this.isLoading = false;
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.type = 'success';
              modalRef.componentInstance.message =
                'Your expense is added successfully';
              modalRef.componentInstance.routeName = '/petty-cash';
              modalRef.componentInstance.name = 'add';
              setTimeout(() => {
                this.sendtoLoadData.emit();
              }, 2000);

              // console.log(response);
            } else {
              // console.log('error', response);
              // console.log('error', response.Errors);
              this.isLoading = false;

              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.type = 'error';
              modalRef.componentInstance.messageError =
                event.body.errors || event.body.Errors;
              this.errorMessage = event.body.Errors || event.body.errors;
            }
          }
        }
        // (error: any) => {
        //   this.isLoading = false;
        //   console.log('error', error);
        //   const modalRef = this.modalService.open(ModalMessageComponent);
        //   modalRef.componentInstance.type = 'error';
        //   modalRef.componentInstance.messageError =
        //     error.error.errors || error.Errors;
        //   console.log(error), (this.errorMessage = error.statusText);
        // }
      );
    }
  }

  EditExpense() {
    this.isLoading = true;

    if (
      this.formGroup.invalid ||
      this.formGroup.get('ExpenseAmount')?.value <= 0 ||
      this.formGroup.get('ExpenseTax')?.value <= 0
      // this.formGroup.get('Attachments').value == null
    ) {
      console.log('invalid amount');
      this.isLoading = false;
      return window.scroll(0, 0);
    } else {
      const formData = new FormData();
      formData.append(
        'ExpenseRecordId',
        this.formGroup.get('ExpenseRecordId')?.value
      );
      formData.append('InvoiceNo', this.formGroup.get('InvoiceNo')?.value);
      formData.append(
        'ExpenseCategoryId',
        this.formGroup.get('ExpenseCategoryId')?.value
      );
      formData.append(
        'ExpenseAmount',
        this.formGroup.get('ExpenseAmount')?.value
      );
      formData.append('ExpenseTax', this.formGroup.get('ExpenseTax')?.value);
      formData.append(
        'ExpenseNotes',
        this.formGroup.get('ExpenseNotes')?.value
      );
      formData.append('Attachments', this.formGroup.get('Attachments')?.value);

      // console.log(this.formGroup.value);
      // console.log(formData);
      return this.pettyCashService.EditExpense(formData).subscribe(
        (event: any) => {
          // console.log(event);

          // console.log(event);
          // console.log(event.body);

          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            setTimeout(() => {
              this.progress = 0;
            }, 1500);
            // console.log(event.body.isSuccess);

            if (event.body.isSuccess == true) {
              this.isLoading = false;
              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.type = 'success';
              modalRef.componentInstance.message =
                'Your expense is updated successfully';
              modalRef.componentInstance.routeName = '/petty-cash';
              modalRef.componentInstance.name = 'add';
              console.log('semdToConfirm');
              setTimeout(() => {
                this.sendtoLoadData.emit();
              }, 2000);
              // modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
              //   console.log('semdToConfirm', result);
              //   this.sendtoLoadData.emit();

              //   this.modalService.dismissAll();
              // });

              // console.log(response);
            } else {
              // console.log('error', event);
              this.isLoading = false;

              const modalRef = this.modalService.open(ModalMessageComponent);
              modalRef.componentInstance.type = 'error';
              modalRef.componentInstance.messageError = event?.error?.errors;
              this.errorMessage = event.Errors || event.errors;
            }
          }
        }
        // (error: any) => {
        //   this.isLoading = false;
        //   // console.log('error', error);
        //   const modalRef = this.modalService.open(ModalMessageComponent);
        //   modalRef.componentInstance.type = 'error';
        //   modalRef.componentInstance.messageError = error.error.errors;
        //   console.log(error), (this.errorMessage = error.statusText);
        // }
      );
    }
  }
  expenseDetails: any;
  GetExpenseDetails() {
    this.pettyCashService
      .GetExpenseDetails(this.expenseId)
      .subscribe((response: any) => {
        if (response) {
          this.expenseDetails = response.data;
          console.log(this.expenseDetails);
          // this.formGroup.patchValue(expenseDetails);
          this.formGroup
            .get('ExpenseRecordId')
            .patchValue(this.expenseDetails.expenseRecordId);
          this.formGroup
            .get('ExpenseAmount')
            .patchValue(this.expenseDetails.expenseAmount);
          this.formGroup
            .get('InvoiceNo')
            .patchValue(this.expenseDetails.invoiceNo);
          this.formGroup
            .get('ExpenseCategoryId')
            .patchValue(this.expenseDetails.expenseCategoryId);
          this.formGroup
            .get('ExpenseTax')
            .patchValue(this.expenseDetails.expenseTax);
          this.formGroup
            .get('ExpenseNotes')
            .patchValue(this.expenseDetails.expenseNotes);
          this.formGroup.get('Status').patchValue(this.expenseDetails.status);
          this.formGroup
            .get('Attachments')
            .patchValue(this.expenseDetails.Attachments);
          // this.formGroup.get('Mobile').patchValue(expense.mobile);
          this.formGroup.controls['ExpenseCategoryId'].disable();
        }
      });
  }

  expenseCategory: any;
  getExpenseCategory() {
    this.pettyCashService.getLookupsById(12).subscribe(
      (response: any) => {
        // this.expenseCategory = response.data;
        this.expenseCategory = response.data.map((x) => ({
          id: x.id,
          name: x.name[0].lookupName,
        }));
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  enter: boolean;
  myFiles: string[] = [];
  urls: any[] = [];
  imageError: string;
  progress: number = 0;
  filePath: string;
  fileName: string;
  errorMsgUplaod: string;
  filesDropped(files: any) {
    this.enter = false;

    if (
      files[0].file.type == 'image/jpeg' ||
      files[0].file.type == 'image/jpg' ||
      files[0].file.type == 'image/png' ||
      files[0].file.type == 'application/pdf'
    ) {
      // console.log(files);
      // console.log(files[0]);
      // console.log(files[0].file);
      // console.log(files[0].file.name);
      // console.log(files[0].file.type);
      // console.log(files[0].url);

      if (files && files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.filePath = event.target.result;
        };
        reader.readAsDataURL(files[0].file);
      }

      this.fileName = files[0].file.name;
      // console.log(this.filePath);
      // this.filePath = files[0].url;
      this.errorMsgUplaod = '';
      this.formGroup.get('Attachments')?.patchValue(files[0].file);
    } else {
      this.errorMsgUplaod =
        'This file not support , Supported formates: JPEG, JPG, PNG, PDF';
    }

    // files.forEach((file) => {
    // console.log(file);
    // console.log(file.file);
    // console.log(file.file.name);
    // console.log(file.name);
    // console.log(file.url);
    // console.log(this.myFiles);

    // files.forEach((file) => {
    //   if (this.myFiles?.length >= 1) {
    //     this.myFiles = [...this.myFiles, file.file];
    //     this.urls = [...this.urls, file.url];
    //   } else {
    //     this.myFiles = [file.file];
    //     this.urls = [file.url];
    //   }
    // });
    // });
    // console.log(this.urls);
    // console.log(this.myFiles);
    // console.log(this.myFiles[0]);
  }
  removeImageName() {
    this.fileName = '';
    this.filePath = '';
    this.errorMsgUplaod = '';
    this.InputVar.nativeElement.value = "";
    this.formGroup.get('Attachments')?.patchValue(null);
  }
  onSelectFile(event: any) {
    console.log(event);
    console.log(event.target.files[0]);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePath = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileName = event.target.files[0].name;
    this.errorMsgUplaod = '';
    console.log(event.target.files[0]);
    this.formGroup.get('Attachments')?.patchValue(event.target.files[0]);
  }

  removeImage(i) {
    this.urls.splice(i, 1);
    this.myFiles.splice(i, 1);
  }
  removeImg() {
    this.errorMsgUplaod = '';
    this.isShowToUplaod = !this.isShowToUplaod;
  }

  openMdalImage() {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.imageUploadedView = this.filePath;
  }

  openMdalImageView() {
    const modalRef = this.modalService.open(ModalImageComponent);
    modalRef.componentInstance.imageUploadedView =
      this.expenseDetails?.files[0]?.attachmentPath;
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isShowExpense: boolean = false;
  editExpenseInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowExpense == false) {
      this.isShowExpense = true;
      this.formGroup.controls['ExpenseCategoryId'].enable();
    } else if (this.isShowExpense == true) {
      this.formGroup.controls['ExpenseCategoryId'].disable();

      const modalRef = this.modalService.open(ExpenseConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowExpense = false;
        this.modalService.dismissAll();

        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowExpense = false;
        // this.modalService.dismissAll();
      });
    }
  }
}
