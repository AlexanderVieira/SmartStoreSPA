import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { CarrinhoComprasComponent } from '../loja/carrinho-compras/carrinho-compras.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public carrinhoCompras: CarrinhoComprasComponent;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.carrinhoCompras = new CarrinhoComprasComponent();
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

public temItensCarrinhoCompras() : boolean {
  return this.carrinhoCompras.temItensCarrinhoCompras();
}

}
