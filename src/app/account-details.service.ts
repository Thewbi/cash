import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  constructor(private http: HttpClient) { }

  getAccount(virtualAccountId): Observable<any> {

    const endpoint = 'http://localhost:3000/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(endpoint + 'accounts/virtual/' + virtualAccountId, httpOptions).pipe(
      map(this.extractData));
  }

  getTransactions(virtualAccountId): Observable<any> {

    const endpoint = 'http://localhost:3000/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(endpoint + 'transactions/' + virtualAccountId, httpOptions).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}
