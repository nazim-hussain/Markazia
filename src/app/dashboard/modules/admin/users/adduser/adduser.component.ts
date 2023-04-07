import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../../../../../services/header.service';
import { ModalConfirmComponent } from '../modal/modal-confirm/modal-confirm.component';
import { ModalDoneComponent } from '../modal/modal-done/modal-done.component';
import { UserService } from '../user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
  providers: [DatePipe],
})
export class AdduserComponent implements OnInit {
  formGroup: FormGroup;
  userId: number;
  isEdit: boolean;
  isLoading: boolean;
  errorMessage: any;

  constructor(
    private userService: UserService,
    public sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    public toster: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public headerService: HeaderService,
    public datePipe: DatePipe,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  submitted = false;

  ngOnInit(): void {
    this.getForm();
    this.GetLocations();
    this.GetBranches();
    this.GetRoles();

    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      console.log(typeof this.sharedService.getUserId);
      console.log(typeof this.userId);
      this.GetUserDetails();
      this.isEdit = true;
      if ((this.isEdit = true)) {
        this.headerService.setTitle('Users > View user');
      }
    } else {
      this.headerService.setTitle('Users > Add user');
      this.getWorkingHours();
      this.getDefaultPermissions();
    }
  }

  getForm() {
    this.formGroup = this.fb.group({
      userId: 0,
      fullName: '',
      mobile: '',
      email: '',
      branchId: null,
      city: null,
      contractStartDate: '',
      contractEndDate: '',
      roleId: '',
      indoor: false,
      outdoor: false,
      userPermissions: this.fb.array([]),
      userWorkingHours: this.fb.array([]),
      deviceToken: '',
      status: 2001,
    });
  }
  // UserWorkingHours: this.fb.array([]),
  //     userPermissions: this.fb.array([]),

  get userWorkingHours() {
    return this.formGroup.controls['userWorkingHours'] as FormArray;
  }
  get userPermissions() {
    return this.formGroup.controls['userPermissions'] as FormArray;
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  addUserWorkingHours(): FormGroup {
    return this.fb.group({
      dayId: '',
      dayName: '',
      fromTime: '',
      toTime: '',
      selected: true,
      status: 2001,
    });
  }
  AdduserPermissions() {
    return this.fb.group({
      permissionSubCatId: [''],
      permissionItemId: 0,
      permissionItemDetailId: 0,
    });
  }
  errorsList: any;

  onSubmit() {
    console.log(this.formGroup.value);

    this.submitted = true;
    this.formGroup
      .get('fullName')
      ?.patchValue(this.formGroup.get('fullName')?.value.trim());
    // if (this.formGroup.invalid) {
    //   // return window.scroll(0, 0);
    //   return;
    // }
    const myArray = this.formGroup.value.userPermissions.forEach((object) => {
      if (object.permissionItemDetailId == 0) {
        delete object['permissionItemDetailId'];
      }
    });
    console.log(myArray);

    console.log(this.formGroup.value);

    if (this.formGroup.get('userId')?.value == 0) {
      this.AddUser();
    } else {
      this.UpdateUser();
    }
  }

  AddUser() {
    this.isLoading = true;
    if (!this.formGroup.get('mobile')?.value) {
      delete this.formGroup.value.mobile;
    }
    if (!this.formGroup.get('contractStartDate')?.value) {
      delete this.formGroup.value.contractStartDate;
    }
    if (!this.formGroup.get('contractEndDate')?.value) {
      delete this.formGroup.value.contractEndDate;
    }
    console.log(this.formGroup.value);
    return this.userService.AddUser(this.formGroup.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          this.isLoading = false;
          const modalRef = this.modalService.open(ModalDoneComponent);
          modalRef.componentInstance.name = 'add';
        } else {
          this.isLoading = false;
          this.errorsList = response.Errors || response.errors;
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error), (this.errorMessage = error.statusText);
      }
    );
  }
  UpdateUser() {
    console.log(this.formGroup.value);
    this.isLoading = true;
    return this.userService.EditUser(this.formGroup.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          this.isLoading = false;
          this.isShowUserInfo = false;
          this.isShowLocation = false;
          this.isShowWorkingHoursn = false;
          this.isShowRolesPErmission = false;
          this.isShowpermisionsRoles = false;

          const modalRef = this.modalService.open(ModalDoneComponent);
          modalRef.componentInstance.name = 'edit';
        } else {
          this.isLoading = false;
          this.errorsList = response.Errors || response.errors;
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error), (this.errorMessage = error.statusText);
      }
    );
  }

  // AddUser() {
  //   const formData = new FormData();
  //   formData.append('FullName', this.formGroup.get('FullName')?.value);
  //   formData.append('Email', this.formGroup.get('Email')?.value);
  //   formData.append('Mobile', this.formGroup.get('Mobile')?.value);
  //   formData.append('BranchId', this.formGroup.get('BranchId')?.value);
  //   formData.append('City', this.formGroup.get('City')?.value);
  //   formData.append(
  //     'ContractStartDate',
  //     this.formGroup.get('ContractStartDate')?.value
  //   );
  //   formData.append(
  //     'ContractEndDate',
  //     this.formGroup.get('ContractEndDate')?.value
  //   );

  //   formData.append('RoleId', this.formGroup.get('RoleId')?.value);
  //   formData.append('Indoor', this.formGroup.get('Indoor')?.value);
  //   formData.append('Outdoor', this.formGroup.get('Outdoor')?.value);
  //   formData.append('ProfileImage', this.formGroup.get('ProfileImage')?.value);

  //   formData.append('Password', this.formGroup.get('userPermissions')?.value);
  //   formData.append('PasswordConfirm', this.formGroup.get('Password')?.value);
  //   formData.append(
  //     'DeviceToken',
  //     this.formGroup.get('PasswordConfirm')?.value
  //   );
  //   formData.append('status', this.formGroup.get('status')?.value);
  //   formData.append(
  //     'UserWorkingHours',
  //     JSON.stringify(this.formGroup.get('UserWorkingHours')?.value)
  //   );
  //   formData.append(
  //     'userPermissions',
  //     JSON.stringify(this.formGroup.get('userPermissions')?.value)
  //   );

  //   formData.append("userId", this.sharedService.UserId);
  //   formData.append('userId', '5fef6b2c6821ff3678cbe280');
  //   formData.append("image", this.imageURL);

  //   console.log(formData);
  //   return this.userService.AddUser(formData).subscribe((response: any) => {
  //     if (response) {
  //       console.log(response);
  //       this.router.navigate(['/']);
  //     } else {
  //     }
  //   });
  // }

  removeUserName() {
    this.formGroup.get('fullName')?.patchValue('');
  }
  removeemail() {
    this.formGroup.get('email')?.patchValue('');
  }
  removephone() {
    this.formGroup.get('mobile')?.patchValue('');
  }
  isStatus: boolean = true;

  chooseStatus() {
    this.isStatus = this.isStatus == false ? true : false;

    if (this.isStatus == true) {
      console.log(this.isStatus);
      this.formGroup.get('status')?.patchValue(2002);
    } else {
      this.formGroup.get('status')?.patchValue(2001);
    }
  }

  chooseTime(value: any, i) {
    console.log(value);
    value == true;
    if (value == true) {
      this.formGroup.get('userWorkingHours')['at'](i).get('fromTime').enable();

      this.formGroup.get('userWorkingHours')['at'](i).get('toTime').enable();
      this.formGroup
        .get('userWorkingHours')
        ['at'](i)
        .get('status')
        .patchValue(2001);
    } else {
      this.formGroup
        .get('userWorkingHours')
        ['at'](i)
        .get('status')
        .patchValue(2002);

      this.formGroup.get('userWorkingHours')['at'](i).get('fromTime').disable();

      this.formGroup.get('userWorkingHours')['at'](i).get('toTime').disable();
    }
  }

  GetUserDetails() {
    this.userService.GetUserDetails(this.userId).subscribe((response: any) => {
      if (response) {
        // console.log(response);

        const userDetails = response.data;
        this.formGroup.patchValue(userDetails);
        this.formGroup.get('branchId')?.patchValue(userDetails.branch.branchId);
        this.formGroup.get('roleId')?.patchValue(userDetails.role.roleId);

        this.formGroup
          .get('contractStartDate')
          ?.patchValue(
            this.datePipe.transform(userDetails.contractStartDate, 'yyyy-MM-dd')
          );
        this.formGroup
          .get('contractEndDate')
          ?.patchValue(
            this.datePipe.transform(userDetails.contractEndDate, 'yyyy-MM-dd')
          );

        if (this.formGroup.value.status == 2001) {
          this.isStatus = true;
        } else {
          this.isStatus = false;
        }

        if (this.formGroup.value.city) {
          this.searchBranch = this.formGroup.value.city;
          this.GetBranches();
        }

        // for (let r = this.userWorkingHours.value.length - 1; r >= 0; r--) {
        //   this.userWorkingHours.removeAt(r);
        // }
        // console.log(
        //   'userDetails.userWorkingHours',
        //   userDetails.userWorkingHours
        // );

        for (let w = 0; w < userDetails.userWorkingHours.length; w++) {
          // console.log(
          //   'userDetails.userWorkingHours',
          //   userDetails.userWorkingHours
          // );
          this.userWorkingHours.push(
            this.fb.group({
              dayId: userDetails.userWorkingHours[w].dayId,
              dayName: userDetails.userWorkingHours[w].day[0].lookupName,
              fromTime: userDetails.userWorkingHours[w]?.fromTime,
              toTime: userDetails.userWorkingHours[w]?.toTime,
              selected: userDetails.userWorkingHours[w].selected,
              status: userDetails.userWorkingHours[w].status,
            })
          );
        }

        this.roles = userDetails.permissions;

        for (let x = 0; x < this.roles?.length; x++) {
          for (
            let c = 0;
            c < this.roles[x]?.permissionSubCategories?.length;
            c++
          ) {
            for (
              let i = 0;
              i <
              this.roles[x].permissionSubCategories[c].permissionItems?.length;
              i++
            ) {
              if (
                this.roles[x].permissionSubCategories[c].permissionItems[i]
                  .selected == true
              ) {
                this.userPermissions.push(
                  this.fb.group({
                    permissionSubCatId:
                      this.roles[x].permissionSubCategories[c]
                        .permissionSubCatId,
                    permissionItemId:
                      this.roles[x].permissionSubCategories[c].permissionItems[
                        i
                      ].permissionItemId,
                  })
                );

                for (
                  let d = 0;
                  d <
                  this.roles[x].permissionSubCategories[c].permissionItems[i]
                    .permissionItemDetails?.length;
                  d++
                ) {
                  if (
                    this.roles[x].permissionSubCategories[c].permissionItems[i]
                      .permissionItemDetails[d].selected == true
                  ) {
                    this.userPermissions.push(
                      this.fb.group({
                        permissionSubCatId:
                          this.roles[x].permissionSubCategories[c]
                            .permissionSubCatId,
                        permissionItemId:
                          this.roles[x].permissionSubCategories[c]
                            .permissionItems[i].permissionItemId,
                        permissionItemDetailId:
                          this.roles[x].permissionSubCategories[c]
                            .permissionItems[i].permissionItemDetails[d]
                            .permissionItemDetailsId,
                      })
                    );
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  locations: any;
  GetLocations() {
    return this.userService.GetLocations().subscribe((response: any) => {
      if (response) {
        this.locations = response.data;
      }
    });
  }
  branches: any;
  searchBranch: string = '';

  GetBranches() {
    return this.userService
      .GetBranches(this.searchBranch)
      .subscribe((response: any) => {
        if (response) {
          this.branches = response.data;
        }
      });
  }

  getBranchDetails(e) {
    console.log(e);
    this.formGroup.get('city').patchValue(e.city);

    this.userService.getBranchDetails(e.branchId).subscribe((response: any) => {
      if (response) {
        console.log(response);
        const branchDetails = response.data;

        for (let r = this.userWorkingHours.value.length - 1; r >= 0; r--) {
          this.userWorkingHours.removeAt(r);
        }

        for (let w = 0; w < branchDetails.branchWorkingHours.length; w++) {
          this.userWorkingHours.push(
            this.fb.group({
              dayId: branchDetails.branchWorkingHours[w].dayId,
              dayName: branchDetails.branchWorkingHours[w].day[0].lookupName,
              fromTime: branchDetails.branchWorkingHours[w].fromTime,
              toTime: branchDetails.branchWorkingHours[w].toTime,
              selected: branchDetails.branchWorkingHours[w].selected,
              status: branchDetails.branchWorkingHours[w].status,
            })
          );
        }
      }
    });
  }
  rolesList: any;
  GetRoles() {
    return this.userService.GetRoles().subscribe((response: any) => {
      if (response) {
        this.rolesList = response.data;
      }
    });
  }
  roles: any;

  getRoleDetails(e) {
    return this.userService
      .GetRoleDetails(e.roleId)
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data.permissions;

          for (let r = this.userPermissions.value.length - 1; r >= 0; r--) {
            this.userPermissions.removeAt(r);
          }

          // this.formGroup.patchValue(response.data);
          this.formGroup.get('indoor')?.patchValue(response.data?.indoor);
          this.formGroup.get('outdoor')?.patchValue(response.data?.outdoor);
          console.log('selected', this.roles?.permissionSubCategories);

          for (let x = 0; x < this.roles?.length; x++) {
            for (
              let c = 0;
              c < this.roles[x]?.permissionSubCategories?.length;
              c++
            ) {
              for (
                let i = 0;
                i <
                this.roles[x].permissionSubCategories[c].permissionItems
                  ?.length;
                i++
              ) {
                if (
                  this.roles[x].permissionSubCategories[c].permissionItems[i]
                    .selected == true
                ) {
                  this.userPermissions.push(
                    this.fb.group({
                      permissionSubCatId:
                        this.roles[x].permissionSubCategories[c]
                          .permissionSubCatId,
                      permissionItemId:
                        this.roles[x].permissionSubCategories[c]
                          .permissionItems[i].permissionItemId,
                    })
                  );

                  for (
                    let d = 0;
                    d <
                    this.roles[x].permissionSubCategories[c].permissionItems[i]
                      .permissionItemDetails?.length;
                    d++
                  ) {
                    if (
                      this.roles[x].permissionSubCategories[c].permissionItems[
                        i
                      ].permissionItemDetails[d].selected == true
                    ) {
                      this.userPermissions.push(
                        this.fb.group({
                          permissionSubCatId:
                            this.roles[x].permissionSubCategories[c]
                              .permissionSubCatId,
                          permissionItemId:
                            this.roles[x].permissionSubCategories[c]
                              .permissionItems[i].permissionItemId,
                          permissionItemDetailId:
                            this.roles[x].permissionSubCategories[c]
                              .permissionItems[i].permissionItemDetails[d]
                              .permissionItemDetailsId,
                        })
                      );
                    }
                  }
                }
              }
            }
          }

          setTimeout(() => {
            console.log(this.formGroup.value);
          }, 2000);
        }
      });
  }
  chooseCity(e) {
    console.log(e);
    this.searchBranch = e;
    this.formGroup.get('branchId')?.patchValue('');
    this.GetBranches();
  }
  getbranchList(e) {
    console.log('e', e);
    this.searchBranch = '';

    for (let r = this.userWorkingHours.value.length - 1; r >= 0; r--) {
      this.userWorkingHours.removeAt(r);
    }
    this.GetBranches();
  }
  clearBranchData(e) {
    console.log('clear branch', e);
    for (let r = this.userWorkingHours.value.length - 1; r >= 0; r--) {
      this.userWorkingHours.removeAt(r);
    }
    // this.searchBranch = '';
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  pushPermissionItemId(e: any, permissionItem, supItem) {
    console.log(permissionItem);
    console.log(supItem);


    let isExist = this.formGroup.value.userPermissions.findIndex(
      (elem: any) => elem.permissionItemId === supItem.permissionItemId
    );
    this.formGroup.value.userPermissions.forEach((element) => {
      console.log(element.permissionSubCatId);

      let PSubCatId = this.formGroup.value.userPermissions.findIndex(
        (subCat: any) =>
          subCat.permissionSubCatId === permissionItem.permissionSubCatId
      );

      if (PSubCatId !== -1) {
        console.log('PSubCatId', PSubCatId);
        (this.formGroup.get('userPermissions') as FormArray).removeAt(
          PSubCatId
        );
      }
    });

    let PSubCatId = this.formGroup.value.userPermissions.findIndex(
      (subCat: any) =>
        subCat.permissionSubCatId === permissionItem.permissionSubCatId
    );

    console.log(PSubCatId);



    if (isExist !== -1) {
      console.log('isExist', isExist);
      (this.formGroup.get('userPermissions') as FormArray).removeAt(isExist);

      if (PSubCatId !== -1) {
        console.log('PSubCatId', PSubCatId);
        (this.formGroup.get('userPermissions') as FormArray).removeAt(
          PSubCatId
        );
      }
    } else {
      // if (PSubCatId !== -1) {
      //   console.log('PSubCatId', PSubCatId);
      //   (this.formGroup.get('userPermissions') as FormArray).removeAt(
      //     PSubCatId
      //   );
      // }

      this.userPermissions.push(
        this.fb.group({
          permissionSubCatId: permissionItem.permissionSubCatId,
          permissionItemId: supItem.permissionItemId,
          permissionItemDetailId: 0,
        })
      );

      supItem.permissionItemDetails.forEach((element) => {
        this.userPermissions.push(
          this.fb.group({
            permissionSubCatId: permissionItem.permissionSubCatId,
            permissionItemId: supItem.permissionItemId,
            permissionItemDetailId: element.permissionItemDetailsId,
          })
        );
      });
    }

    // let PSubCatId = this.formGroup.value.userPermissions.findIndex(
    //   (subCat: any) => subCat.permissionSubCatId === permissionSubCatId
    // );

    // if (PSubCatId !== -1) {
    // console.log('isExist', PSubCatId);
    // (this.formGroup.get('userPermissions') as FormArray).removeAt(PSubCatId);

    // let isExist = this.formGroup.value.userPermissions.findIndex(
    //   (elem: any) =>
    //     elem.permissionItemId === e.target.value ||
    //     elem.permissionItemId === Number(e.target.value)
    // );

    // if (isExist !== -1) {
    //   console.log('isExist', isExist);
    //   (this.formGroup.get('userPermissions') as FormArray).removeAt(isExist);
    // } else {
    //   this.userPermissions.push(
    //     this.fb.group({
    //       permissionSubCatId: permissionSubCatId,
    //       permissionItemId: e.target.value,
    //       permissionItemDetailId: 0,
    //     })
    //   );
    // }
    // } else {
    console.log(this.formGroup.value);
  }

  isChecked(sitemid: string): boolean {
    // console.log('sitemid', sitemid);
    return this.formGroup.value.userPermissions.find(
      (x) => x.permissionItemId === sitemid
    );
  }

  pushPermissionItemDetailId(e: any, permissionItemId, sub) {
    let isExist = this.formGroup.value.userPermissions.findIndex(
      (elem: any) =>
        elem.permissionItemDetailId === e.target.value ||
        elem.permissionItemDetailId === Number(e.target.value)
    );

    if (isExist !== -1) {
      console.log('isExist', isExist);
      (this.formGroup.get('userPermissions') as FormArray).removeAt(isExist);
    } else {
      this.userPermissions.push(
        this.fb.group({
          permissionItemId: sub.permissionItemId,
          permissionItemDetailId: Number(e.target.value),
        })
      );
    }

    console.log(this.formGroup.value);
  }

  isCollapse: boolean;
  isIndex: number;
  isShow: false;
  collapseList2(i, id: number) {
    console.log(i, id);
    this.isCollapse = true;
    this.isIndex = i;
  }
  public ExpandRow: number;
  collapseList(item, i) {
    this.isShowpermisionsRoles = false;
    this.catRow = 55;

    if (this.ExpandRow == undefined || this.ExpandRow != i) {
      this.ExpandRow = i;
      // this.GetEmployeeTimeSlots(item);
    } else {
      this.ExpandRow = undefined;
    }
  }

  isShowpermisionsRoles: boolean = false;
  catNo: number = 9;

  public catRow: number;

  editrolesList(i) {
    // this.isShowBranchAdmin = this.isShowBranchAdmin == false ? true : false;
    if (this.catRow == undefined || this.catRow != i) {
      this.catRow = i;
      // this.GetEmployeeTimeSlots(item);
    } else {
      this.catRow = undefined;
    }
    if (this.isShowpermisionsRoles == false) {
      this.isShowpermisionsRoles = true;
    } else if (this.isShowpermisionsRoles == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'edit';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowpermisionsRoles = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
    }
  }

  isShowUserInfo: boolean = false;
  editUserInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowUserInfo == false) {
      this.isShowUserInfo = true;
      this.isShowRolesPErmission = false;
      this.isShowWorkingHoursn = false;
      this.isShowLocation = false;
      this.isShowpermisionsRoles = false;
    } else if (this.isShowUserInfo == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowUserInfo = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowUserInfo = false;
        this.modalService.dismissAll();
      });
    }
  }

  isShowLocation: boolean = false;
  editLocationInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowLocation == false) {
      this.isShowLocation = true;
      this.isShowUserInfo = false;
      this.isShowWorkingHoursn = false;
      this.isShowRolesPErmission = false;
      this.isShowpermisionsRoles = false;
    } else if (this.isShowLocation == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        // console.log('result', result);
        this.isShowLocation = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
        console.log('onSubmit');
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowLocation = false;
        this.modalService.dismissAll();
      });
    }
  }

  isShowWorkingHoursn: boolean = false;
  editWorkingHoursInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowWorkingHoursn == false) {
      this.isShowWorkingHoursn = true;
      this.isShowLocation = false;
      this.isShowUserInfo = false;
      this.isShowRolesPErmission = false;
      this.isShowpermisionsRoles = false;
    } else if (this.isShowWorkingHoursn == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'edit';
      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowWorkingHoursn = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowWorkingHoursn = false;
        this.modalService.dismissAll();
      });
    }
  }

  isShowRolesPErmission: boolean = false;
  editRolesPErmission() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowRolesPErmission == false) {
      this.isShowRolesPErmission = true;
      this.isShowWorkingHoursn = false;
      this.isShowLocation = false;
      this.isShowUserInfo = false;
      this.isShowpermisionsRoles = false;
    } else if (this.isShowRolesPErmission == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'edit';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowRolesPErmission = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowRolesPErmission = false;
        this.modalService.dismissAll();
      });
    }
  }
  getWorkingHours() {
    this.userService.getLookupsById(6).subscribe(
      (response: any) => {
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
          this.userWorkingHours.push(
            this.fb.group({
              dayId: response.data[i]?.id,
              dayName: response.data[i]?.description,
              fromTime: '09:00',
              toTime: '17:00',
              selected: true,
              isActive: true,
              status: 2001,
            })
          );
        }
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  // roles: any;
  getDefaultPermissions() {
    return this.userService
      .getDefaultPermissions()
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
        }
      });
  }
  checkSpecialChar(e) {
    var k;
    document.all ? (k = e.keyCode) : (k = e.which);
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );

    // var regex = new RegExp("^[a-zA-Zء-ي0-9.]+$");
  }
}
