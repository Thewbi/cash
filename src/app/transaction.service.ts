import { Injectable } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }



  addTransaction(transaction): Observable<any> {

    console.log(transaction);

    const endpoint = 'http://localhost:3000/';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<any>(endpoint + 'transactions/create/', JSON.stringify(transaction), httpOptions)
      .pipe(

        tap((product) => console.log(`added transaction w/ id=${transaction.id}`)),
        catchError(this.handleError<any>('addTransaction'))
      );
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
