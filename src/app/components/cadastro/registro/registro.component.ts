import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: Usuario;
  public ativar_spinner: boolean;
  public mensagem: string;
  public usuarioCadastrado: boolean;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  public cadastrar() {
    this.ativar_spinner = true;

    this.usuarioService.cadastrarUsuario(this.usuario)
      .subscribe(
        usuarioJson => {
          this.usuarioCadastrado = true;
          this.mensagem = "";
          this.ativar_spinner = false;
        },
        e => {
          this.mensagem = e.error;
          this.ativar_spinner = false;
        }
      );
  }

}
