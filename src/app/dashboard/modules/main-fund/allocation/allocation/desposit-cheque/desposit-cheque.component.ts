import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllocationService } from '../allocation-services/allocation.service';
import { ViewImageComponent } from '../view-image/view-image.component';

@Component({
  selector: 'app-desposit-cheque',
  templateUrl: './desposit-cheque.component.html',
  styleUrls: ['./desposit-cheque.component.scss'],
})
export class DespositChequeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private fb: FormBuilder,
    private modalService: NgbModal,

    private _allocationService: AllocationService
  ) {}
  formGroup: FormGroup;

  dummyData: any[] = [];
  sort: number = 1;
  totalRecords: number = 6;
  pageNo: number = 0;
  pagin: number;
  pages: any[] = [];
  searchText: string = '';
  depositeAmount: any;
  viewDepositeAmount: any;

  /////////////
  errorMessage: any;
  submitted = false;
  isLoading: boolean;
  isShowToUplaod: boolean = true;
  type: string;
  isViewFile: boolean;
  isLoadingView: boolean = true;
  viewData: boolean = false;

  @ViewChild('fileUpload', { static: false })
  InputVar: ElementRef;
  @Output() sendtoLoadData = new EventEmitter();
  ngOnInit(): void {
    this._allocationService.despositeAmount.subscribe((res) => {
      if (res) {
        this.depositeAmount = res;
        this.viewData = false;
      } else {
        this.viewCheque();
      }

      console.log(this.depositeAmount, 'despositAmount');
    });

    this.dummyData = [
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
      {
        customer: 'Asad',
        ChequeNo: 13245,
        Bank: 'Al-Etihad',
        Date: ' 29-Mar-2023',
        Amount: 500,
      },
    ];
  }
  /**
   * view deposit cheque
   */
  viewCheque() {
    this._allocationService._viewDepositAmount.subscribe((res) => {
      this.viewDepositeAmount = res;
      this.isShowToUplaod = false;
      this.viewData = true;
      console.log(this.depositeAmount, 'despositAmount');
    });
  }
  /**
   * resetting search input field
   */
  removeSearch() {
    this.searchText = '';
  }
  // Sorting Functions
  sortByBranch() {
    if (this.sort == 3) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 2 ? 3 : 2;
    }
  }
  sortByRegisterNo() {
    if (this.sort == 5) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 4 ? 5 : 4;
    }
  }
  sortByDate() {
    if (this.sort == 7) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 6 ? 7 : 6;
    }
  }
  sortByCashier() {
    if (this.sort == 9) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 8 ? 9 : 8;
    }
  }
  sortByAmount() {
    if (this.sort == 11) {
      this.sort = 1;
    } else {
      this.sort = this.sort == 10 ? 11 : 10;
    }
  }

  /**
   * pagination
   * @param page page no
   */
  setPage(page: number) {
    this.pageNo = page;
    window.scroll(0, 0);
  }

  //////////////////////

  getForm() {
    this.formGroup = this.fb.group({
      ExpenseRecordId: 0,
      InvoiceNo: [''],
      ExpenseCategoryId: null,
      ExpenseTotalAmount: '',
      ExpenseAmount: '',
      ExpenseTax: [''],
      ExpenseNotes: [''],
      // Status: 2001,
      Attachments: null,
    });
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  enter: boolean;
  myFiles: string[] = [];
  urls: any[] = [];
  imageError: string;
  progress: number = 0;
  filePath: string;
  fileName: string;
  errorMsgUplaod: string;
  filesDropped(files: any) {
    this.enter = false;

    if (
      files[0].file.type == 'image/jpeg' ||
      files[0].file.type == 'image/jpg' ||
      files[0].file.type == 'image/png' ||
      files[0].file.type == 'application/pdf'
    ) {
      // console.log(files);
      // console.log(files[0]);
      // console.log(files[0].file);
      // console.log(files[0].file.name);
      // console.log(files[0].file.type);
      // console.log(files[0].url);

      if (files && files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.filePath = event.target.result;
        };
        reader.readAsDataURL(files[0].file);
      }

      this.fileName = files[0].file.name;
      // console.log(this.filePath);
      // this.filePath = files[0].url;
      this.errorMsgUplaod = '';
      this.formGroup.get('Attachments')?.patchValue(files[0].file);
    } else {
      this.errorMsgUplaod =
        'This file not support , Supported formates: JPEG, JPG, PNG, PDF';
    }

    // files.forEach((file) => {
    // console.log(file);
    // console.log(file.file);
    // console.log(file.file.name);
    // console.log(file.name);
    // console.log(file.url);
    // console.log(this.myFiles);

    // files.forEach((file) => {
    //   if (this.myFiles?.length >= 1) {
    //     this.myFiles = [...this.myFiles, file.file];
    //     this.urls = [...this.urls, file.url];
    //   } else {
    //     this.myFiles = [file.file];
    //     this.urls = [file.url];
    //   }
    // });
    // });
    // console.log(this.urls);
    // console.log(this.myFiles);
    // console.log(this.myFiles[0]);
  }
  removeImageName() {
    this.fileName = '';
    this.filePath = '';
    this.errorMsgUplaod = '';
    this.InputVar.nativeElement.value = '';
    this.formGroup.get('Attachments')?.patchValue(null);
  }
  onSelectFile(event: any) {
    console.log(event);
    console.log(event.target.files[0]);

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.filePath = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.fileName = event.target.files[0].name;
    this.errorMsgUplaod = '';
    console.log(event.target.files[0]);
    this.formGroup.get('Attachments')?.patchValue(event.target.files[0]);
  }

  removeImage(i) {
    this.urls.splice(i, 1);
    this.myFiles.splice(i, 1);
  }
  removeImg() {
    this.errorMsgUplaod = '';
    this.isShowToUplaod = !this.isShowToUplaod;
  }

  openMdalImage() {
    const modalRef = this.modalService.open(ViewImageComponent);
    modalRef.componentInstance.imageUploadedView = this.filePath;
  }
  openMdalImageView() {}

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this._allocationService.despositeAmount.next('');
    this._allocationService._viewDepositAmount.next('');
  }
}
