import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-done',
  templateUrl: './modal-done.component.html',
  styleUrls: ['./modal-done.component.scss'],
})
export class ModalDoneComponent implements OnInit {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.name);
    // console.log(this.name = 'edit');

    if ( this.name == 'edit' ) {

      setTimeout(() => {
        this.modalService.dismissAll();
      }, 3000);

    } else {

      setTimeout(() => {
        this.router.navigateByUrl('/branches');
        this.modalService.dismissAll();
      }, 5000);
    }
  }
}
