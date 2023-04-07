import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TreasuryService } from '../../../services/treasury.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss'],
})
export class DeleteCategoryComponent {
  @Input() expenseDetails: any;
  @Input() type: any;
  message: string;
  messageError: string;
  CategoryId: any;
  @Output() sendtoLoadData = new EventEmitter();

  constructor(
    private treasuryService: TreasuryService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {}

  Delete() {
    const formData = new FormData();
    formData.append('expenseCategoryId', this.expenseDetails.id);

    console.log(formData);
    return this.treasuryService
      .DeleteExpenseCategory(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.message = 'Deleted successfully ';
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
          }, 7000);
        }
      });
  }
}
