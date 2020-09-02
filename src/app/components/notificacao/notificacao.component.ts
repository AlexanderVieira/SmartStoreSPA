import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/model/Produto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/model/Usuario';


@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit {

  private _connection: HubConnection;
  public messages: string[];  
  public _baseUrl: string;
  public length: number;
  public produtos: Produto[]; 
  public usuario: Usuario; 

  constructor() { 
    this.messages = [];
    this.produtos = [];
    this._baseUrl = environment.BASE_URL;    

  }

  ngOnInit() {
    
    this._connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`${this._baseUrl}notificacao`)
      .build();

     /*  this._connection.on('notificationStarted', data => {
        console.log('notification started');
      }); */

      /* this._connection.on('notificationStartedChanged', data => {
        console.log('notification Started Changed');
      }); */

      /* this._connection.on('notificationEnded', data => {
        console.log('notification ended');
      }); */

      this._connection.on('notificationPostStarted', data => {        
                
        const usuario: Usuario = data["001"].usuario;
        const carrinhoId = data["001"].carrinhoId;
        const produtos: Produto[] = data["001"].produtos;             

        console.log("Usuário ID: " + usuario.id);
        console.log("Carrinho de Compras: " + carrinhoId);        
        console.log("Lista de produtos: ", produtos);
        sessionStorage.setItem("usuario-autenticado", JSON.stringify(usuario));
        this.adicionarProdutoSessionNotification(produtos);

      });     

      this._connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.error('Error while establishing connection: ' + err));

  }

  public temNotificacoes(): boolean {    
    var produtos = this.getItens(); 
    console.log(produtos.length > 0) 
        return (produtos.length > 0);
  }

  public getItens(): Produto[]{    
    var produtos: Produto[] = [];
    var produtosSessionStorage = sessionStorage.getItem("produtosNotification");    
    if (produtosSessionStorage) {
      produtos = JSON.parse(produtosSessionStorage);      
      return produtos;
    }
    return produtos;
  }
  
  public adicionarProdutoSessionNotification(produtos: Produto[]){
    
    sessionStorage.setItem("produtosNotification", JSON.stringify(produtos)); 

  }
  
  /* public notificar(){

    this.messages = [];
    //var ids: any[] = [1, 2];
    var produtos : any[];
    produtos = [
      {
        id: 1,
        tagrfid: "EEGFHX"        
      },
      {
        id: 2,
        tagrfid: "FFXH32"        
      }
    ]

    this.notificacaoService.notificar(produtos).subscribe(
      data => {
        console.log('Task service succeeded');
      },
      error => {
        console.error(error);
      }
    )
  } */

  /* public startJob() {
    this.messages = [];
    this.notificacaoService.startJob().subscribe(
      data => {
        console.log('Task service succeeded');        
      },
      error => {
        console.error(error);
      }
    );
  }   */

}
