import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../../../../../services/header.service';
import { RegConfirmComponent } from '../reg-confirm/reg-confirm.component';
import { RegDoneComponent } from '../reg-done/reg-done.component';
import { RegisterSetupService } from '../register-setup.service';

@Component({
  selector: 'app-add-register-and-setup',
  templateUrl: './add-register-and-setup.component.html',
  styleUrls: ['./add-register-and-setup.component.scss'],
})
export class AddRegisterAndSetupComponent implements OnInit {
  registerForm: FormGroup;
  registerId: number;
  roleId: number;
  isEdit: boolean = false;
  isLoading: boolean;

  constructor(
    private registerSetupService: RegisterSetupService,
    private router: Router,
    private modalService: NgbModal,
    public toster: ToastrService,
    private route: ActivatedRoute,
    public headerService: HeaderService,
    private fb: FormBuilder
  ) {}
  submitted = false;
  cities: any = [];
  branches: any = [];
  collectionOrders: any = [];
  collectionOrdersAry: any[] = [];
  currencies: any[] = [];
  deposites: any[] = [];
  users: any[] = [];
  userRoles: any[] = [];
  branchInfo: any;
  isStatus: boolean = true;
  ngOnInit(): void {
    this.getDefaultPermissions();
    this.getForm();
    this.getCollectionOrders();
    this.getCities();
    this.getBranches();
    this.getCurrencies();
    this.getDeposites();
    this.getUsers();
    this.getRoles();

    this.registerId = this.route.snapshot.params['id'];

    if (this.registerId) {
      this.isEdit = true;
      if ((this.isEdit = true)) {
        this.headerService.setTitle('Registers > View register');
      }
      this.GetRegisterDetails();
      // this.getRoleDetails();
    } else {
      this.headerService.setTitle('Registers > Add register');
    }
  }
  cardChange(val: any) {
    if (val.target.checked) {
      this.registerForm.controls['visa'].enable();
      this.registerForm.controls['mastercard'].enable();
      this.registerForm.controls['americanExpress'].enable();
    } else {
      this.registerForm.controls['visa'].disable();
      this.registerForm.controls['mastercard'].disable();
      this.registerForm.controls['americanExpress'].disable();
      this.registerForm.controls['visa'].patchValue(false);
      this.registerForm.controls['mastercard'].patchValue(false);
      this.registerForm.controls['americanExpress'].patchValue(false);
    }
    this.changeSession();
  }
  changeSession() {
    if (
      this.registerForm.value.cash ||
      this.registerForm.value.cards ||
      this.registerForm.value.onAccount
    ) {
      this.registerForm.controls['numberOfSessionsPerDay'].enable();
      this.registerForm.controls['numberOfSessionsPerWeek'].enable();
      this.registerForm.controls['allowOpenWithoutSettlement'].enable();
      // this.registerForm.controls['cashDepositTypeId'].enable();
      this.registerForm.controls['allowedSessionTimeFrom'].enable();
      this.registerForm.controls['allowedSessionTimeTo'].enable();
    } else {
      this.registerForm.controls['numberOfSessionsPerDay'].disable();
      this.registerForm.controls['numberOfSessionsPerWeek'].disable();
      this.registerForm.controls['allowOpenWithoutSettlement'].disable();
      // this.registerForm.controls['cashDepositTypeId'].disable();
      this.registerForm.controls['allowedSessionTimeFrom'].disable();
      this.registerForm.controls['allowedSessionTimeTo'].disable();
      this.registerForm.controls['numberOfSessionsPerDay'].patchValue(null);
      this.registerForm.controls['numberOfSessionsPerWeek'].patchValue(null);
      this.registerForm.controls['allowOpenWithoutSettlement'].patchValue(
        false
      );
      // this.registerForm.controls['cashDepositTypeId'].patchValue(null);
      this.registerForm.controls['allowedSessionTimeFrom'].patchValue(null);
      this.registerForm.controls['allowedSessionTimeTo'].patchValue(null);
    }
  }
  cashChange(val: any) {
    if (val.target.checked) {
      this.registerForm.controls['registerCurrencies'].enable();
    } else {
      this.registerForm.controls['registerCurrencies'].disable();
      this.registerForm.controls['registerCurrencies'].patchValue(null);
    }
    this.changeSession();
  }

  changeSettlement(val: any) {
    if (val.target.checked) {
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerDay'
      ].enable();
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerWeek'
      ].enable();
    } else {
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerDay'
      ].disable();
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerWeek'
      ].disable();
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerDay'
      ].patchValue(null);
      this.registerForm.controls[
        'numberOfOpeningWithoutSettlementPerWeek'
      ].patchValue(null);
    }
  }

  onAccChange(val: any) {
    if (val.target.checked) {
      this.registerForm.controls['cheque'].enable();
      this.registerForm.controls['onCustomerAccount'].enable();
      // this.registerForm.controls['otherRev'].enable();
    } else {
      this.registerForm.controls['cheque'].disable();
      this.registerForm.controls['onCustomerAccount'].disable();
      // this.registerForm.controls['otherRev'].disable();
      this.registerForm.controls['cheque'].patchValue(false);
      this.registerForm.controls['onCustomerAccount'].patchValue(false);
      // this.registerForm.controls['otherRev'].patchValue(false);
    }
    this.changeSession();
  }
  removeregistersName() {
    this.registerForm.get('registersName')?.patchValue('');
  }
  get f() {
    return this.registerForm.controls;
  }

  getForm() {
    this.registerForm = this.fb.group({
      id: [''],
      registersName: [''],
      cash: false,
      onAccount: false,
      cheque: [{ value: false, disabled: true }],
      onCustomerAccount: [{ value: false, disabled: true }],
      cards: [false],
      visa: [{ value: false, disabled: true }],
      mastercard: [{ value: false, disabled: true }],
      americanExpress: [{ value: false, disabled: true }],
      // otherRev: [{ value: false, disabled: true }],

      collectForAllBranches: false,
      collectForOwnBranch: false,

      registerCurrencies: [{ value: [], disabled: true }],
      city: [null, [Validators.required]],
      branchId: [null, [Validators.required]],
      allowedSessionTimeFrom: [{ value: '', disabled: true }],
      allowedSessionTimeTo: [{ value: '', disabled: true }],
      cashDepositTypeId: [null],
      registerEmployees: this.fb.array([]),
      allowOpenWithoutSettlement: [{ value: false, disabled: true }],
      collectionOrders: [null],
      numberOfSessionsPerDay: [{ value: 0, disabled: true }],
      numberOfSessionsPerWeek: [{ value: 0, disabled: true }],
      numberOfOpeningWithoutSettlementPerDay: [{ value: 0, disabled: true }],
      numberOfOpeningWithoutSettlementPerWeek: [{ value: 0, disabled: true }],
      ipAddresses: '',
      status: 2001,
    });
  }
  // , userList = ''
  newEmployee(roleId = null, userId = null) {
    return this.fb.group({
      roleId: [roleId, [Validators.required]],
      userId: [userId, [Validators.required]],
      // userList: ['', [Validators.required]],
    });
  }
  // , userList = ''
  addNewEmployee(roleId = null, userId = null) {
    // userList
    this.employees().push(this.newEmployee(roleId, userId));
  }
  employees(): FormArray {
    return this.registerForm.get('registerEmployees') as FormArray;
  }
  deleteEmployee(employeeIndex) {
    this.employees().removeAt(employeeIndex);
  }

  getBranches() {
    this.registerSetupService
      .getBranches({ Status: 2001, sort: 2, PageSize: 1000 })
      .subscribe((response: any) => {
        this.branches = response.data;
      });
  }

  changeBranch(val: any) {
    //console.log(val);
    this.registerForm.get('city')?.patchValue(val.city);
    this.registerForm.get('branchId')?.patchValue(val.branchId);

    this.registerSetupService
      .getBranchDetails(val.branchId)
      .subscribe((response: any) => {
        this.branchInfo = response.data;
        this.registerForm.controls['allowedSessionTimeFrom'].patchValue(
          this.branchInfo.branchWorkingHours[0].fromTime
        );
        this.registerForm.controls['allowedSessionTimeTo'].patchValue(
          this.branchInfo.branchWorkingHours[0].toTime
        );
        //console.log('branch Info', this.branchInfo);
      });
    //console.log(val.branchId);
  }
  clearBranch() {}
  changeCity(val: any) {
    this.getBranchesByCity(val);
    this.registerForm.get('branchId')?.patchValue(null);
  }

  getBranchesByCity(city) {
    this.registerSetupService
      .getBranches({
        Status: 2001,
        sort: 2,
        Search: city || '',
        PageSize: 1000,
      })
      .subscribe((response: any) => {
        // this.registerForm.get('branchId')?.patchValue('');
        this.branches = response.data;
      });
  }

  branchSelect(item: any) {
    //console.log(item);
  }
  selectOrderCollection(item: number) {
    //console.log(item);
    if (this.collectionOrdersAry.includes(item)) {
      this.collectionOrdersAry.splice(
        this.collectionOrdersAry.indexOf(item),
        1
      );
    } else {
      this.collectionOrdersAry.push(item);
    }
    console.log(this.collectionOrdersAry);
  }

  get rolePermissions() {
    return this.registerForm.controls['rolePermissions'] as FormArray;
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  getCurrencies() {
    this.registerSetupService.getLookupsById(9).subscribe((response: any) => {
      this.currencies = response.data.map((x) => ({
        currencyId: x.id,
        name: x.name[0].lookupName,
      }));
    });
  }
  getDeposites() {
    this.registerSetupService.getLookupsById(8).subscribe((response: any) => {
      this.deposites = response.data.map((x) => ({
        id: x.id,
        name: x.name[0].lookupName,
      }));
    });
  }
  getCollectionOrders() {
    this.registerSetupService.getLookupsById(7).subscribe((response: any) => {
      this.collectionOrders = response.data;
    });
  }
  getCities() {
    this.registerSetupService.getLocations().subscribe((response: any) => {
      this.cities = response.data;

      //console.log('cities', response.data);
    });
  }
  userRoleId: number = 1;
  getUsers() {
    this.registerSetupService
      .getUsers(this.userRoleId)
      .subscribe((response: any) => {
        this.users = response.data;

        // this.employees().controls[0]?.get('userList').patchValue(this.users);
        // console.log(this.employees().controls);
        // console.log(this.registerForm.value);
        //console.log('users', response.data);
      });
  }
  usersall: any;
  getUsersall() {
    this.registerSetupService.getUsersall().subscribe((response: any) => {
      this.usersall = response.data;
    });
  }
  getRoles() {
    this.registerSetupService.getRoles().subscribe((response: any) => {
      this.userRoles = response.data;

      if (this.isEdit == false) {
        // console.log(this.isEdit);
        this.addNewEmployee(1, null);
      }
    });
  }

  getUsersByRole(event, employeeIndex) {
    this.registerSetupService
      .getUsers(event.roleId)
      .subscribe((response: any) => {
        this.users = response.data;
        // this.employees()
        //   .controls[employeeIndex].get('userList')
        //   .patchValue(this.users);

        //console.log('users', response.data);
      });
  }
  AddRolePermissions() {
    return this.fb.group({
      permissionItemId: 0,
      permissionItemDetailId: 0,
    });
  }
  roles: any;
  getDefaultPermissions() {
    return this.registerSetupService
      .getDefaultPermissions()
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
        }
      });
  }
  getRoleDetails() {
    return this.registerSetupService
      .GetRoleDetails(this.roleId)
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
        }
      });
  }

  onSubmit() {
    this.registerForm.controls['collectionOrders'].patchValue(
      this.collectionOrdersAry.map((x) => ({ orderId: x }))
    );
    console.log(this.registerForm.value);

    // this.registerForm
    //   .get('ipAddresses')
    //   ?.patchValue([this.registerForm.get('ipAddresses')?.value]);

    // if (this.registerForm.get('ipAddresses')?.value) {
    //   this.registerForm
    //     .get('ipAddresses')
    //     ?.patchValue(this.registerForm.get('ipAddresses')?.value.split(' '));
    // }

    console.log(this.registerForm.value);
    // console.log(this.registerForm.getRawValue());

    if (this.registerForm.get('id')?.value == 0) {
      this.addRegister();
    } else {
      this.UpdateRegister();
    }
  }
  errorMessage: any;
  errorsList: any;
  ipAdres = [];
  addRegister() {
    this.submitted = true;

    this.registerForm
      .get('registersName')
      ?.patchValue(this.registerForm.get('registersName')?.value.trim());

    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.registerForm
      .get('ipAddresses')
      ?.patchValue(this.registerForm.get('ipAddresses')?.value.split(' '));

    this.registerForm.controls['registerCurrencies'].patchValue(
      this.registerForm.value?.registerCurrencies?.map((x) => ({
        currencyId: x,
      }))
    );
    console.log(this.registerForm.value);
    console.log(this.registerForm.getRawValue());
    this.registerSetupService
      .addRegister(this.registerForm.getRawValue())
      .subscribe(
        (response: any) => {
          if (response.isSuccess == true) {
            console.log(response);
            const modalRef = this.modalService.open(RegDoneComponent);
            modalRef.componentInstance.name = 'add';
            this.isLoading = false;
          } else {
            this.isLoading = false;
            console.log('response-error', response);

            this.registerForm.controls['registerCurrencies'].patchValue(
              this.registerForm.value?.registerCurrencies?.map(
                (x) => x.currencyId
              )
            );
            this.registerForm
              .get('ipAddresses')
              ?.patchValue(this.registerForm.get('ipAddresses')?.value[0]);

            this.errorsList = response.Errors || response.errors;
          }
        },
        (error: any) => {
          this.isLoading = false;
          this.registerForm.controls['registerCurrencies'].setValue(
            this.registerForm.value?.registerCurrencies?.map(
              (x) => x.currencyId
            )
          );
          this.registerForm
            .get('ipAddresses')
            ?.patchValue(this.registerForm.get('ipAddresses')?.value[0]);
          console.log('error2', error);
          console.log('error', error.error.errors);
          this.errorsList = error.error.errors || error.error.Errors;

          console.log(error), (this.errorMessage = error.statusText);

          // this.registerForm.controls['registerCurrencies'].patchValue(
          //   this.registerForm.value?.registerCurrencies?.map((x) => ({
          //     currencyId: x.id,
          //   }))
          // );
        }
      );
  }
  UpdateRegister() {
    this.registerForm.controls['registerCurrencies'].patchValue(
      this.registerForm.value?.registerCurrencies?.map((x) => ({
        currencyId: x,
      }))
    );
    this.registerForm
      .get('ipAddresses')
      ?.patchValue(this.registerForm.get('ipAddresses')?.value.split(' '));

    console.log(this.registerForm.value);
    console.log(this.registerForm.getRawValue());
    this.isLoading = true;

    return this.registerSetupService
      .UpdateRegister(this.registerForm.getRawValue())
      .subscribe(
        (response: any) => {
          if (response.isSuccess == true) {
            console.log(response);
            const modalRef = this.modalService.open(RegDoneComponent);
            modalRef.componentInstance.name = 'edit';
            this.collectionOrdersAry = [];
            this.GetRegisterDetails();
            this.isLoading = false;
            this.isShowRegisterInfo = false;
            this.isBranchLocation = false;
            this.isCollectionOrders = false;
            this.isEmployees = false;
            this.isSetup = false;
          } else {
            this.isLoading = false;
            this.registerForm.controls['registerCurrencies'].setValue(
              this.registerForm.value?.registerCurrencies?.map(
                (x) => x.currencyId
              )
            );

            this.registerForm
              .get('ipAddresses')
              ?.patchValue(this.registerForm.get('ipAddresses')?.value[0]);

            // this.errorsList = response.Errors || response.errors;
          }
        },
        (error: any) => {
          this.isLoading = false;

          this.registerForm.controls['registerCurrencies'].setValue(
            this.registerForm.value?.registerCurrencies?.map(
              (x) => x.currencyId
            )
          );

          this.registerForm
            .get('ipAddresses')
            ?.patchValue(this.registerForm.get('ipAddresses')?.value[0]);
          console.log(error), (this.errorMessage = error.statusText);
        }
      );
  }
  removeBranchName() {
    this.registerForm.get('name')?.patchValue('');
  }

  chooseStatus(val) {
    //this.isStatus = this.isStatus == false ? true : false;
    //this.isStatus = ! this.isStatus
    if (val.target.checked) {
      this.registerForm.get('status')?.patchValue(2001);
    } else {
      this.registerForm.get('status')?.patchValue(2002);
    }
    //console.log(this.registerForm.value.status);
  }

  pushPermissionItemId(e: any, permissionSubCatId) {
    let isExist = this.registerForm.value.rolePermissions.findIndex(
      (elem: any) =>
        elem.permissionItemId === e.target.value ||
        elem.permissionItemId === Number(e.target.value)
    );

    if (isExist !== -1) {
      //console.log('isExist', isExist);
      (this.registerForm.get('rolePermissions') as FormArray).removeAt(isExist);
    } else {
      this.rolePermissions.push(
        this.fb.group({
          permissionItemId: Number(e.target.value),
          permissionItemDetailId: 0,
        })
      );
    }

    //console.log(this.registerForm.value);
  }
  registers: any;
  GetRegisterDetails() {
    return this.registerSetupService
      .GetRegisterDetails(this.registerId)
      .subscribe((response: any) => {
        if (response) {
          this.registers = response.data;
          this.registerForm.patchValue(response.data);

          if (this.registerForm.value.city) {
            this.getBranchesByCity(this.registerForm.value.city);
          }

          if (this.registerForm.get('status')?.value == 2001) {
            this.isStatus = true;
          } else {
            this.isStatus = false;
          }
          this.registers.collectionOrder.forEach((element) => {
            this.collectionOrdersAry.push(element.order[0].lookupId);
          });
          // console.log(this.collectionOrdersAry);

          for (let r = this.employees().value.length - 1; r >= 0; r--) {
            this.employees().removeAt(r);
          }

          // this.userRoleId;
          this.getUsersall();
          this.registers.registerEmployees.forEach((element) => {
            this.employees().push(
              this.fb.group({
                roleId: element.role.roleId,
                userId: element.user.userId,
                // userList: this.usersall,
              })
            );
          });
          // this.employees().controls[0].get('userList').patchValue(this.users);

          // this.registers.registerCurrencies.forEach(element => {
          //   this.registerCurrencies.push(
          //     this.fb.group(element.lookupId)
          //   );
          // });

          if (this.registers.registerCurrencies.length != 0) {
            this.registerForm.controls['registerCurrencies'].enable();
            // this.registers.registerCurrencies
          }

          this.registerForm.controls['registerCurrencies'].patchValue(
            this.registers.registerCurrencies?.map(
              (x) => x.currency[0]?.lookupId
            )
          );

          if (this.registerForm.get('onAccount')?.value == true) {
            this.registerForm.controls['cheque'].enable();
            this.registerForm.controls['onCustomerAccount'].enable();
            this.registerForm.controls['allowOpenWithoutSettlement'].enable();

            // this.registerForm.controls['otherRev'].enable();
          }

          if (this.registerForm.get('cards')?.value == true) {
            this.registerForm.controls['visa'].enable();
            this.registerForm.controls['mastercard'].enable();
            this.registerForm.controls['americanExpress'].enable();
            this.registerForm.controls['allowOpenWithoutSettlement'].enable();
          }
          if (
            this.registerForm.get('allowOpenWithoutSettlement')?.value == true
          ) {
            this.registerForm.controls['allowOpenWithoutSettlement'].enable();

            this.registerForm.controls[
              'numberOfOpeningWithoutSettlementPerDay'
            ].enable();
            this.registerForm.controls[
              'numberOfOpeningWithoutSettlementPerWeek'
            ].enable();
          }

          // if (this.registerForm.get('cashDepositTypeId')?.value) {
          //   this.registerForm.controls['cashDepositTypeId'].enable();
          // }

          if (
            this.registerForm.get('cash')?.value == true ||
            this.registerForm.get('onAccount')?.value == true ||
            this.registerForm.get('cards')?.value == true
          ) {
            this.registerForm.controls['numberOfSessionsPerDay'].enable();
            this.registerForm.controls['numberOfSessionsPerWeek'].enable();
            this.registerForm.controls['allowedSessionTimeFrom'].enable();
            this.registerForm.controls['allowedSessionTimeTo'].enable();
          }

          this.registerForm
            .get('ipAddresses')
            ?.patchValue(this.registers?.registerIpAddresss[0]?.ipAddress);

          // this.registerForm.controls['registerCurrencies'].patchValue(
          //   this.registers.registerCurrencies?.map(
          //     (x) => "id":x.currency[0].lookupId
          //   )
          // );
          // console.log(this.registerForm.value);
        }
      });
  }

  isShowRegisterInfo: boolean = false;
  editRegisterInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowRegisterInfo == false) {
      this.isShowRegisterInfo = true;
      this.isBranchLocation = false;
      this.isCollectionOrders = false;
      this.isEmployees = false;
      this.isSetup = false;
    } else if (this.isShowRegisterInfo == true) {
      const modalRef = this.modalService.open(RegConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowRegisterInfo = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowRegisterInfo = false;
        this.modalService.dismissAll();
      });
    }
  }
  isBranchLocation: boolean = false;
  editBranchLocation() {
    if (this.isBranchLocation == false) {
      this.isBranchLocation = true;
      this.isShowRegisterInfo = false;
      this.isCollectionOrders = false;
      this.isEmployees = false;
      this.isSetup = false;
    } else if (this.isBranchLocation == true) {
      const modalRef = this.modalService.open(RegConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isBranchLocation = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isBranchLocation = false;
        this.modalService.dismissAll();
      });
    }
  }
  isCollectionOrders: boolean = false;
  editCollectionOrders() {
    if (this.isCollectionOrders == false) {
      this.isCollectionOrders = true;
      this.isBranchLocation = false;
      this.isShowRegisterInfo = false;
      this.isEmployees = false;
      this.isSetup = false;
    } else if (this.isCollectionOrders == true) {
      const modalRef = this.modalService.open(RegConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isCollectionOrders = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isCollectionOrders = false;
        this.modalService.dismissAll();
      });
    }
  }
  isEmployees: boolean = false;
  editEmployees() {
    if (this.isEmployees == false) {
      this.isEmployees = true;
      this.isCollectionOrders = false;
      this.isBranchLocation = false;
      this.isShowRegisterInfo = false;
      this.isSetup = false;
    } else if (this.isEmployees == true) {
      const modalRef = this.modalService.open(RegConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isEmployees = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isEmployees = false;
        this.modalService.dismissAll();
      });
    }
  }
  isSetup: boolean = false;
  editSetup() {
    if (this.isSetup == false) {
      this.isSetup = true;
      this.isEmployees = false;
      this.isCollectionOrders = false;
      this.isBranchLocation = false;
      this.isShowRegisterInfo = false;
    } else if (this.isSetup == true) {
      const modalRef = this.modalService.open(RegConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isSetup = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isSetup = false;
        this.modalService.dismissAll();
      });
    }
  }

  chooseAllBranch() {
    this.registerForm.get('collectForAllBranches')?.patchValue(true);
    this.registerForm.get('collectForOwnBranch')?.patchValue(false);
  }
  chooseOwnBranch() {
    this.registerForm.get('collectForOwnBranch')?.patchValue(true);
    this.registerForm.get('collectForAllBranches')?.patchValue(false);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
