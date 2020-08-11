import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public produto: Produto
  public arquivoSelecionado: File;
  public ativar_spinner: boolean;
  public mensagem: string;
  
  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit() {
    var produtoSession = sessionStorage.getItem('produtoSession');
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession);
    } else {
      this.produto = new Produto();
    }
  }

  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.ativar_spinner = true;
    this.produtoService.enviarArquivo(this.arquivoSelecionado)
      .subscribe(
        nomeArquivo => {
          this.produto.nomeArquivo = nomeArquivo;
          console.log(nomeArquivo);
          this.ativar_spinner = false;
        },
        e => {
          console.log(e.error);
          this.ativar_spinner = false;
        });
  }

  public cadastrar() {
    this.ativarEspera();
    this.produtoService.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          console.log(produtoJson);
          this.desativarEspera();
          this.router.navigate(['/pesquisar-produto']);
        },
        e => {
          console.log(e.error);
          this.mensagem = e.error;
          this.desativarEspera();
        } 
      );
  }

  public ativarEspera() {
    this.ativar_spinner = true;
  }

  public desativarEspera() {
    this.ativar_spinner = false;
  }

}
