import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CloseRegisterService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetRegisterClosingData(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + 'Cashier/GetRegisterClosingData',
      this.sharedService.getHeaders()
    );
  }
  CloseRegisterSession(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + `Cashier/CloseRegisterSession`,
      data,
      this.sharedService.getHeaders()
    );
  }
  CanCloseRegisterSession(data: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + `Cashier/CanCloseRegisterSession`,
      data,
      this.sharedService.getHeaders()
    );
  }

  GetCurrentSessionCollectedCheques(
    searchText: string,
    pageNo: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `Cashier/GetCurrentSessionCollectedCheques?drawerName=${searchText}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }
  GetCurrentSessionCollectedCard(
    searchText: string,
    pageNo: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `Cashier/GetCurrentSessionCollectedCard?PayerName=${searchText}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  EditCollectionCheuqe(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/EditCollectionCheuqe',
      cheque,
      this.sharedService.getHeaders()
    );
  }

  ActionsOnCheques(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/ActionsOnCheques',
      cheque,
      this.sharedService.getHeaders()
    );
  }
  ReverseActionsOnCheques(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/ReverseActionsOnCheques',
      cheque,
      this.sharedService.getHeaders()
    );
  }

  EditCollectionByCards(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/EditCollectionByCards',
      cheque,
      this.sharedService.getHeaders()
    );
  }

  ActionsOnCard(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/ActionsOnCard',
      cheque,
      this.sharedService.getHeaders()
    );
  }
  ReverseActionsOnCard(cheque: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/ReverseActionsOnCard',
      cheque,
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
