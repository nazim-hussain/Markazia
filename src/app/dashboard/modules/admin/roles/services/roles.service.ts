import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  getRoles(
    searchText: string,
    sort: number,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `Roles/GetRoles?Name=${searchText}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  getDefaultPermissions(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + `Permissions/GetDefaultPermissions?Status=2001`,
      this.sharedService.getHeaders()
    );
  }
  AddRole(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Roles/AddRole',
      role,
      this.sharedService.getHeaders()
    );
  }
  UpdateRole(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Roles/UpdateRole',
      role,
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
