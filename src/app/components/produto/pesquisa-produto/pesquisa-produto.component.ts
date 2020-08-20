import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pesquisa-produto',
  templateUrl: './pesquisa-produto.component.html',
  styleUrls: ['./pesquisa-produto.component.css']
})
export class PesquisaProdutoComponent implements OnInit {

  public produtos: Produto[];
  public _baseUrl: string;

  constructor(private produtoService: ProdutoService, private router: Router) {    
    
    this.produtoService.obterTodosProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos 
      },
        e => {
          console.log(e.error);

        });

  }

  ngOnInit() {
    this._baseUrl = environment.BASE_URL;
  }

  public adicionarProduto() {
    sessionStorage.setItem('produtoSession', "");
    this.router.navigate(['/produto']);
  }

  public deletarProduto(produto: Produto) {
    var retorno = confirm("Deseja realmente deletar o produto selecionado ?");
    if (retorno == true) {
      this.produtoService.deletar(produto).subscribe(
        produtos => {          
          this.produtos = produtos;
          
        }, e => {
          console.log(e.errors);
      });
    }
  }

  public editarProduto(produto: Produto) {
    sessionStorage.setItem('produtoSession', JSON.stringify(produto));
    this.router.navigate(['/produto']);
  }

}
