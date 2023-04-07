import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { UtilityServiceService } from 'src/app/services/utility-service.service';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { HeaderService } from '../../services/header.service';
import { ConnectionService, ConnectionState } from 'ng-connection-service';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  faUser = faUser;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  IsshowPassword: boolean = false;
  userInfo: any = {};

  isLoading: boolean;

  userData: any;
  errorMessage: any;
  rememberMe: boolean = false;
  isRemembered: boolean = false;

  // status!: string;
  currentState!: ConnectionState;
  subscription = new Subscription();
  status = 'ONLINE';
  isConnected = true;
  constructor(
    private toastr: ToastrService,
    private utlilitySerivce: UtilityServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpserviceService: HttpserviceService,
    public headerService: HeaderService,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe((isConnected) => {
      console.log(isConnected);
      this.isConnected = isConnected.hasNetworkConnection;
      if (this.isConnected) {
        this.status = 'ONLINE';
        console.log(this.status);
      } else {
        this.status = 'OFFLINE';
        console.log(this.status);
      }
    });

    this.itemForm = this.formBuilder.group({
      identity: [this.formModel.identity, [Validators.required]],
      password: [this.formModel.password, [Validators.required]],
      rememberMe: [this.formModel.rememberMe],
    });
  }

  ngOnInit(): void {
    this.checkRememberMe();
    // this.subscription.add(
    //   this.connectionService.monitor(options).pipe(
    //     tap((newState: ConnectionState) => {
    //       this.currentState = newState;
    //       if (this.currentState.hasNetworkConnection) {
    //         this.status = 'ONLINE';
    //       } else {
    //         this.status = 'OFFLINE';
    //       }
    //     })
    //   ).subscribe()
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  checkRememberMe() {
    var isRemember = localStorage.getItem('rememberMe');
    if (isRemember !== null) {
      this.itemForm.controls['identity'].setValue(
        localStorage.getItem('identity')
      );
      this.itemForm.controls['password'].setValue(
        localStorage.getItem('password')
      );
      this.formModel.identity = localStorage.getItem('identity');
      this.formModel.password = localStorage.getItem('password');
      this.formModel.rememberMe = true;
      this.rememberMe = true;
      this.isRemembered = true;
    }
  }
  showPassword() {
    this.IsshowPassword = this.IsshowPassword == false ? true : false;
  }
  onLogin() {
    if (this.itemForm.valid) {
      if (this.status == 'ONLINE') {
        this.userInfo = {};
        this.isLoading = true;
        this.httpserviceService.login(this.itemForm.value).subscribe(
          (response: any) => {
            this.userInfo = response;
            this.userData = response.data;

            if (this.userData) {
              this.isLoading = false;
              localStorage.setItem('fullName', this.userData.fullName);
              localStorage.setItem('city', this.userData.city);
              localStorage.setItem('userid', this.userData.id);
              localStorage.setItem('role', JSON.stringify(this.userData.role));
              localStorage.setItem(
                'branch',
                JSON.stringify(this.userData.branch)
              );
              localStorage.setItem(
                'register',
                JSON.stringify(this.userData.register)
              );
              localStorage.setItem(
                'permissions',
                JSON.stringify(this.userData.permissions)
              );

              // localStorage.setItem('rememberMe', this.rememberMe.toString());
              // localStorage.setItem('rememberMe', this.rememberMe.toString());
              // localStorage.setItem('rememberMe', this.rememberMe.toString());

              if (this.rememberMe == true) {
                localStorage.setItem(
                  'identity',
                  this.itemForm.controls['identity'].value
                );
                localStorage.setItem(
                  'password',
                  this.itemForm.controls['password'].value
                );
                localStorage.setItem('rememberMe', this.rememberMe.toString());

                localStorage.setItem('token', this.userData.token);
              } else {
                // sessionStorage.setItem('fullName', this.userInfo.data.fullName);
                // sessionStorage.setItem('id', this.userInfo.data.id);
                sessionStorage.setItem('token', this.userData.token);

                // localStorage.removeItem('identity');
                // localStorage.removeItem('password');
                // localStorage.removeItem('rememberMe');
              }

              if (this.userData?.role?.roleId == 1) {
                this.router.navigateByUrl('/opening-register');
              } else if (this.userData?.role?.roleId == 36) {
                this.router.navigateByUrl('/branches');
              }
              else if (this.userData?.role?.roleId == 37) {
                this.router.navigateByUrl('/');
              }
            } else {
              var response = this.userInfo.Errors[0];
              this.errorMessage = response.ErrorMessageEn;
              this.isLoading = false;
            }
          },
          (error) => {
            this.isLoading = false;
            this.spinner.hide(), (this.errorMessage = error.message);
          }
        );
      } else {
        this.errorMessage = 'Please check your connection, Network error';
      }
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
  rememberMeClick($event: any) {
    alert($event);
  }
}
