import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class AllocationService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}
  despositeAmount = new BehaviorSubject(undefined);
  _viewDepositAmount = new BehaviorSubject(undefined);

  /**
   * get last allocation orders
   */

  getLastAllocation(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + `AllocationOrdersService/GetLastAllocationOrder`,

      this.sharedService.getHeaders()
    );
  }

  /**
   * get list of allocation order
   */
  getAllocation(pageNo?: number, search?: string,sort?:number): Observable<any> {
    let queryString = `AllocationOrdersService/GetAllocationOrders?PageNo=${pageNo}&PageSize=6&sort=${sort}`;

    if (search) {
      queryString = queryString + `&search=${search}`
    }
    return this.http.get<any>(
      this.apiUrl +queryString,
      this.sharedService.getHeaders()
    );
  }

  /**
   * veiw detail get allocation
   */ getViewDetailAllocation(
    orderId: number,
    pageNo?: number
  ): Observable<any> {
    return this.http.get<any>(
      this.apiUrl +
        `AllocationOrdersService/GetAllocationOrderDetails?OrderId=${orderId}&PageNo=${pageNo}&PageSize=6`,

      this.sharedService.getHeaders()
    );
  }
}
