import { Component, OnInit } from '@angular/core';
import { CarrinhoComprasComponent } from '../../carrinho-compras/carrinho-compras.component';
import { Produto } from 'src/app/model/Produto';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/model/Pedido';
import { ItemPedido } from 'src/app/model/itemPedido';

@Component({
  selector: 'app-loja-efetivar-compra',
  templateUrl: './loja-efetivar-compra.component.html',
  styleUrls: ['./loja-efetivar-compra.component.css']
})
export class LojaEfetivarCompraComponent implements OnInit {

  public carrinhoCompras: CarrinhoComprasComponent;
  public produtos: Produto[];
  public total: number;

  constructor(private usuarioService: UsuarioService, private pedidoService: PedidoService, private router: Router) { }

  ngOnInit() {
    
    this.carrinhoCompras = new CarrinhoComprasComponent();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();

  }

  public atualizarPreco(produto: Produto, quantidade: number) {

    if (!produto.precoOriginal) {
        produto.precoOriginal = produto.preco;
    }
    if (quantidade <= 0) {
        quantidade = 1;
        produto.quantidade = quantidade;
    }

    produto.preco = produto.precoOriginal * quantidade;

    this.carrinhoCompras.atualizar(this.produtos);
    this.atualizarTotal();
  }

  public remover(produto: Produto) {
    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
  }

  public atualizarTotal() {
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }

  public efetivarCompra() {

    this.pedidoService.efetivarCompra(this.criarPedido())
        .subscribe(
            pedidoId => {
                console.log(pedidoId);
                sessionStorage.setItem("pedidoId", pedidoId.toString());
                this.produtos = [];
                this.carrinhoCompras.limparCarrinhoCompras();
                this.router.navigate(["/compra-realizada-sucesso"]);
            },
            e => {
                console.log(e.error);
            });

  }

  public criarPedido(): Pedido {

    let pedido = new Pedido();
    pedido.usuarioId = this.usuarioService.usuario.id;
    pedido.cep = "25.520-315";
    pedido.cidade = "Rio de Janeiro";        
    pedido.estado = "Rio de Janeiro";
    pedido.dataEntrega = new Date();
    pedido.formaPagamentoId = 1;
    pedido.numeroEndereco = "12";
    pedido.enderecoCompleto = "Rua A";

    this.produtos = this.carrinhoCompras.obterProdutos();

    for (let produto of this.produtos) {
        let itemPedido = new ItemPedido();
        itemPedido.produtoId = produto.id;
        
        if (!produto.quantidade)
            produto.quantidade = 1;
        itemPedido.quantidade = produto.quantidade;

        pedido.itensPedido.push(itemPedido);

    }

    return pedido;
    
  }

}
