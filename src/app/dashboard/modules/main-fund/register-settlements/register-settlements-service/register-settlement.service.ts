import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterSettlementService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) { }
  /**
 * get list of allocation order
 */
  getAllSessions(pageNo?: number, search?: string, sort?: number): Observable<any> {
    let queryString = `Sessions/GetAllSessions?PageNo=${pageNo}&PageSize=6&sort=${sort}`;

    if (search) {
      queryString = queryString + `&search=${search}`
    }
    return this.http.get<any>(
      this.apiUrl + queryString,
      this.sharedService.getHeaders()
    );
  }
}
