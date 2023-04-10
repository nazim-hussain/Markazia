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

}
