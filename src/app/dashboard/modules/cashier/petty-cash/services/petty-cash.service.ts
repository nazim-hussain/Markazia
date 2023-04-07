import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class PettyCashService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetExpenses(
    searchText: string,
    sort: number,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `Expense/GetExpenses?Search=${searchText}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  AddExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Expense/AddExpense', expense, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sharedService.getToken,
      }),
    });
  }

  EditExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'Expense/EditExpense', expense, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sharedService.getToken,
      }),
    });
  }

  GetExpenseDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Expense/GetExpenseDetails?expenseRecordId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }

  //==============================================

  GetPettyCashExpenses(
    searchText: string,
    sort: number,
    status: string,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `PettyCash/GetExpenses?Search=${searchText}&Status=${status}&Sort=${sort}&PageNo=${pageNo}&PageSize=6&RegisterId=${this.sharedService.getRegister?.registerObj?.id}`,
      this.sharedService.getHeaders()
    );
  }

  AddPettyCashExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'PettyCash/AddExpense', expense, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sharedService.getToken,
      }),
    });
  }

  EditPettyCashExpense(expense: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'PettyCash/EditExpense', expense, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.sharedService.getToken,
      }),
    });
  }
  GetPettyCashExpenseDetails(id: number) {
    return this.http.get(
      this.apiUrl + `PettyCash/GetExpenseDetails?expenseRecordId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  //===============================

  GetRegisterPettyCashRequestLast(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `PettyCash/GetRegisterPettyCashRequestLast?RegisterId=${this.sharedService.getRegister?.registerObj?.id}`,
      this.sharedService.getHeaders()
    );
  }

  GetRegisterPettycashrequest(
    searchText: string,
    sort: number,
    status: string,
    pageNo: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `PettyCash/GetRegisterPettycashrequest?Search=${searchText}&Status=${status}&Sort=${sort}&PageNo=${pageNo}&PageSize=6&RegisterId=${this.sharedService.getRegister?.registerObj?.id}`,
      this.sharedService.getHeaders()
    );
  }

  GetRegisterPettycashrequestDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `PettyCash/GetRegisterPettycashrequestDetails?pettyCashRequestId=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GetRegistersPettyCashLimits(id: number) {
    return this.http.get(
      this.apiUrl + `PettyCash/GetRegistersPettyCashLimits?Search=${id}`,
      this.sharedService.getHeaders()
    );
  }

  AddPettyCashRequest(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/AddPettyCashRequest',
      expense,
      this.sharedService.getHeaders()
    );
  }
}
