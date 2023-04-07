import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  // apiUrl: string =
  //   'https://markazia-pos.azurewebsites.net/POSAPI/api/Branches/GetBranches';
  // url = 'https://markazia-pos.azurewebsites.net/POSAPI/api/Branches/AddBranch';

  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  getBranches(
    searchText: string,
    branchId: number,
    sort: number,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `Branches/GetBranches?Search=${searchText}&BranchTypeId=${branchId}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,
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
  getUsers() {
    return this.http.get(
      this.apiUrl + 'User/GetUsers?sort=2&Status=2001&&Invitation=2004PageSize=100',
      this.sharedService.getHeaders()
    );
  }
  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }

  getAddressBylangLat(lat, lang) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=AIzaSyAAQ7GPIxJs5PTBccmO9OZwBUy464p59bY`
    );
  }
}
