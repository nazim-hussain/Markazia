import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-close',
  templateUrl: './modal-close.component.html',
  styleUrls: ['./modal-close.component.scss'],
})
export class ModalCloseComponent implements OnInit {
  @Input() name;
  @Input() type: string;
  @Input() message: string;
  @Input() messageError: any;
  @Input() routeName: any;
  @Input() remainedSessions: any;

  @Output() backToSecond = new EventEmitter();

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.router.navigate(['/login']);
    // }, 3000);
  }
  openNewSession() {
    // this.router.navigate(['/opening-register']);
    // window.location.href = '/';
    window.location.reload();
  }

  backToStepTwo() {
    this.backToSecond.emit();
  }
  logOut() {
    localStorage.removeItem('fullName');
    localStorage.removeItem('role');
    localStorage.removeItem('userid');
    localStorage.removeItem('branch');
    localStorage.removeItem('city');
    localStorage.removeItem('register');
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');

    // localStorage.removeItem('identity');
    // localStorage.removeItem('password');
    // localStorage.removeItem('rememberMe');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
}
