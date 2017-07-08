import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  position = null;
  taxi = null;
  coisas: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public db: AngularFireDatabase,
    public auth: AuthServiceProvider, public geolocation: Geolocation) {
    this.coisas = db.list('/coisas');
  }
  adicionarCoisas() {
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
        handler: dados => {
          this.coisas.push({ nome: dados.tarefa })
        }
      }]
    });
    prompt.present();
  }
  remover(c) {
    this.coisas.remove(c.$key);
  }

  login() {
    this.auth.entrarComFacebook();
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then((pos) => {
      this.position = pos;
      this.taxi = {
        latitude: pos.coords.latitude, longitude: pos.coords.longitude
      };
      this.mexeTaxi;
    });
  }

  mexeTaxi() {
    this.taxi.latitude += 0.0001;
    this.taxi.longitude += 0.0001;
    setTimeout(this.mexeTaxi.bind(this), 100);
  }

}
