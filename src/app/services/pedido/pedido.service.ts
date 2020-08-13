import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from 'src/app/model/Pedido';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn:'root'
})
export class PedidoService {

   public _baseUrl: string;

constructor(private http: HttpClient) {

    this._baseUrl = environment.BASE_URL;
}

get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
}

public efetivarCompra(pedido: Pedido): Observable<number> {
    return this.http.post<number>(this._baseUrl + "api/pedido", JSON.stringify(pedido), { headers: this.headers });
}

}
