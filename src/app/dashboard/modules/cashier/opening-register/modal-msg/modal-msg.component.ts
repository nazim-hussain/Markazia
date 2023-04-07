import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-msg',
  templateUrl: './modal-msg.component.html',
  styleUrls: ['./modal-msg.component.scss'],
})
export class ModalMsgComponent implements OnInit {
  @Input() name;
  @Input() errors;

  constructor(private router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    if (this.name === 'ok') {
      console.log(this.name);
      setTimeout(() => {
        this.modalService.dismissAll();
        window.location.reload();
        this.router.navigateByUrl('/collect');
      }, 4000);
    } else {
      console.log(this.name);

      setTimeout(() => {
        this.modalService.dismissAll();
        // this.router.navigateByUrl('/collect');
      }, 4000);
    }
  }
}
