import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../services/shared.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetUsers(
    searchText: string,
    sort: number,
    branchId: number,
    roleId: number,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `User/GetUsers?Search=${searchText}&Sort=${sort}&BranchId=${branchId}&RoleId=${roleId}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  AddUser(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'User/AddUser',
      role,
      this.sharedService.getHeaders()
    );
  }
  EditUser(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'User/EditUser',
      role,
      this.sharedService.getHeaders()
    );
  }

  GetUserDetails(id: number) {
    return this.http.get(
      this.apiUrl + `User/GetUSERDetails?userId=${id}`,
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
  GetRoles() {
    return this.http.get(
      this.apiUrl + `Roles/GetRoles?Status=2001&Sort=2`,
      this.sharedService.getHeaders()
    );
  }

  getBranchDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Branches/GetBranchDetails?branchId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GetRoleDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Roles/GetRoleDetails?roleId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }

  getDefaultPermissions(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + `Permissions/GetDefaultPermissions?Status=2001`,
      this.sharedService.getHeaders()
    );
  }
}
