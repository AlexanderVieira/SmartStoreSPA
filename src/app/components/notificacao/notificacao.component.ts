import { Component, OnInit } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@aspnet/signalr';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/model/Produto';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  constructor(private notificacaoService: NotificacaoService) { 
    this.messages = [];
    this.produtos = [];
    this._baseUrl = environment.BASE_URL;

  }

  ngOnInit() {

    this._connection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(`${this._baseUrl}notificacao`)
      .build();

      this._connection.on('notificationStarted', data => {
        console.log('notification started');
      });

      this._connection.on('notificationStartedChanged', data => {
        
        // this.messages.push(data);
        // length = this.messages.length; 
        
        data.forEach(element => {
            this.produtos.push(element);
        });
        sessionStorage.setItem("produtosNotification", JSON.stringify(this.produtos));
        console.log(this.produtos);        
        length = data.length;
        
      });

      this._connection.on('notificationEnded', data => {
        console.log('notification ended');
      });

      this._connection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.error('Error while establishing connection: ' + err));

  }

  public temNotificacoes(): boolean {
    //let notifications = this.messages;
    console.log(length)
    return (length > 0);
  }

  public itensPedido(): Produto[]{
    
    /* var produto = new Produto();    
    produto.descricao = "Smartphone A10";
    produto.preco = 1799.90;    
    this.produtos.push(produto); */

    var produtosSessionStorage = sessionStorage.getItem("produtosNotification");
    console.log(produtosSessionStorage);
    if (produtosSessionStorage) {      
      
      this.produtos = JSON.parse(produtosSessionStorage);
      console.log(this.produtos);
      return this.produtos;

    }    
    
    return this.produtos = [];

  }

  public notificar(){

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
  }

  public startJob() {
    this.messages = [];
    this.notificacaoService.startJob().subscribe(
      data => {
        console.log('Task service succeeded');        
      },
      error => {
        console.error(error);
      }
    );
  }  

}
