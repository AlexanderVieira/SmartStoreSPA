import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorService } from '../error/error.service';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  public _baseUrl: string;

constructor(private _http: HttpClient, private _error: ErrorService) {

  this._baseUrl = environment.BASE_URL;

 }

 get headers(): HttpHeaders {
  return new HttpHeaders().set('content-type', 'application/json');
}

public notificar(produtos: any[]): Observable<any> {
  return this._http.post<any>(`${this._baseUrl}api/notificacao`, produtos, { headers: this.headers });
}

public startJob(): Observable<any> {
  
  const url = `${this._baseUrl}api/notificacao`;
  return this._http.get<any>(url).pipe(catchError(this._error.handleError));

  }

}
