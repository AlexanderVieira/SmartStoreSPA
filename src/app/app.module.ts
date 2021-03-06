import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

//import { TruncateModule } from 'ng2-truncate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/cadastro/login/login.component';
import { RegistroComponent } from './components/cadastro/registro/registro.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { PesquisaProdutoComponent } from './components/produto/pesquisa-produto/pesquisa-produto.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CarrinhoComprasComponent } from './components/loja/carrinho-compras/carrinho-compras.component';
import { LojaCompraRealizadaComponent } from './components/loja/efetivar/loja-compra-realizada/loja-compra-realizada.component';
import { LojaEfetivarCompraComponent } from './components/loja/efetivar/loja-efetivar-compra/loja-efetivar-compra.component';
import { LojaPesquisaComponent } from './components/loja/pesquisa/loja-pesquisa.component';
import { LojaProdutoComponent } from './components/loja/produto/loja-produto.component';
import { NotificacaoComponent } from './components/notificacao/Notificacao.component';

import { UsuarioService } from './services/usuario/usuario.service';
import { ProdutoService } from './services/produto/produto.service';
import { PedidoService } from './services/pedido/pedido.service';
import { NotificacaoService } from './services/notificacao/notificacao.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    CarrinhoComprasComponent,
    LojaEfetivarCompraComponent,
    LojaCompraRealizadaComponent,
    LojaPesquisaComponent,
    LojaProdutoComponent,
    ProdutoComponent,
    PesquisaProdutoComponent,
    NotificacaoComponent
   ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    //TruncateModule,
  ],
  providers: [UsuarioService, ProdutoService, PedidoService, NotificacaoService,{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
