import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { CarrinhoComprasComponent } from '../carrinho-compras/carrinho-compras.component';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loja-produto',
  templateUrl: './loja-produto.component.html',
  styleUrls: ['./loja-produto.component.css']
})
export class LojaProdutoComponent implements OnInit {

  public produto: Produto;
  public carrinhoCompras: CarrinhoComprasComponent;
  public _baseUrl: string;

  constructor(private produtoService: ProdutoService, private router: Router) {
    
   }

  ngOnInit() {
    
    this._baseUrl = environment.BASE_URL;
    this.carrinhoCompras = new CarrinhoComprasComponent();
        var produtoDetalhe = sessionStorage.getItem('produtoDetalhe');
        if (produtoDetalhe) {
            this.produto = JSON.parse(produtoDetalhe);
        }

  }

  public comprar() {
    this.carrinhoCompras.adicionar(this.produto);
    this.router.navigate(["/loja-efetivar"]);
}

}
