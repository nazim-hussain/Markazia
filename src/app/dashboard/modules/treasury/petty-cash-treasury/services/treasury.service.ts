import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';
import { AllocationOrder } from '../../allocation/components/create-allocation/create-allocation.component';
// import { Subject } from 'rxjs-compat';
@Injectable({
  providedIn: 'root',
})
export class TreasuryService {
  apiUrl = this.sharedService.getUrl;
  pettyCashRequest$ = new Subject<string>();
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
    pageNo: number,
    registerId: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl +
        `PettyCash/GetExpenses?Search=${searchText}&Status=${status}&Sort=${sort}&PageNo=${pageNo}&PageSize=6&RegisterId=${registerId}`,
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
        `PettyCash/GetRegisterPettycashrequest?Search=${searchText}&Status=${status}&Sort=${sort}&PageNo=${pageNo}&PageSize=6`,
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

  GetRegistersPettyCashLimits(searchText: string, id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `PettyCash/GetRegistersPettyCashLimits?Search=${searchText}&Sort=${id}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  EditPettyCashLimit(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/EditPettyCashLimit',
      expense,
      this.sharedService.getHeaders()
    );
  }

  GetExpensesCategories(id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `PettyCash/GetExpensesCategories?Sort=${id}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }
  AddExpenseCategory(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/AddExpenseCategory',
      expense,
      this.sharedService.getHeaders()
    );
  }

  EditExpenseCategory(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/EditExpenseCategory',
      expense,
      this.sharedService.getHeaders()
    );
  }
  DeleteExpenseCategory(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/DeleteExpenseCategory',
      expense,
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

  ApprovePettyCashRequest(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/ApprovePettyCashRequest',
      expense,
      this.sharedService.getHeaders()
    );
  }
  RejectPettyCashRequest(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/RejectPettyCashRequest',
      expense,
      this.sharedService.getHeaders()
    );
  }

  ApproveExpense(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/ApproveExpense',
      expense,
      this.sharedService.getHeaders()
    );
  }
  RejectExpense(expense: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'PettyCash/RejectExpense',
      expense,
      this.sharedService.getHeaders()
    );
  }

  // allocation api's
  
  getSageBanksAccounts(): Observable<any>{
    return this.http.get(this.apiUrl + 'Mainfund/GetSageBanksAccounts', 
    this.sharedService.getHeaders())
  }
  getMainFundCash(): Observable<any>{
    return this.http.get(this.apiUrl + 'Mainfund/GetMainFundCash', 
    this.sharedService.getHeaders())
  }

  sortSageBanksAccounts(sort: number, pageNo: number, pageSize): Observable<any>{
    return this.http.get(this.apiUrl + `Mainfund/GetSageBanksAccounts?sort${sort}&PageNo${pageNo}&PageSize${pageNo}`, 
    this.sharedService.getHeaders())
  }

 createAllocationOrders(orderDetail: any): Observable<any>{
  return this.http.post<AllocationOrder>(this.apiUrl + 'Mainfund/CreateAllocationOrders', orderDetail, this.sharedService.getHeaders()) 
 }

}


