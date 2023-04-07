import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterSetupService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  getBranches(params: any): Observable<any[]> {
    let qparams = new URLSearchParams(params).toString();
    return this.http.get<any[]>(
      this.apiUrl + `Branches/GetBranches?` + qparams,
      this.sharedService.getHeaders()
    );
  }

  addBranch(branch: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Branches/AddBranch',
      branch,
      this.sharedService.getHeaders()
    );
  }
  updateBranch(branch: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Branches/UpdateBranch',
      branch,
      this.sharedService.getHeaders()
    );
  }

  getBranchDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Branches/GetBranchDetails?branchId=${id}`,
      this.sharedService.getHeaders()
    );
  }
  getUsers(rolid: number) {
    return this.http.get(
      this.apiUrl +
        `User/GetUsers?sort=2&Status=2001&Invitation=2004&PageSize=1000&RoleId=${rolid}`,
      this.sharedService.getHeaders()
    );
  }

  getUsersall() {
    return this.http.get(
      this.apiUrl + `User/GetUsers?sort=2&Status=2001&PageSize=1000`,
      this.sharedService.getHeaders()
    );
  }
  // this.apiUrl + `User/GetUsers?sort=2&Status=2001&RoleId=${roleId}`,

  getRoles() {
    return this.http.get(
      this.apiUrl + 'Roles/GetRoles?Status=2001&Sort=2',
      this.sharedService.getHeaders()
    );
  }

  getLocations() {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLocations',
      this.sharedService.getHeaders()
    );
  }
  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }

  addRegister(info: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Register/AddRegister',
      info,
      this.sharedService.getHeaders()
    );
  }
  UpdateRegister(info: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Register/UpdateRegister',
      info,
      this.sharedService.getHeaders()
    );
  }
  GetRegisterDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Register/GetRegisterDetails?Id=${id}`,
      this.sharedService.getHeaders()
    );
  }

  getDefaultPermissions(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + `Permissions/GetDefaultPermissions?Status=2001`,
      this.sharedService.getHeaders()
    );
  }


  GetRoleDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Roles/GetRoleDetails?roleId=${id}`,
      this.sharedService.getHeaders()
    );
  }

}
