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
  getAllSessions(params:string): Observable<any> {
    let endPoint = `Sessions/GetAllSessions` + params;
    return this.http.get<any>(
      this.apiUrl + endPoint,
      this.sharedService.getHeaders()
    );
  }
  getStatusList(): Observable<any>  {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=16',
      this.sharedService.getHeaders()
    );
  }
  forceCloseRegiter(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'Sessions/ForceCloseRegister', data, this.sharedService.getHeaders());
  }
  forceCloseSession(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'Sessions/ForceCloseSession', data, this.sharedService.getHeaders());
  }
  updateRegister(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'Register/UpdateRegister', data, this.sharedService.getHeaders());
  }
  actionOnCheque(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/ActionsOnCheques', data, this.sharedService.getHeaders());
  }
  reverseActionOnCheque(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/ReverseActionsOnCheques', data, this.sharedService.getHeaders());
  }
  editCollectionCheuqe(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/EditCollectionCheuqe', data, this.sharedService.getHeaders());
  }
  actionOnCard(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/ActionsOnCard', data, this.sharedService.getHeaders());
  }
  reverseActionOnCard(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/ReverseActionsOnCard', data, this.sharedService.getHeaders());
  }
  editCollectionCard(data): Observable<any>  {
    return this.http.post(this.apiUrl + 'SessionsSettlements/EditCollectionByCards', data, this.sharedService.getHeaders());
  }
  getSessionDetailSettlement(sessionId): Observable<any> {
    return this.http.get(this.apiUrl + `SessionsSettlements/GetSessionDetailsforSettlement?sessionId=${sessionId}`, this.sharedService.getHeaders());
  }
  getSessionCheques(sessionId, pageNo, searchText): Observable<any> {
    return this.http.get(this.apiUrl +
      `SessionsSettlements/GetSessionCheques?SessionId=${sessionId}&search=${searchText}&pageNo=${pageNo}&pageSize=6`
      , this.sharedService.getHeaders());
  }
  getSessionCardsPayments(sessionId, pageNo, searchText): Observable<any> {
    return this.http.get(this.apiUrl +
      `SessionsSettlements/GetSessionCardsPayments?SessionId=${sessionId}&customer=${searchText}&pageNo=${pageNo}&pageSize=6`,
      this.sharedService.getHeaders());
  }
  getRegisterDetails(registerId): Observable<any> {
    return this.http.get(this.apiUrl +
      `Register/GetRegisterDetails?Id=${registerId}`,
      this.sharedService.getHeaders());
  }
  getBranches(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `Branches/GetBranches?sort=1&pageNo=0&pageSize=1000`,

      this.sharedService.getHeaders()
    );
  }
  getEmployees(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `User/GetUsers?pageNo=0&pageSize=1000`,

      this.sharedService.getHeaders()
    );
  }
}
