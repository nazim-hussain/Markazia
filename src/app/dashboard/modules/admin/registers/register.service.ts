import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetRegisters(
    searchText: string,
    sort: number,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `Register/GetRegisters?Search=${searchText}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  AddRegister(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Register/AddRegister',
      role,
      this.sharedService.getHeaders()
    );
  }
  EditRegister(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Register/UpdateRegister',
      role,
      this.sharedService.getHeaders()
    );
  }

  GetRegisterDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Register/GetRegisterDetails?Id=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GetLocations() {
    return this.http.get(
      this.apiUrl + `Lookups/GetLocations`,
      this.sharedService.getHeaders()
    );
  }
  GetBranches(searchText: string) {
    return this.http.get(
      this.apiUrl +
        `Branches/GetBranches?Search=${searchText}&Status=2001&sort=2`,
      this.sharedService.getHeaders()
    );
  }
  GetUsers() {
    return this.http.get(
      this.apiUrl + `User/GetUsers?sort=2&Status=2001&Invitation=2004`, //RoleId=1&
      this.sharedService.getHeaders()
    );
  }
  GetRoles() {
    return this.http.get(
      this.apiUrl + `Roles/GetRoles?Status=2001&Sort=2`,
      this.sharedService.getHeaders()
    );
  }

  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }
}
