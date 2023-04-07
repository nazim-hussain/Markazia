import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reg-done',
  templateUrl: './reg-done.component.html',
  styleUrls: ['./reg-done.component.scss'],
})
export class RegDoneComponent {
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log(this.name);

    if (this.name == 'add') {
      setTimeout(() => {
        this.modalService.dismissAll();
        this.router.navigateByUrl('/registers');
      }, 4000);
    } else {
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 4000);
    }
  }
}
