import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../../../../../../services/shared.service';
import { CloseRegisterService } from '../../services/close-register.service';
import * as _ from 'underscore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { FormGroup } from '@angular/forms';
import { ModalMessageComponent } from '../../../../../../shared/components/modal-message/modal-message.component';

@Component({
  selector: 'app-collect-cheque',
  templateUrl: './collect-cheque.component.html',
  styleUrls: ['./collect-cheque.component.scss'],
})
export class CollectChequeComponent implements OnInit {
  pageNo: number = 0;
  pagin!: number;
  pages!: number[];
  searchText: string = '';
  formGroup: FormGroup;
  @Output() loadMainData = new EventEmitter<string>();

  constructor(
    public closeRegisterService: CloseRegisterService,
    public sharedService: SharedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.GetCurrentSessionCollectedCheques();
  }

  collectedData: any;
  totalAllRecordsCount: number;
  totalRecordsCount: number;
  GetCurrentSessionCollectedCheques() {
    return this.closeRegisterService
      .GetCurrentSessionCollectedCheques(this.searchText, this.pageNo)
      .subscribe((response: any) => {
        if (response) {
          this.collectedData = response.data;
          this.totalAllRecordsCount = response.info?.totalAllRecordsCount;
          this.totalRecordsCount = response.info?.totalRecordsCount;
          this.pagin = Math.ceil(this.totalRecordsCount / 6);
          this.pages = _.range(this.pagin);
          console.log(this.pagin);
          console.log(this.pages);
        }
      });
  }

  setPage(page: number) {
    this.pageNo = page;
    this.GetCurrentSessionCollectedCheques();
    window.scroll(0, 0);
  }

  searchData(event: any) {
    console.log(event?.target.value);
    const text = event.target.value;
    console.log(text.length);
    if (text.length >= 3) {
      this.searchText = text;
      this.pageNo = 0;
      this.GetCurrentSessionCollectedCheques();
    }
    if (text.length == 0) {
      this.GetCurrentSessionCollectedCheques();
    }
  }
  removeSearch() {
    this.searchText = '';
    // this.sort = 1;
    this.GetCurrentSessionCollectedCheques();
  }

  ActionsOnCheques(item, type) {
    const formData = new FormData();
    formData.append('ChequeCollectionId', item.chequeCollectionId);
    formData.append('Action', type);
    console.log(formData);
    return this.closeRegisterService
      .ActionsOnCheques(formData)
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.GetCurrentSessionCollectedCheques();

          // const modalRef = this.modalService.open(ModalMessageComponent);
          // modalRef.componentInstance.type = 'success';
          // modalRef.componentInstance.message = 'Action done successfully';
          // modalRef.componentInstance.routeName = '/close-register';
          // modalRef.componentInstance.loadPageData.subscribe((result: any) => {
          //   console.log('result', result);
          //   this.GetCurrentSessionCollectedCheques();
          //   this.loadMainData.emit();
          // });
        } else {
          console.log('error', response);
        }
      });
  }
  ReverseActionsOnCheques(item) {
    const formData = new FormData();
    formData.append('ChequeCollectionId', item.chequeCollectionId);
    console.log(formData);
    return this.closeRegisterService
      .ReverseActionsOnCheques(formData)
      .subscribe((response: any) => {
        console.log(response);

        if (response.isSuccess == true) {
          this.GetCurrentSessionCollectedCheques();

          // const modalRef = this.modalService.open(ModalMessageComponent);
          // modalRef.componentInstance.type = 'success';
          // modalRef.componentInstance.message = 'Undo done successfully';
          // modalRef.componentInstance.routeName = '/close-register';
          // modalRef.componentInstance.loadPageData.subscribe((result: any) => {
          //   console.log('result', result);
          //   this.GetCurrentSessionCollectedCheques();
          //   this.loadMainData.emit();
          // });
        } else {
          console.log('error', response);
        }
      });
  }

  openModalEdit(item) {
    const modalRef = this.modalService.open(ModalEditComponent);
    modalRef.componentInstance.details = item;
    modalRef.componentInstance.loadPageData.subscribe((result: any) => {
      console.log('result', result);
      this.GetCurrentSessionCollectedCheques();
      this.loadMainData.emit();
    });
  }
}
