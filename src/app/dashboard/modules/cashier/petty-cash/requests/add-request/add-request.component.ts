import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../../services/shared.service';
import { PettyCashService } from '../../services/petty-cash.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent {
  formGroup: FormGroup;
  isLoading: boolean;
  submitted: boolean;

  @Input() type: string;
  @Input() pettyCashRequestId: number;
  @Input() pettyCashRegisterId: number;
  @Output() sendtoLoadData = new EventEmitter();

  constructor(
    private pettyCashService: PettyCashService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.pettyCashRequestId) {
      this.GetRegisterPettycashrequestDetails();
    } else {
      this.GetRegistersPettyCashLimits();
    }
  }

  Registersdetails: any;
  GetRegistersPettyCashLimits() {
    return this.pettyCashService
      .GetRegistersPettyCashLimits(
        this.sharedService.getRegister?.registerObj?.id
      )
      .subscribe((response: any) => {
        if (response) {
          this.Registersdetails = response.data[0];
        }
      });
  }
  textNote: string;
  errorMsg: string;
  AddPettyCashRequest() {
    this.isLoading = true;
    this.submitted = true;
    this.errorMsg = '';
    const formData = new FormData();
    formData.append('RequestNote', this.textNote);
    return this.pettyCashService.AddPettyCashRequest(formData).subscribe(
      (response: any) => {
        if (response.isSuccess == true) {
          console.log(response);
          this.isLoading = false;
          this.sendtoLoadData.emit();
        } else {
          this.isLoading = false;
          console.log(response);
          this.errorMsg = response?.Errors[0]?.ErrorMessageEn;
          console.log(response.Errors[0].ErrorMessageEn);
        }
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }
  details: any;
  GetRegisterPettycashrequestDetails() {
    return this.pettyCashService
      .GetRegisterPettycashrequestDetails(this.pettyCashRequestId)
      .subscribe((response: any) => {
        if (response) {
          this.details = response.data;
        }
      });
  }
}
