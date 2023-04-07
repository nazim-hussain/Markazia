import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../../../services/header.service';
import { SharedService } from '../../../../services/shared.service';
import { ModalMsgComponent } from './modal-msg/modal-msg.component';
import { OpenregisterService } from './services/openregister.service';

@Component({
  selector: 'app-opening-register',
  templateUrl: './opening-register.component.html',
  styleUrls: ['./opening-register.component.scss'],
})
export class OpeningRegisterComponent implements OnInit {
  isShow: boolean = false;
  formGroup: FormGroup;
  submitted = false;

  registerName: string;
  registerId: string;
  branchName: string;
  cityName: string;
  isNoRegister: Boolean;
  intervalId;

  currentDate = new Date();

  constructor(
    public sharedService: SharedService,
    public openregisterService: OpenregisterService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public headerService: HeaderService,
    private router: Router,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // getCity;
  ngOnInit(): void {
    // cityName
    // console.log( console.log(this.router))
    // console.log( console.log(this.router.url))

    if (this.sharedService.getRegister) {
      this.headerService.setTitle('Opening Register');
    } else {
      this.headerService.setTitle('');
    }

    // this.CanOpenRegisterSession();
    this.registerName =
      this.sharedService.getRegister?.registerObj?.registersName;
    this.registerId = this.sharedService.getRegister?.registerObj?.id;
    this.branchName =
      this.sharedService?.getRegister?.registerObj.registeBranch.branchName;
    this.cityName =
      this.sharedService?.getRegister?.registerObj.registeBranch.city;
    console.log(this.registerName);
    this.getForm();

    this.intervalId = setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  getForm() {
    this.formGroup = this.fb.group({
      InitialFund: [''],
      Notes: [''],
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
  isLoading: boolean;

  onSubmit() {
    this.submitted = true;

    if (
      this.formGroup.invalid ||
      this.formGroup.get('InitialFund').value <= 0
    ) {
      return window.scroll(0, 0);
    }

    this.formGroup
      .get('InitialFund')
      ?.patchValue(+this.formGroup.get('InitialFund')?.value);
    const formData = new FormData();

    formData.append('InitialFund', this.formGroup.get('InitialFund')?.value);
    formData.append('Notes', this.formGroup.get('Notes')?.value);

    console.log(formData);
    console.log(this.formGroup.value);
    this.isLoading = true;

    return this.openregisterService.OpenRegisterSession(formData).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          this.isLoading = false;
          const modalRef = this.modalService.open(ModalMsgComponent);
          modalRef.componentInstance.name = 'ok';
          console.log(response);
          localStorage.setItem('timeRegister', new Date().toString());
        } else {
          this.isLoading = false;
          const modalRef = this.modalService.open(ModalMsgComponent);
          modalRef.componentInstance.name = 'no';
          modalRef.componentInstance.errors = response.Errors;
          // this.errorMessage = response.Errors || response.errors;
        }
      },
      (error: any) => {
        this.isLoading = false;
        // console.log(error), (this.errorMessage = error.statusText);
      }
    );
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  canOpenRegister: boolean;
  CanOpenRegisterSession() {
    return this.openregisterService
      .CanOpenRegisterSession({})
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.canOpenRegister = response.data.canOpenRegister;
          if (this.canOpenRegister == true) {
          } else if (this.canOpenRegister == false) {
            // this.router.navigate(['/collect']);
          }
        }
      });
  }
}
