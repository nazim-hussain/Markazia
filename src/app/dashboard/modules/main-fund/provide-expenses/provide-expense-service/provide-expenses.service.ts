import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ProvideExpensesService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  /**
   * get list of provide expenses
   */

  getProvideExpenses(
    searchText: string,
    sort: number,
    pageNo: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `Mainfund/GetApprovedExpenses?Search=${searchText}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * provide expenses
   */
  provideExpenses(RecordId) {
    return this.http.post<any>(
      this.apiUrl + 'Mainfund/ProvidePettyCashExpenses',
      RecordId,

      this.sharedService.getHeaders()
    );
  }
}
