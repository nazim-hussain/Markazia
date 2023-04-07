import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutService } from './logout.service';
import { GeneralService } from '../../../services/general.service';

import { OpenregisterService } from '../../modules/cashier/opening-register/services/openregister.service';
import { CloseRegisterService } from '../../modules/cashier/close-register/services/close-register.service';
import { SharedService } from '../../../services/shared.service';
import { DatePipe } from '@angular/common';
import { ModalCloseSessionComponent } from '../modal-close-session/modal-close-session.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers: [DatePipe],
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = true;

  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() titleOfPage = new EventEmitter<string>();
  timeRegister: string;
  navList: any = [];
  cashierNavList = [];

  registerSessionCreatedAt: any;
  constructor(
    private router: Router,
    public sharedService: SharedService,
    private modalService: NgbModal,
    private logoutService: LogoutService,
    public openregisterService: OpenregisterService,
    public closeRegisterService: CloseRegisterService,
    public GeneralService: GeneralService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.sharedService.getRole?.roleId == 1) {
      this.GetUserMenu();
    }

    this.navList.push(
      {
        Title: 'Branches',
        IsActive: false,
        Icon: 'assets/images/buildings-2.png',
        Icon2: 'assets/images/navicon/branch2.png',
        url: '/branches',
        title: 'Branches',
        type: 36,
      },
      {
        Title: 'Register & Setup',
        IsActive: false,
        Icon: 'assets/images/strongbox-2.png',
        Icon2: 'assets/images/navicon/register2.png',
        url: '/registers',
        title: 'Register & Setup',
        type: 36,
      },
      {
        Title: 'Roles',
        IsActive: false,
        Icon: 'assets/images/people.png',
        Icon2: 'assets/images/navicon/role2.png',
        url: '/roles',
        title: 'Roles',
        type: 36,
      },
      {
        Title: 'Users',
        IsActive: false,
        Icon: 'assets/images/profile-2user.png',
        Icon2: 'assets/images/navicon/user2.png',
        url: '/users',
        title: 'Users',
        type: 36,
      },
      // {
      //   Title: 'Open Register',
      //   IsActive: false,
      //   Icon: 'assets/images/navicon/closeregister.png',
      //   Icon2: 'assets/images/navicon/closeregister2.png',
      //   url: '/opening-register',
      //   title: 'Open Register',
      //   type: 1,
      // },
      // {
      //   Title: 'Collect',
      //   IsActive: false,
      //   IsSelect: true,
      //   Icon: 'assets/images/navicon/collect.png',
      //   Icon2: 'assets/images/navicon/collect2.png',
      //   url: '/collect',
      //   title: 'Collect',
      //   type: 1,
      // },
      {
        Title: 'Allocation',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/allocation-nav/allocation-icon.png',
        Icon2: 'assets/images/allocation-nav/allocation-icon.png',
        url: '/allocation',
        title: 'allocation',
        type: 37,
      },
      {
        Title: 'Petty Cash',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/navicon/pettycash.png',
        Icon2: 'assets/images/navicon/pettycash2.png',
        url: '/pettycash',
        title: 'Petty Cash',
        type: 37,
      },
      {
        Title: 'Transactions History',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/navicon/pettycash.png',
        Icon2: 'assets/images/navicon/pettycash2.png',
        url: '/transactions-history',
        title: 'Transactions History',
        type: 37,
      },
      {
        Title: 'Petty Cash Orders',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/navicon/pettycash.png',
        Icon2: 'assets/images/navicon/pettycash2.png',
        url: '/provide-expenses',
        title: 'Petty Cash Orders',
        type: 38,
      },
      {
        Title: 'Allocation',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/navicon/pettycash.png',
        Icon2: 'assets/images/navicon/pettycash2.png',
        url: '/mainFund-allocation',
        title: 'Allocation',
        type: 38,
      },
      {
        Title: 'Register Settlements',
        IsActive: false,
        IsSelect: false,
        Icon: 'assets/images/navicon/pettycash.png',
        Icon2: 'assets/images/navicon/pettycash2.png',
        url: '/register-settlements',
        title: 'Register Settlements',
        type: 38,
      }

      // {
      //   Title: 'Close Register',
      //   IsActive: false,
      //   IsSelect: true,
      //   Icon: 'assets/images/navicon/closeregister.png',
      //   Icon2: 'assets/images/navicon/closeregister2.png',
      //   url: '/close-register',
      //   title: 'Close Register',
      //   type: 1,
      // }
    );

    this.cashierNavList
      .push
      // {
      //   Title: 'Open Register',
      //   IsActive: false,
      //   Icon: 'assets/images/navicon/closeregister.png',
      //   Icon2: 'assets/images/navicon/closeregister2.png',
      //   url: '/opening-register',
      //   title: 'Open Register',
      //   type: 1,
      //   canClick: false,
      //   canView: false,
      // },
      // {
      //   Title: 'Collect',
      //   IsActive: false,
      //   IsSelect: true,
      //   Icon: 'assets/images/navicon/collect.png',
      //   Icon2: 'assets/images/navicon/collect2.png',
      //   url: '/collect',
      //   title: 'Collect',
      //   type: 1,
      //   canClick: false,
      //   canView: false,
      // },
      // {
      //   Title: 'Petty Cash',
      //   IsActive: false,
      //   IsSelect: false,
      //   Icon: 'assets/images/navicon/pettycash.png',
      //   Icon2: 'assets/images/navicon/pettycash2.png',
      //   url: '/petty-cash',
      //   title: 'Petty Cash',
      //   type: 1,
      //   canClick: false,
      //   canView: false,
      // },
      // {
      //   Title: 'Close Register',
      //   IsActive: false,
      //   IsSelect: true,
      //   Icon: 'assets/images/navicon/closeregister.png',
      //   Icon2: 'assets/images/navicon/closeregister2.png',
      //   url: '/close-register',
      //   title: 'Close Register',
      //   type: 1,
      //   canClick: false,
      //   canView: false,
      // }
      ();
  }
  onSelectMenu(index: number) {
    this.checkScreenSize();
    this.navList.forEach((element: { IsActive: boolean }) => {
      element.IsActive = false;
    });
    for (let i = 0; i < this.navList.length; i++) {
      if (i == index) {
        this.navList[i].IsActive = true;
        this.titleOfPage.emit(this.navList[i].title);
      }
    }
    localStorage.removeItem('collectionOrderNum');
    localStorage.removeItem('collectBranchId');
    localStorage.removeItem('collectUserId');
    localStorage.removeItem('collectSearchText');
    localStorage.removeItem('collectVin');
  }

  onSelectMenuCashier(i) {
    // this.checkScreenSize();
    // this.navList.forEach((element: { IsActive: boolean }) => {
    //   element.IsActive = false;
    // });

    // this.navList[i].IsActive = true;
    console.log(i);
    this.titleOfPage.emit(this.cashierNavList[i].title);

    localStorage.removeItem('collectionOrderNum');
    localStorage.removeItem('collectBranchId');
    localStorage.removeItem('collectUserId');
    localStorage.removeItem('collectSearchText');
    localStorage.removeItem('collectVin');
    // this.openAutoClose();
    // this.GetUserMenu();
  }
  checkScreenSize() {
    if (window.innerWidth < 600) {
      this.sideNavToggled.emit(false);
      this.sideNavStatus = false;
    }
  }
  dateSession: string;
  sessionEndMinut: any;
  openAutoCloseWarning() {
    // console.log('openAutoClose');

    this.dateSession = this.datePipe.transform(
      this.registerSessionCreatedAt,
      'MMMM d, y'
    );
    // Fri Mar 17 2023 22:36:23 GMT+0200 (Eastern European Standard Time)

    var dateEndSession = new Date(this.dateSession + ' ' + this.endSession);
    // var dateEndSession = new Date('Fri Mar 17 2023 23:55:23');

    var dateCurrunt = new Date();
    // console.log(dateCurrunt);
    let sessionEndMillesecnd =
      dateEndSession.getTime() - dateCurrunt.getTime() - 900000;
    // console.log('sessionEndMillesecnd', sessionEndMillesecnd);

    this.sessionEndMinut =
      dateEndSession.getMinutes() - dateCurrunt.getMinutes();
    // console.log('sessionEndMinut', this.sessionEndMinut);

    if (sessionEndMillesecnd > 0) {
      setTimeout(() => {
        const modalRef = this.modalService.open(ModalCloseSessionComponent);
        modalRef.componentInstance.type = 1;
        modalRef.componentInstance.minute = this.sessionEndMinut;
      }, sessionEndMillesecnd);
    }
  }

  openAutoClose() {
    // console.log('openAutoClose');

    this.dateSession = this.datePipe.transform(
      this.registerSessionCreatedAt,
      'MMMM d, y'
    );

    var dateEndSession = new Date(this.dateSession + ' ' + this.endSession);

    var dateCurrunt = new Date();

    let sessionEndMillesecnd = dateEndSession.getTime() - dateCurrunt.getTime();
    // console.log('sessionEndMillesecnd', sessionEndMillesecnd);

    if (sessionEndMillesecnd > 0) {
      setTimeout(() => {
        const modalRef = this.modalService.open(ModalCloseSessionComponent);
        modalRef.componentInstance.type = 2;
      }, sessionEndMillesecnd);
    }
  }

  logout() {
    const modalRef = this.modalService.open(ModalLogoutComponent);
    modalRef.componentInstance.name = 'World';

    modalRef.componentInstance.semdToConfirm.subscribe((result: any) => {
      console.log('result', result);
      this.modalService.dismissAll();
      this.LogoutUser();
      localStorage.removeItem('fullName');
      localStorage.removeItem('role');
      localStorage.removeItem('userid');
      localStorage.removeItem('branch');
      localStorage.removeItem('city');
      localStorage.removeItem('register');
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');

      localStorage.removeItem('collectionOrderNum');
      localStorage.removeItem('collectBranchId');
      localStorage.removeItem('collectUserId');
      localStorage.removeItem('collectSearchText');
      localStorage.removeItem('collectVin');

      localStorage.removeItem('closeSession');

      // localStorage.removeItem('identity');
      // localStorage.removeItem('password');
      // localStorage.removeItem('rememberMe');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('id');

      this.router.navigate(['/login']);
    });

    // this.sharedService.getToken = '';\
  }
  LogoutUser() {
    return this.logoutService
      .LogoutUser(+this.sharedService.getUserId)
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          // this.roles = response.data.permissions;
        }
      });
  }
  canOpenRegister: boolean;
  opendSession: any;
  openreg: boolean;
  closereg: boolean;
  clollectreg: boolean;
  CanOpenRegisterSession() {
    return this.openregisterService
      .CanOpenRegisterSession({})
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.canOpenRegister = response.data.canOpenRegister;
          this.opendSession = response.data.opendSession;

          if (this.canOpenRegister == true) {
            this.openreg = true;
            this.closereg = false;
            this.clollectreg = false;
          } else if (this.canOpenRegister == false) {
            // this.router.navigate(['/collect']);
            this.openreg = false;
            this.closereg = true;
            this.clollectreg = true;
          }

          // else if (this.canOpenRegister == false && this.opendSession) {
          //   this.openreg = false;
          //   this.closereg = true;
          //   this.clollectreg = true;
          // } else if (this.canOpenRegister == false && !this.opendSession) {
          //   this.openreg = false;
          //   this.closereg = false;
          //   this.clollectreg = false;

          // }

          // this.canOpenRegister = true;
          console.log(this.canOpenRegister);
        }
      });
  }
  canCloseRegisterSession: boolean;
  CanCloseRegisterSession() {
    return this.closeRegisterService
      .CanCloseRegisterSession({})
      .subscribe((response: any) => {
        if (response.isSuccess == true) {
          this.canCloseRegisterSession = response.data.opendSession
            ? true
            : false;
          this.registerSessionCreatedAt =
            response.data?.registerSession?.createdAt;
          console.log(this.registerSessionCreatedAt);
          console.log(this.canCloseRegisterSession);
        }
      });
  }

  cashierMenu: any;
  registerSession: any;
  endSession: any;
  oppendAt: any;
  isIpAddres: boolean;
  hasOppendSession: boolean;
  GetUserMenu() {
    return this.GeneralService.GetUserMenu({}).subscribe((response: any) => {
      if (response.isSuccess == true) {
        this.cashierMenu = response.data[0].cashier;
        this.registerSession = response.data[0].registerSession;
        this.registerSessionCreatedAt = this.registerSession.oppendAt;
        this.endSession = this.registerSession.allowedToTime;
        this.hasOppendSession = this.registerSession.hasOppendSession;
        this.isIpAddres = true;
        console.log(this.endSession);

        if (this.hasOppendSession == true) {
          console.log('open close');
          setTimeout(() => {
            this.openAutoCloseWarning();
          }, 2000);

          setTimeout(() => {
            this.openAutoClose();
          }, 2000);
        }

        this.cashierNavList = [];
        this.cashierNavList.push(
          {
            Title: 'Open Register',
            IsActive: false,
            Icon: 'assets/images/navicon/closeregister.png',
            Icon2: 'assets/images/navicon/closeregister2.png',
            url: '/opening-register',
            title: 'Open Register',
            // // type: 1,
            canClick: this.cashierMenu[0].openSession.canClick,
            canView: this.cashierMenu[0].openSession.canView,
            // canClick: true,
            // canView: true,
          },
          {
            Title: 'Collect',
            IsActive: false,
            IsSelect: true,
            Icon: 'assets/images/navicon/collect.png',
            Icon2: 'assets/images/navicon/collect2.png',
            url: '/collect',
            title: 'Collect',
            type: 1,
            canClick: this.cashierMenu[2].collect.canClick,
            canView: this.cashierMenu[2].collect.canView,
            // canClick: true,
            // canView: true,
          },
          {
            Title: 'Petty Cash',
            IsActive: false,
            IsSelect: false,
            Icon: 'assets/images/navicon/pettycash.png',
            Icon2: 'assets/images/navicon/pettycash2.png',
            url: '/petty-cash',
            title: 'Petty Cash',
            type: 1,
            canClick: this.cashierMenu[3].pretty.canClick,
            canView: this.cashierMenu[3].pretty.canView,
            // canClick: true,
            // canView: true,
          },
          {
            Title: 'Close Register',
            IsActive: false,
            IsSelect: true,
            Icon: 'assets/images/navicon/closeregister.png',
            Icon2: 'assets/images/navicon/closeregister2.png',
            url: '/close-register',
            title: 'Close Register',
            // type: 1,
            canClick: this.cashierMenu[1].closeSession.canClick,
            canView: this.cashierMenu[1].closeSession.canView,
            // canClick: true,
            // canView: true,
          }
        );
        localStorage.removeItem('IsFoundIPAddress');

        // if (this.sharedService.checkIfSessionClose) {
        //   this.router.navigate(['/close-register']);
        // } else {
        if (this.cashierMenu[0].openSession.canClick == true) {
          this.router.navigate(['/opening-register']);
        } else if (this.cashierMenu[2].collect.canClick == true) {
          this.router.navigate(['/collect']);
        } else if (this.cashierMenu[1].closeSession.canClick == true) {
          this.router.navigate(['/close-register']);
        } else if (this.cashierMenu[3].pretty.canClick == true) {
          this.router.navigate(['/petty-cash']);
        }
        // }

        if (this.sharedService.getRole?.roleId == 1) {
          if (
            // this.cashierMenu[0].openSession.canClick == false
            this.cashierMenu[0].openSession.canView == false &&
            this.cashierMenu[1].closeSession.canView == false &&
            this.cashierMenu[2].collect.canView == false &&
            this.cashierMenu[3].pretty.canView == false
          ) {
            // this.router.navigate(['/petty-cash']);
            this.isIpAddres = false;

            localStorage.setItem('IsFoundIPAddress', '1');
            console.log('no ip address');
          } else {
            localStorage.removeItem('IsFoundIPAddress');
          }
        }
      }
    });
  }
}
