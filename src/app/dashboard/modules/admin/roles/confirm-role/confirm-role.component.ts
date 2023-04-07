import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-role',
  templateUrl: './confirm-role.component.html',
  styleUrls: ['./confirm-role.component.scss'],
})
export class ConfirmRoleComponent {
  @Input() name;
  @Output() semdToConfirm = new EventEmitter<string>();
  @Output() sendToClose = new EventEmitter<string>();

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private router: Router
  ) {}

  confirm() {
    this.semdToConfirm.emit();
  }
  close(){
    this.sendToClose.emit();
  }
}
