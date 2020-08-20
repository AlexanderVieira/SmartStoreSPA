import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CarrinhoComprasComponent } from '../loja/carrinho-compras/carrinho-compras.component';
import { Router } from '@angular/router';
import { NotificacaoComponent } from '../notificacao/Notificacao.component';
import { NodeWithI18n } from '@angular/compiler';
import { NotificacaoService } from 'src/app/services/notificacao/notificacao.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error/error.service';
import { Produto } from 'src/app/model/Produto';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public carrinhoCompras: CarrinhoComprasComponent;
  public notificacao: NotificacaoComponent;
  public produtos: Produto[];

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carrinhoCompras = new CarrinhoComprasComponent();
    this.notificacao = new NotificacaoComponent();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

public usuarioLogado(): boolean {
  return this.usuarioService.usuario_autenticado();
}
public usuario_administrador(): boolean {
  return this.usuarioService.usuario_administrador();
}

sair() {
  this.usuarioService.limpar_sessao();
  this.router.navigate(['/']);
}
get usuario() {
  return this.usuarioService.usuario;
}

public temItensCarrinhoCompras(): boolean {
  return this.carrinhoCompras.temItensCarrinhoCompras();
}

public adicionarItemCarrinhoCompras(){

  const itens = this.notificacao.getItens();
  itens.forEach(element => {
    this.carrinhoCompras.adicionar(element);
  });
  sessionStorage.setItem('produtosNotification', '');
  this.temNotificacoes();

}

public temNotificacoes(): boolean {
  return this.notificacao.temNotificacoes();  
}

}
