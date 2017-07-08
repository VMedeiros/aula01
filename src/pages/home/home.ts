import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  coisas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public db: AngularFireDatabase, 
  public auth: AuthServiceProvider) {
    this.coisas = db.list('/coisas');
}
  adicionarCoisas(){
    console.log("Fui clicado");
    let prompt = this.alertCtrl.create({
      title: "Nova Tarefa",
      message: "Qual Tarefa ?",
      
      inputs: [{
        name: "tarefa", 
        placeholder: "Tarefa"
      }],

      buttons: [{
        text: "Adicionar",
        handler: dados =>{
          this.coisas.push({nome:dados.tarefa})
        }
      }]
    });
    prompt.present();
  }
    remover(c) {
      this.coisas.remove(c.$key);
    }

    login(){
      this.auth.entrarComFacebook();
    }
}
