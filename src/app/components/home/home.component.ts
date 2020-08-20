import { Component, OnInit } from '@angular/core';
import { NotificacaoComponent } from '../notificacao/Notificacao.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public notificacao: NotificacaoComponent;

  constructor() { 
    this.notificacao = new NotificacaoComponent();
  }

  ngOnInit() {
    
  }

}
