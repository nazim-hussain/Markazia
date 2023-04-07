import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';
@Injectable({
  providedIn: 'root',
})
export class OpenregisterService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  OpenRegisterSession(register: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/OpenRegisterSession',
      register,
      this.sharedService.getHeaders()
    );
  }
  CanOpenRegisterSession(register: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/CanOpenRegisterSession',
      register,
      this.sharedService.getHeaders()
    );
  }
}
