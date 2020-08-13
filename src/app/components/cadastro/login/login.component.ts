import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario;
  public returnUrl: string;
  public mensagem: string;
  public ativar_spinner: boolean;

  constructor(private router: Router, private activatedRouter: ActivatedRoute,
            private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario();
  }

  entrar() {
    this.ativar_spinner = true;
    this.usuarioService.verificarUsuario(this.usuario)
      .subscribe(
        usuario_json => {
          // essa linha será executada no caso de retorno sem erros
          this.usuarioService.usuario = usuario_json;

          if (this.returnUrl == null) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        err => {
          console.log(err.error);
          this.mensagem = err.error;
          this.ativar_spinner = false;
        }
      );
  }

}
