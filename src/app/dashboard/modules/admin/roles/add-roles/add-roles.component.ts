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
import { ConfirmRoleComponent } from '../confirm-role/confirm-role.component';
import { RoleDoneComponent } from '../role-done/role-done.component';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss'],
})
export class AddRolesComponent implements OnInit {
  formGroup: FormGroup;

  roleId: number;
  isLoading: boolean;
  errorMessage: any;

  isEdit: boolean;

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private modalService: NgbModal,
    public toster: ToastrService,
    private route: ActivatedRoute,
    public headerService: HeaderService,
    private fb: FormBuilder,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  submitted = false;

  ngOnInit(): void {
    this.getForm();

    this.roleId = this.route.snapshot.params['id'];
    if (this.roleId) {
      this.getRoleDetails();
      this.isEdit = true;
      if ((this.isEdit = true)) {
        this.headerService.setTitle('Roles > View role');
      }
    } else {
      this.headerService.setTitle('Roles > Add role');
      this.getDefaultPermissions();
    }
  }

  getForm() {
    this.formGroup = this.fb.group({
      roleId: 0,
      name: [''],
      indoor: false,
      outdoor: false,
      status: 2001,
      rolePermissions: this.fb.array([]),
    });
  }

  get rolePermissions() {
    return this.formGroup.controls['rolePermissions'] as FormArray;
  }
  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
  AddRolePermissions() {
    return this.fb.group({
      permissionSubCatId: [''],
      permissionItemId: 0,
      permissionItemDetailId: 0,
    });
  }
  roles: any;
  getDefaultPermissions() {
    return this.rolesService
      .getDefaultPermissions()
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data;
        }
      });
  }
  getRoleDetails() {
    return this.rolesService
      .GetRoleDetails(this.roleId)
      .subscribe((response: any) => {
        if (response) {
          this.roles = response.data.permissions;

          this.formGroup.patchValue(response.data);
          // this.formGroup.get('adminUser')?.patchValue();

          if (this.formGroup.get('status')?.value == 2001) {
            this.isStatus = true;
          } else {
            this.isStatus = false;
          }

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
                  this.rolePermissions.push(
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
                      this.rolePermissions.push(
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
  errorsList: any;

  onSubmit() {
    this.submitted = true;
    this.formGroup
      .get('name')
      ?.patchValue(this.formGroup.get('name')?.value.trim());
    if (this.formGroup.invalid) {
      return window.scroll(0, 0);
    }

    //   const myArray = this.formGroup.value.rolePermissions.filter((item:any ) => {
    //     console.log(item)
    //     return item.permissionItemDetailId !== 0;
    // });
    const myArray = this.formGroup.value.rolePermissions.forEach((object) => {
      if (object.permissionItemDetailId == 0) {
        delete object['permissionItemDetailId'];
      }
    });
    // permissionSubCatId: [''],
    // permissionItemId: 0,
    // permissionItemDetailId: 0,
    console.log(myArray);
    console.log(this.formGroup.value);

    if (this.formGroup.get('roleId')?.value == 0) {
      this.AddRole();
    } else {
      this.UpdateRole();
    }
  }
  AddRole() {
    this.isLoading = true;
    console.log(this.formGroup.value);
    return this.rolesService.AddRole(this.formGroup.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          this.isLoading = false;
          console.log(response);
          const modalRef = this.modalService.open(RoleDoneComponent);
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
  UpdateRole() {
    this.isLoading = true;
    console.log(this.formGroup.value);
    return this.rolesService.UpdateRole(this.formGroup.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          const modalRef = this.modalService.open(RoleDoneComponent);
          modalRef.componentInstance.name = 'edit';
          this.isLoading = false;
          this.isShowpermisionsRoles = false;
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
  removeBranchName() {
    this.formGroup.get('name')?.patchValue('');
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

  pushPermissionItemId(e: any, permissionItem, supItem) {
    console.log(permissionItem);
    console.log(supItem);

    let isExist = this.formGroup.value.rolePermissions.findIndex(
      (elem: any) => elem.permissionItemId === supItem.permissionItemId
    );

    this.formGroup.value.rolePermissions.forEach((element) => {
      console.log(element.permissionSubCatId);

      let PSubCatId = this.formGroup.value.rolePermissions.findIndex(
        (subCat: any) =>
          subCat.permissionSubCatId === permissionItem.permissionSubCatId
      );

      if (PSubCatId !== -1) {
        console.log('PSubCatId', PSubCatId);
        (this.formGroup.get('rolePermissions') as FormArray).removeAt(
          PSubCatId
        );
      }
    });
    // hash

    // let PSubCatId = this.formGroup.value.rolePermissions.findIndex(
    //   (subCat: any) =>
    //     subCat.permissionSubCatId === permissionItem.permissionSubCatId
    // );

    // console.log(PSubCatId);

    if (isExist !== -1) {
      console.log('isExist', isExist);
      (this.formGroup.get('rolePermissions') as FormArray).removeAt(isExist);

      // hash
      // if (PSubCatId !== -1) {
      //   console.log('PSubCatId', PSubCatId);
      //   (this.formGroup.get('rolePermissions') as FormArray).removeAt(
      //     PSubCatId
      //   );
      // }
    } else {
      // if (PSubCatId !== -1) {
      //   console.log('PSubCatId', PSubCatId);
      //   (this.formGroup.get('rolePermissions') as FormArray).removeAt(
      //     PSubCatId
      //   );
      // }

      this.rolePermissions.push(
        this.fb.group({
          permissionSubCatId: permissionItem.permissionSubCatId,
          permissionItemId: supItem.permissionItemId,
          permissionItemDetailId: 0,
        })
      );

      supItem.permissionItemDetails.forEach((element) => {
        this.rolePermissions.push(
          this.fb.group({
            permissionSubCatId: permissionItem.permissionSubCatId,
            permissionItemId: supItem.permissionItemId,
            permissionItemDetailId: element.permissionItemDetailsId,
          })
        );
      });
    }

    // let PSubCatId = this.formGroup.value.rolePermissions.findIndex(
    //   (subCat: any) => subCat.permissionSubCatId === permissionSubCatId
    // );

    // if (PSubCatId !== -1) {
    // console.log('isExist', PSubCatId);
    // (this.formGroup.get('rolePermissions') as FormArray).removeAt(PSubCatId);

    // let isExist = this.formGroup.value.rolePermissions.findIndex(
    //   (elem: any) =>
    //     elem.permissionItemId === e.target.value ||
    //     elem.permissionItemId === Number(e.target.value)
    // );

    // if (isExist !== -1) {
    //   console.log('isExist', isExist);
    //   (this.formGroup.get('rolePermissions') as FormArray).removeAt(isExist);
    // } else {
    //   this.rolePermissions.push(
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
    return this.formGroup.value.rolePermissions.find(
      (x) => x.permissionItemId === sitemid
    );
  }

  pushPermissionItemDetailId(e: any, permissionItemId, sub) {
    let isExist = this.formGroup.value.rolePermissions.findIndex(
      (elem: any) =>
        elem.permissionItemDetailId === e.target.value ||
        elem.permissionItemDetailId === Number(e.target.value)
    );

    if (isExist !== -1) {
      console.log('isExist', isExist);
      (this.formGroup.get('rolePermissions') as FormArray).removeAt(isExist);
    } else {
      this.rolePermissions.push(
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
  public editRow: boolean = true;
  editrolesList(i) {
    // this.isShowBranchAdmin = this.isShowBranchAdmin == false ? true : false;
    if (this.catRow == undefined || this.catRow != i) {
      this.catRow = i;
      this.editRow = true;

      // this.GetEmployeeTimeSlots(item);
    } else {
      this.catRow = undefined;
    }
    if (this.isShowpermisionsRoles == false) {
      this.isShowpermisionsRoles = true;
    } else if (this.isShowpermisionsRoles == true) {
      const modalRef = this.modalService.open(ConfirmRoleComponent);
      modalRef.componentInstance.name = 'World';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowpermisionsRoles = false;
        this.modalService.dismissAll();
        // this.updateBranch();
        this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowpermisionsRoles = false;
        this.modalService.dismissAll();
      });
    }
  }
  checkSpecialChar(e) {
    // var term = 'e';
    // var re = new RegExp(/^([a-zA-Z0-9_\u0600-\u06FF]).{0,30}$/);
    // if (re.test(term)) {
    //   console.log('Valid');
    // } else {
    //   console.log('Invalid');
    // }
    // '/^([a-zA-Z0-9_\u0600-\u06FF]).{0,30}$/'
    var term = e;
    var re = new RegExp('/^([a-zA-Z0-9_\u0600-\u06FF]).{0,30}$/');
    if (re.test(term)) {
      console.log('Valid');
    } else {
      console.log('Invalid');
    }

    // var regex = /^([a-zA-Z0-9_\u0600-\u06FF]).{0,30}$/;
    // var result = regex.test('happy- - - /*  */ % ! ~');
    // console.log(result);
    // /^[a-zA-Z\u0600-\u06FF,-\s\d][\s\d\a-zA-Z\u0600-\u06FF,-]*$/i
    // var k;
    // document.all ? (k = e.keyCode) : (k = e.which);
    // return (
    //   (k > 64 && k < 91) ||
    //   (k > 96 && k < 123) ||
    //   (k >= 97 && k <= 123) ||
    //   k == 8 ||
    //   k == 32 ||
    //   (k >= 48 && k <= 57)
    // );
  }
}
