import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvideExpensesService } from '../../provide-expense-service/provide-expenses.service';

@Component({
  selector: 'app-provide-expenses-modal',
  templateUrl: './provide-expenses-modal.component.html',
  styleUrls: ['./provide-expenses-modal.component.scss'],
})
export class ProvideExpensesModalComponent {
  @Input() registerDetails: any;
  expenseRecordId: any;
  message: string;
  messageError: string;
  isLoading: boolean = false;

  @Output() sendtoLoadData = new EventEmitter();

  constructor(
    private _provideExpensesService: ProvideExpensesService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    console.log(this.registerDetails, 'registerDetails');
    this.expenseRecordId = this.registerDetails?.pettyCashRequestId;
  }

  /**
   * on provide expenses
   */
  provideExpenses() {
    console.log(this.expenseRecordId, 'iddd');

    this.isLoading = true;
    const formData = new FormData();
    formData.append('ExpenseRecordId', this.expenseRecordId);
    try {
      this._provideExpensesService
        .provideExpenses(formData)
        .subscribe((response) => {
          console.log(response, 'response');

          if (response.isSuccess == true) {
            this.message = 'Petty cash provided successfully ';
            this.isLoading = false;
            setTimeout(() => {
              this.modalService.dismissAll();
              this.sendtoLoadData.emit();
            }, 3000);
          } else {
            console.log('error', response);
            this.messageError = response.Errors[0]?.ErrorMessageEn;
            this.isLoading = false;
            setTimeout(() => {
              this.messageError = '';
              // this.modalService.dismissAll();
            }, 3000);
          }
        });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }

  /**
   * dismiss modal service
   */
  dismissModal() {
    this.modalService.dismissAll();
  }
}
