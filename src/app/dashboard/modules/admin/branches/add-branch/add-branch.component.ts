import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { BranchService } from '../services/branch.service';
import { ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ModalDoneComponent } from '../modal-done/modal-done.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { HeaderService } from '../../../../../services/header.service';

interface marker {
  lat: number;
  lng: number;
  label?: any;
  draggable: boolean;
}

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
})
export class AddBranchComponent implements OnInit {
  // @ViewChild('search')

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  branchForm!: FormGroup;
  formModel: any = {};
  errorMessage: any;
  branchWorkingHoursList: any = [];
  response: any = {};
  branchAdmin: any = [];
  branchTypes: any = [];
  branchId!: number;
  branchTypesAry: any[] = [];
  address!: string;
  pageType: string = 'Add';
  isEdit: boolean = false;
  private geoCoder: any;
  isStatus: boolean = true;
  zoom: number = 15;
  submitted = false;
  lat: any;
  lng: any;
  isLoading: boolean;
  searchText: string = '';
  // lat: number = 35.8645648;
  // lng: number = 31.97258070000001;

  markerDragEnd($event: MouseEvent) {
    console.log('dragEnd', $event);
    console.log('dragEnd', $event.coords.lat, $event.coords.lng);
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    console.log('mmmm');
    this.getAddressBylangLat(this.lat, this.lng);

    // this.getAddress(this.latitude, this.longitude);
    this.branchForm.get('latitude')?.setValue(this.lat.toString());
    this.branchForm.get('longitude')?.setValue(this.lng.toString());
  }

  // markers: marker[] = [
  //   {
  //     lat: 31.2798855,
  //     lng: 37.122627,
  //     draggable: true,
  //   },
  // ];

  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private httpserviceService: HttpserviceService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    // public searchElementRef: ElementRef,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public headerService: HeaderService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    console.log(this.searchElementRef);
    this.branchId = this.route.snapshot.params['id'];
    if (this.branchId) {
      this.isEdit = true;

      if ((this.isEdit = true)) {
        this.headerService.setTitle('Branches > View branch');
      }
    } else {
      this.headerService.setTitle('Branches > Add branch');
    }

    if (!this.branchId) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('pos', pos);
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        this.branchForm.get('latitude')?.setValue(this.lat.toString());
        this.branchForm.get('longitude')?.setValue(this.lng.toString());
      });
    }

    this.getFormData();
    // this.getAddressBylangLat();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          // types: ["address"]
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place);
          // console.log(place.name);
          // console.log(place.formatted_address);
          // console.log(place.address_components.reverse());

          let locationData = place.address_components.reverse();

          console.log(locationData);

          this.branchForm.get('address')?.setValue(place.formatted_address);

          this.branchForm.get('country')?.setValue(locationData[0]?.long_name);
          this.branchForm
            .get('city')
            ?.setValue(locationData[1]?.long_name || '');

          this.branchForm
            .get('branchArea')
            ?.setValue(locationData[3]?.long_name || '');

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;

          console.log(this.lat);
          console.log(this.lng);
          this.branchForm
            .get('longitude')
            ?.setValue(place.geometry.location.lng().toString());
          this.branchForm
            .get('latitude')
            ?.setValue(place.geometry.location.lat().toString());

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
        });
      });
    });

    this.getBranchTypes();
    this.getBranchAdmin();

    if (!this.branchId) {
      this.getWorkingHours();
    }
    if (this.branchId) {
      this.getBranchDetails();
      this.isEdit = true;
      this.pageType = 'View';
    }
  }

  // zoom: number = 8;

  // // initial center position for the map
  // lat: number = 51.673858;
  // lng: number = 7.815982;
  // previous: any;

  getFormData() {
    this.branchForm = this.fb.group({
      branchId: 0,
      branchName: '',
      phone: [''],
      email: ['', [Validators.email]],
      country: [''],
      city: [''],
      branchArea: [''],
      address: [''],
      longitude: [''],
      latitude: [''],
      status: 2001,
      adminUser: null,
      branchTypes: [0, [Validators.required]],
      branchWorkingHours: this.fb.array([]),
    });
  }

  addBranchWorkingHours(): FormGroup {
    return this.fb.group({
      dayId: '',
      dayName: '',
      fromTime: '',
      toTime: '',
      isActive: true,
      status: 2001,
    });
  }

  chooseTime(value: any, i) {
    console.log(value);
    value == true;
    if (value == true) {
      this.branchForm
        .get('branchWorkingHours')
        ['at'](i)
        .get('fromTime')
        .enable();

      this.branchForm.get('branchWorkingHours')['at'](i).get('toTime').enable();
      this.branchForm
        .get('branchWorkingHours')
        ['at'](i)
        .get('status')
        .patchValue(2001);
    } else {
      this.branchForm
        .get('branchWorkingHours')
        ['at'](i)
        .get('status')
        .patchValue(2002);

      this.branchForm
        .get('branchWorkingHours')
        ['at'](i)
        .get('fromTime')
        .disable();

      this.branchForm
        .get('branchWorkingHours')
        ['at'](i)
        .get('toTime')
        .disable();
    }
  }
  chooseStatus() {
    // this.isStatus = this.isStatus == false ? true : false;

    if (this.isStatus == true) {
      this.branchForm.get('status')?.patchValue(2001);
    } else {
      this.branchForm.get('status')?.patchValue(2002);
    }
  }
  get branchWorkingHours(): FormArray {
    return this.branchForm.get('branchWorkingHours') as FormArray;
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.branchForm.controls;
  }
  msgBranchNAme: string;
  msgBranchTypes: string;
  msgBranchAdmin: string;

  onSubmit() {
    this.branchForm.get('branchTypes')?.patchValue(this.branchTypesAry);
    console.log(this.branchForm.get('branchTypes').value);
    // const whours = this.branchForm.get('branchWorkingHours').value;

    this.submitted = true;
    this.branchForm
      .get('branchName')
      ?.patchValue(this.branchForm.get('branchName')?.value.trim());
    if (this.branchForm.invalid) {
      return window.scroll(0, 0);
    }
    // console.log(this.formValid['branchName'].invalid);
    // console.log(this.formValid['branchTypes'].invalid);
    // if (this.formValid['branchName'].invalid) {
    //   this.msgBranchNAme = 'Please Enter Branch Name';
    //   setTimeout(() => {
    //     this.msgBranchNAme = '';
    //   }, 3000);
    //   return;
    // }

    // if (this.formValid['branchTypes'].invalid) {
    //   this.msgBranchNAme = 'Please Enter Branch Types';
    //   setTimeout(() => {
    //     this.msgBranchNAme = '';
    //   }, 3000);
    //   return;
    // }
    // if (this.formValid['adminUser'].invalid) {
    //   this.msgBranchNAme = 'Please Enter Branch Admin';
    //   setTimeout(() => {
    //     this.msgBranchNAme = '';
    //   }, 3000);
    //   return;
    // }

    // let whours = this.branchForm
    //   .get('branchWorkingHours')
    //   .value.filter((item) => {
    //     return item.isActive == true;
    //   });
    // console.log('whours', whours);

    // for (let r = this.branchWorkingHours.value.length - 1; r >= 0; r--) {
    //   this.branchWorkingHours.removeAt(r);
    // }

    // // this.branchForm.get('branchWorkingHours')?.patchValue();
    // for (let w = 0; w < whours.length; w++) {
    //   this.branchWorkingHours.push(
    //     this.fb.group({
    //       dayId: whours[w].dayId,
    //       dayName: whours[w].dayName,
    //       fromTime: whours[w].fromTime,
    //       toTime: whours[w].toTime,
    //       isActive: whours[w].isActive,
    //       "status": 2001

    //     })
    //   );
    // }

    // const newArr = this.branchForm.value.map((element) => ({
    //   ...element,
    //   fromTime: '00:00',
    //   toTime: '00:00',
    // }));

    console.log(this.branchForm.value);

    if (this.branchForm.get('branchId')?.value == 0) {
      this.addBranch();
    } else {
      this.updateBranch();
    }
  }

  messageSuccess: string;
  errorsList: any;
  addBranch() {
    this.isLoading = true;

    if (this.branchForm.get('branchName')?.value == '') {
      this.branchForm.get('branchName')?.patchValue('-');
    }
    if (!this.branchForm.get('email')?.value) {
      delete this.branchForm.value.email;
    }
    if (!this.branchForm.get('phone')?.value) {
      delete this.branchForm.value.phone;
    }
    if (!this.branchForm.get('adminUser')?.value) {
      delete this.branchForm.value.adminUser;
    }

    this.branchService.addBranch(this.branchForm.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          // this.messageSuccess = 'your new branch is added successfully';
          this.isLoading = false;

          const modalRef = this.modalService.open(ModalDoneComponent);
          modalRef.componentInstance.name = '';
          // this.getFormData();
          // setTimeout(() => {
          //   this.router.navigateByUrl('/branches');
          // }, 2000);
        } else {
          if (this.branchForm.get('branchName')?.value == '-') {
            this.branchForm.get('branchName')?.patchValue('');
          }
          this.isLoading = false;

          this.errorsList = response.Errors || response.errors;

          setTimeout(() => {
            this.errorsList = '';
          }, 5000);

          // if (this.branchForm.invalid) {
          //   return;
          // }
        }
        // this.toastr.success('Added Successfully');
      },
      (error: any) => {
        this.isLoading = false;
        console.log(error), (this.errorMessage = error.statusText);
      }
    );
  }

  updateBranch() {
    // let whours = this.branchForm
    //   .get('branchWorkingHours')
    //   .value.filter((item) => {
    //     return item.isActive == true;
    //   });
    // console.log('whours', whours);

    // for (let r = this.branchWorkingHours.value.length - 1; r >= 0; r--) {
    //   this.branchWorkingHours.removeAt(r);
    // }

    // // this.branchForm.get('branchWorkingHours')?.patchValue();
    // for (let w = 0; w < whours.length; w++) {
    //   this.branchWorkingHours.push(
    //     this.fb.group({
    //       dayId: whours[w].dayId,
    //       dayName: whours[w].dayName,
    //       fromTime: whours[w].fromTime,
    //       toTime: whours[w].toTime,
    //       isActive: whours[w].isActive,
    //     })
    //   );
    // }
    this.errorMessage = '';
    this.errorsList = '';
    // this.branchForm.get('branchTypes')?.patchValue('');
    this.branchForm.get('branchTypes')?.patchValue(this.branchTypesAry);
    console.log(this.branchForm.get('branchTypes').value);

    if (this.branchForm.get('adminUser')?.value == null) {
      this.branchForm.get('adminUser')?.patchValue(0);
    }
    this.isLoading = true;

    console.log(this.branchForm.value);

    this.branchForm.get('branchTypes')?.patchValue(this.branchTypesAry);
    console.log(this.branchForm.get('branchTypes').value);
    this.branchService.updateBranch(this.branchForm.value).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          this.getBranchDetails();
          this.isLoading = false;
          this.isShowBranchAdmin = false;
          this.isShowBranchInfo == false;
          this.isShowWorkingHours == false;
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
  toEdit() {
    if (this.isEdit == false) {
      this.isEdit = true;
      this.pageType = 'Edit';
    } else {
      this.isEdit = false;
      this.pageType = 'View';
    }
  }
  getBranchDetails() {
    this.branchTypesAry = [];
    this.branchService
      .getBranchDetails(this.branchId)
      .subscribe((response: any) => {
        if (response) {
          console.log(response);

          const branchDetails = response.data;
          // this.branchTypesAry= []
          this.branchForm.patchValue(branchDetails);
          this.branchForm
            .get('adminUser')
            ?.patchValue(branchDetails.adminUser?.userId);

          this.searchElementRef.nativeElement.value =
            this.branchForm.get('address')?.value;

          this.lng = +this.branchForm.get('longitude')?.value;
          this.lat = +this.branchForm.get('latitude')?.value;
          console.log(typeof this.lng);
          setTimeout(() => {
            this.zoom = 16;
          }, 2000);

          // this.branchForm
          // .get('branchTypes')
          // ?.patchValue(branchDetails.);

          if (this.branchForm.value.status == 2001) {
            this.isStatus = true;
          } else {
            this.isStatus = false;
          }
          branchDetails.branchType.forEach((item) => {
            this.branchTypesAry.push(item.branchTypeId);
          });

          console.log(this.branchTypesAry);

          for (let r = this.branchWorkingHours.value.length - 1; r >= 0; r--) {
            this.branchWorkingHours.removeAt(r);
          }

          for (let w = 0; w < branchDetails.branchWorkingHours.length; w++) {
            // this.branchWorkingHours
            //   .at(w)
            //   .get('fromTime')
            //   .patchValue('patchmail@gmail.com');
            this.branchWorkingHours.push(
              this.fb.group({
                dayId: branchDetails.branchWorkingHours[w].dayId,
                dayName: branchDetails.branchWorkingHours[w].day[0].lookupName,
                fromTime: branchDetails.branchWorkingHours[w]?.fromTime,
                toTime: branchDetails.branchWorkingHours[w]?.toTime,
                isActive:
                  branchDetails.branchWorkingHours[w].status == 2001
                    ? true
                    : false,
                status: branchDetails.branchWorkingHours[w].status,
              })
            );
          }
        }
      });
  }

  selectBranchType(item: number) {
    console.log(item);
    if (this.branchTypesAry.includes(item)) {
      this.branchTypesAry.splice(this.branchTypesAry.indexOf(item), 1);
    } else {
      this.branchTypesAry.push(item);
    }
    console.log(this.branchTypesAry);
  }

  getBranchTypes() {
    this.branchService.getLookupsById(3).subscribe(
      (response: any) => {
        this.branchTypes = response.data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
  idEditWH: boolean;
  getWorkingHours() {
    this.branchService.getLookupsById(6).subscribe(
      (response: any) => {
        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
          this.branchWorkingHours.push(
            this.fb.group({
              dayId: response.data[i]?.id,
              dayName: response.data[i]?.description,
              fromTime: '09:00',
              toTime: '17:00',
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

  getBranchAdmin() {
    this.branchService.getUsers().subscribe(
      (response: any) => {
        this.branchAdmin = response.data;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  getAddressBylangLat(lat, lang) {
    this.branchService.getAddressBylangLat(lat, lang).subscribe(
      (response: any) => {
        console.log(response);
        const locationDetails = response.results[0];

        const listData = locationDetails.address_components.reverse();

        this.branchForm
          .get('address')
          ?.setValue(locationDetails.formatted_address);

        this.searchElementRef.nativeElement.value =
          this.branchForm.get('address')?.value;

        this.branchForm.get('country')?.setValue(listData[1].long_name);
        this.branchForm.get('city')?.setValue(listData[2].long_name);
        this.branchForm.get('branchArea')?.setValue(listData[3].long_name);
        // this.branchForm.get('city')?.setValue(locationDetails[1]?.long_name || '');
        // this.branchForm.get('branchArea')?.setValue(locationDetails[3]?.long_name || '');
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  isShowBranchInfo: boolean = false;
  editBranchInfo() {
    // this.isShowBranchInfo = this.isShowBranchInfo == false ? true : false;

    if (this.isShowBranchInfo == false) {
      this.isShowBranchInfo = true;
      this.isShowBranchAdmin = false;
      this.isShowWorkingHours = false;
    } else if (this.isShowBranchInfo == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'World';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowBranchInfo = false;
        this.modalService.dismissAll();
        this.updateBranch();
        // this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowBranchInfo = false;
        this.modalService.dismissAll();
      });
    }
  }

  isShowWorkingHours: boolean = false;
  editWorkingHours() {
    // this.isShowWorkingHours = this.isShowWorkingHours == false ? true : false;

    if (this.isShowWorkingHours == false) {
      this.isShowWorkingHours = true;
      this.isShowBranchInfo = false;
      this.isShowBranchAdmin = false;
    } else if (this.isShowWorkingHours == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'World';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowWorkingHours = false;
        this.modalService.dismissAll();
        this.updateBranch();

        setTimeout(() => {
          this.getBranchDetails();
        }, 2000);
        // this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowWorkingHours = false;
        this.modalService.dismissAll();
      });
    }
  }

  chickForEdit() {
    if (
      this.isShowBranchInfo == true ||
      this.isShowWorkingHours == true ||
      this.isShowBranchAdmin == true
    ) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'name';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowBranchAdmin = false;
        this.isShowBranchInfo == false;
        this.isShowWorkingHours == false;
        this.modalService.dismissAll();
        this.updateBranch();
        // this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowBranchAdmin = false;
        this.isShowBranchInfo == false;
        this.isShowWorkingHours == false;
        this.modalService.dismissAll();
      });
    } else {
    }
  }
  applyAllTime() {}
  isShowBranchAdmin: boolean = false;
  editBranchAdmin() {
    // this.isShowBranchAdmin = this.isShowBranchAdmin == false ? true : false;

    if (this.isShowBranchAdmin == false) {
      this.isShowBranchAdmin = true;
      this.isShowWorkingHours = false;
      this.isShowBranchInfo = false;
    } else if (this.isShowBranchAdmin == true) {
      const modalRef = this.modalService.open(ModalConfirmComponent);
      modalRef.componentInstance.name = 'World';

      modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
        console.log('result', result);
        this.isShowBranchAdmin = false;
        this.modalService.dismissAll();
        this.updateBranch();
        // this.onSubmit();
      });
      modalRef.componentInstance.sendToClose.subscribe((result: any) => {
        console.log('resulttoclose', result);
        this.isShowBranchAdmin = false;
        this.modalService.dismissAll();
      });
    }
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  removeBranchName() {
    this.branchForm.get('branchName')?.patchValue('');
  }
  removeemail() {
    this.branchForm.get('email')?.patchValue('');
  }
  removephone() {
    this.branchForm.get('phone')?.patchValue('');
  }
  removeseacrch() {
    this.searchElementRef.nativeElement.value = '';
    this.searchText = '';
    this.branchForm.get('longitude')?.setValue('');
    this.branchForm.get('latitude')?.setValue('');
    this.branchForm.get('address')?.setValue('');

    this.branchForm.get('country')?.setValue('');
    this.branchForm.get('city')?.setValue('');
    this.branchForm.get('branchArea')?.setValue('');

    // this.search = '';
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
  }

  //  nameValidator(control: FormControl): { [key: string]: boolean } {
  //       const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  //       if (control.value && nameRegexp.test(control.value)) {
  //          return { invalidName: true };
  //       }
  //   }
  // clickedMarker(label: any, index: number, infowindow: any) {
  //   console.log(`clicked the marker: ${label || index}`);

  //   if (this.previous) {
  //     this.previous.close();
  //   }
  //   this.previous = infowindow;
  // }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true,
  //   });
  // }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  //   this.branchForm.get('latitude')?.patchValue(m.lat);
  //   this.branchForm.get('longitude')?.patchValue(m.lng);
  // }

  // markers: marker[] = [
  //   {
  //     lat: 51.673858,
  //     lng: 7.815982,
  //     label: 'A',
  //     draggable: true,
  //   },
  // ];
}

// interface marker {
//   lat: number;
//   lng: number;
//   label?: any;
//   draggable: boolean;
// }
