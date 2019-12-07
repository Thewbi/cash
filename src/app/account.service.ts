import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {

    const endpoint = 'http://localhost:3000/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(endpoint + 'accounts/virtual/', httpOptions).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  addAccount(account): Observable<any> {

    console.log(account);

    const endpoint = 'http://localhost:3000/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (account.virtual) {

      return this.http
        .post<any>(endpoint + 'accounts/create/virtual/', JSON.stringify(account), httpOptions)
        .pipe(

          tap((product) => console.log(`added account w/ id=${account.id}`)),
          catchError(this.handleError<any>('addAccount'))
        );

    } else {

      return this.http
        .post<any>(endpoint + 'accounts/create/real/', JSON.stringify(account), httpOptions)
        .pipe(

          tap((product) => console.log(`added account w/ id=${account.id}`)),
          catchError(this.handleError<any>('addAccount'))
        );

    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
