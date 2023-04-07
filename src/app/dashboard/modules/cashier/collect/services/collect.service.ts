import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../../../../../services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  apiUrl = this.sharedService.getUrl;
  constructor(private http: HttpClient, public sharedService: SharedService) {}

  GetRegisterDetails(id: number) {
    return this.http.get(
      this.apiUrl + `Register/GetRegisterDetails?Id=${id}`,
      this.sharedService.getHeaders()
    );
  }

  GetServicesSalesOrders(
    id: number,
    searchText: string,
    vin: string,
    serviceAdvisorId: string,
    sort: number,
    pageNo: number
  ) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetServicesSalesOrders?BranchId=${id}&Customer=${searchText}&Vin=${vin}&ServiceAdvisorId=${serviceAdvisorId}&sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  GetDirectPaymentSalesOrders(
    id: number,
    searchText: string,
    vin: string,
    salesConsultantId: string,
    sort: number,
    pageNo: number
  ) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetDirectPaymentSalesOrders?BranchId=${id}&Customer=${searchText}&Vin=${vin}&SalesConsultantId=${salesConsultantId}&sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }
  GetSparePartsSalesOrders(
    id: number,
    searchText: string,
    vin: string,
    salesConsultantId: string,
    sort: number,
    pageNo: number
  ) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetSparePartsSalesOrders?BranchId=${id}&Customer=${searchText}&Vin=${vin}&SalesConsultantId=${salesConsultantId}&sort=${sort}&PageNo=${pageNo}&PageSize=6`,
      this.sharedService.getHeaders()
    );
  }

  GetServicesSalesOrderDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetServicesSalesOrderDetails?salesOrderId=${id}`,
      this.sharedService.getHeaders()
    );
  }
  GetDirectPaymentSalesOrdersDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetDirectPaymentSalesOrdersDetails?directPaymentSalesOrderOpportunityNo=${id}`,
      this.sharedService.getHeaders()
    );
  }
  GetSparePartsSalesOrdersDetails(id: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetSparePartsSalesOrdersDetails?sparePartsSalesOrderOpportunityNo=${id}`,
      this.sharedService.getHeaders()
    );
  }
  GetServicesSalesOrderSpareparts(id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetServicesSalesOrderSpareparts?servicesSalesOrderNo=${id}&PageNo=${pageNo}&PageSize=3`,
      this.sharedService.getHeaders()
    );
  }

  GetServicesSalesOrderLabors(id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetServicesSalesOrderLabors?servicesSalesOrderNo=${id}&PageNo=${pageNo}&PageSize=3`,
      this.sharedService.getHeaders()
    );
  }

  GetServicesSalesOrderSublets(id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetServicesSalesOrderSublets?servicesSalesOrderNo=${id}&PageNo=${pageNo}&PageSize=3`,
      this.sharedService.getHeaders()
    );
  }

  GetSparePartsSalesOrderSpareparts(id: number, pageNo: number) {
    return this.http.get(
      this.apiUrl +
        `SalesOrders/GetSparePartsSalesOrderSpareparts?sparePartsSalesOrderOpportunityId=${id}&PageNo=${pageNo}&PageSize=3`,
      this.sharedService.getHeaders()
    );
  }
  // Search=${searchText}&
  GetBranches() {
    return this.http.get(
      this.apiUrl +
        `Branches/GetBranches?Status=2001&sort=2&PageNo=0&PageSize=100`,
      this.sharedService.getHeaders()
    );
  }

  getUsers(rolid: number) {
    return this.http.get(
      this.apiUrl +
        `User/GetUsers?sort=2&Status=2001&Invitation=2004&PageSize=1000&RoleId=${rolid}`,
      this.sharedService.getHeaders()
    );
  }

  getLookupsById(id: any) {
    return this.http.get(
      this.apiUrl + 'Lookups/GetLookups?lookupTypeId=' + id,
      this.sharedService.getHeaders()
    );
  }

  CollectionOrder(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Cashier/CollectionOrder',
      role,
      this.sharedService.getHeaders()
    );
  }
  NeedModify(role: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'SalesOrders/NeedModify',
      role,
      this.sharedService.getHeaders()
    );
  }
}
