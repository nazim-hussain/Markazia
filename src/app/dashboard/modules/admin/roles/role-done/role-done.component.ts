import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role-done',
  templateUrl: './role-done.component.html',
  styleUrls: ['./role-done.component.scss'],
})
export class RoleDoneComponent {
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
        this.router.navigateByUrl('/roles');
      }, 4000);
    } else {
      setTimeout(() => {
        this.modalService.dismissAll();
      }, 4000);
    }
  }
}
