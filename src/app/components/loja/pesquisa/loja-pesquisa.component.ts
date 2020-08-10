import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';

@Component({
  selector: 'app-loja-pesquisa',
  templateUrl: './loja-pesquisa.component.html',
  styleUrls: ['./loja-pesquisa.component.css']
})
export class LojaPesquisaComponent implements OnInit {

  public produtos: Produto[];

  constructor(private produtoService: ProdutoService, private router: Router) {
    this.produtoService.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        e => {
        })
  }

  ngOnInit() {
  }

  public abrirProduto(produto: Produto) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.router.navigate(['/loja-produto']);
  }

}
