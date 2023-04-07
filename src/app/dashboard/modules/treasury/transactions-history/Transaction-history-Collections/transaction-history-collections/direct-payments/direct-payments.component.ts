import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvideExpensesModalComponent } from 'src/app/dashboard/modules/main-fund/provide-expenses/provide-expenses-modal/provide-expenses-modal/provide-expenses-modal.component';
import * as _ from 'underscore';
import { TransactionHistoryModalComponent } from '../../../transaction-history-modal/transaction-history-modal.component';
import { TransactionHistoryService } from '../../../transaction-history-services/transaction-history.service';

@Component({
  selector: 'app-direct-payments',
  templateUrl: './direct-payments.component.html',
  styleUrls: ['./direct-payments.component.scss'],
})
export class DirectPaymentsComponent {
  searchText: string = '';
  sort: number = 1;
  totalRecords: number = 18;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  directPaymentCollection: any[] = [];
  branchList: any[] = [];
  categoryList: any;
  categoryLookupId: number;
  search: string;
  selectedDeviceObj: any;
  dropdownList: any[] = [];
  dropdownMenu: FormGroup;
  All: string = 'All';
  paymentTypeList: any;
  selected;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private TransactionHistoryService: TransactionHistoryService
  ) {
    this.dropdownList = [
      { name: 'Branch', checked: false },
      { name: 'Register Name', checked: false },
      { name: 'Register No.', checked: false },
      { name: 'Employee', checked: false },
    ];
    this.paymentTypeList = [
      'Cash',
      'Cheque',
      'Visa',
      'Master Card',
      'American Express',
      'On Customer Account',
    ];
    ////
  }

  ngOnInit(): void {
    this.getList();
    this.GetCategoryDropDown();
    this.getBranches();
    this.getEmployees();
    this.getRegisters();
  }

  /**
   * get List of directPaymentCollection
   */
  getList() {
    var branches = this.dropDorwnBranch.toString();
    var registerName = this.dropdownRegister.toString();
    var registerNo = this.newDropdownRegisterNo.toString();
    var employee = this.dropDownEmployeeId.toString();
    var payments = this.newDropdownPayment.toString();

    this.TransactionHistoryService.GetDirectPaymentCollection(
      this.searchText,
      this.sort,
      this.pageNo,
      this.customerSearch,
      branches,
      registerName,
      registerNo,
      employee,
      payments
    ).subscribe((response) => {
      console.log(response, 'res');
      if (response) {
        this.directPaymentCollection = response?.data;
        console.log(
          this.directPaymentCollection,
          'this.directPaymentCollection'
        );
        this.totalRecords = response?.totalRecordCount;
        this.pagin = Math.ceil(this.totalRecords / 6);
        this.pages = _.range(this.pagin);

        this.directPaymentCollection.forEach((x) => {
          this.branchList.push(x.branch);
        });
        console.log(this.branchList, 'this.branchList');

        console.log(this.pagin);
        console.log(this.pages);
      }
    });
  }
  /**
   * get category dropdown list
   */

  GetCategoryDropDown() {
    this.TransactionHistoryService.GetCategory().subscribe((response) => {
      console.log(response, ' category res');
      if (response) {
        this.categoryList = response?.data;
      }
    });
  }

  /**
   * getCartegoryId
   */
  changeCategory(id) {
    console.log(id.value, 'id');
    this.categoryLookupId = id.value;
    this.getList();
  }
  /**
   * get Registers
   */
  registersList: any;
  getRegisters() {
    this.TransactionHistoryService.GetRegisterName().subscribe((response) => {
      console.log(response, ' category register Name');
      if (response) {
        this.registersList = response?.data;
      }
    });
  }

  /**
   * get Branches
   */
  branchesList: any;
  getBranches() {
    this.TransactionHistoryService.GetBranches().subscribe((response) => {
      console.log(response, ' category branches');
      if (response) {
        this.branchesList = response?.data;
      }
    });
  }

  /**
   * get Branches
   */
  EmployeesList: any;
  getEmployees() {
    this.TransactionHistoryService.GetEmployees().subscribe((response) => {
      console.log(response, ' category employees');
      if (response) {
        this.EmployeesList = response?.data;
      }
    });
  }

  /**
   * filter selection
   */
  register: boolean = false;
  branch: boolean = false;
  registerNo: boolean = false;
  employee: boolean = false;
  collectionDate: boolean = false;
  customerName: boolean = false;
  paymentType: boolean = false;
  filterRegisterName(event) {
    console.log(event.checked);
    this.register = event.checked;
  }
  filterRegisterNo(event) {
    console.log(event.checked);
    this.registerNo = event.checked;
  }
  filterBranch(event) {
    console.log(event.checked);
    this.branch = event.checked;
  }
  filterEmployee(event) {
    console.log(event.checked);
    this.employee = event.checked;
  }
  filterCollectionDates(event) {
    console.log(event.checked);
    this.collectionDate = event.checked;
  }
  filterCustomerName(event) {
    console.log(event.checked);
    this.customerName = event.checked;
  }
  filterPaymentType(event) {
    console.log(event.checked);
    this.paymentType = event.checked;
  }
  lastAction: any;
  newDropdownBranch: any[] = [];
  dropDorwnBranch: any[] = [];
  selectedBranch: any[] = [];
  applyBranch(item, event) {
    console.log(this.selectedBranch, 'selected branch');
    const obj = item.branchName;
    const branchId = item.branchId;
    if (event.target.checked) {
      // checking if the checkbox has been checked

      this.newDropdownBranch.push(obj); // pushing object to newArray[]
      this.dropDorwnBranch.push(branchId);
    } else {
      this.newDropdownBranch = this.newDropdownBranch.filter((v) => v !== obj);
      this.dropDorwnBranch = this.dropDorwnBranch.filter((x) => x !== branchId); // if the checkbox has been unchecked removing the object from the array
    }
    console.log(this.newDropdownBranch);
    this.getList();
  }

  /**
   * apply registerName
   *
   */
  dropdownRegister: any[] = [];
  applyRegisterName(item, event) {
    console.log(this.selectedBranch, 'selected branch');
    const obj2 = item.registersName;
    const registerId = item.id;
    if (event.target.checked) {
      // checking if the checkbox has been checked

      this.newDropdownRegisterName.push(obj2); // pushing object to newArray[]
      this.dropdownRegister.push(registerId); // pushing object to newArray[]
    } else {
      this.newDropdownRegisterName = this.newDropdownRegisterName.filter(
        (v) => v !== obj2
      ); // if the checkbox has been unchecked removing the object from the array
      this.dropdownRegister = this.dropdownRegister.filter(
        (x) => x !== registerId
      );
    }
    console.log(this.newDropdownRegisterName);
    this.getList();
  }
  /**
   * apply registerName
   *
   */
  applyRegisterNo(item, event) {
    console.log(this.selectedBranch, 'selected branch');
    const obj3 = item.id;
    if (event.target.checked) {
      // checking if the checkbox has been checked

      this.newDropdownRegisterNo.push(obj3); // pushing object to newArray[]
    } else {
      this.newDropdownRegisterNo = this.newDropdownRegisterNo.filter(
        (v) => v !== obj3
      ); // if the checkbox has been unchecked removing the object from the array
    }
    console.log(this.newDropdownRegisterNo);
    this.getList();
  }
  /**
   * apply registerName
   *
   */
  dropDownEmployeeId: any[] = [];
  applyEmployee(item, event) {
    console.log(this.selectedBranch, 'selected branch');
    const obj4 = item.fullName;
    const employeeId = item.userId;
    if (event.target.checked) {
      // checking if the checkbox has been checked

      this.newDropdownEmployee.push(obj4); // pushing object to newArray[]
      this.dropDownEmployeeId.push(employeeId); // pushing object to newArray[]
    } else {
      this.newDropdownEmployee = this.newDropdownEmployee.filter(
        (v) => v !== obj4
      ); // if the checkbox has been unchecked removing the object from the array

      this.dropDownEmployeeId = this.dropDownEmployeeId.filter(
        (x) => x !== employeeId
      );
    }
    console.log(this.newDropdownEmployee);
    this.getList();
  }
  newDropdownPayment: any[] = [];
  applyPaymentType(item, event) {
    console.log(this.selectedBranch, 'selected branch');
    const obj5 = item;
    if (event.target.checked) {
      // checking if the checkbox has been checked

      this.newDropdownPayment.push(obj5); // pushing object to newArray[]
    } else {
      this.newDropdownPayment = this.newDropdownPayment.filter(
        (v) => v !== obj5
      ); // if the checkbox has been unchecked removing the object from the array
    }
    console.log(this.newDropdownPayment);
    this.getList();
  }
  /**
   * remove branch filter
   */
  removeBranchFilter() {
    this.newDropdownBranch = [];
    this.dropDorwnBranch = [];
    this.getList();
  }
  /**
   * remove branch filter
   */
  newDropdownRegisterName: any = [];
  removeRegisterNameFilter() {
    this.newDropdownRegisterName = [];
    this.dropdownRegister = [];
    this.register = false;
    this.getList();
  }
  /**
   * remove branch filter
   */
  newDropdownRegisterNo: any = [];
  removeRegisterNoFilter() {
    this.newDropdownRegisterNo = [];
    this.registerNo = false;
    this.getList();
  }
  /**
   * remove branch filter
   */
  newDropdownEmployee: any = [];
  removeEmployeeFilter() {
    this.newDropdownEmployee = [];
    this.dropDownEmployeeId = [];
    this.employee = false;
    this.getList();
  }
  removeCustomerFilter() {
    this.customerName = false;
  }

  removeCollectionFilter() {
    this.collectionDate = false;
  }
  removePaymentFilter() {
    this.paymentType = false;
    this.newDropdownPayment = [];
    this.getList();
  }
  /**
   * resetting search input field
   */
  removeSearch() {
    this.searchText = '';
    this.sort = 1;
    this.getList();
  }
  customerSearch: string = '';
  removeCustomerSearch() {
    this.customerSearch = '';
    this.sort = 1;
    this.getList();
  }

  // Sorting Functions
  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
    this.getList();
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
    this.getList();
  }
  sortByDate() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
    this.getList();
  }
  sortByCashier() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
    this.getList();
  }
  sortByAmount() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
    this.getList();
  }
  sortByStatus() {
    if (this.sort == 13) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 12 ? 13 : 12;
    }
    this.getList();
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
    this.getList();
  }

  /**
   * search box - get data according to the search
   */
  searchExpenses(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.getList();
    }
    if (text.length == 0) {
      this.getList();
    }
  }
  searchCustomer(event: any) {
    const text = event.target.value;
    if (text.length >= 3) {
      this.customerSearch = text;
      this.pageNo = 0;
      this.getList();
    }
    if (text.length == 0) {
      this.getList();
    }
  }
  /**
   * modal pop-up
   */
  openModalTrigger(item) {
    const modalRef = this.modalService.open(ProvideExpensesModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.registerDetails = item;
    modalRef.componentInstance.sendtoLoadData.subscribe((result: any) => {
      console.log('resendtoLoadDatasult', result);
      this.modalService.dismissAll();
      this.getList();
    });
  }
}
