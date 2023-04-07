import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-done',
  templateUrl: './modal-done.component.html',
  styleUrls: ['./modal-done.component.scss'],
})
export class ModalDoneComponent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.name);
    console.log(typeof(this.name));

    if (this.name == 'add') {
      setTimeout(() => {
        this.modalService.dismissAll();
        this.router.navigateByUrl('/users');
      }, 4000);
    } else {
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 4000);
    }
  }
}
