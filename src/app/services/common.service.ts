import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }
  NavigateToRouteWithQueryString(routeName: string, queryParams?: any) {
    if (queryParams == undefined || queryParams == null)
      this.router.navigate([routeName]);
    else
      this.router.navigate([routeName], queryParams);
  }

  NavigateToRoute(routeName: string, params?: any) {

    if (params == undefined || params == null)
      this.router.navigate([routeName]);
    else
      this.router.navigate([routeName, params]);
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
