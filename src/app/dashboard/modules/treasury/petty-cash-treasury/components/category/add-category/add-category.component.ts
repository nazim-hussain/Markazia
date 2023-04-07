import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreasuryService } from '../../../services/treasury.service';
import { validateField } from 'src/app/shared/directive/character.directive';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  @Input() expenseDetails: any;
  @Input() type: any;
  message: string;
  messageError: string;
  CategoryId: any;
  @Output() sendtoLoadData = new EventEmitter();

  isStatus: any;
  CategoryName: string;

  constructor(
    private treasuryService: TreasuryService,
    private router: Router,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if(this.expenseDetails == 'item'){
      this.isStatus = true;
    }
    else{
      this.CategoryId = this.expenseDetails.id;
      this.CategoryName = this.expenseDetails.description;
      this.isStatus = this.expenseDetails.status == 2001 ? true : false;
    }
  }

  submit() {
    this.CategoryName = validateField(this.CategoryName);
    if (this.CategoryId) {
      this.EditExpenseCategory();
    } else {
      this.AddExpenseCategory();
    }
  }
  status: any;
  msgError: string;
  AddExpenseCategory() {
    if (!this.CategoryName) {
      this.msgError = 'Category Name is required';
      setTimeout(() => {
        this.msgError = '  ';
      }, 2000);
      return window.scroll();
    }

    const formData = new FormData();
    formData.append('CategoryName', this.CategoryName);
    formData.append('Active', this.isStatus);

    console.log(formData);
    return this.treasuryService
      .AddExpenseCategory(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Added successfully ';
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

  EditExpenseCategory() {
    if (!this.CategoryName) {
      this.msgError = ' Category Name is required';
      setTimeout(() => {
        this.msgError = '  ';
      }, 2000);
      return window.scroll();
    }

    const formData = new FormData();

    formData.append('CategoryId', this.CategoryId);
    formData.append('CategoryName', this.CategoryName);
    formData.append('Active', this.isStatus);

    console.log(formData);
    return this.treasuryService
      .EditExpenseCategory(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Edited successfully ';
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

  chooseStatus() {
    // this.isStatus = this.isStatus == false ? true : false;

    if (this.isStatus == true) {
      // this.branchForm.get('status')?.patchValue(2001);
    } else {
      // this.branchForm.get('status')?.patchValue(2002);
    }
  }
}
