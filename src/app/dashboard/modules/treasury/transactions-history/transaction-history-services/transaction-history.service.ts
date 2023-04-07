import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionHistoryService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetTreasuryExpensesReport(
    searchText: string,
    sort: number,
    pageNo: number,
    lookupId?: number,
    branches?: string,
    registerName?: string,
    registerNo?: string,
    employee?: string
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `PettyCash/GetTreasuryExpensesReport?Search=${searchText}&Sort=${sort}&PageNo=${pageNo}&PageSize=6&ExpenseCategoryId=${
          lookupId ? lookupId : ''
        }&Branches=${branches}&RegisterName=${registerName}&RegisterId=${registerNo}&CreatedBy=${employee}`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * get category
   */
  GetCategory(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `Lookups/GetLookups?lookupTypeId=12`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * register Name
   */
  GetRegisterName(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `Register/GetRegisters?Status=2001`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * Branches
   */
  GetBranches(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `Branches/GetBranches?Status=2001&sort=1`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * employees
   */
  GetEmployees(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `User/GetUsers?RoleId=1&Status=2001&Invitation=2004`,

      this.sharedService.getHeaders()
    );
  }
  /**
   * get Collected Amount
   */
  getCollectedAmount(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `Treasury/GetCollectedAmounts`,

      this.sharedService.getHeaders()
    );
  }
  /**
   * get Direct Payment List
   */

  GetDirectPaymentCollection(
    searchText: string,
    sort: number,
    pageNo: number,
    CustomerSearch?: string,
    branches?: string,
    registerName?: string,
    registerNo?: string,
    employee?: string,
    payments?: string
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `Treasury/GetDirectPaymentCollections?CashCard=${searchText}&Customer=${CustomerSearch}&Sort=${sort}&PageNo=${pageNo}&PageSize=6&CollectionType=${payments}&Branches=${branches}&RegisterName=${registerName}&RegisterId=${registerNo}&CreatedBy=${employee}`,

      this.sharedService.getHeaders()
    );
  }

  // get direct payment details
  getDirectPaymentDetails(id): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `Treasury/GetDirectPaymentCollectionDetails?CollectionId=${id}`,

      this.sharedService.getHeaders()
    );
  }
}
