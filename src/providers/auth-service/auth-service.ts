import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthServiceProvider {
private usuario: firebase.User;

  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe((user: firebase.User) =>this.usuario = user);
  }

  get autenticado(): boolean {
    return this.usuario !== null;
  }
  entrarComFacebook(): firebase.Promise<any> {
    return this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  sair(): void{
    this.auth.auth.signOut();
  }

  get nomeUsuario() : string {
    return this.usuario ? this.usuario.displayName : '';
  }
}
