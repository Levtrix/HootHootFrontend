import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class GenericService<T, ID> {
  protected url: string;
  protected domain: string = null;

  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(protected http: HttpClient, protected messageService: MessageService, serviceNameUrl: string) {
    this.url = 'http://insertlink.domain/hoothoot/' + serviceNameUrl;
  }

  protected getUrl(): string {
    return this.url + (this.domain != null ? this.domain : '');
  }

  getById(id: ID): Observable<T> {
    return this.http.get<T>(this.getUrl() + id).pipe(
      tap(_ => this.log(`fetched id=${id}`)),
      catchError(this.handleError<T>(`getById id=${id}`))
    );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.getUrl()).pipe(
      tap(_ => this.log(`fetched the list`)),
      catchError(this.handleError<T[]>('getAll', []))
    );
  }

  save(t: T): Observable<T> {
    return this.http.post<T>(this.getUrl(), t, this.httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((t: T) => this.log(`added ${t.constructor.name}`)),
      catchError(this.handleError<T>('save'))
    );
  }

  edit(id: ID, t: T): Observable<T> {
    return this.http.put<T>(this.getUrl() + id, t, this.httpOptions).pipe(
      tap(_ => this.log(`updated ${t.constructor.name}`)),
      catchError(this.handleError<T>('edit'))
    );
  }

  delete(id: ID, t: T): Observable<T> {
    return this.http.delete<T>(this.getUrl() + id, this.httpOptions).pipe(
      tap(_ => this.log(`deleted ${t.constructor.name} id=${id}`)),
      catchError(this.handleError<T>('delete'))
    );
  }

  /** Log a message to the messageservice */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line: no-shadowed-variable
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
