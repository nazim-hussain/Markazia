import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-addregister',
  templateUrl: './addregister.component.html',
  styleUrls: ['./addregister.component.scss'],
})
export class AddregisterComponent {
  formGroup: FormGroup;
  registerId: number;
  isEdit: boolean;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private modalService: NgbModal,
    public toster: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  submitted = false;

  ngOnInit(): void {
    this.getForm();
    this.GetLocations();
    this.GetBranches();
    this.CollectioOrders();
    this.GetRoles();
    this.GetUsers();
    this.getCuruncy();

    this.registerId = this.route.snapshot.params['id'];
    if (this.registerId) {
      // this.getRoleDetails();
      this.isEdit == true;
    } else {
    }
  }

  getForm() {
    this.formGroup = this.fb.group({
      registersName: '',
      city: '',
      branchId: 0,
      cash: false,
      onAccount: true,
      cheque: true,
      sparePartsSales: true,
      cards: true,
      visa: true,
      mastercard: true,
      americanExpress: true,
      numberOfSessionsPerDay: 0,
      numberOfSessionsPerWeek: 0,
      allowedSessionTimeFrom: '',
      allowedSessionTimeTo: '',
      allowOpenWithoutSettlement: true,
      numberOfOpeningWithoutSettlementPerDay: 0,
      numberOfOpeningWithoutSettlementPerWeek: 0,
      cashDepositTypeId: 0,
      status: 0,
      registerEmployees: this.fb.array([this.addRegisterEmployees()]),
      collectionOrders: this.fb.array([]),
      registerCurrencies: [],
      // registerCurrencies: this.fb.array([]),
    });
  }
  // UserWorkingHours: this.fb.array([]),
  get registerEmployees() {
    return this.formGroup.controls['registerEmployees'] as FormArray;
  }
  get collectionOrders() {
    return this.formGroup.controls['collectionOrders'] as FormArray;
  }
  get registerCurrencies() {
    return this.formGroup.controls['registerCurrencies'] as FormArray;
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  addRegisterEmployees(): FormGroup {
    return this.fb.group({
      roleId: 0,
      userId: 0,
    });
  }
  AddCollectionOrders() {
    return this.fb.group({
      orderId: 0,
    });
  }
  AddregisterCurrencies() {
    return this.fb.group({
      currencyId: 0,
    });
  }

  pushRegisterEmployees() {
    this.registerEmployees.push(
      this.fb.group({
        roleId: 0,
        userId: 0,
      })
    );

    console.log(this.formGroup.value);
  }

  Remove(i: number) {
    (this.formGroup.get('registerEmployees') as FormArray).removeAt(i);

    // const empAry = <FormArray>(this.formGroup.get('registerEmployees'));

    // empAry.controls[0].get('WalletDiscountValue').patchValue(0);
  }
  errorsList: any;

  onSubmit() {
    // this.submitted = true;

    // if (this.formGroup.invalid) {
    //   return window.scroll(0, 0);
    // }

    for (let r = this.collectionOrders.value.length - 1; r >= 0; r--) {
      this.collectionOrders.removeAt(r);
    }

    for (let w = 0; w < this.collectionAry.length; w++) {
      this.collectionOrders.push(
        this.fb.group({
          orderId: this.collectionAry[w],
        })
      );
    }
    console.log(this.formGroup.value);

    // if (this.formGroup.get('roleId')?.value == 0) {
    //   this.AddRegister();
    // } else {
    //   this.EditRegister();
    // }
  }

  AddRegister() {
    console.log(this.formGroup.value);
    return this.registerService
      .AddRegister(this.formGroup.value)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          const modalRef = this.modalService.open('');
          modalRef.componentInstance.name = 'add';
        } else {
          this.errorsList = response.Errors || response.errors;
        }
      });
  }
  EditRegister() {
    console.log(this.formGroup.value);
    return this.registerService
      .EditRegister(this.formGroup.value)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          const modalRef = this.modalService.open('');
          modalRef.componentInstance.name = 'edit';
        } else {
          this.errorsList = response.Errors || response.errors;
        }
      });
  }

  removeBranchName() {
    this.formGroup.get('FullName')?.patchValue('');
  }
  removeemail() {
    this.formGroup.get('Email')?.patchValue('');
  }
  removephone() {
    this.formGroup.get('Mobile')?.patchValue('');
  }
  isStatus: boolean = true;

  chooseStatus() {
    this.isStatus = this.isStatus == false ? true : false;

    if (this.isStatus == true) {
      this.formGroup.get('status')?.patchValue(2001);
    } else {
      this.formGroup.get('status')?.patchValue(2002);
    }
  }
  collectionAry: any[] = [];

  selectCollection(item: number) {
    console.log(item);
    if (this.collectionAry.includes(item)) {
      this.collectionAry.splice(this.collectionAry.indexOf(item), 1);
    } else {
      this.collectionAry.push(item);
    }
    console.log(this.collectionAry);
  }

  locations: any;
  GetLocations() {
    return this.registerService.GetLocations().subscribe((response: any) => {
      if (response) {
        this.locations = response.data;
      }
    });
  }
  branches: any;
  searchBranch: string = '';

  GetBranches() {
    return this.registerService
      .GetBranches(this.searchBranch)
      .subscribe((response: any) => {
        if (response) {
          this.branches = response.data;
        }
      });
  }

  chooseCity(e) {
    console.log(e);
    this.searchBranch = e;
    this.GetBranches();
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  roles: any;
  GetRoles() {
    this.registerService.GetRoles().subscribe(
      (response: any) => {
        this.roles = response.data;
      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }
  users: any;
  GetUsers() {
    this.registerService.GetUsers().subscribe(
      (response: any) => {
        this.users = response.data;
      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }
  collectioOrders: any;
  CollectioOrders() {
    this.registerService.getLookupsById(7).subscribe(
      (response: any) => {
        this.collectioOrders = response.data;
      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }

  curruncys: any;
  getCuruncy() {
    this.registerService.getLookupsById(9).subscribe(
      (response: any) => {
        // this.curruncys = response.data;
        this.curruncys = response.data.map(x => ({ id: x.id, name: x.name[0].lookupName }));

      },
      (error) => {
        // this.errorMessage = error.message;
      }
    );
  }
}
