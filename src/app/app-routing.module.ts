import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { LoginComponent } from './components/cadastro/login/login.component';
import { RegistroComponent } from './components/cadastro/registro/registro.component';
import { PesquisaProdutoComponent } from './components/produto/pesquisa-produto/pesquisa-produto.component';
import { LojaProdutoComponent } from './components/loja/produto/loja-produto.component';
import { LojaEfetivarCompraComponent } from './components/loja/efetivar/loja-efetivar-compra/loja-efetivar-compra.component';
import { LojaCompraRealizadaComponent } from './components/loja/efetivar/loja-compra-realizada/loja-compra-realizada.component';
import { NotificacaoComponent } from './components/notificacao/Notificacao.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'produto', component: ProdutoComponent},
  { path: 'entrar', component: LoginComponent },
  { path: "registrar", component: RegistroComponent },
  { path: "pesquisar-produto", component: PesquisaProdutoComponent },
  { path: "loja-produto", component: LojaProdutoComponent },
  { path: "loja-efetivar", component: LojaEfetivarCompraComponent },
  { path: "compra-realizada-sucesso", component: LojaCompraRealizadaComponent },
  { path: "notificacao", component: NotificacaoComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
